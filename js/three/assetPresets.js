import { beamPreset } from './beamPresets.js';
import { cameraPreset } from './cameraPreset.js';


// assetPresets.js

const FORMULATION_DARK = 'media/videos/test/1080p60/Formulation.webm';
const FORMULATION_DARK_MP4 = 'media/videos/test/1080p60/Formulation_720p30.mp4';
const FORMULATION_LIGHT = 'media/videos/BudgetedRobustManimLight/1080p60/FormulationLight.webm';
const FORMULATION_LIGHT_MP4 = 'media/videos/BudgetedRobustManimLight/1080p60/FormulationLight_720p30.mp4';

// Light-theme asset overrides (extend as needed)
// Option A (by ID): add entries to LIGHT_ASSET_BY_ID to override specific assets by their `id`.
// Option B (by source): add [darkSrc, lightSrc] pairs to LIGHT_SRC_MAP to swap any matching `src`/`srcMp4`.
const LIGHT_ASSET_BY_ID = {
  'manim-hero-xz': { src: FORMULATION_LIGHT, srcMp4: FORMULATION_LIGHT_MP4 },
  'manim-hero-xy': { src: FORMULATION_LIGHT, srcMp4: FORMULATION_LIGHT_MP4 },
  'manim-hero-yz': { src: FORMULATION_LIGHT, srcMp4: FORMULATION_LIGHT_MP4 }
};

const LIGHT_SRC_MAP = new Map([
  [FORMULATION_DARK, FORMULATION_LIGHT],
  [FORMULATION_DARK_MP4, FORMULATION_LIGHT_MP4]
]);

function buildLightPresets(basePresets) {
  const out = {};
  Object.entries(basePresets).forEach(([key, defs]) => {
    out[key] = defs.map((def) => {
      if (!def || typeof def !== 'object') return def;
      let next = { ...def };
      if (next.src && LIGHT_SRC_MAP.has(next.src)) {
        next.src = LIGHT_SRC_MAP.get(next.src);
      }
      if (next.srcMp4 && LIGHT_SRC_MAP.has(next.srcMp4)) {
        next.srcMp4 = LIGHT_SRC_MAP.get(next.srcMp4);
      }
      if (next.id && LIGHT_ASSET_BY_ID[next.id]) {
        next = { ...next, ...LIGHT_ASSET_BY_ID[next.id] };
      }
      return next;
    });
  });
  return out;
}

