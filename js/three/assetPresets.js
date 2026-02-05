// assetPresets.js

const FORMULATION_DARK = 'media/videos/test/1080p60/Formulation.webm';
const FORMULATION_DARK_MP4 = 'media/videos/test/1080p60/Formulation_720p30.mp4';
const FORMULATION_LIGHT = 'media/videos/BudgetedRobustManimLight/1080p60/FormulationLight.webm';
const FORMULATION_LIGHT_MP4 = 'media/videos/BudgetedRobustManimLight/1080p60/FormulationLight_720p30.mp4';

export const assetPresetsDark = {
  0: [

{
  id: 'xy-front-left',
  type: 'video',
  src: 'media/videos/randomfield.webm',
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
      src: FORMULATION_DARK,
      srcMp4: FORMULATION_DARK_MP4,
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
      src: FORMULATION_DARK,
      srcMp4: FORMULATION_DARK_MP4,
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
  6: [],
  7: [],
  // 8–13: Project detail presets (match data-preset buttons in index.html)
  8: [],
  9: [],
  10: [],
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
  6: [],
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
