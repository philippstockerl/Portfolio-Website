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

function clamp01(value) {
  return Math.min(1, Math.max(0, value));
}

function normalizeReveal(reveal) {
  if (!reveal) return null;
  if (reveal === true) return {};
  if (typeof reveal === 'number') return { duration: reveal };
  if (typeof reveal === 'object') return reveal;
  return null;
}

function getRevealAxisExpr(direction) {
  switch (direction) {
    case 'x-':
      return '1.0 - vUv.x';
    case 'y+':
      return 'vUv.y';
    case 'y-':
      return '1.0 - vUv.y';
    case 'x+':
    default:
      return 'vUv.x';
  }
}

function applyRevealWipe(material, direction = 'x+') {
  material.defines = material.defines || {};
  material.defines.USE_UV = '';
  const axisExpr = getRevealAxisExpr(direction);
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uReveal = { value: 0 };
    material.userData.revealUniform = shader.uniforms.uReveal;
    shader.fragmentShader = shader.fragmentShader.replace(
      'void main() {',
      'uniform float uReveal;\nvoid main() {'
    );
    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <clipping_planes_fragment>',
      `#include <clipping_planes_fragment>\n  #ifdef USE_UV\n  float revealAxis = ${axisExpr};\n  if (revealAxis > uReveal) discard;\n  #endif`
    );
  };
  material.customProgramCacheKey = () => `reveal-wipe-${direction}`;
  material.needsUpdate = true;
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
  animate = undefined,
  reveal = null
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
  mat.userData = mat.userData || {};

  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(pos[0], pos[1], pos[2]);
  mesh.rotation.set(rot[0], rot[1], rot[2]);
  mesh.renderOrder = renderOrder;
  mesh.frustumCulled = frustumCulled;

  const revealCfg = normalizeReveal(reveal);
  let revealRafId = null;
  if (revealCfg) {
    const mode = revealCfg.mode ?? 'wipe';
    if (mode !== 'wipe') {
      console.warn('[loaderImagePlane] Unsupported reveal mode:', mode);
    } else {
      const direction = revealCfg.direction ?? 'x+';
      const duration = Math.max(0, revealCfg.duration ?? 800);
      const delay = Math.max(0, revealCfg.delay ?? 0);
      const start = clamp01(revealCfg.start ?? 0);
      const end = clamp01(revealCfg.end ?? 1);

      applyRevealWipe(mat, direction);
      mat.userData.revealValue = start;
      mesh.onBeforeRender = () => {
        const uniform = mat.userData.revealUniform;
        if (uniform) uniform.value = mat.userData.revealValue ?? 0;
      };

      const startAt = performance.now() + delay;
      const tick = (now) => {
        if (now < startAt) {
          revealRafId = requestAnimationFrame(tick);
          return;
        }
        const t = duration > 0 ? Math.min((now - startAt) / duration, 1) : 1;
        mat.userData.revealValue = start + (end - start) * t;
        if (t < 1) {
          revealRafId = requestAnimationFrame(tick);
        } else {
          revealRafId = null;
        }
      };
      revealRafId = requestAnimationFrame(tick);
    }
  }

  mesh.__cleanup = () => {
    if (rafId) cancelAnimationFrame(rafId);
    if (revealRafId) cancelAnimationFrame(revealRafId);
    try { img.remove(); } catch {}
  };

  return mesh;
}