export const assetPresetsDark = {
  0: [
beamPreset({ enabled: false }),


cameraPreset({
  pos: [200, 50, 200],
  target: [0, 20, 80],
  rotate: true,
  world: { scale: 1 },

  responsive: {
    mobile: { world: { scale: 0.5 } },
    laptop: { world: { scale: 0.5 } },
    desktop: { world: { scale: 0.5 } },
    ultrawide: { world: { scale: 0.5 } }
  }
})
,







    
  ],

  // Projects Main
  1: [
    beamPreset({ enabled: false }),
    cameraPreset({
      pos: [100, 50, 200],
      target: [0, 20, -100],
      rotate: false,
      showWorld: true,
      showHelpers: true,
      world: { pos: [0, 0, 0], yaw: 0.0, scale: 0.8 }
    }),
  ],
  2: [
    cameraPreset({
      pos: [180, 100, 120],
      target: [0, 0, 0],
      rotate: true,
      showWorld: true,
      showHelpers: true,
      world: { pos: [0, 0, 0], yaw: 0.1, scale: 0.7 }
    }),
  ],
  3: [
    cameraPreset({
      pos: [220, 120, 80],
      target: [0, 0, 0],
      rotate: true,
      showWorld: true,
      showHelpers: true,
      world: { pos: [0, 0, 0], yaw: 0.12, scale: 0.7 }
    }),
    {
      id: 'manim-hero-xz',
      type: 'video',
      src: FORMULATION_DARK,
      srcMp4: FORMULATION_DARK_MP4,
      size: [120, 68],
      pos: [0, 0.12, 0],
      rot: [-Math.PI / 2, 0, 0],
      side: 'double',
      fadeIn: 800,
      fadeOut: 500,
      delayIn: 0
    },
    {
      id: 'manim-hero-xy',
      type: 'video',
      src: FORMULATION_DARK,
      srcMp4: FORMULATION_DARK_MP4,
      size: [90, 50],
      pos: [0, 0, 0.12],
      rot: [0, 0, 0],
      side: 'double',
      fadeIn: 900,
      fadeOut: 500,
      delayIn: 250
    },
    {
      id: 'manim-hero-yz',
      type: 'video',
      src: FORMULATION_DARK,
      srcMp4: FORMULATION_DARK_MP4,
      size: [90, 50],
      pos: [0.12, 0, 0],
      rot: [0, Math.PI / 2, 0],
      side: 'double',
      fadeIn: 1000,
      fadeOut: 600,
      delayIn: 500
    }],
  4: [
    cameraPreset({
      pos: [0, 0, 100],
      target: [0, 0, 0],
      rotate: false,
      showWorld: true,
      showHelpers: true,
      world: { pos: [40, -30, 0], yaw: 0.0, scale: 0.4 }
    }),
    {
      id: 'xy-front-left',
      type: 'video',
      src: FORMULATION_DARK,
      srcMp4: FORMULATION_DARK_MP4,
      size: [150, 100],
      pos: [-25, 50, 0.12],
      rot: [0, 0, 0],
      side: 'front',
      fadeIn: 900,
      fadeOut: 500,
      delayIn: 250,
      label: 'Minimum-Cost-Flow',
      href: 'https://example.com',
      cta: 'Open case ↗'
    },
    {
      id: 'xy-front-right',
      type: 'video',
      src: FORMULATION_DARK,
      srcMp4: FORMULATION_DARK_MP4,
      size: [150, 100],
      pos: [25, 50, 0.12],
      rot: [0, Math.PI, 0],
      side: 'front',
      fadeIn: 900,
      fadeOut: 500,
      delayIn: 250,
      label: 'Minimum-Cost-Flow',
      href: 'https://example.com',
      cta: 'Open case ↗'
    },
    {
      id: 'yz-front-posz',
      type: 'video',
      src: FORMULATION_DARK,
      srcMp4: FORMULATION_DARK_MP4,
      size: [150, 100],
      pos: [0.12, 50, 25],
      rot: [0, Math.PI / 2, 0],
      side: 'front',
      fadeIn: 1000,
      fadeOut: 600,
      delayIn: 500,
      label: 'Minimum-Cost-Flow',
      href: 'https://example.com',
      cta: 'Open case ↗'
    },
    {
      id: 'yz-front-negz',
      type: 'video',
      src: FORMULATION_DARK,
      srcMp4: FORMULATION_DARK_MP4,
      size: [150, 100],
      pos: [0.12, 50, -25],
      rot: [0, -Math.PI / 2, 0],
      side: 'front',
      fadeIn: 1000,
      fadeOut: 600,
      delayIn: 500,
      label: 'Minimum-Cost-Flow',
      href: 'https://example.com',
      cta: 'Open case ↗'
    }
  ],
  5: [
    cameraPreset({
      pos: [50, 50, 50],
      target: [0, 0, 0],
      rotate: false,
      showWorld: true,
      showHelpers: true,
      world: { pos: [0, 0, 0], yaw: 0.0, scale: 1 }
    }),
  ],

  // Skills Section
  6: [
        beamPreset({ enabled: false }),
        cameraPreset({
          pos: [0, 100, 300],
          target: [0, 0, 0],
          rotate: true,
          showWorld: true,
          showHelpers: true,
          world: { pos: [0, 0, 0], yaw: 0.0, scale: 1 }
        }),
    {
      id: 'prog-skills',
      type: 'image',
      src: 'media/images/ProgrammingSkills.png',
      size: [100, 50],
      pos: [60, 0.12, 50],
      rot: [-Math.PI / 2, 0, 0],
      side: 'double',
      depthTest: false,
      renderOrder: 5,
      reveal: { mode: 'wipe', duration: 900, delay: 150, direction: 'x+' },
      fadeIn: 800,
      label: 'My Programming Skills',
      href: 'https://github.com/philippstockerl',
      cta: 'Visit my Git! ↗'
    },

    {
      id: 'prog-skills-name-card',
      type: 'image',
      src: 'media/images/ProgrammingSkillsNameCard.png',
      size: [100, 50],
      pos: [60, 50, 0.12],
      rot: [0, 0, 0],
      side: 'front',
      depthTest: false,
      renderOrder: 5,
      reveal: { mode: 'wipe', duration: 900, delay: 150, direction: 'x+' },
      fadeIn: 800,
      label: 'My Programming Skills',
      href: 'https://github.com/philippstockerl',
      cta: 'Visit my Git! ↗'
    },


    {
  id: 'WorkInProgress',
  type: 'image',
  src: 'media/images/WorkInProgress.png',
  size: [100, 100],
  pos: [0.12, 50, -50],
  rot: [0, Math.PI / 2 + Math.PI, 0],
  side: 'front',
  depthTest: false,
  renderOrder: 5,
  reveal: { mode: 'wipe', duration: 900, delay: 150, direction: 'x+' },
  fadeIn: 800,
  fadeOut: 600
    }
  ],
  7: [
    cameraPreset({
      pos: [100, 100, 100],
      target: [0, 0, 0],
      rotate: false,
      showWorld: true,
      showHelpers: false,
      world: { pos: [0, 0, 0], yaw: 0.0, scale: 1 }
    }),
  ],
  // 8–13: Project detail presets

  // Bachelor Thesis
  8: [
    beamPreset({ enabled: true, speed: 6, glowSegment: 20, segmentMin: 3, segmentMax: 8 }),
    cameraPreset({
      pos: [200, 50, 150],
      target: [0, 20, -100],
      rotate: true,
      showWorld: true,
      showHelpers: true,
      world: { pos: [0, 0, 0], yaw: 0.0, scale: 0.8 }
    }),
  // Robust Formulation PNG
    {
    id: 'latex-xy',
    type: 'image',
    src: 'media/images/BudgetedRobustManimDark/Formulation_ManimCE_v0.19.1.png',
    size: [150, 100],
    pos: [-40, 50, 0.12],
    rot: [0, 0, 0],
    side: 'front',
    depthTest: false,
    renderOrder: 5,
    reveal: { mode: 'wipe', duration: 900, delay: 150, direction: 'x+' },
    fadeIn: 800,
    fadeOut: 600
  },

    // Random Field GIF
    {
      id: 'xy-front-left',
      type: 'video',
      src: 'media/videos/randomfield.webm',
      loop: true,          // only this one loops
      size: [70, 70],
      pos: [-65, 50, 0.12],
      rot: [0, 0, 0],
      side: 'front',
      label: 'My Bachelor Thesis',
      href: 'https://philippstockerl-bachelorthesis-autonomousvehicleroutingdss.streamlit.app/',
      cta: 'Visit my Web Demo here! ↗'
    },

    // Robust Budgeted Min-Max
    {
      id: 'latex-xy',
      type: 'image',
      src: 'media/images/BudgetedRobustManimDark/Formulation_ManimCE_v0.19.1.png',
      size: [150, 100],
      pos: [80, 50, 0.12],
      rot: [0, 0, 0],
      side: 'front',
      depthTest: false,
      renderOrder: 5,
      reveal: { mode: 'wipe', duration: 900, delay: 150, direction: 'x+' },
      fadeIn: 800,
      fadeOut: 600,
    },
  ],

  // Bachelor Seminar
  9: [
        beamPreset({ enabled: false }),
        cameraPreset({
          pos: [200, 50, 150],
          target: [0, 20, -100],
          rotate: true,
          showWorld: true,
          showHelpers: true,
          world: { pos: [0, 0, 0], yaw: 0.0, scale: 0.8 }
        }),
  ],

  // Optimization Models (Gurobi)
  10: [
        beamPreset({ enabled: false }),
        cameraPreset({
          pos: [200, 50, 150],
          target: [0, 20, -100],
          rotate: true,
          showWorld: true,
          showHelpers: true,
          world: { pos: [0, 0, 0], yaw: 0.0, scale: 0.8 }
        }),
  ],


  11: [
    cameraPreset({
      pos: [200, 50, 150],
      target: [0, 20, -100],
      rotate: true,
      showWorld: true,
      showHelpers: true,
      world: { pos: [0, 0, 0], yaw: 0.0, scale: 0.8 }
    }),
  ],
  12: [
    cameraPreset({
      pos: [200, 50, 150],
      target: [0, 20, -100],
      rotate: true,
      showWorld: true,
      showHelpers: true,
      world: { pos: [0, 0, 0], yaw: 0.0, scale: 0.8 }
    }),
  ],
  13: [
    cameraPreset({
      pos: [200, 50, 150],
      target: [0, 20, -100],
      rotate: true,
      showWorld: true,
      showHelpers: true,
      world: { pos: [0, 0, 0], yaw: 0.0, scale: 0.8 }
    }),
  ]
};

export const assetPresetsLight = buildLightPresets(assetPresetsDark);
