// threeScene.js
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.module.js';

// Shared fade duration for helpers and grids
const FADE_DURATION = 1000;

// Grid dimensions (shared across helpers and beam)
const GRID_SIZE = 240;
const GRID_DIVISIONS = 20;
const GRID_STEP = GRID_SIZE / GRID_DIVISIONS;

// Grid color themes (tweak here)
const GRID_THEMES = {
  dark: { main: 0xcdd2db, grid: 0xa3a9b6, opacity: 0.1 },
  light: { main: 0x3a3f4c, grid: 0x5b6270, opacity: 0.1 }
};

// Glass panel themes (tweak here)
const GLASS_THEMES = {
  dark: {
    color: 0x8da2ff,
    opacity: 0.03,
    transmission: 0.35,
    roughness: 0.18,
    clearcoat: 0.4,
    clearcoatRoughness: 0.2
  },
  light: {
    color: 0xbfd0ff,
    opacity: 0.14,
    transmission: 0.3,
    roughness: 0.22,
    clearcoat: 0.35,
    clearcoatRoughness: 0.25
  }
};

// Beam themes (tweak here)
const BEAM_THEMES = {
  dark: {
    base: 0x6f7b94,
    glow: 0x9bb6ff,
    baseOpacity: 0.22,
    glowOpacity: 0.85,
    headOpacity: 0.95
  },
  light: {
    base: 0x3e4656,
    glow: 0x5876ff,
    baseOpacity: 0.16,
    glowOpacity: 0.75,
    headOpacity: 0.85
  }
};

const BEAM_CONFIG = {
  points: 70,
  segmentMin: 3,
  segmentMax: 8,
  glowSegment: 10,
  speed: 5.5, // points per second
  yOffset: 0.6
};

const mixers = [];
const helpers = [];
const grids = [];
const glassPanels = [];
const axes = [];
const beamState = {
  group: null,
  points: [],
  glowGeometry: null,
  baseMaterial: null,
  glowMaterial: null,
  headMaterial: null,
  head: null,
  baseOpacity: BEAM_THEMES.dark.baseOpacity,
  glowOpacity: BEAM_THEMES.dark.glowOpacity,
  headOpacity: BEAM_THEMES.dark.headOpacity,
  fade: 1,
  enabled: true
};

let activeGridTheme = 'dark';

export const scene    = new THREE.Scene();
export const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
export const camera   = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);

// ── Group hierarchy: scene → worldRoot → spinGroup → world (your grids/axes/models go in `world`)
// Helpers (grids and axes) are separate from world so they are not hidden when fading the world
export const stageGroup = new THREE.Group();
export const worldRoot = new THREE.Group();
const spinGroup = new THREE.Group();
export const world = new THREE.Group();
export const modelsGroup = new THREE.Group();
export const gridsGroup = new THREE.Group();
export const axesGroup = new THREE.Group();
export const gridAssetsGroup = new THREE.Group();
worldRoot.add(spinGroup);
spinGroup.add(world);
world.add(modelsGroup);
scene.add(stageGroup);
stageGroup.add(worldRoot);
stageGroup.add(gridsGroup);
stageGroup.add(axesGroup);
gridsGroup.add(gridAssetsGroup);

// transparent BG
renderer.setClearColor(0x000000, 0);
scene.background = null;

