// scrollManager.js
// Handles scroll snapping and fallback preset switching

import { initScrollSnap } from '../scroll.js';
import { safeApplyPreset, getLastPresetIndex } from './cameraController.js';
import { cleanupIfNeeded } from './modelManager.js';
import { sectionPresets } from './cameraPresets.js';

let activeSectionId = null;
let manualLockId = null;
let manualLockUntil = 0;

function isManualLocked(nextId) {
  if (!manualLockId) return false;
  if (performance.now() > manualLockUntil) {
    manualLockId = null;
    manualLockUntil = 0;
    return false;
  }
  return nextId !== manualLockId;
}

export function lockActiveSection(id, duration = 1200) {
  if (!id) return;
  manualLockId = id;
  manualLockUntil = performance.now() + Math.max(0, duration);
}

// ---------- main initializer ----------
export function initScrollManager(sections) {
  console.log("Tracking sections:", sections.map(s => s.id));
  const footerEl = document.getElementById('footer');
  const isFooterVisible = () => {
    if (!footerEl) return false;
    const r = footerEl.getBoundingClientRect();
    return r.top < window.innerHeight && r.bottom > 0;
  };

  // Debounced callback
  let __scrollSnapTimeout;
  initScrollSnap({
    sections,
    onSectionChange: (visibleIndex, sectionEl) => {
      clearTimeout(__scrollSnapTimeout);
      __scrollSnapTimeout = setTimeout(() => {
        const id = sectionEl?.id || '';

        if (activeSectionId && activeSectionId !== id) {
          if (activeSectionId === 'projects') {
            cleanupIfNeeded('projects', id);
          } else if (activeSectionId === 'certificates') {
            cleanupIfNeeded('certificates', id);
          }
        }

        if (isManualLocked(id)) return;
        if (manualLockId && id === manualLockId) {
          manualLockId = null;
          manualLockUntil = 0;
        }

        if (isFooterVisible()) return;
        const presetIdx = sectionPresets[id] ?? visibleIndex;

        if (presetIdx !== getLastPresetIndex()) {
          safeApplyPreset(presetIdx);
        }

        activeSectionId = id;
      }, 80);
    },
  });

  // --- scroll fallback safeguard ---
  window.addEventListener('scroll', () => {
    clearTimeout(window.__scrollTimeout);
    window.__scrollTimeout = setTimeout(() => {
      if (isFooterVisible()) return;
      const center = window.innerHeight / 2;
      let bestIdx = 0, bestDist = Infinity;
      sections.forEach((sec, i) => {
        const r = sec.getBoundingClientRect();
        const dist = Math.abs(r.top + r.height/2 - center);
        if (dist < bestDist) { bestDist = dist; bestIdx = i; }
      });
      const id = sections[bestIdx]?.id || '';
      if (isManualLocked(id)) return;
      if (manualLockId && id === manualLockId) {
        manualLockId = null;
        manualLockUntil = 0;
      }
      const presetIdx = sectionPresets[id] ?? bestIdx;

      if (presetIdx !== getLastPresetIndex()) {
        safeApplyPreset(presetIdx);
      }
      activeSectionId = id || null;
    }, 20); // short debounce
  });
}

// ---------- getters ----------
export function getActiveSectionId() {
  return activeSectionId;
}
