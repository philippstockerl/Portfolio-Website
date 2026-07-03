import * as THREE from 'three'

import type {
  AssetLoadOptions,
  AssetLoadResult,
  AssetLoadState,
  LoadedProjectAsset,
  ProjectAssetDescriptor,
} from '../assets/types'
import { getAssetViewport, getProjectAssetLayout } from '../assets/assetLayout'
import { getCameraPresets } from '../presets/cameraPresets'
import type {
  ThreeEngine,
  ThreeEngineDebugState,
  ThreeTheme,
  VectorTuple,
} from '../types'
import {
  GLASS_THEMES,
  GRID_DIVISIONS,
  GRID_SIZE,
  GRID_THEMES,
} from './sceneConfig'

class GridThreeEngine implements ThreeEngine {
  readonly canvas: HTMLCanvasElement

  private readonly axes: Array<
    THREE.Mesh<THREE.CylinderGeometry, THREE.MeshBasicMaterial>
  > = []
  private readonly axesGroup = new THREE.Group()
  private readonly assetGroup = new THREE.Group()
  private readonly camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000)
  private readonly glassPanels: Array<
    THREE.Mesh<THREE.PlaneGeometry, THREE.MeshPhysicalMaterial>
  > = []
  private readonly grids: THREE.GridHelper[] = []
  private readonly gridsGroup = new THREE.Group()
  private readonly mixers: THREE.AnimationMixer[] = []
  private readonly renderer: THREE.WebGLRenderer
  private readonly scene = new THREE.Scene()
  private readonly spinGroup = new THREE.Group()
  private readonly stageGroup = new THREE.Group()
  private readonly world = new THREE.Group()
  private readonly worldRoot = new THREE.Group()

  private activePresetIndex = 0
  private activeAsset: LoadedProjectAsset | null = null
  private activeAssetDescriptor: ProjectAssetDescriptor | null = null
  private activeAssetId: string | null = null
  private assetLoadController: AbortController | null = null
  private assetRequestId = 0
  private assetState: AssetLoadState = 'idle'
  private container: HTMLElement | null = null
  private currentTarget = new THREE.Vector3(0, 0, 0)
  private desiredCamera = new THREE.Vector3(200, 100, 100)
  private desiredStageScale = 1
  private desiredTarget = new THREE.Vector3(0, 0, 0)
  private desiredWorldPitch = 0
  private desiredWorldPosition = new THREE.Vector3(0, 0, 0)
  private desiredWorldRoll = 0
  private desiredWorldYaw = 0
  private disposed = false
  private frameRateCap = 60
  private frameId: number | null = null
  private lastFrameTime: number | null = null
  private mounted = false
  private pixelRatio = 1
  private reducedMotion = false
  private renderedFrames = 0
  private running = false
  private spinEnabled = true
  private spinSpeed = 0.001

  constructor() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    this.canvas = this.renderer.domElement
    this.canvas.className = 'three-background__canvas'
    this.canvas.dataset.rendered = 'false'
    this.canvas.dataset.running = 'false'
    this.canvas.dataset.threeEngine = 'grid'
    this.canvas.dataset.assetState = 'idle'
    this.canvas.dataset.frameRateCap = String(this.frameRateCap)
    this.canvas.dataset.mediaPaused = 'false'
    this.canvas.dataset.pixelRatio = String(this.pixelRatio)
    this.canvas.dataset.reducedMotion = 'false'

    this.renderer.setClearColor(0x000000, 0)
    this.scene.background = null

    this.worldRoot.add(this.spinGroup, this.assetGroup)
    this.spinGroup.add(this.world)
    this.scene.add(this.stageGroup)
    this.stageGroup.add(this.worldRoot, this.gridsGroup, this.axesGroup)

    this.buildGridsAndAxes()
    this.addLights()
  }

  mount(container: HTMLElement): void {
    this.assertUsable()

    if (this.mounted) {
      if (this.container === container) return
      throw new Error('Three.js engine is already mounted in another container')
    }

    this.container = container
    this.container.appendChild(this.canvas)
    this.mounted = true
    window.addEventListener('resize', this.handleResize, { passive: true })
    this.resize()

    this.camera.position.copy(this.desiredCamera)
    this.currentTarget.copy(this.desiredTarget)
    this.camera.lookAt(this.currentTarget)
  }

  start(): void {
    this.assertUsable()
    if (!this.mounted)
      throw new Error('Three.js engine must be mounted before it starts')
    if (this.running) return

    this.running = true
    this.canvas.dataset.running = 'true'
    this.lastFrameTime = null
    this.syncAssetPlayback()
    this.frameId = requestAnimationFrame(this.animate)
  }

  stop(): void {
    if (!this.running) return

    this.running = false
    this.canvas.dataset.running = 'false'
    this.lastFrameTime = null
    this.syncAssetPlayback()

    if (this.frameId !== null) {
      cancelAnimationFrame(this.frameId)
      this.frameId = null
    }
  }

  setTheme(theme: ThreeTheme): void {
    this.assertUsable()
    const gridTheme = GRID_THEMES[theme]
    const glassTheme = GLASS_THEMES[theme]

    this.grids.forEach((grid) => {
      grid.material.color.set(gridTheme.grid)
      grid.material.opacity = gridTheme.opacity
      grid.material.transparent = true
      grid.material.depthWrite = false
      grid.material.depthTest = false
      grid.material.needsUpdate = true
    })

    this.glassPanels.forEach((panel) => {
      panel.material.color.set(glassTheme.color)
      panel.material.opacity = glassTheme.opacity
      panel.material.transmission = glassTheme.transmission
      panel.material.roughness = glassTheme.roughness
      panel.material.clearcoat = glassTheme.clearcoat
      panel.material.clearcoatRoughness = glassTheme.clearcoatRoughness
      panel.material.needsUpdate = true
    })
  }

  applyPreset(
    index: number,
    reducedMotion = false,
    width = window.innerWidth,
  ): void {
    this.assertUsable()

    const presets = getCameraPresets(width)
    const preset = presets[index] ?? presets[0]
    if (!preset) return

    this.activePresetIndex = presets[index] ? index : 0
    this.canvas.dataset.presetIndex = String(this.activePresetIndex)
    this.reducedMotion = reducedMotion
    this.frameRateCap = reducedMotion ? 15 : width < 768 ? 30 : 60
    this.canvas.dataset.frameRateCap = String(this.frameRateCap)
    this.canvas.dataset.reducedMotion = String(reducedMotion)
    this.setVector(this.desiredCamera, preset.pos)
    this.setVector(this.desiredTarget, preset.target ?? [0, 0, 0])
    this.setVector(this.desiredWorldPosition, preset.world.pos)
    this.desiredWorldYaw = preset.world.yaw ?? 0
    this.desiredWorldPitch = preset.world.pitch ?? 0
    this.desiredWorldRoll = preset.world.roll ?? 0
    this.desiredStageScale = preset.world.scale ?? 1
    this.spinEnabled = !reducedMotion && preset.rotate
    this.spinSpeed = 0.003

    this.world.visible = preset.showWorld
    this.gridsGroup.visible = preset.showWorld
    this.axesGroup.visible = preset.showHelpers
    this.syncAssetPlayback()

    if (reducedMotion) {
      this.camera.position.copy(this.desiredCamera)
      this.currentTarget.copy(this.desiredTarget)
      this.world.position.copy(this.desiredWorldPosition)
      this.world.rotation.set(
        this.desiredWorldPitch,
        this.desiredWorldYaw,
        this.desiredWorldRoll,
      )
      this.stageGroup.scale.setScalar(this.desiredStageScale)
    }
  }

  async loadAsset(
    descriptor: ProjectAssetDescriptor,
    options: AssetLoadOptions = {},
  ): Promise<AssetLoadResult> {
    this.assertUsable()

    const requestId = ++this.assetRequestId
    this.assetLoadController?.abort()
    this.releaseActiveAsset()

    const controller = new AbortController()
    this.assetLoadController = controller
    this.setAssetState('loading', descriptor.id)

    try {
      const { loadProjectAsset } = await import('../assets/loadProjectAsset')
      const loadedAsset = await loadProjectAsset(
        descriptor,
        controller.signal,
        options.fresh,
      )

      if (
        controller.signal.aborted ||
        requestId !== this.assetRequestId ||
        this.disposed
      ) {
        loadedAsset.dispose()
        return 'cancelled'
      }

      this.activeAsset = loadedAsset
      this.activeAssetDescriptor = descriptor
      this.activeAssetId = descriptor.id
      this.assetGroup.add(loadedAsset.object)
      this.mixers.push(...loadedAsset.mixers)
      this.applyActiveAssetLayout(window.innerWidth)
      this.syncAssetPlayback()
      this.setAssetState('ready', descriptor.id)
      return 'loaded'
    } catch (error) {
      if (
        controller.signal.aborted ||
        requestId !== this.assetRequestId ||
        (error instanceof DOMException && error.name === 'AbortError')
      ) {
        return 'cancelled'
      }

      this.setAssetState('error', descriptor.id)
      throw error
    } finally {
      if (requestId === this.assetRequestId) {
        this.assetLoadController = null
      }
    }
  }

  clearAsset(): void {
    if (this.disposed) return

    this.assetRequestId += 1
    this.assetLoadController?.abort()
    this.assetLoadController = null
    this.releaseActiveAsset()
    this.setAssetState('idle', null)
  }

  getDebugState(): ThreeEngineDebugState {
    return {
      activeAssetId: this.activeAssetId,
      assetState: this.assetState,
      disposed: this.disposed,
      frameRateCap: this.frameRateCap,
      mounted: this.mounted,
      pixelRatio: this.pixelRatio,
      reducedMotion: this.reducedMotion,
      renderedFrames: this.renderedFrames,
      running: this.running,
    }
  }

  dispose(): void {
    if (this.disposed) return

    this.stop()
    window.removeEventListener('resize', this.handleResize)

    this.clearAsset()

    this.mixers.forEach((mixer) => mixer.stopAllAction())
    this.mixers.length = 0
    this.disposeSceneResources()
    this.scene.clear()
    this.renderer.renderLists.dispose()
    this.renderer.dispose()
    this.renderer.forceContextLoss()
    this.canvas.remove()

    this.container = null
    this.mounted = false
    this.disposed = true
    this.canvas.dataset.disposed = 'true'
  }

  private readonly animate = (time: number): void => {
    if (!this.running || this.disposed) return

    this.frameId = requestAnimationFrame(this.animate)
    const frameInterval = 1000 / this.frameRateCap
    if (
      this.lastFrameTime !== null &&
      time - this.lastFrameTime < frameInterval - 1
    ) {
      return
    }

    const delta =
      this.lastFrameTime === null ? 0 : (time - this.lastFrameTime) / 1000
    this.lastFrameTime = time

    this.camera.position.lerp(this.desiredCamera, 0.05)
    this.currentTarget.lerp(this.desiredTarget, 0.08)
    this.camera.lookAt(this.currentTarget)

    this.world.position.lerp(this.desiredWorldPosition, 0.06)
    this.world.rotation.y +=
      (this.desiredWorldYaw - this.world.rotation.y) * 0.06
    this.world.rotation.x +=
      (this.desiredWorldPitch - this.world.rotation.x) * 0.06
    this.world.rotation.z +=
      (this.desiredWorldRoll - this.world.rotation.z) * 0.06

    const currentScale = this.stageGroup.scale.x
    const nextScale =
      currentScale + (this.desiredStageScale - currentScale) * 0.06
    this.stageGroup.scale.setScalar(nextScale)

    if (this.spinEnabled) {
      this.spinGroup.rotation.y += this.spinSpeed
      this.gridsGroup.rotation.y += this.spinSpeed
      this.axesGroup.rotation.y += this.spinSpeed
    }

    if (!this.reducedMotion) {
      this.mixers.forEach((mixer) => mixer.update(delta))
    }
    this.activeAsset?.billboardObjects.forEach((object) => {
      object.lookAt(this.camera.position)
    })
    this.renderer.render(this.scene, this.camera)

    this.renderedFrames += 1
    if (this.renderedFrames === 1) this.canvas.dataset.rendered = 'true'
  }

  private readonly handleResize = (): void => {
    if (!this.mounted || this.disposed) return
    this.resize()
    this.applyPreset(
      this.activePresetIndex,
      this.reducedMotion,
      window.innerWidth,
    )
  }

  private addLights(): void {
    this.scene.add(new THREE.AmbientLight(0x888888))
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
    directionalLight.position.set(50, 100, 50)
    this.scene.add(directionalLight)
  }

  private assertUsable(): void {
    if (this.disposed)
      throw new Error('Three.js engine has already been disposed')
  }

  private buildGridsAndAxes(): void {
    const darkGrid = GRID_THEMES.dark
    const gridXY = new THREE.GridHelper(
      GRID_SIZE,
      GRID_DIVISIONS,
      darkGrid.main,
      darkGrid.grid,
    )
    const gridXZ = new THREE.GridHelper(
      GRID_SIZE,
      GRID_DIVISIONS,
      darkGrid.main,
      darkGrid.grid,
    )
    const gridYZ = new THREE.GridHelper(
      GRID_SIZE,
      GRID_DIVISIONS,
      darkGrid.main,
      darkGrid.grid,
    )

    gridXY.rotation.x = -Math.PI / 2
    gridXZ.rotation.y = -Math.PI / 2
    gridYZ.rotation.z = Math.PI / 2

    ;[gridXY, gridXZ, gridYZ].forEach((grid) => {
      grid.material.opacity = darkGrid.opacity
      grid.material.transparent = true
      grid.material.depthWrite = false
      grid.material.depthTest = false
      grid.renderOrder = 2
      this.gridsGroup.add(grid)
      this.grids.push(grid)
    })

    const glassMaterial = (): THREE.MeshPhysicalMaterial => {
      const config = GLASS_THEMES.dark
      return new THREE.MeshPhysicalMaterial({
        color: config.color,
        transparent: true,
        opacity: config.opacity,
        transmission: config.transmission,
        roughness: config.roughness,
        metalness: 0,
        ior: 1.3,
        thickness: 1.2,
        clearcoat: config.clearcoat,
        clearcoatRoughness: config.clearcoatRoughness,
        side: THREE.DoubleSide,
        depthWrite: false,
      })
    }

    const planeGeometry = new THREE.PlaneGeometry(GRID_SIZE, GRID_SIZE)
    const glassXY = new THREE.Mesh(planeGeometry, glassMaterial())
    const glassXZ = new THREE.Mesh(planeGeometry, glassMaterial())
    const glassYZ = new THREE.Mesh(planeGeometry, glassMaterial())
    glassXY.rotation.x = -Math.PI / 2
    glassXZ.rotation.y = -Math.PI / 2
    glassYZ.rotation.z = Math.PI / 2

    ;[glassXY, glassXZ, glassYZ].forEach((panel) => {
      panel.renderOrder = 1
      this.gridsGroup.add(panel)
      this.glassPanels.push(panel)
    })

    const axisLength = 100
    const axisRadius = 0.5
    const radialSegments = 8
    const cylinder = new THREE.CylinderGeometry(
      axisRadius,
      axisRadius,
      axisLength,
      radialSegments,
    )

    const xAxis = new THREE.Mesh(
      cylinder,
      new THREE.MeshBasicMaterial({ color: 0xff0000 }),
    )
    xAxis.rotation.z = -Math.PI / 2
    xAxis.position.x = axisLength / 2

    const yAxis = new THREE.Mesh(
      cylinder.clone(),
      new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
    )
    yAxis.position.y = axisLength / 2

    const zAxis = new THREE.Mesh(
      cylinder.clone(),
      new THREE.MeshBasicMaterial({ color: 0x0000ff }),
    )
    zAxis.rotation.x = Math.PI / 2
    zAxis.position.z = axisLength / 2

    this.axesGroup.add(xAxis, yAxis, zAxis)
    this.axes.push(xAxis, yAxis, zAxis)
  }

  private disposeSceneResources(): void {
    const geometries = new Set<THREE.BufferGeometry>()
    const materials = new Set<THREE.Material>()
    const textures = new Set<THREE.Texture>()

    this.scene.traverse((object) => {
      if (!(
        object instanceof THREE.Mesh || object instanceof THREE.LineSegments
      )) {
        return
      }

      if (object.geometry) geometries.add(object.geometry)
      const objectMaterials = Array.isArray(object.material)
        ? object.material
        : [object.material]

      objectMaterials.forEach((material) => {
        materials.add(material)
        Object.values(material).forEach((value: unknown) => {
          if (value instanceof THREE.Texture) textures.add(value)
        })
      })
    })

    textures.forEach((texture) => texture.dispose())
    materials.forEach((material) => material.dispose())
    geometries.forEach((geometry) => geometry.dispose())
  }

  private resize(): void {
    const width = this.container?.clientWidth || window.innerWidth
    const height = this.container?.clientHeight || window.innerHeight

    const pixelRatioCap = width < 768 ? 1.5 : 2
    this.pixelRatio = Math.min(window.devicePixelRatio || 1, pixelRatioCap)
    this.canvas.dataset.pixelRatio = String(this.pixelRatio)
    this.renderer.setPixelRatio(this.pixelRatio)
    this.renderer.setSize(width, height, false)
    this.camera.aspect = width / Math.max(height, 1)
    this.camera.updateProjectionMatrix()
    this.applyActiveAssetLayout(width)
  }

  private applyActiveAssetLayout(width: number): void {
    if (!this.activeAsset || !this.activeAssetDescriptor) return

    const layout = getProjectAssetLayout(this.activeAssetDescriptor, width)
    const position = layout.position ?? [0, 0, 0]
    this.activeAsset.object.position.set(...position)
    this.activeAsset.object.scale.setScalar(layout.scale ?? 1)
    this.canvas.dataset.assetViewport = getAssetViewport(width)
  }

  private releaseActiveAsset(): void {
    if (!this.activeAsset) {
      this.activeAssetDescriptor = null
      this.activeAssetId = null
      delete this.canvas.dataset.assetViewport
      this.canvas.dataset.mediaPaused = 'false'
      return
    }

    this.activeAsset.mixers.forEach((mixer) => {
      mixer.stopAllAction()
      const index = this.mixers.indexOf(mixer)
      if (index >= 0) this.mixers.splice(index, 1)
    })
    this.activeAsset.dispose()
    this.activeAsset = null
    this.activeAssetDescriptor = null
    this.activeAssetId = null
    delete this.canvas.dataset.assetViewport
    this.canvas.dataset.mediaPaused = 'false'
  }

  private setAssetState(state: AssetLoadState, assetId: string | null): void {
    this.assetState = state
    this.canvas.dataset.assetState = state

    if (assetId) this.canvas.dataset.assetId = assetId
    else delete this.canvas.dataset.assetId
  }

  private setVector(vector: THREE.Vector3, values: VectorTuple): void {
    vector.set(values[0], values[1], values[2])
  }

  private syncAssetPlayback(): void {
    const paused = !this.running || this.reducedMotion
    this.activeAsset?.setPaused(paused)
    this.canvas.dataset.mediaPaused = String(
      Boolean(this.activeAsset) && paused,
    )
  }
}

export function createThreeEngine(): ThreeEngine {
  return new GridThreeEngine()
}
