import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.module.js';

const SIDE_MAP = {
  front: THREE.FrontSide,
  back: THREE.BackSide,
  double: THREE.DoubleSide
};

function resolveSide(side) {
  return SIDE_MAP[side] ?? THREE.FrontSide;
}

export async function load({
  src,
  cols,
  rows,
  fps = 24,
  frameCount,
  startFrame = 0,
  loop = true,
  animate = true,
  size = [120, 68],
  pos = [0, 0, 0.1],
  rot = [-Math.PI / 2, 0, 0],
  side = 'front',
  opacity = 1,
  renderOrder = 2,
  depthTest = true,
  frustumCulled = true,
  premultiplyAlpha = false,
  filter = 'linear'
} = {}) {
  if (!src) throw new Error('loaderSpritePlane: "src" is required');
  if (!cols || !rows) throw new Error('loaderSpritePlane: "cols" and "rows" are required');

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
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(1 / cols, 1 / rows);
  tex.generateMipmaps = false;
  tex.minFilter = filter === 'nearest' ? THREE.NearestFilter : THREE.LinearFilter;
  tex.magFilter = filter === 'nearest' ? THREE.NearestFilter : THREE.LinearFilter;
  tex.premultiplyAlpha = !!premultiplyAlpha;

  const totalFrames = Math.max(1, frameCount ?? (cols * rows));
  let frame = Math.max(0, Math.min(totalFrames - 1, startFrame));
  let rafId = null;
  let lastTime = 0;

  const setFrame = (idx) => {
    const safe = ((idx % totalFrames) + totalFrames) % totalFrames;
    const x = safe % cols;
    const y = Math.floor(safe / cols);
    tex.offset.set(x / cols, 1 - (y + 1) / rows);
    tex.needsUpdate = true;
  };

  const startTicker = () => {
    if (!animate) {
      setFrame(frame);
      return;
    }
    const step = 1000 / Math.max(1, fps);
    const tick = (t) => {
      if (!lastTime) lastTime = t;
      if (t - lastTime >= step) {
        lastTime = t;
        setFrame(frame);
        frame = loop ? (frame + 1) % totalFrames : Math.min(totalFrames - 1, frame + 1);
        if (!loop && frame === totalFrames - 1) {
          setFrame(frame);
          return;
        }
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
  };

  img.onload = () => {
    tex.needsUpdate = true;
    startTicker();
  };
  img.onerror = () => {
    console.warn('[loaderSpritePlane] image error', src);
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
