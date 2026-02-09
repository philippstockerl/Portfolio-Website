// beamPresets.js
// Helper to define beam configs inside assetPresets.

export function beamPreset(options = {}) {
  return { type: 'beam', ...options };
}
