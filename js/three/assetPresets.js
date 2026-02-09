import { beamPreset } from './beamPresets.js';
import { cameraPreset } from './cameraPreset.js';


// assetPresets.js

const FORMULATION_DARK = 'media/videos/test/1080p60/Formulation.webm';
const FORMULATION_DARK_MP4 = 'media/videos/test/1080p60/Formulation_720p30.mp4';
const FORMULATION_LIGHT = 'media/videos/BudgetedRobustManimLight/1080p60/FormulationLight.webm';
const FORMULATION_LIGHT_MP4 = 'media/videos/BudgetedRobustManimLight/1080p60/FormulationLight_720p30.mp4';

export const assetPresetsDark = {
  0: [
beamPreset({ enabled: false }),


    cameraPreset({
      pos: [50, 80, 500],
      target: [0, 0, 0],
      rotate: true,
      showWorld: true,
      showHelpers: true,
      world: { pos: [0, 0, 0], yaw: 0.12, pitch: 0, roll: 0, scale: 0.85 },

      
      responsive: {
        mobile:  { pos: [140, 40, 160], target: [0, 10, 60], world: { scale: 0.7 } },
        laptop:  { pos: [180, 60, 200], target: [0, 20, 80], world: { scale: 0.85 } },
        desktop: { pos: [220, 70, 220], target: [0, 25, 90], world: { scale: 1 } },
        ultrawide: { pos: [260, 80, 240], target: [0, 30, 100], world: { scale: 1.1 } }
      }
    }),







    
  ],

  // Projects Main
  1: [
    beamPreset({ enabled: false }),

  ],
  2: [],
  3: [
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
  4: [{
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
  5: [],

  // Skills Section
  6: [
        beamPreset({ enabled: false }),
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
  7: [],
  // 8–13: Project detail presets

  // Bachelor Thesis
  8: [
    beamPreset({ enabled: true, speed: 6, glowSegment: 20, segmentMin: 3, segmentMax: 8 }),
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
  ],

  // Optimization Models (Gurobi)
  10: [
        beamPreset({ enabled: false }),
  ],


  11: [],
  12: [],
  13: []
};

export const assetPresetsLight = {
  0: [
{
  id: 'xy-front-left',
  type: 'video',
  src: 'media/videos/process-flow.webm',
  loop: true,          // only this one loops
  size: [70, 70],
  pos: [-65, 50, 0.12],
  rot: [0, 0, 0],
  side: 'front',
  label: 'My Projects',
  href: '#projects',
  cta: 'Open case ↗'
}
  ],
  1: [
    {
      id: 'xy-front-left',
      type: 'video',
      src: FORMULATION_LIGHT,
      srcMp4: FORMULATION_LIGHT_MP4,
      size: [150, 100],
      pos: [-25, 50, 0.12],
      rot: [0, 0, 0],
      side: 'front',
      fadeIn: 900,
      fadeOut: 500,
      delayIn: 250
    },
    {
      id: 'xy-front-right',
      type: 'video',
      src: FORMULATION_LIGHT,
      srcMp4: FORMULATION_LIGHT_MP4,
      size: [150, 100],
      pos: [25, 50, 0.12],
      rot: [0, Math.PI, 0],
      side: 'front',
      fadeIn: 900,
      fadeOut: 500,
      delayIn: 250
    }
  ],
  2: [],
  3: [
    {
      id: 'manim-hero-xz',
      type: 'video',
      src: FORMULATION_LIGHT,
      srcMp4: FORMULATION_LIGHT_MP4,
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
      src: FORMULATION_LIGHT,
      srcMp4: FORMULATION_LIGHT_MP4,
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
      src: FORMULATION_LIGHT,
      srcMp4: FORMULATION_LIGHT_MP4,
      size: [90, 50],
      pos: [0.12, 0, 0],
      rot: [0, Math.PI / 2, 0],
      side: 'double',
      fadeIn: 1000,
      fadeOut: 600,
      delayIn: 500,
      label: 'My Projects',
      href: '#projects',
      cta: 'Open case ↗'
    }
  ],
  4: [],
  5: [],

  // Skills Section
  6: [
    {
  id: 'prog-skills',
  type: 'image',
  src: 'media/images/ProgrammingSkills.png',
  size: [150, 100],
  pos: [80, 50, 0.12],
  rot: [0, 0, 0],
  side: 'double',
  depthTest: false,
  renderOrder: 5,
  reveal: { mode: 'wipe', duration: 900, delay: 150, direction: 'x+' },
  fadeIn: 800,
  fadeOut: 600
}],
  7: [],
  // 8–13: Project detail presets (match data-preset buttons in index.html)
  8: [],
  9: [],
  10: [],
  11: [],
  12: [],
  13: [],
  // 14-XX: GIFS
  14: [
    {
  id: 'gif-hero-xy',
  type: 'image',
  src: 'media/gifs/process-flow.gif',
  size: [150, 100],
  pos: [0, 50, 0.12],
  rot: [0, 0, 0],
  side: 'front',
  fadeIn: 800,
  fadeOut: 500
}

  ],
};