// --- build your grids/axes into `gridsGroup` and `axesGroup` exactly like before ------------------
(function buildGridsAndAxes() {
  const size = GRID_SIZE, divisions = GRID_DIVISIONS;
  const colorMain = GRID_THEMES.dark.main;
  const colorGrid = GRID_THEMES.dark.grid;

  const gridXY = new THREE.GridHelper(size, divisions, colorMain, colorGrid);
  gridXY.rotation.x = -Math.PI/2;
  const gridXZ = new THREE.GridHelper(size, divisions, colorMain, colorGrid);
  gridXZ.rotation.y = -Math.PI/2;
  const gridYZ = new THREE.GridHelper(size, divisions, colorMain, colorGrid);
  gridYZ.rotation.z =  Math.PI/2;

  [gridXY, gridXZ, gridYZ].forEach(g => {
    g.material.opacity = GRID_THEMES.dark.opacity;
    g.material.transparent = true;
    g.material.depthWrite = false;
    g.material.depthTest = false;
    g.renderOrder = 2;
    gridsGroup.add(g);
    grids.push(g);
  });

  const makeGlassMaterial = (theme = 'dark') => {
    const cfg = GLASS_THEMES[theme] ?? GLASS_THEMES.dark;
    return new THREE.MeshPhysicalMaterial({
      color: cfg.color,
      transparent: true,
      opacity: cfg.opacity,
      transmission: cfg.transmission,
      roughness: cfg.roughness,
      metalness: 0,
      ior: 1.3,
      thickness: 1.2,
      clearcoat: cfg.clearcoat,
      clearcoatRoughness: cfg.clearcoatRoughness,
      side: THREE.DoubleSide,
      depthWrite: false
    });
  };

  const planeGeo = new THREE.PlaneGeometry(size, size);
  const glassXY = new THREE.Mesh(planeGeo, makeGlassMaterial('dark'));
  glassXY.rotation.x = -Math.PI / 2;
  const glassXZ = new THREE.Mesh(planeGeo, makeGlassMaterial('dark'));
  glassXZ.rotation.y = -Math.PI / 2;
  const glassYZ = new THREE.Mesh(planeGeo, makeGlassMaterial('dark'));
  glassYZ.rotation.z = Math.PI / 2;

  [glassXY, glassXZ, glassYZ].forEach((p) => {
    p.renderOrder = 1;
    gridsGroup.add(p);
    glassPanels.push(p);
  });

  const axisLength = 100, radius = 0.5, radialSegs = 8;
  const cyl = new THREE.CylinderGeometry(radius, radius, axisLength, radialSegs);
  const x = new THREE.Mesh(cyl, new THREE.MeshBasicMaterial({ color: 0xff0000 }));
  x.rotation.z = -Math.PI/2; x.position.x = axisLength/2;
  const y = new THREE.Mesh(cyl.clone(), new THREE.MeshBasicMaterial({ color: 0x00ff00 }));
  y.position.y = axisLength/2;
  const z = new THREE.Mesh(cyl.clone(), new THREE.MeshBasicMaterial({ color: 0x0000ff }));
  z.rotation.x =  Math.PI/2; z.position.z = axisLength/2;
  axesGroup.add(x, y, z);
  axes.push(x, y, z);
})();

initBeam();

function disposeBeam() {
  if (!beamState.group) return;
  gridAssetsGroup.remove(beamState.group);
  beamState.group.traverse((obj) => {
    if (obj.geometry) obj.geometry.dispose();
    if (obj.material) {
      if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
      else obj.material.dispose();
    }
  });
  beamState.group = null;
  beamState.points = [];
  beamState.glowGeometry = null;
  beamState.baseMaterial = null;
  beamState.glowMaterial = null;
  beamState.headMaterial = null;
  beamState.head = null;
}

function buildBeamPath() {
  const range = GRID_DIVISIONS / 2;
  const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  let x = randInt(-range, range);
  let z = randInt(-range, range);
  let axis = Math.random() < 0.5 ? 'x' : 'z';
  let dir = Math.random() < 0.5 ? -1 : 1;

  const points = [new THREE.Vector3(x * GRID_STEP, BEAM_CONFIG.yOffset, z * GRID_STEP)];

  while (points.length < BEAM_CONFIG.points) {
    const segmentLen = randInt(BEAM_CONFIG.segmentMin, BEAM_CONFIG.segmentMax);
    for (let i = 0; i < segmentLen && points.length < BEAM_CONFIG.points; i++) {
      if (axis === 'x') {
        if ((x >= range && dir > 0) || (x <= -range && dir < 0)) dir *= -1;
        x += dir;
      } else {
        if ((z >= range && dir > 0) || (z <= -range && dir < 0)) dir *= -1;
        z += dir;
      }
      points.push(new THREE.Vector3(x * GRID_STEP, BEAM_CONFIG.yOffset, z * GRID_STEP));
    }
    if (Math.random() < 0.7) axis = axis === 'x' ? 'z' : 'x';
    if (Math.random() < 0.35) dir *= -1;
  }

  return points;
}

