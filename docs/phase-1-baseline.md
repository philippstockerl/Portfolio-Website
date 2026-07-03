# Phase 1: Legacy baseline

Captured on 2026-07-03 from branch `codex/react-v2-migration` at base commit
`4e11c9c` (`Removed last polygon`).

## Purpose

This baseline defines what should be preserved during the migration. It is a
behavioral reference, not a requirement to reproduce legacy implementation
details or existing layout defects.

## Repository state

- The legacy website remains at the repository root and was not modified.
- Pre-existing changes are limited to tracked `.DS_Store` files.
- `node` and `npm` are not currently available on the interactive shell path.
  Phase 2 must establish a supported Node.js runtime before creating the Vite
  application.
- Legacy implementation footprint:
  - `index.html`: approximately 16 KB / 358 lines
  - `style.css`: approximately 48 KB / 2,008 lines
  - `js/`: approximately 156 KB across 22 JavaScript files
  - `assets/`: approximately 2.5 MB
  - `media/`: approximately 5.4 MB

## Runtime baseline

Tested through a local HTTP server in a browser at desktop and mobile
breakpoints.

- Page title: `Philipp Stockerl WebPortfolio`
- Initial theme: dark
- Three.js canvases mounted: 1
- Main sections: `hero`, `projects`, `experience`, `skills`
- Project cards: 6
- Experience cards: 6
- Mobile hamburger: visible at 390 px
- Mobile navigation: hidden initially and displayed after activating the
  hamburger
- Browser console warnings/errors during the baseline check: none

## Visual references

- [Desktop, dark theme](baseline/legacy-desktop-dark.jpg)
- [Desktop, light theme](baseline/legacy-desktop-light.jpg)
- [Mobile, dark theme](baseline/legacy-mobile-dark.jpg)
- [Mobile navigation open](baseline/legacy-mobile-menu.jpg)

## Behaviors to preserve

1. The transparent Three.js scene remains a full-viewport background behind the
   content.
2. The scene responds to viewport resizing, section changes, reduced-motion
   preferences, document visibility, and light/dark theme changes.
3. Section changes apply the associated camera and asset presets.
4. Project controls can apply explicit Three.js presets.
5. Supported asset tags can load interactive models or media into the scene.
6. English and German content, including language-specific CV links, remains
   available.
7. Light and dark themes remain persistent and respect the system preference
   until the user selects an explicit preference.
8. Navigation works at desktop and mobile sizes.
9. Project and experience content remains data-driven in v2 rather than copied
   into repeated JSX.
10. Reduced-motion users receive non-animated or shortened transitions.

## Implementation details not to preserve

- Global `document.querySelector` orchestration for React-owned UI
- `innerHTML` translation updates
- UI state encoded only through manually toggled body classes
- Carousel DOM generation and event listeners in the Three.js entry point
- The inline theme script in `index.html`
- Direct imports of Three.js from a CDN
- The current monolithic stylesheet structure
- Permanent animation frames and global listeners without teardown

## Known legacy layout issues

These are documented so they are not mistaken for parity requirements.

- At the 390 x 844 mobile breakpoint, the fixed email rail overlaps hero text.
- The social rail overlaps the hero CTA near the bottom of the viewport.
- The open mobile menu consumes significant hero space and does not isolate the
  content below it.
- The desktop header is visually detached from the hero in the captured initial
  viewport.

## Three.js integration contract for v2

The rendering subsystem should expose a lifecycle equivalent to:

```ts
interface ThreeEngine {
  mount(container: HTMLElement): void
  start(): void
  stop(): void
  setTheme(theme: 'light' | 'dark'): void
  applyPreset(index: number, reducedMotion?: boolean): void
  dispose(): void
}
```

The exact API can evolve during extraction, but it must support deterministic
mounting and complete cleanup. React must not manipulate objects inside the
scene, and Three.js must not mutate React-owned DOM.

## Phase 1 exit criteria

- [x] Migration branch confirmed
- [x] Legacy implementation left operational
- [x] Temporary `v2` workspace created
- [x] Desktop dark and light references captured
- [x] Mobile layout and navigation references captured
- [x] Core runtime counts recorded
- [x] Browser console checked
- [x] Preservation and non-preservation rules documented

## Phase 2 entry criteria

Phase 2 can scaffold the Vite + React + TypeScript backbone after:

1. A supported Node.js runtime is made available to the workspace.
2. Package-manager choice is fixed; npm is the default unless the repository
   adopts another manager explicitly.
3. The scaffold remains inside `v2` and does not alter the legacy entry point.
4. The first Phase 2 milestone is a production-buildable empty application,
   not immediate Three.js integration.
