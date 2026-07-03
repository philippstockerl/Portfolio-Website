import * as THREE from 'three'

import type {
  LoadedAssetItem,
  LoadedProjectAsset,
  ProjectAssetDescriptor,
  ProjectAssetItem,
} from './types'

async function loadItem(
  item: ProjectAssetItem,
  signal: AbortSignal,
  fresh: boolean,
): Promise<LoadedAssetItem> {
  switch (item.type) {
    case 'gltf': {
      const { loadModelItem } = await import('./loaders/loadModelItem')
      return loadModelItem(item, signal, fresh)
    }
    case 'image': {
      const { loadImageItem } = await import('./loaders/loadImageItem')
      return loadImageItem(item, signal, fresh)
    }
    case 'video': {
      const { loadVideoItem } = await import('./loaders/loadVideoItem')
      return loadVideoItem(item, signal, fresh)
    }
  }
}

export async function loadProjectAsset(
  descriptor: ProjectAssetDescriptor,
  signal: AbortSignal,
  fresh = false,
): Promise<LoadedProjectAsset> {
  const settledItems = await Promise.allSettled(
    descriptor.items.map((item) => loadItem(item, signal, fresh)),
  )
  const loadedItems = settledItems.flatMap((result) =>
    result.status === 'fulfilled' ? [result.value] : [],
  )
  const failedItem = settledItems.find((result) => result.status === 'rejected')

  if (failedItem?.status === 'rejected') {
    loadedItems.forEach((item) => item.dispose())
    throw failedItem.reason
  }

  try {
    const group = new THREE.Group()
    group.name = descriptor.id
    loadedItems.forEach((result) => group.add(result.object))

    return {
      billboardObjects: loadedItems.flatMap(
        (result) => result.billboardObjects,
      ),
      mixers: loadedItems.flatMap((result) => result.mixers),
      object: group,
      setPaused: (paused) => {
        loadedItems.forEach((result) => result.setPaused(paused))
      },
      dispose: () => {
        loadedItems.forEach((result) => result.dispose())
        group.removeFromParent()
        group.clear()
      },
    }
  } catch (error) {
    loadedItems.forEach((item) => item.dispose())
    throw error
  }
}

export async function preloadProjectAssetLoaders(): Promise<void> {
  await Promise.all([
    import('./loaders/loadImageItem'),
    import('./loaders/loadModelItem'),
    import('./loaders/loadVideoItem'),
  ])
}