function initBeam() {
  disposeBeam();
  const points = buildBeamPath();
  if (!points.length) return;

  const baseGeometry = new THREE.BufferGeometry().setFromPoints(points);
  const glowPoints = points.concat(points.slice(1));
  const glowGeometry = new THREE.BufferGeometry().setFromPoints(glowPoints);
  glowGeometry.setDrawRange(0, Math.min(BEAM_CONFIG.glowSegment, points.length));

  const theme = BEAM_THEMES.dark;
  const baseMaterial = new THREE.LineBasicMaterial({
    color: theme.base,
    transparent: true,
    opacity: theme.baseOpacity,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    depthTest: false
  });
  const glowMaterial = new THREE.LineBasicMaterial({
    color: theme.glow,
    transparent: true,
    opacity: theme.glowOpacity,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    depthTest: false
  });

  const baseLine = new THREE.Line(baseGeometry, baseMaterial);
  const glowLine = new THREE.Line(glowGeometry, glowMaterial);
  baseLine.renderOrder = 3;
  glowLine.renderOrder = 4;
  baseLine.frustumCulled = false;
  glowLine.frustumCulled = false;

  const headGeometry = new THREE.SphereGeometry(GRID_STEP * 0.2, 16, 16);
  const headMaterial = new THREE.MeshBasicMaterial({
    color: theme.glow,
    transparent: true,
    opacity: theme.headOpacity,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    depthTest: false
  });
  const head = new THREE.Mesh(headGeometry, headMaterial);
  head.renderOrder = 5;
  head.frustumCulled = false;
  head.position.copy(points[0]);

  const group = new THREE.Group();
  group.add(baseLine, glowLine, head);
  gridAssetsGroup.add(group);

  beamState.group = group;
  beamState.points = points;
  beamState.glowGeometry = glowGeometry;
  beamState.baseMaterial = baseMaterial;
  beamState.glowMaterial = glowMaterial;
  beamState.headMaterial = headMaterial;
  beamState.head = head;
  beamState.fade = beamState.fade ?? 1;

  applyBeamTheme(activeGridTheme);
  syncBeamOpacity();
}

function updateBeam(timeMs = 0) {
  if (!beamState.enabled || !beamState.points.length || !beamState.glowGeometry) return;

  const total = beamState.points.length;
  const t = timeMs * 0.001;
  const progress = (t * BEAM_CONFIG.speed) % total;
  const idx = Math.floor(progress);
  const frac = progress - idx;

  beamState.glowGeometry.setDrawRange(
    idx,
    Math.min(BEAM_CONFIG.glowSegment, total)
  );

  const p0 = beamState.points[idx];
  const p1 = beamState.points[(idx + 1) % total];
  if (beamState.head) {
    beamState.head.position.lerpVectors(p0, p1, frac);
  }
}

function applyBeamTheme(theme = 'dark') {
  const cfg = BEAM_THEMES[theme] ?? BEAM_THEMES.dark;
  beamState.baseOpacity = cfg.baseOpacity;
  beamState.glowOpacity = cfg.glowOpacity;
  beamState.headOpacity = cfg.headOpacity;

  if (beamState.baseMaterial) {
    beamState.baseMaterial.color.set(cfg.base);
    beamState.baseMaterial.needsUpdate = true;
  }
  if (beamState.glowMaterial) {
    beamState.glowMaterial.color.set(cfg.glow);
    beamState.glowMaterial.needsUpdate = true;
  }
  if (beamState.headMaterial) {
    beamState.headMaterial.color.set(cfg.glow);
    beamState.headMaterial.needsUpdate = true;
  }
  syncBeamOpacity();
}

