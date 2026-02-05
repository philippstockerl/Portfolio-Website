import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.module.js';

const SIDE_MAP = {
  front: THREE.FrontSide,
  back: THREE.BackSide,
  double: THREE.DoubleSide
};

function resolveSide(side) {
  return SIDE_MAP[side] ?? THREE.FrontSide;
}

function isGifSource(src) {
  if (!src || typeof src !== 'string') return false;
  return src.toLowerCase().includes('.gif');
}

export async function load({
  src,
  size = [120, 68],
  pos = [0, 0, 0.1],
  rot = [-Math.PI / 2, 0, 0],
  side = 'front',
  opacity = 1,
  renderOrder = 2,
  depthTest = true,
  frustumCulled = true,
  animate = undefined
} = {}) {
  if (!src) throw new Error('loaderImagePlane: "src" is required');

  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.decoding = 'async';
  img.loading = 'eager';
  img.src = src;
  img.style.display = 'none';
  img.setAttribute('aria-hidden', 'true');
  document.body.appendChild(img);

  const tex = new THREE.Texture(img);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.generateMipmaps = false;

  const shouldAnimate = animate ?? isGifSource(src);
  let rafId = null;

  const startTicker = () => {
    if (!shouldAnimate) return;
    const tick = () => {
      tex.needsUpdate = true;
      rafId = requestAnimationFrame(tick);
    };
    tick();
  };

  img.onload = () => {
    tex.needsUpdate = true;
    startTicker();
  };
  img.onerror = () => {
    console.warn('[loaderImagePlane] image error', src);
  };

  if (img.complete) {
    tex.needsUpdate = true;
    startTicker();
  }

  const geo = new THREE.PlaneGeometry(size[0], size[1]);
  const mat = new THREE.MeshBasicMaterial({
    map: tex,
    transparent: true,
    opacity,
    side: resolveSide(side),
    depthWrite: false,
    depthTest
  });

  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(pos[0], pos[1], pos[2]);
  mesh.rotation.set(rot[0], rot[1], rot[2]);
  mesh.renderOrder = renderOrder;
  mesh.frustumCulled = frustumCulled;

  mesh.__cleanup = () => {
    if (rafId) cancelAnimationFrame(rafId);
    try { img.remove(); } catch {}
  };

  return mesh;
}
