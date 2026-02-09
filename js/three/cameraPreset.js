// cameraPreset.js
// Helper to define camera overrides inside assetPresets.

export function cameraPreset(options = {}) {
  return { type: 'camera', ...options };
}