function getBeamOpacityScale() {
  return (beamState.enabled ? beamState.fade : 0);
}

function syncBeamOpacity() {
  const scale = getBeamOpacityScale();
  if (beamState.baseMaterial) beamState.baseMaterial.opacity = beamState.baseOpacity * scale;
  if (beamState.glowMaterial) beamState.glowMaterial.opacity = beamState.glowOpacity * scale;
  if (beamState.headMaterial) beamState.headMaterial.opacity = beamState.headOpacity * scale;
  if (beamState.group) beamState.group.visible = scale > 0;
}

function applyGridTheme(theme = 'dark') {
  activeGridTheme = theme === 'light' ? 'light' : 'dark';
  const cfg = GRID_THEMES[theme] ?? GRID_THEMES.dark;
  grids.forEach((g) => {
    if (typeof g.setColors === 'function') {
      g.setColors(cfg.main, cfg.grid);
    }
    const mats = Array.isArray(g.material) ? g.material : [g.material];
    mats.forEach((mat) => {
      if (!mat) return;
      mat.opacity = cfg.opacity;
      mat.transparent = true;
      mat.depthWrite = false;
      mat.depthTest = false;
      if (mat.color) {
        mat.color.set(cfg.grid);
      }
      mat.needsUpdate = true;
    });
  });

  const glassCfg = GLASS_THEMES[theme] ?? GLASS_THEMES.dark;
  glassPanels.forEach((panel) => {
    const mat = panel.material;
    if (!mat) return;
    mat.color?.set(glassCfg.color);
    mat.opacity = glassCfg.opacity;
    mat.transmission = glassCfg.transmission;
    mat.roughness = glassCfg.roughness;
    mat.clearcoat = glassCfg.clearcoat;
    mat.clearcoatRoughness = glassCfg.clearcoatRoughness;
    mat.needsUpdate = true;
  });

  applyBeamTheme(theme);
}

// lights
scene.add(new THREE.AmbientLight(0x888888));
const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
dirLight.position.set(50, 100, 50);
scene.add(dirLight);

// ---- state we can steer from presets ---------------------------------------
const v3 = (x=0,y=0,z=0)=>new THREE.Vector3(x,y,z);

let desiredCam     = v3(200,100,100);
let desiredTarget  = v3(0,0,0);
let currentTarget  = v3(0,0,0);

let desiredWorldPos   = v3(0,0,0);
let desiredWorldYaw   = 0;         // radians
let desiredWorldPitch = 0;         // radians
let desiredWorldRoll  = 0;         // radians
let desiredStageScale = 1;

let spinEnabled = true;
let spinSpeed   = 0.001;

const clock = new THREE.Clock();

