// assetOverlay.js
// CSS overlay tooltip for clickable grid assets.

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.module.js';
import { camera, renderer, gridAssetsGroup } from './threeScene.js';

let overlayEl = null;
let titleEl = null;
let linkEl = null;

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2(2, 2); // offscreen by default
let pointerActive = false;
let hovered = null;
let rafId = null;

function createOverlay() {
  if (overlayEl) return;

  overlayEl = document.createElement('div');
  overlayEl.className = 'asset-overlay';
  overlayEl.innerHTML = `
    <div class="asset-overlay__card">
      <div class="asset-overlay__title"></div>
      <a class="asset-overlay__link" href="#" target="_self" rel="noopener">Open ↗</a>
    </div>
  `;
  document.body.appendChild(overlayEl);

  titleEl = overlayEl.querySelector('.asset-overlay__title');
  linkEl = overlayEl.querySelector('.asset-overlay__link');
}

function updatePointerFromEvent(e) {
  const rect = renderer.domElement.getBoundingClientRect();
  const x = e.clientX;
  const y = e.clientY;

  pointerActive = x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
  if (!pointerActive) return;

  pointer.x = ((x - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((y - rect.top) / rect.height) * 2 + 1;
}

function getInteractiveTarget(obj) {
  let current = obj;
  while (current && !current.userData?.href && current.parent) {
    current = current.parent;
  }
  return current?.userData?.href ? current : null;
}

function raycastInteractive() {
  if (!pointerActive) {
    setHovered(null);
    return;
  }

  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObjects(gridAssetsGroup.children, true);

  let hitObj = null;
  for (const hit of hits) {
    const target = getInteractiveTarget(hit.object);
    if (target) {
      hitObj = target;
      break;
    }
  }

  setHovered(hitObj);
}

function setHovered(obj) {
  if (obj === hovered) return;
  hovered = obj;

  if (!hovered) {
    overlayEl?.classList.remove('is-visible');
    document.body.style.cursor = '';
    return;
  }

  const label = hovered.userData?.label || hovered.userData?.title || hovered.userData?.id || 'Open';
  const href = hovered.userData?.href || '#';
  const cta = hovered.userData?.cta || 'Open ↗';

  titleEl.textContent = label;
  linkEl.textContent = cta;
  linkEl.setAttribute('href', href);

  if (href.startsWith('#')) {
    linkEl.setAttribute('target', '_self');
    linkEl.removeAttribute('rel');
  } else {
    linkEl.setAttribute('target', '_blank');
    linkEl.setAttribute('rel', 'noopener');
  }

  overlayEl?.classList.add('is-visible');
  document.body.style.cursor = 'pointer';
}

function updateOverlayPosition() {
  if (!hovered || !overlayEl) return;
  const pos = new THREE.Vector3();
  hovered.getWorldPosition(pos);
  pos.project(camera);

  if (pos.z < -1 || pos.z > 1) return;

  const rect = renderer.domElement.getBoundingClientRect();
  const x = rect.left + (pos.x * 0.5 + 0.5) * rect.width;
  const y = rect.top + (-pos.y * 0.5 + 0.5) * rect.height;

  overlayEl.style.transform = `translate(${x}px, ${y}px) translate(-50%, -120%)`;
}

function tick() {
  raycastInteractive();
  updateOverlayPosition();
  rafId = requestAnimationFrame(tick);
}

export function initAssetOverlay() {
  if (overlayEl) return;
  createOverlay();

  window.addEventListener('mousemove', updatePointerFromEvent, { passive: true });
  window.addEventListener('mouseleave', () => { pointerActive = false; }, { passive: true });

  // For touch, only update on touchstart to avoid noisy updates.
  window.addEventListener('touchstart', (e) => {
    const touch = e.touches?.[0];
    if (touch) updatePointerFromEvent(touch);
  }, { passive: true });

  if (!rafId) tick();
}
