import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.module.js';

const SIDE_MAP = {
  front: THREE.FrontSide,
  back: THREE.BackSide,
  double: THREE.DoubleSide
};

const VIDEO_CACHE = new Map();

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

  const cacheKey = `${sources.join('|')}|loop:${!!loop}`;
  let cached = VIDEO_CACHE.get(cacheKey);
  if (!cached) {
    const video = document.createElement('video');
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
    video.setAttribute('webkit-playsinline', '');
    video.style.position = 'absolute';
    video.style.left = '-9999px';
    video.style.width = '1px';
    video.style.height = '1px';
    document.body.appendChild(video);

    const tryPlay = () => video.play().catch(() => {});
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

    cached = { video, tex, refs: 0, onVisible };
    VIDEO_CACHE.set(cacheKey, cached);
  }
  cached.refs += 1;
  const { video, tex, onVisible } = cached;

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
    const entry = VIDEO_CACHE.get(cacheKey);
    if (!entry) return;
    entry.refs -= 1;
    if (entry.refs > 0) return;
    try { entry.video.pause(); } catch {}
    try { entry.video.removeAttribute('src'); } catch {}
    try { entry.video.load(); } catch {}
    try { document.removeEventListener('visibilitychange', entry.onVisible); } catch {}
    try { entry.video.remove(); } catch {}
    try { entry.tex.dispose(); } catch {}
    VIDEO_CACHE.delete(cacheKey);
  };

  return mesh;
}
