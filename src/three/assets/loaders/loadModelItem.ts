import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

import type { LoadedAssetItem, ModelAssetItem } from '../types'
import { abortError, applyItemTransform, disposeObject } from './loaderUtils'

export async function loadModelItem(
  item: ModelAssetItem,
  signal: AbortSignal,
  fresh = false,
): Promise<LoadedAssetItem> {
  const response = await fetch(item.src, {
    cache: fresh ? 'reload' : 'default',
    signal,
  })
  if (!response.ok) {
    throw new Error(`Model request failed with status ${response.status}`)
  }

  const buffer = await response.arrayBuffer()
  if (signal.aborted) throw abortError()

  const resourcePath = new URL('.', new URL(item.src, window.location.href))
    .href
  const gltf = await new GLTFLoader().parseAsync(buffer, resourcePath)
  if (signal.aborted) {
    disposeObject(gltf.scene)
    throw abortError()
  }

  const bounds = new THREE.Box3().setFromObject(gltf.scene)
  const size = bounds.getSize(new THREE.Vector3())
  const largestDimension = Math.max(size.x, size.y, size.z)
  if (!Number.isFinite(largestDimension) || largestDimension <= 0) {
    disposeObject(gltf.scene)
    throw new Error('The model has no measurable geometry')
  }

  const center = bounds.getCenter(new THREE.Vector3())
  gltf.scene.position.sub(center)

  const wrapper = new THREE.Group()
  wrapper.name = item.id
  wrapper.add(gltf.scene)
  wrapper.scale.setScalar(item.targetSize / largestDimension)
  applyItemTransform(wrapper, item)

  const mixers = gltf.animations.length
    ? [new THREE.AnimationMixer(gltf.scene)]
    : []
  mixers.forEach((mixer) => {
    gltf.animations.forEach((clip) => mixer.clipAction(clip).play())
  })

  return {
    billboardObjects: item.billboard ? [wrapper] : [],
    mixers,
    object: wrapper,
    setPaused: () => undefined,
    dispose: () => {
      mixers.forEach((mixer) => {
        mixer.stopAllAction()
        mixer.uncacheRoot(gltf.scene)
      })
      wrapper.removeFromParent()
      disposeObject(wrapper)
      wrapper.clear()
    },
  }
}
