import type { Object3D, AnimationMixer } from 'three'

import type { VectorTuple } from '../types'

interface AssetItemBase {
  billboard?: boolean
  id: string
  position: VectorTuple
  rotation?: VectorTuple
  scale?: number
}

export interface ImageAssetItem extends AssetItemBase {
  height: number
  src: string
  type: 'image'
  width: number
}

export interface ModelAssetItem extends AssetItemBase {
  src: string
  targetSize: number
  type: 'gltf'
}

export interface VideoAssetItem extends AssetItemBase {
  height: number
  loop?: boolean
  src: string
  type: 'video'
  width: number
}

export type ProjectAssetItem = ImageAssetItem | ModelAssetItem | VideoAssetItem

export type AssetViewport = 'desktop' | 'laptop' | 'mobile' | 'ultrawide'

export interface ProjectAssetLayout {
  position?: VectorTuple
  scale?: number
}

export interface ProjectAssetDescriptor {
  id: string
  items: readonly ProjectAssetItem[]
  layout?: Partial<Record<AssetViewport, ProjectAssetLayout>>
  presetIndex: number
}

export type AssetLoadState = 'error' | 'idle' | 'loading' | 'ready'

export interface AssetLoadStatus {
  assetId: string | null
  message?: string
  state: AssetLoadState
}

export type AssetLoadResult = 'cancelled' | 'loaded'

export interface AssetLoadOptions {
  fresh?: boolean
}

export interface LoadedAssetItem {
  billboardObjects: Object3D[]
  dispose(): void
  mixers: AnimationMixer[]
  object: Object3D
  setPaused(paused: boolean): void
}

export interface LoadedProjectAsset {
  billboardObjects: Object3D[]
  dispose(): void
  mixers: AnimationMixer[]
  object: Object3D
  setPaused(paused: boolean): void
}
