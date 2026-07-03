import type {
  AssetViewport,
  ProjectAssetDescriptor,
  ProjectAssetLayout,
} from './types'

export function getAssetViewport(width: number): AssetViewport {
  if (width < 768) return 'mobile'
  if (width < 1440) return 'laptop'
  if (width > 1980) return 'ultrawide'
  return 'desktop'
}

export function getProjectAssetLayout(
  descriptor: ProjectAssetDescriptor,
  width: number,
): ProjectAssetLayout {
  return descriptor.layout?.[getAssetViewport(width)] ?? {}
}
