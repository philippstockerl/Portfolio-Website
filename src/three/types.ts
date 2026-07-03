import type {
  AssetLoadOptions,
  AssetLoadResult,
  AssetLoadState,
  ProjectAssetDescriptor,
} from './assets/types'

export type ThreeTheme = 'dark' | 'light'

export type VectorTuple = readonly [number, number, number]

export interface WorldTransform {
  pos: VectorTuple
  yaw?: number
  pitch?: number
  roll?: number
  scale?: number
}

export interface CameraPreset {
  pos: VectorTuple
  target?: VectorTuple
  rotate: boolean
  world: WorldTransform
  showWorld: boolean
  showHelpers: boolean
}

export interface ThreeEngineDebugState {
  activeAssetId: string | null
  assetState: AssetLoadState
  disposed: boolean
  frameRateCap: number
  mounted: boolean
  pixelRatio: number
  reducedMotion: boolean
  renderedFrames: number
  running: boolean
}

export interface ThreeEngine {
  readonly canvas: HTMLCanvasElement
  applyPreset(index: number, reducedMotion?: boolean, width?: number): void
  clearAsset(): void
  dispose(): void
  getDebugState(): ThreeEngineDebugState
  loadAsset(
    descriptor: ProjectAssetDescriptor,
    options?: AssetLoadOptions,
  ): Promise<AssetLoadResult>
  mount(container: HTMLElement): void
  setTheme(theme: ThreeTheme): void
  start(): void
  stop(): void
}
