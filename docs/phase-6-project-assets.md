# Phase 6: Project asset pipeline

Completed on 2026-07-03 on branch `codex/react-v2-migration`.

## Scope

Phase 6 migrates the verified legacy project media into a typed, lazy, and
cancellable asset pipeline. React owns project selection and accessible status
feedback. The Three.js engine owns network loading, scene attachment,
replacement, animation, and GPU/media cleanup.

## Verified asset mappings

Only legacy files with a defensible project relationship receive controls:

| Project                               | Asset bundle                                    | Loader        |
| ------------------------------------- | ----------------------------------------------- | ------------- |
| Robust and Adaptive Path Planning     | Robust formulation image and random-field video | Image + video |
| Operations Research & Decision Models | Network-flow GLB model                          | GLTF          |
| Business Process Optimization         | Process-flow video                              | Video         |

The remaining three project cards stay text-only. No placeholder controls or
guessed file paths were introduced.

The selected source files are copied into `public/assets` so Vite treats them as
stable static files. Catalog URLs use `import.meta.env.BASE_URL` and therefore
remain compatible with a future GitHub Pages base-path configuration.

## State flow

```text
Project button
  → selected ProjectAssetDescriptor in React
  → ThreeBackground declarative asset prop
  → ThreeEngine.loadAsset() / clearAsset()
  → lazy image, video, or GLTF loader
  → one active asset group in the existing scene
```

Section observation does not select project assets. It only determines whether
the selected bundle should be attached. Leaving the projects section releases
the active media and restores the section preset; returning reattaches the
still-selected project through the same lifecycle.

## Typed catalog

`src/three/assets/projectAssetCatalog.ts` is the single project-to-asset map. A
descriptor contains:

- A stable asset ID
- A project camera preset index
- One or more discriminated image, video, or GLTF items
- Explicit public URLs, transforms, dimensions, and model normalization size
- Optional billboarding for media planes

Content remains bilingual UI data. Renderer configuration is not duplicated in
the English and German content records.

## Loading and cancellation

The engine exposes two asset operations:

```ts
loadAsset(descriptor): Promise<'loaded' | 'cancelled'>
clearAsset(): void
```

Each request receives an `AbortController` and monotonically increasing request
ID. Selecting, hiding, leaving the section, replacing the asset, or disposing
the renderer invalidates the previous request. A stale result is disposed and
can never attach itself to the scene.

The loaders are split into dynamic chunks:

- Images use abortable fetch, `ImageBitmap`, `Texture`, and a plane mesh.
- Videos use a detached, muted, inline video element and `VideoTexture`.
- GLB files use abortable fetch followed by `GLTFLoader.parseAsync`.
- Composite bundles use `Promise.allSettled` so every successful sibling is
  disposed if another item fails.

The initial React bundle does not import Three.js or `GLTFLoader` eagerly.

## Disposal guarantees

Asset replacement and engine shutdown release:

- Scene group references
- Animation mixers and cached model roots
- Model geometries, materials, and textures
- Image textures and `ImageBitmap` memory
- Video playback, source buffers, textures, geometry, and materials
- In-flight fetch and media readiness listeners

Only one renderer and one animation loop remain mounted throughout selection
and replacement.

## Scene composition

Selected project media is attached to a stable asset layer under `worldRoot`.
It shares the responsive stage scale but does not inherit the continuously
rotating grid transform. The grid keeps its original animation while media
planes and models remain readable.

The projects section lowers its glass opacity and disables section-wide blur
only while an asset is active. Individual cards keep their glass treatment, so
text contrast remains stable.

## Accessible React controls

Controls appear only on the three mapped projects and provide:

- Native button behavior
- `aria-pressed` selection state
- `aria-controls` connection to the renderer container
- `aria-busy` during loading
- Polite loading, ready, and error status text
- English and German labels
- A hide action that immediately clears the active asset

The canvas remains `aria-hidden`; project meaning and status stay in semantic
HTML.

## Verification

Browser checks covered:

- Image + video bundle load on preset 8
- GLB load and normalized display on preset 10
- Video load on preset 12
- Asset replacement without creating a second canvas
- Hide action restoring preset 1 and `idle` state
- Leaving projects releasing the active asset and restoring preset 2
- Re-entering projects through the retained declarative selection
- Desktop and 390 px mobile layouts
- No horizontal overflow
- Clean browser console
- Theme-independent project controls

Formatting, linting, strict TypeScript checks, and the production build pass.

## Deliberately excluded

- Assets without a clear project mapping
- Legacy hidden image/video elements appended to `document.body`
- CDN module imports and runtime path guessing
- Global asset caches and custom window events
- Raycasting, hover labels, and presentation overlays
- Deployment base-path changes and repository-root cutover

## Phase 6 exit criteria

- [x] Verified legacy project assets mapped explicitly
- [x] Typed composite asset descriptors established
- [x] Image, video, and GLB loaders migrated
- [x] Loader code split from the initial bundle
- [x] Request cancellation and stale-result rejection implemented
- [x] Replacement and renderer disposal implemented
- [x] Accessible bilingual controls added only to supported cards
- [x] Stable media layer separated from the rotating grid
- [x] Desktop and mobile behavior verified
- [x] Formatting, linting, type checks, production build, and browser console
      checks passed

## Phase 7 entry criteria

Phase 7 can address interaction, presentation, and performance polish now that
the asset lifecycle is stable:

1. Tune per-asset composition for desktop, mobile, light, and dark themes.
2. Add explicit captions or legends when a visualization needs explanation.
3. Evaluate raycasting only for interactions that expose useful project
   information and remain keyboard-accessible.
4. Cap expensive renderer settings and verify low-power/reduced-motion paths.
5. Add a deliberate retry surface if production asset errors require one.
6. Audit remaining legacy behaviors and explicitly port or retire each one.
7. Finish cross-browser, accessibility, and performance validation before the
   deployment/cutover phase.
