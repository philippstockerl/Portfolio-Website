// cameraPresets.js
export const camPresets = [
  // 0: Hero
  { pos: [200,50,200], rotate: true, target: [0,20,100],
    world: { pos:[0,0,0], yaw: 0.0, scale: 0.8 }, showWorld: true, showHelpers: true },

  // 1: Projects Main Overview
  { pos: [100,50,200], rotate: false, target: [0,20,-100],
    world: { pos:[0,0,0], yaw: 0.0, scale: 0.8 }, showWorld: true, showHelpers: true },

  // 2: Experience — grid visible, slightly right
  { pos: [180,100,120], rotate: true, target: [0,0,0],
    world: { pos:[0,0,0], yaw: 0.1, scale: 0.7 }, showWorld: true, showHelpers: true },

  // 3: Projects — grid left, content on the right
  { pos: [220,120,80], rotate: true, target: [0,0,0],
    world: { pos:[0,0,0], yaw: 0.12, scale: 0.7 }, showWorld: true, showHelpers: true },

  // 4: Certificates — grid right, content left (mirror)
  { pos: [0,0,100], rotate: false, target: [0,0,0],
    world: { pos:[40,-30,0], yaw: 0.00, scale: 0.4 }, showWorld: true, showHelpers: true },

  // 5: Contact — pulled back a bit
  { pos: [50,50,50], rotate: false, target: [0,0,0],
    world: { pos:[0,0,0], yaw: 0.0, scale: 1 }, showWorld: true, showHelpers: true },

  // 6: My Skills
  { pos: [0,100,300], rotate: true, target: [0,0,0],
    world: { pos:[0,0,0], yaw: 0.0, scale: 1 }, showWorld: true, showHelpers: true },

  // 7: No helpers preset
  { pos: [100,100,100], rotate: false, target: [0,0,0],
    world: { pos:[0,0,0], yaw: 0, scale: 1 }, showWorld: true, showHelpers: false },

  // 8–13: Project detail presets (triggered by project buttons)
  // Tweak each of these for unique camera angles per project.
  { pos: [200,50,150], rotate: true, target: [0,20,-100],
    world: { pos:[0,0,0], yaw: 0.0, scale: 0.8 }, showWorld: true, showHelpers: true },
  { pos: [200,50,150], rotate: true, target: [0,20,-100],
    world: { pos:[0,0,0], yaw: 0.0, scale: 0.8 }, showWorld: true, showHelpers: true },
  { pos: [200,50,150], rotate: true, target: [0,20,-100],
    world: { pos:[0,0,0], yaw: 0.0, scale: 0.8 }, showWorld: true, showHelpers: true },
  { pos: [200,50,150], rotate: true, target: [0,20,-100],
    world: { pos:[0,0,0], yaw: 0.0, scale: 0.8 }, showWorld: true, showHelpers: true },
  { pos: [200,50,150], rotate: true, target: [0,20,-100],
    world: { pos:[0,0,0], yaw: 0.0, scale: 0.8 }, showWorld: true, showHelpers: true },
  { pos: [200,50,150], rotate: true, target: [0,20,-100],
    world: { pos:[0,0,0], yaw: 0.0, scale: 0.8 }, showWorld: true, showHelpers: true }
];

const VIEWPORT_PROFILES = {
  mobile:   { posScale: 0.7,  targetScale: 0.7,  worldPosScale: 0.7,  worldScale: 0.7 },
  laptop:   { posScale: 0.85, targetScale: 0.85, worldPosScale: 0.85, worldScale: 0.85 },
  desktop:  { posScale: 1,    targetScale: 1,    worldPosScale: 1,    worldScale: 1 },
  ultrawide:{ posScale: 1.15, targetScale: 1.15, worldPosScale: 1.15, worldScale: 1 }
};

function scaleVec(vec, scale) {
  if (!Array.isArray(vec)) return vec;
  return vec.map(v => v * scale);
}

function buildVariantForPreset(preset, profile) {
  if (!preset) return preset;
  return {
    ...preset,
    pos: scaleVec(preset.pos, profile.posScale),
    target: scaleVec(preset.target, profile.targetScale),
    world: {
      ...preset.world,
      pos: scaleVec(preset.world?.pos, profile.worldPosScale),
      scale: (preset.world?.scale ?? 1) * profile.worldScale
    }
  };
}

const presetOverrides = new Map();

function mergePreset(base, override) {
  if (!override) return base;
  const merged = {
    ...base,
    ...override,
    world: {
      ...base?.world,
      ...override?.world
    }
  };
  if (!merged.world || Object.keys(merged.world).length === 0) {
    delete merged.world;
  }
  return merged;
}

function normalizeOverride(override) {
  if (!override || typeof override !== 'object') return null;
  const { type, reset, responsive, ...rest } = override;
  if (reset) return null;
  return rest;
}

export function setCameraPresetOverride(index, override) {
  if (!Number.isFinite(index)) return;
  const normalized = normalizeOverride(override);
  if (!normalized) {
    presetOverrides.delete(index);
    return;
  }
  presetOverrides.set(index, normalized);
}

export function clearCameraPresetOverride(index) {
  if (!Number.isFinite(index)) return;
  presetOverrides.delete(index);
}

export function getCamPresetsForWidth(width = window.innerWidth) {
  let profile = VIEWPORT_PROFILES.desktop;
  if (width < 768) profile = VIEWPORT_PROFILES.mobile;
  else if (width < 1440) profile = VIEWPORT_PROFILES.laptop;      // MacBook-ish
  else if (width > 1980) profile = VIEWPORT_PROFILES.ultrawide;

  return camPresets.map((base, index) => {
    const merged = mergePreset(base, presetOverrides.get(index));
    return buildVariantForPreset(merged, profile);
  });
}

// Map section IDs to camera preset indices
export const sectionPresets = {
  hero: 0,
  experience: 2,
  projects: 1,
  certificates: 4,
  contact: 5,
  skills: 6,
  nohelpers: 7
};
