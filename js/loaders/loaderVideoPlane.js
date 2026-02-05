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
  srcMp4,
  size = [120, 68],
  pos = [0, 0, 0.1],
  rot = [-Math.PI / 2, 0, 0],
  side = 'front',
  loop = false,
  opacity = 1,
  renderOrder = 2,
  depthTest = true,
  frustumCulled = true
} = {}) {
  if (!src) throw new Error('loaderVideoPlane: "src" is required');

  const video = document.createElement('video');
  const isIOSDevice = (() => {
    const ua = navigator.userAgent || '';
    const iOSUA = /iPad|iPhone|iPod/.test(ua);
    const iPadOS = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
    return iOSUA || iPadOS;
  })();
  const sources = [];
  if (isIOSDevice && srcMp4) {
    sources.push(srcMp4);
    sources.push(src);
  } else {
    sources.push(src);
    if (srcMp4) sources.push(srcMp4);
  }
  let sourceIndex = 0;

  video.crossOrigin = 'anonymous';
  video.src = sources[sourceIndex];
  video.loop = !!loop;
  video.muted = true;
  video.autoplay = true;
  video.playsInline = true;
  video.preload = 'auto';
  video.setAttribute('muted', '');
  video.setAttribute('autoplay', '');
  video.setAttribute('playsinline', '');
  video.style.display = 'none';
  document.body.appendChild(video);
  const tryFallback = () => {
    if (sourceIndex + 1 >= sources.length) return;
    sourceIndex += 1;
    video.src = sources[sourceIndex];
    try { video.load(); } catch {}
    tryPlay();
  };
  video.addEventListener('error', () => {
    console.warn('[loaderVideoPlane] video error', video.currentSrc || video.src, video.error);
    tryFallback();
  });
  video.addEventListener('stalled', tryFallback, { once: true });
  video.addEventListener('abort', tryFallback, { once: true });

  const tryPlay = () => video.play().catch(() => {});
  tryPlay();

  const resume = () => {
    tryPlay();
    window.removeEventListener('pointerdown', resume);
    window.removeEventListener('touchstart', resume);
  };
  window.addEventListener('pointerdown', resume, { once: true });
  window.addEventListener('touchstart', resume, { once: true });

  const onVisible = () => {
    if (!document.hidden) tryPlay();
  };
  document.addEventListener('visibilitychange', onVisible);

  video.addEventListener('loadedmetadata', () => {
    if (video.currentTime === 0) {
      try { video.currentTime = 0.001; } catch {}
    }
  });
  const fallbackTimer = setTimeout(() => {
    if (video.readyState < 2) tryFallback();
  }, 2000);
  const clearFallbackTimer = () => clearTimeout(fallbackTimer);
  video.addEventListener('loadeddata', () => {
    clearFallbackTimer();
    tryPlay();
  }, { once: true });
  video.addEventListener('canplay', clearFallbackTimer, { once: true });

  const tex = new THREE.VideoTexture(video);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.generateMipmaps = false;

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
    try { video.pause(); } catch {}
    try { video.removeAttribute('src'); } catch {}
    try { video.load(); } catch {}
    try { document.removeEventListener('visibilitychange', onVisible); } catch {}
    try { video.remove(); } catch {}
  };

  return mesh;
}
