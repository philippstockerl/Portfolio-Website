import type { CameraPreset, VectorTuple } from '../types'

export const cameraPresets = [
  {
    pos: [200, 50, 200],
    rotate: true,
    target: [0, 20, 100],
    world: { pos: [0, 0, 0], yaw: 0, scale: 0.8 },
    showWorld: true,
    showHelpers: true,
  },
  {
    pos: [100, 50, 200],
    rotate: false,
    target: [0, 20, -100],
    world: { pos: [0, 0, 0], yaw: 0, scale: 0.8 },
    showWorld: true,
    showHelpers: true,
  },
  {
    pos: [180, 100, 120],
    rotate: true,
    target: [0, 0, 0],
    world: { pos: [0, 0, 0], yaw: 0.1, scale: 0.7 },
    showWorld: true,
    showHelpers: true,
  },
  {
    pos: [220, 120, 80],
    rotate: true,
    target: [0, 0, 0],
    world: { pos: [0, 0, 0], yaw: 0.12, scale: 0.7 },
    showWorld: true,
    showHelpers: true,
  },
  {
    pos: [0, 0, 100],
    rotate: false,
    target: [0, 0, 0],
    world: { pos: [40, -30, 0], yaw: 0, scale: 0.4 },
    showWorld: true,
    showHelpers: true,
  },
  {
    pos: [50, 50, 50],
    rotate: false,
    target: [0, 0, 0],
    world: { pos: [0, 0, 0], yaw: 0, scale: 1 },
    showWorld: true,
    showHelpers: true,
  },
  {
    pos: [0, 100, 300],
    rotate: true,
    target: [0, 0, 0],
    world: { pos: [0, 0, 0], yaw: 0, scale: 1 },
    showWorld: true,
    showHelpers: true,
  },
  {
    pos: [100, 100, 100],
    rotate: false,
    target: [0, 0, 0],
    world: { pos: [0, 0, 0], yaw: 0, scale: 1 },
    showWorld: true,
    showHelpers: false,
  },
  ...Array.from({ length: 6 }, () => ({
    pos: [200, 50, 150] as const,
    rotate: true,
    target: [0, 20, -100] as const,
    world: { pos: [0, 0, 0] as const, yaw: 0, scale: 0.8 },
    showWorld: true,
    showHelpers: true,
  })),
] satisfies CameraPreset[]

interface ViewportProfile {
  posScale: number
  targetScale: number
  worldPosScale: number
  worldScale: number
}

const viewportProfiles: Record<
  'desktop' | 'laptop' | 'mobile' | 'ultrawide',
  ViewportProfile
> = {
  mobile: { posScale: 1, targetScale: 1, worldPosScale: 1, worldScale: 0.7 },
  laptop: { posScale: 1, targetScale: 1, worldPosScale: 1, worldScale: 0.85 },
  desktop: { posScale: 1, targetScale: 1, worldPosScale: 1, worldScale: 1 },
  ultrawide: { posScale: 1, targetScale: 1, worldPosScale: 1, worldScale: 1.1 },
}

function scaleVector(vector: VectorTuple, scale: number): VectorTuple {
  return [vector[0] * scale, vector[1] * scale, vector[2] * scale]
}

function getViewportProfile(width: number): ViewportProfile {
  if (width < 768) return viewportProfiles.mobile
  if (width < 1440) return viewportProfiles.laptop
  if (width > 1980) return viewportProfiles.ultrawide
  return viewportProfiles.desktop
}

export function getCameraPresets(width: number): CameraPreset[] {
  const profile = getViewportProfile(width)

  return cameraPresets.map((preset) => ({
    ...preset,
    pos: scaleVector(preset.pos, profile.posScale),
    target: preset.target
      ? scaleVector(preset.target, profile.targetScale)
      : undefined,
    world: {
      ...preset.world,
      pos: scaleVector(preset.world.pos, profile.worldPosScale),
      scale: (preset.world.scale ?? 1) * profile.worldScale,
    },
  }))
}
