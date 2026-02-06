// events.js
// Handles global DOM events and delegates to modelManager

import { applyPreset } from './cameraController.js';
import { handleTagClick } from './modelManager.js';
import { projects as projectsData } from '../projectsSection/projectsData.js';
import { getActiveSectionId, lockActiveSection } from './scrollManager.js';
import { sectionPresets } from './cameraPresets.js';

// ---------- anchor smoothing ----------
export function setupAnchorSmoothing(prefersReduced) {
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;

    const id = a.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (!target) return;

    e.preventDefault();
    if (!prefersReduced) {
      lockActiveSection(id, 1400);
    }
    target.scrollIntoView({
      behavior: prefersReduced ? 'auto' : 'smooth',
      block: 'start'
    });

    const presetIdx = sectionPresets[id];
    if (presetIdx !== undefined) {
      applyPreset(presetIdx, prefersReduced);
    }
  });
}

// ---------- reduced motion ----------
export function setupReducedMotion(mediaReduced) {
  mediaReduced?.addEventListener?.('change', (ev) => {
    const prefersReduced = !!ev.matches;
    applyPreset(0, prefersReduced); // reapply current preset
  });
}

// ---------- tab visibility ----------
export function setupVisibilityChange(prefersReduced, getLastPresetIndex, getPresets, setWorldSpin) {
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      setWorldSpin(false);
    } else {
      const presets = typeof getPresets === 'function' ? getPresets() : getPresets;
      const p = presets[getLastPresetIndex()] ?? presets[0];
      setWorldSpin(!prefersReduced && !!p.rotate, 0.001);
    }
  });
}

// ---------- tag click events ----------
export function setupTagEvents() {
  document.addEventListener('click', async (e) => {
    const tag = e.target.closest('.tag[data-type][data-src]');
    if (!tag) return;

    const activeSectionId = getActiveSectionId();
    await handleTagClick(tag, projectsData, activeSectionId);
  });
}

// ---------- project preset buttons ----------
export function setupProjectPresetButtons(prefersReduced = false) {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.project-preset-btn[data-preset]');
    if (!btn) return;

    const presetIndex = Number(btn.dataset.preset);
    if (!Number.isFinite(presetIndex)) return;

    applyPreset(presetIndex, prefersReduced);
  });
}