// mount & start
export function mount(containerEl) {
  renderer.setPixelRatio(window.devicePixelRatio || 1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  containerEl.appendChild(renderer.domElement);

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  camera.position.copy(desiredCam);
  currentTarget.copy(desiredTarget);
  camera.lookAt(currentTarget);

  window.addEventListener('resize', onResize);
}
export function start() { requestAnimationFrame(animate); }

function animate(t) {
  requestAnimationFrame(animate);

  // smooth camera position & target
  camera.position.lerp(desiredCam, 0.05);
  currentTarget.lerp(desiredTarget, 0.08);
  camera.lookAt(currentTarget);

  // world placement (no-spin transforms live on `world`; spin lives on `spinGroup`)
  world.position.lerp(desiredWorldPos, 0.06);
  // yaw lerp
  world.rotation.y += (desiredWorldYaw - world.rotation.y) * 0.06;
  // pitch lerp
  world.rotation.x += (desiredWorldPitch - world.rotation.x) * 0.06;
  // roll lerp
  world.rotation.z += (desiredWorldRoll - world.rotation.z) * 0.06;
  // stage scale lerp (scales grids + assets + models together)
  const cs = stageGroup.scale.x;
  const ns = cs + (desiredStageScale - cs) * 0.06;
  stageGroup.scale.setScalar(ns);

  // optional spin
  if (spinEnabled) {
    spinGroup.rotation.y += spinSpeed;
    gridsGroup.rotation.y += spinSpeed;
    axesGroup.rotation.y += spinSpeed;
  }

  const delta = clock.getDelta();
  mixers.forEach(mixer => mixer.update(delta));

  updateBeam(t);

  renderer.render(scene, camera);
}

function onResize() {
  renderer.setPixelRatio(window.devicePixelRatio || 1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

// ---- public setters you’ll call from your presets ---------------------------
export function setDesiredCamera(pos) {
  if (Array.isArray(pos)) desiredCam.set(pos[0], pos[1], pos[2]);
  else desiredCam.copy(pos);
}
export function setCameraTarget(target=[0,0,0]) {
  if (Array.isArray(target)) desiredTarget.set(target[0], target[1], target[2]);
  else desiredTarget.copy(target);
}
export function setWorldTransform({ pos=[0,0,0], yaw=0, pitch=0, roll=0, scale=1 } = {}) {
  desiredWorldPos.set(pos[0], pos[1], pos[2]);
  desiredWorldYaw = yaw;
  desiredWorldPitch = pitch;
  desiredWorldRoll = roll;
  desiredStageScale = scale;
}

export function setStageScale(scale = 1) {
  desiredStageScale = scale;
}
export function setWorldSpin(enabled, speed=spinSpeed) {
  spinEnabled = !!enabled;
  spinSpeed = speed;
}

// backwards-compat alias if you already use setWorldRotation()
export const setWorldRotation = setWorldSpin;

export function registerMixer(mixer) {
  mixers.push(mixer);
}

// helpers to add/remove content groups
export function addToWorld(obj){ world.add(obj); }
export function addToModels(obj){
  console.log("[threeScene] addToModels called with:", obj);
  modelsGroup.add(obj);
  console.log("[threeScene] modelsGroup now has children:", modelsGroup.children);
}
export function clearModels(){
  while(modelsGroup.children.length){
    const obj = modelsGroup.children.pop();
    removeAndDispose(obj);
  }
}
export function removeAndDispose(obj){
  if(!obj) return;
  if (world.children.includes(obj)) world.remove(obj);
  if (modelsGroup.children.includes(obj)) modelsGroup.remove(obj);
  // do not remove from helpersGroup or dispose helpers accidentally
  obj.traverse(o=>{
    if(o.geometry) o.geometry.dispose();
    if(o.material){
      if(Array.isArray(o.material)) o.material.forEach(m=>m.dispose());
      else o.material.dispose();
    }
    if(o.texture?.dispose) o.texture.dispose();
  });
}

// Smoothly fade axes opacity in/out over a shared duration
export function animateHelpersOpacity(show, duration = FADE_DURATION) {
  // Use same interpolation/timing/visibility logic as grids for consistency
  const startOpacities = axes.map(a => a.material.opacity);
  const endOpacity = show ? 1 : 0;
  const startTime = performance.now();
  axes.forEach(a => {
    a.material.transparent = true;
    a.material.depthWrite = false;
  });
  // Ensure axes are visible if fading in
  if (show) {
    axes.forEach(a => a.visible = true);
  }
  function animate() {
    const now = performance.now();
    const t = Math.min((now - startTime) / duration, 1);
    for (let i = 0; i < axes.length; i++) {
      axes[i].material.opacity = startOpacities[i] + (endOpacity - startOpacities[i]) * t;
    }
    if (t < 1) {
      requestAnimationFrame(animate);
    } else {
      for (let i = 0; i < axes.length; i++) {
        axes[i].material.opacity = endOpacity;
        axes[i].visible = show || endOpacity > 0;
      }
    }
  }
  animate();
}


export function animateGridsOpacity(show) {
  const duration = FADE_DURATION;
  const startOpacities = grids.map(g => g.material.opacity);
  const themeCfg = GRID_THEMES[activeGridTheme] ?? GRID_THEMES.dark;
  const endOpacity = show ? themeCfg.opacity : 0;
  const startTime = performance.now();
  const beamFadeStart = beamState.fade ?? 1;
  const beamFadeEnd = show ? 1 : 0;
  grids.forEach(g => {
    g.material.transparent = true;
    g.material.depthWrite = false;
  });
  function animate() {
    const now = performance.now();
    const t = Math.min((now - startTime) / duration, 1);
    for (let i = 0; i < grids.length; i++) {
      grids[i].material.opacity = startOpacities[i] + (endOpacity - startOpacities[i]) * t;
    }
    const beamFade = beamFadeStart + (beamFadeEnd - beamFadeStart) * t;
    beamState.fade = beamFade;
    syncBeamOpacity();
    if (t < 1) {
      requestAnimationFrame(animate);
    } else {
      for (let i = 0; i < grids.length; i++) {
        grids[i].material.opacity = endOpacity;
        grids[i].visible = show || endOpacity > 0;
      }
    }
  }
  // Ensure grids are visible if fading in
  if (show) {
    grids.forEach(g => g.visible = true);
  }
  animate();
}

// Theme-aware grid colors
export function setGridTheme(theme = 'dark') {
  applyGridTheme(theme);
}

export function setBeamEnabled(enabled = true) {
  beamState.enabled = !!enabled;
  syncBeamOpacity();
}

export function applyBeamPreset(preset = {}) {
  if (!preset || typeof preset !== 'object') return;

  let rebuild = false;

  const toInt = (value) => (Number.isFinite(value) ? Math.round(value) : null);

  const nextPoints = toInt(preset.points);
  if (nextPoints != null && nextPoints >= 2 && nextPoints !== BEAM_CONFIG.points) {
    BEAM_CONFIG.points = nextPoints;
    rebuild = true;
  }

  const nextSegMin = toInt(preset.segmentMin);
  const nextSegMax = toInt(preset.segmentMax);
  if (nextSegMin != null || nextSegMax != null) {
    const min = Math.max(1, nextSegMin ?? BEAM_CONFIG.segmentMin);
    const max = Math.max(1, nextSegMax ?? BEAM_CONFIG.segmentMax);
    const safeMin = Math.min(min, max);
    const safeMax = Math.max(min, max);
    if (safeMin !== BEAM_CONFIG.segmentMin || safeMax !== BEAM_CONFIG.segmentMax) {
      BEAM_CONFIG.segmentMin = safeMin;
      BEAM_CONFIG.segmentMax = safeMax;
      rebuild = true;
    }
  }

  const nextYOffset = Number.isFinite(preset.yOffset) ? preset.yOffset : null;
  if (nextYOffset != null && nextYOffset !== BEAM_CONFIG.yOffset) {
    BEAM_CONFIG.yOffset = nextYOffset;
    rebuild = true;
  }

  const nextSpeed = Number.isFinite(preset.speed) ? preset.speed : null;
  if (nextSpeed != null) {
    BEAM_CONFIG.speed = Math.max(0.1, nextSpeed);
  }

  const nextGlow = toInt(preset.glowSegment);
  if (nextGlow != null) {
    BEAM_CONFIG.glowSegment = Math.max(2, nextGlow);
  }

  if (preset.regenerate === true) {
    rebuild = true;
  }

  if (typeof preset.enabled === 'boolean') {
    beamState.enabled = preset.enabled;
  }

  if (BEAM_CONFIG.glowSegment > BEAM_CONFIG.points) {
    BEAM_CONFIG.glowSegment = BEAM_CONFIG.points;
  }

  if (rebuild) {
    initBeam();
    return;
  }

  applyBeamTheme(activeGridTheme);
  syncBeamOpacity();
}
