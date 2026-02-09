// assetManager.js
// Loads and fades assets per camera preset based on assetPresets.

import { fadeObject } from './fadeController.js';
import { gridAssetsGroup, removeAndDispose, applyBeamPreset } from './threeScene.js';
import { assetPresetsDark, assetPresetsLight } from './assetPresets.js';

const activeAssets = new Map(); // id -> { obj, def, timers }
let activePresetIndex = null;
let loadToken = 0;
let activeTheme = 'dark';

function getPresetsForTheme(theme) {
  return theme === 'light' ? assetPresetsLight : assetPresetsDark;
}

export function setAssetTheme(theme) {
  const nextTheme = theme === 'light' ? 'light' : 'dark';
  if (nextTheme === activeTheme) return;
  activeTheme = nextTheme;
  if (activePresetIndex != null) {
    applyAssetPreset(activePresetIndex, { force: true });
  }
}

export function getAssetTheme() {
  return activeTheme;
}

function getResponsiveKey(width = window.innerWidth) {
  if (width < 768) return 'mobile';
  if (width < 1440) return 'laptop';
  if (width <= 1980) return 'desktop';
  return 'ultrawide';
}

function stripCameraMeta(def = {}) {
  const { type, responsive, reset, ...rest } = def;
  return rest;
}

function mergeCameraDefs(base, override) {
  if (!override) return base;
  return {
    ...base,
    ...override,
    world: {
      ...base?.world,
      ...override?.world
    }
  };
}

export function getCameraPresetForIndex(presetIndex, width = window.innerWidth) {
  if (presetIndex == null) return null;
  const presets = getPresetsForTheme(activeTheme);
  const defs = presets[presetIndex] ?? [];
  const cameraDefs = defs.filter((def) => def?.type === 'camera');
  if (!cameraDefs.length) return null;
  const def = cameraDefs[cameraDefs.length - 1];
  if (!def || def.reset) return null;

  const base = stripCameraMeta(def);
  const responsive = def.responsive && typeof def.responsive === 'object'
    ? def.responsive
    : null;
  if (!responsive) return base;

  const key = getResponsiveKey(width);
  const variant = responsive[key];
  if (variant?.reset) return null;

  return mergeCameraDefs(base, variant);
}

function normalizeScale(scale) {
  if (!scale) return null;
  if (Array.isArray(scale)) return scale;
  return [scale, scale, scale];
}

function applyTransform(obj, def = {}) {
  if (def.pos) obj.position.set(def.pos[0], def.pos[1], def.pos[2]);
  if (def.rot) obj.rotation.set(def.rot[0], def.rot[1], def.rot[2]);
  const s = normalizeScale(def.scale);
  if (s) obj.scale.set(s[0], s[1], s[2]);
}

function applyMetadata(obj, def = {}) {
  const href = def.href ?? null;
  const label = def.label ?? def.title ?? def.id ?? '';
  const cta = def.cta ?? 'Open ↗';

  obj.userData = obj.userData || {};
  obj.userData.href = href;
  obj.userData.label = label;
  obj.userData.cta = cta;
  obj.userData.id = def.id ?? obj.userData.id;

  obj.traverse((child) => {
    child.userData = child.userData || {};
    child.userData.href = href;
    child.userData.label = label;
    child.userData.cta = cta;
    child.userData.id = def.id ?? child.userData.id;
  });
}

async function buildAsset(def) {
  if (def.type === 'video') {
    const mod = await import('../loaders/loaderVideoPlane.js');
    return mod.load(def);
  }
  if (def.type === 'image') {
    const mod = await import('../loaders/loaderImagePlane.js');
    return mod.load(def);
  }
  if (def.type === 'sprite') {
    const mod = await import('../loaders/loaderSpritePlane.js');
    return mod.load(def);
  }
  console.warn('[assetManager] Unknown asset type:', def.type);
  return null;
}

function detachAndDispose(entry) {
  const obj = entry?.obj;
  if (!obj) return;
  if (entry?.timers) {
    if (entry.timers.in) clearTimeout(entry.timers.in);
    if (entry.timers.out) clearTimeout(entry.timers.out);
  }
  try { obj.__cleanup?.(); } catch {}
  if (obj.parent === gridAssetsGroup) gridAssetsGroup.remove(obj);
  removeAndDispose(obj);
}

