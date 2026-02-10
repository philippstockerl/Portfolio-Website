// main.js
// Orchestration only – all logic is delegated to controllers

import { mount, start, setWorldSpin, setGridTheme } from './threeScene.js';
import { sectionPresets, getCamPresetsForWidth } from './cameraPresets.js';

import { applyPreset, safeApplyPreset, getLastPresetIndex } from './cameraController.js';
import { setAssetTheme } from './assetManager.js';
import { initScrollManager } from './scrollManager.js';
import { setupAnchorSmoothing, setupReducedMotion, setupVisibilityChange, setupTagEvents, setupProjectPresetButtons } from './events.js';
import { initScrollSpy, initBoxSpy } from '../scrollspy.js'; // adjust relative path as needed
import { initAssetOverlay } from './assetOverlay.js';

// ---------- mount Three.js scene ----------
const container = document.getElementById('three-container');
if (container) {
  mount(container);
  start();
  initAssetOverlay();
} else {
  console.warn('[main] #three-container not found');
}

// ---------- app state ----------
const mediaReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)');
let prefersReduced = !!mediaReduced?.matches;

function getThemeFromDOM() {
  if (document.body.classList.contains('theme-light')) return 'light';
  if (document.body.classList.contains('theme-dark')) return 'dark';
  return 'dark';
}

const initialTheme = getThemeFromDOM();
setAssetTheme(initialTheme);
setGridTheme(initialTheme);

window.addEventListener('themechange', (e) => {
  const next = e?.detail?.theme || getThemeFromDOM();
  setAssetTheme(next);
  setGridTheme(next);
});

// ---------- sections & scroll handling ----------
const sections = Array.from(document.querySelectorAll('main section[id]'));
initScrollManager(sections);

// ---------- events ----------
setupAnchorSmoothing(prefersReduced);
setupReducedMotion(mediaReduced);
setupVisibilityChange(prefersReduced, getLastPresetIndex, () => getCamPresetsForWidth(window.innerWidth), setWorldSpin);
setupTagEvents();
setupProjectPresetButtons(prefersReduced);
initScrollSpy();
initBoxSpy();

// ---------- full-bleed wrapper alignment ----------
function syncViewportAlignedWraps() {
  const wraps = document.querySelectorAll('.projects-carousel-wrap, .experience-carousel-wrap');
  wraps.forEach((wrap) => {
    const anchor = wrap.parentElement ?? wrap;
    const left = anchor.getBoundingClientRect().left;
    wrap.style.setProperty('--viewport-offset', `${left}px`);
  });
}

requestAnimationFrame(syncViewportAlignedWraps);
window.addEventListener('load', syncViewportAlignedWraps);
window.addEventListener('resize', syncViewportAlignedWraps);

// ---------- light snap to nearest section ----------
const snapSections = Array.from(document.querySelectorAll('main section[id]'));
let __snapTimer;
let __snapping = false;
let __lastScrollY = window.scrollY;
let __scrollDir = 0;
const heroSection = document.getElementById('hero');

function snapToClosestSection() {
  if (!snapSections.length || __snapping) return;
  const navSnapThreshold = window.innerHeight * 0.25;
  if (__scrollDir < 0 && window.scrollY <= navSnapThreshold) {
    __snapping = true;
    window.scrollTo({ top: 0, left: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
    setTimeout(() => { __snapping = false; }, 450);
    return;
  }
  const center = window.innerHeight / 2;
  let bestIdx = 0;
  let bestDist = Infinity;
  snapSections.forEach((sec, i) => {
    const r = sec.getBoundingClientRect();
    const dist = Math.abs(r.top + r.height / 2 - center);
    if (dist < bestDist) { bestDist = dist; bestIdx = i; }
  });
  const snapThreshold = window.innerHeight * 0.18;
  if (bestDist > snapThreshold) return;
  const target = snapSections[bestIdx];
  if (!target) return;
  __snapping = true;
  target.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'center' });
  setTimeout(() => { __snapping = false; }, 450);
}

window.addEventListener(
  'scroll',
  () => {
    if (__snapping) return;
    const currentY = window.scrollY;
    __scrollDir = currentY > __lastScrollY ? 1 : currentY < __lastScrollY ? -1 : 0;
    __lastScrollY = currentY;
    clearTimeout(__snapTimer);
    __snapTimer = setTimeout(snapToClosestSection, 260);
  },
  { passive: true }
);

