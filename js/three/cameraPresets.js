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

function buildVariant(presets, profile) {
  return presets.map(p => ({
    ...p,
    pos: scaleVec(p.pos, profile.posScale),
    target: scaleVec(p.target, profile.targetScale),
    world: {
      ...p.world,
      pos: scaleVec(p.world?.pos, profile.worldPosScale),
      scale: (p.world?.scale ?? 1) * profile.worldScale
    }
  }));
}

export const camPresetsMobile = buildVariant(camPresets, VIEWPORT_PROFILES.mobile);
export const camPresetsLaptop = buildVariant(camPresets, VIEWPORT_PROFILES.laptop);
export const camPresetsDesktop = buildVariant(camPresets, VIEWPORT_PROFILES.desktop);
export const camPresetsUltrawide = buildVariant(camPresets, VIEWPORT_PROFILES.ultrawide);

export function getCamPresetsForWidth(width = window.innerWidth) {
  if (width < 768) return camPresetsMobile;
  if (width < 1440) return camPresetsLaptop;      // MacBook-ish
  if (width <= 1980) return camPresetsDesktop;    // 1980 class
  return camPresetsUltrawide;
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