function setObjectOpacity(obj, value) {
  if (!obj) return;
  obj.traverse((child) => {
    const material = child.material;
    if (!material) return;
    const applyMat = (mat) => {
      if (mat && 'opacity' in mat) {
        mat.transparent = true;
        mat.depthWrite = false;
        mat.opacity = value;
      }
    };
    if (Array.isArray(material)) {
      material.forEach(applyMat);
    } else {
      applyMat(material);
    }
  });
}

export async function applyAssetPreset(presetIndex, opts = {}) {
  const { force = false } = opts;
  if (presetIndex == null) return;
  if (!force && presetIndex === activePresetIndex) return;

  const myToken = ++loadToken;
  activePresetIndex = presetIndex;

  const presets = getPresetsForTheme(activeTheme);
  const nextDefs = presets[presetIndex] ?? [];
  const beamDefs = nextDefs.filter((def) => def?.type === 'beam');
  if (beamDefs.length) {
    applyBeamPreset(beamDefs[beamDefs.length - 1]);
  }
  const assetDefs = nextDefs.filter(
    (def) => def?.type !== 'beam' && def?.type !== 'camera'
  );
  const nextIds = new Set(assetDefs.map(def => def.id));

  if (force) {
    for (const [id, entry] of activeAssets) {
      detachAndDispose(entry);
      activeAssets.delete(id);
    }
  }

  // Fade out assets not in the next preset
  if (!force) {
    for (const [id, entry] of activeAssets) {
      if (!nextIds.has(id)) {
        const fadeOut = entry.def?.fadeOut ?? 600;
        const delayOut = entry.def?.delayOut ?? 0;
        entry.outToken = (entry.outToken || 0) + 1;
        const outToken = entry.outToken;
        entry.pendingOut = true;
        if (entry.timers?.out) clearTimeout(entry.timers.out);
        const doFade = () => {
          if (entry.outToken !== outToken) return;
          fadeObject(entry.obj, 0, fadeOut, () => {
            if (entry.outToken !== outToken) return;
            detachAndDispose(entry);
            activeAssets.delete(id);
          });
        };
        if (delayOut > 0) {
          entry.timers = entry.timers || {};
          entry.timers.out = setTimeout(doFade, delayOut);
        } else {
          doFade();
        }
      }
    }
  }

  // Load / update assets in the next preset
  for (const def of assetDefs) {
    if (!def?.id) continue;

    const existing = activeAssets.get(def.id);
    if (existing) {
      const typeChanged = existing.def?.type !== def.type;
      const srcChanged = existing.def?.src !== def.src;
      if (typeChanged || srcChanged) {
        detachAndDispose(existing);
        activeAssets.delete(def.id);
      } else {
        existing.def = def;
        applyTransform(existing.obj, def);
        applyMetadata(existing.obj, def);
        if (existing.timers?.out) {
          clearTimeout(existing.timers.out);
          existing.timers.out = null;
        }
        if (existing.pendingOut) {
          existing.pendingOut = false;
          existing.outToken = (existing.outToken || 0) + 1;
          const restoreFade = def.fadeIn ?? 300;
          fadeObject(existing.obj, 1, restoreFade);
        }
        continue;
      }
    }

    const obj = await buildAsset(def);
    if (myToken !== loadToken) {
      if (obj) {
        detachAndDispose({ obj });
      }
      return;
    }
    if (!obj) continue;

    applyTransform(obj, def);
    applyMetadata(obj, def);
    gridAssetsGroup.add(obj);
    const entry = { obj, def, timers: {} };
    activeAssets.set(def.id, entry);

    setObjectOpacity(obj, 0);
    const fadeIn = def.fadeIn ?? 800;
    const delayIn = def.delayIn ?? 0;
    if (delayIn > 0) {
      entry.timers.in = setTimeout(() => fadeObject(obj, 1, fadeIn), delayIn);
    } else {
      fadeObject(obj, 1, fadeIn);
    }
  }
}