// ---------- projects carousel: one card per scroll + indicator ----------
const projectsCarousel = document.querySelector('.projects-carousel');
const projectsIndicator = document.querySelector('.projects-carousel-indicator');
if (projectsCarousel) {
  const cards = Array.from(projectsCarousel.querySelectorAll('.project-box'));
  const prevBtn = document.querySelector('.projects-carousel-prev');
  const nextBtn = document.querySelector('.projects-carousel-next');
  let isCardScrolling = false;
  let scrollLockTimer;
  let snapTimer;
  const getCarouselPad = () => {
    const value = getComputedStyle(projectsCarousel).getPropertyValue('--carousel-vertical-pad');
    const parsed = parseFloat(value);
    return Number.isFinite(parsed) ? parsed : 0;
  };

  const getClosestIndex = () => {
    if (!cards.length) return 0;
    const scrollTop = projectsCarousel.scrollTop;
    const center = scrollTop + projectsCarousel.clientHeight / 2;
    let bestIdx = 0;
    let bestDist = Infinity;
    cards.forEach((card, i) => {
      const cardCenter = card.offsetTop + card.offsetHeight / 2;
      const dist = Math.abs(cardCenter - center);
      if (dist < bestDist) {
        bestDist = dist;
        bestIdx = i;
      }
    });
    return bestIdx;
  };

  const setActiveCard = () => {
    const idx = getClosestIndex();
    cards.forEach((card, i) => {
      card.classList.toggle('active', i === idx);
    });
  };

  const updateUiPosition = () => {
    const wrap = projectsCarousel.closest('.projects-carousel-wrap');
    if (!wrap) return;
    // Keep controls fixed in the top-right of the carousel viewport
    wrap.style.setProperty('--carousel-ui-top', '0px');
  };

  const updateIndicator = () => {
    if (!cards.length) return;
    const idx = getClosestIndex();
    if (projectsIndicator) {
      const total = cards.length;
      projectsIndicator.innerHTML = '';

      const dots = document.createElement('span');
      dots.className = 'carousel-dots';

      for (let i = 0; i < total; i += 1) {
        const dot = document.createElement('span');
        dot.className = `dot${i === idx ? ' active' : ''}`;
        dots.appendChild(dot);
      }

      projectsIndicator.appendChild(dots);
    }
    setActiveCard();
    updateUiPosition();
  };

  const syncCarouselHeight = () => {
    if (!cards.length) return;
    const pad = getCarouselPad();
    let maxHeight = 0;
    cards.forEach((card) => {
      maxHeight = Math.max(maxHeight, card.offsetHeight);
    });
    const height = maxHeight + pad * 2;
    projectsCarousel.style.setProperty('--carousel-card-height', `${height}px`);
  };

  const scrollToIndex = (idx) => {
    const target = cards[idx];
    if (!target) return;
    isCardScrolling = true;
    const offset = target.offsetTop - (projectsCarousel.clientHeight - target.offsetHeight) / 2;
    projectsCarousel.scrollTo({ top: offset, behavior: 'smooth' });
    clearTimeout(scrollLockTimer);
    scrollLockTimer = setTimeout(() => {
      isCardScrolling = false;
      updateIndicator();
    }, 360);
  };

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const currentIdx = getClosestIndex();
      scrollToIndex(Math.max(0, currentIdx - 1));
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const currentIdx = getClosestIndex();
      scrollToIndex(Math.min(cards.length - 1, currentIdx + 1));
    });
  }

  projectsCarousel.addEventListener(
    'wheel',
    (e) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      window.scrollBy({ top: e.deltaY, left: 0, behavior: 'auto' });
    },
    { passive: false }
  );

  projectsCarousel.addEventListener('scroll', () => {
    if (isCardScrolling) return;
    clearTimeout(snapTimer);
    snapTimer = setTimeout(() => {
      scrollToIndex(getClosestIndex());
    }, 80);
    updateIndicator();
    updateUiPosition();
  });

  window.addEventListener('resize', () => {
    syncCarouselHeight();
    updateIndicator();
    updateUiPosition();
  });

  syncCarouselHeight();
  updateIndicator();
}

// ---------- sidebar auto-collapse on scroll stop ----------
const sidebar = document.querySelector('.content-sidebar');
if (sidebar) {
  let __sidebarScrollTimer;
  const showSidebar = () => document.body.classList.add('sidebar-scrolling');
  const hideSidebar = () => document.body.classList.remove('sidebar-scrolling');

  hideSidebar();

  window.addEventListener(
    'scroll',
    () => {
      showSidebar();
      clearTimeout(__sidebarScrollTimer);
      __sidebarScrollTimer = setTimeout(hideSidebar, 2000);
    },
    { passive: true }
  );
}

// ---------- responsive preset refresh ----------
let __resizePresetTimer;
window.addEventListener('resize', () => {
  clearTimeout(__resizePresetTimer);
  __resizePresetTimer = setTimeout(() => {
    applyPreset(getLastPresetIndex(), prefersReduced);
  }, 150);
});

// ---------- mobile nav toggle ----------
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector("header nav ul");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }
});

// ---------- initial preset ----------
(function initInitialPreset() {
  if (!sections.length) return;
  const heroSection = document.getElementById('hero');
  if (heroSection) {
    const presetIdx = sectionPresets['hero'] ?? 0;
    safeApplyPreset(presetIdx, prefersReduced);
  } else {
    // fallback: nearest-center logic
    const center = window.innerHeight / 2;
    let bestIdx = 0, bestDist = Infinity;
    sections.forEach((sec, i) => {
      const r = sec.getBoundingClientRect();
      const inRange = r.top <= center && r.bottom >= center;
      const dist = inRange ? 0 : Math.abs(r.top);
      if (dist < bestDist) { bestDist = dist; bestIdx = i; }
    });
    const id = sections[bestIdx]?.id || '';
    const presetIdx = sectionPresets[id] ?? bestIdx;
    safeApplyPreset(presetIdx, prefersReduced);
  }
})();

// ---------- force Hero preset on full load ----------
window.addEventListener('load', () => {
  requestAnimationFrame(() => {
    applyPreset(0, prefersReduced);
  });
});
