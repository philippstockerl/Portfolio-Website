import * as THREE from 'three'

import type { LoadedAssetItem, VideoAssetItem } from '../types'
import { abortError, applyItemTransform } from './loaderUtils'

function releaseVideo(video: HTMLVideoElement): void {
  video.pause()
  video.removeAttribute('src')
  video.load()
}

function waitForVideo(video: HTMLVideoElement, signal: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    const cleanup = () => {
      signal.removeEventListener('abort', handleAbort)
      video.removeEventListener('canplay', handleCanPlay)
      video.removeEventListener('error', handleError)
    }
    const handleAbort = () => {
      cleanup()
      releaseVideo(video)
      reject(abortError())
    }
    const handleCanPlay = () => {
      cleanup()
      resolve()
    }
    const handleError = () => {
      cleanup()
      reject(new Error('The browser could not decode the project video'))
    }

    signal.addEventListener('abort', handleAbort, { once: true })
    video.addEventListener('canplay', handleCanPlay, { once: true })
    video.addEventListener('error', handleError, { once: true })
  })
}

export async function loadVideoItem(
  item: VideoAssetItem,
  signal: AbortSignal,
  fresh = false,
): Promise<LoadedAssetItem> {
  const video = document.createElement('video')
  video.autoplay = true
  video.crossOrigin = 'anonymous'
  video.loop = item.loop ?? true
  video.muted = true
  video.playsInline = true
  video.preload = 'auto'
  const videoSource = new URL(item.src, window.location.href)
  if (fresh) videoSource.searchParams.set('retry', String(Date.now()))
  video.src = videoSource.href

  try {
    const ready = waitForVideo(video, signal)
    video.load()
    await ready
    if (signal.aborted) throw abortError()
    await video.play()
  } catch (error) {
    releaseVideo(video)
    throw error
  }

  if (signal.aborted) {
    releaseVideo(video)
    throw abortError()
  }

  const texture = new THREE.VideoTexture(video)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.minFilter = THREE.LinearFilter
  texture.magFilter = THREE.LinearFilter

  const material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide,
    toneMapped: false,
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
    setPaused: (paused) => {
      if (paused) {
        video.pause()
        return
      }

      void video.play().catch(() => undefined)
    },
    dispose: () => {
      mesh.removeFromParent()
      releaseVideo(video)
      mesh.geometry.dispose()
      material.dispose()
      texture.dispose()
    },
  }
}
