# Phase 3: Three.js engine extraction

Completed on 2026-07-03 on branch `codex/react-v2-migration`.

## Scope

Phase 3 extracts the animated grid background into a typed, lifecycle-safe
renderer. It deliberately excludes legacy UI orchestration, asset loaders, and
section-driven interaction.

## Migrated behavior

- Three intersecting `GridHelper` planes
- Three translucent glass planes
- Red, green, and blue coordinate axes
- Ambient and directional lighting
- Camera and target interpolation
- World, grid, and axis rotation
- Stage scaling and world transforms
- Dark and light renderer themes
- Reduced-motion handling
- Document-visibility pause and resume behavior
- All 14 camera preset values and responsive profile scaling
- Hero preset as the initial standalone background state

## Renderer boundary

The engine implements the interface in `src/three/types.ts`:

```ts
interface ThreeEngine {
  readonly canvas: HTMLCanvasElement
  mount(container: HTMLElement): void
  start(): void
  stop(): void
  setTheme(theme: 'dark' | 'light'): void
  applyPreset(index: number, reducedMotion?: boolean, width?: number): void
  dispose(): void
}
```

React owns only the background container. The engine creates and owns its canvas
and all WebGL resources.

## Lifecycle guarantees

- `start()` is idempotent and creates at most one animation frame chain.
- `stop()` cancels the active frame and resets frame timing.
- `dispose()` is idempotent.
- The resize listener is removed during disposal.
- Animation mixers are stopped.
- Textures, materials, and geometries are disposed once through de-duplicated
  sets.
- The renderer, render lists, and WebGL context are released.
- The canvas is removed from its container.
- A disposed engine cannot be restarted or mounted again.
- The React adapter cancels asynchronous initialization during StrictMode
  cleanup.

## Loading strategy

The Three.js engine is dynamically imported after the React shell renders. The
production build therefore separates the initial application from the renderer:

```text
initial application JavaScript   195.64 kB (61.90 kB gzip)
async Three.js renderer chunk    534.22 kB (133.83 kB gzip)
```

This prevents the WebGL dependency from blocking the initial application shell
and gives a clean boundary for a future non-WebGL fallback.

## Dependency baseline

- Three.js 0.185.1
- `@types/three` 0.185.0

No CDN or import-map dependency remains in the v2 renderer.

## Browser verification

The development build was used so React StrictMode performed its additional
setup/cleanup cycle.

Desktop at 1280 x 720:

- Background status: `ready`
- Grid canvases: 1
- Canvas dimensions: 1280 x 720
- Canvas rendered: true
- Animation loop running: true
- Horizontal overflow: false

Mobile at 390 x 844:

- Grid canvases: 1
- Canvas dimensions: 390 x 844 after resize
- Canvas rendered: true
- Animation loop running: true
- Horizontal overflow: false

The final browser pass produced no warnings or errors.

## Visual references

- [Desktop grid engine](baseline/phase-3-grid-desktop.jpg)
- [Mobile grid engine](baseline/phase-3-grid-mobile.jpg)

## Deferred legacy modules

These remain in the legacy application as migration inputs; they were not
discarded:

- Asset presets and responsive asset overrides
- GLB, image, sprite, video, and PDF loaders
- Model manager and asset cleanup behavior
- Asset hover overlay and raycasting
- Section-to-camera orchestration
- Camera transition and fade controllers
- Scroll manager and project preset controls

They will be migrated behind explicit engine or React APIs instead of copied
with global DOM dependencies.

## Phase 3 exit criteria

- [x] Three.js installed from npm
- [x] Animated grid renderer extracted under `src/three`
- [x] Existing camera presets represented as typed data
- [x] Complete start, stop, resize, and disposal lifecycle implemented
- [x] Renderer mounted through an isolated React component
- [x] StrictMode produced one running canvas
- [x] Desktop and mobile resizing verified
- [x] Renderer loaded as an asynchronous production chunk
- [x] Formatting, linting, type checks, and production build passed
- [x] Browser console clean

## Phase 4 entry criteria

Phase 4 can build the static portfolio shell with these constraints:

1. Move translations and portfolio content into typed data modules.
2. Add React-owned theme and language providers.
3. Build semantic header, hero, projects, experience, skills, and footer
   components.
4. Use design tokens and reusable UI primitives instead of copying the legacy
   stylesheet.
5. Keep the renderer on the hero preset; section-to-preset synchronization is
   deferred until the static UI is stable.
6. Do not migrate asset loaders or model controls as part of the static shell.
