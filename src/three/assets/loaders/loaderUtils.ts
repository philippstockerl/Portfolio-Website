import * as THREE from 'three'

import type { ProjectAssetItem } from '../types'

export function abortError(): DOMException {
  return new DOMException('Asset loading was cancelled', 'AbortError')
}

export function applyItemTransform(
  object: THREE.Object3D,
  item: ProjectAssetItem,
): void {
  object.position.set(...item.position)
  object.rotation.set(...(item.rotation ?? [0, 0, 0]))
  object.scale.multiplyScalar(item.scale ?? 1)
}

export function disposeObject(object: THREE.Object3D): void {
  const geometries = new Set<THREE.BufferGeometry>()
  const materials = new Set<THREE.Material>()
  const textures = new Set<THREE.Texture>()

  object.traverse((child) => {
    if (!(child instanceof THREE.Mesh || child instanceof THREE.LineSegments)) {
      return
    }

    if (child.geometry) geometries.add(child.geometry)
    const childMaterials = Array.isArray(child.material)
      ? child.material
      : [child.material]

    childMaterials.forEach((material) => {
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
