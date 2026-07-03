import * as THREE from 'three'

import type { ImageAssetItem, LoadedAssetItem } from '../types'
import { abortError, applyItemTransform } from './loaderUtils'

export async function loadImageItem(
  item: ImageAssetItem,
  signal: AbortSignal,
  fresh = false,
): Promise<LoadedAssetItem> {
  const response = await fetch(item.src, {
    cache: fresh ? 'reload' : 'default',
    signal,
  })
  if (!response.ok) {
    throw new Error(`Image request failed with status ${response.status}`)
  }

  const blob = await response.blob()
  if (signal.aborted) throw abortError()

  const bitmap = await createImageBitmap(blob)
  if (signal.aborted) {
    bitmap.close()
    throw abortError()
  }

  const texture = new THREE.Texture(bitmap)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.needsUpdate = true

  const material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide,
    toneMapped: false,
    transparent: true,
  })
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(item.width, item.height),
    material,
  )
  mesh.name = item.id
  applyItemTransform(mesh, item)

  return {
    billboardObjects: item.billboard ? [mesh] : [],
    mixers: [],
    object: mesh,
    setPaused: () => undefined,
    dispose: () => {
      mesh.removeFromParent()
      mesh.geometry.dispose()
      material.dispose()
      texture.dispose()
      bitmap.close()
    },
  }
}
