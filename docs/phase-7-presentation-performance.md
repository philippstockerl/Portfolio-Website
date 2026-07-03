# Phase 7: Presentation, resilience, and performance

Completed on 2026-07-03 on branch `codex/react-v2-migration`.

## Scope

Phase 7 turns the Phase 6 asset pipeline into a portfolio-facing feature. It
adds semantic context, keyboard-visible controls, responsive composition,
production retry behavior, and explicit renderer cost limits without restoring
the legacy pointer-only overlay system.

## Presentation metadata

Project IDs are now a shared `ProjectId` union. Bilingual project content owns
the human-readable visualization title, explanation, and legend items, while
the Three.js catalog continues to own renderer configuration.

This separation keeps:

- Translation text out of renderer data
- Camera and asset transforms out of English/German content records
- Project IDs checked across content and the asset catalog
- Project camera presets in one source instead of duplicated locale data

The selected card displays its explanation in semantic HTML. The canvas remains
decorative and `aria-hidden`.

## Accessible interaction

`ProjectVisualizationControls` provides:

- Native show/hide and retry buttons
- `aria-pressed`, `aria-busy`, and `aria-controls`
- A polite atomic status region
- `aria-describedby` links to status and visualization context
- A visible selected-card treatment
- English and German captions, legends, statuses, and controls
- A reduced-motion explanation shown when the media query is active

Keyboard activation was verified with a focused native button and the Enter
key. No functionality depends on pointer hover.

## Raycasting decision

The legacy `assetOverlay.js` was deliberately not migrated. Its current data
contains placeholder links, it appends UI directly to `document.body`, runs a
second animation loop, and exposes information only through pointer/touch
raycasting.

The useful information is now always available in React-owned semantic HTML.
Raycasting can be reconsidered only if a future asset exposes additional,
verified data and an equivalent keyboard interaction is designed first.

## Responsive composition

Each project asset descriptor can define mobile, laptop, desktop, and ultrawide
group position and scale. The engine reapplies the active layout on resize
without reloading the asset.

The active projects section uses theme-specific glass opacity and no
section-wide backdrop blur. Individual cards retain their glass surface and
text contrast. Mobile and desktop checks confirmed that captions stay within
the card and do not introduce horizontal overflow.

## Renderer safeguards

The engine now applies explicit runtime budgets:

| Profile        | Render cap | Pixel-ratio cap |
| -------------- | ---------: | --------------: |
| Desktop/laptop |     60 FPS |               2 |
| Mobile         |     30 FPS |             1.5 |
| Reduced motion |     15 FPS |    Viewport cap |

Reduced motion also disables grid spin, pauses animation mixers, jumps camera
transitions to their destination, and pauses video assets. Stopping the engine
for a hidden document pauses active media; restarting resumes it unless reduced
motion remains active.

Canvas data attributes expose the effective frame cap, pixel ratio, motion
preference, media pause state, active asset viewport, preset, and lifecycle
state for deterministic verification.

## Error recovery and loader prewarming

An error keeps the project selected and presents both Hide and Retry controls.
Retry increments an explicit React request key and asks the engine for a fresh
asset request. Image/model retries bypass stale browser responses; video retry
URLs receive a cache-busting query.

Production failure testing exposed a separate module-loading edge case: a
browser caches a failed dynamic import when the network disappears before a
loader chunk arrives. The application now prewarms the small image, video, and
GLTF loader chunks when Projects becomes active. They remain absent from the
initial bundle but are available before a user requests an asset.

The production build was tested by:

1. Entering Projects and confirming loader prewarming completed.
2. Stopping the static server.
3. Requesting the network-flow model and observing the error state.
4. Restarting the server without reloading React.
5. Activating Retry and observing the model return to `ready`.

## Remaining legacy behavior audit

The following legacy paths are explicitly retired from v2:

- `assetOverlay.js`: placeholder, pointer-only overlay with a second RAF loop
- `events.js` and `modelManager.js`: global tag delegation replaced by typed
  React actions and the engine API
- Scroll locking, wheel interception, and delayed section snapping
- Runtime CDN imports and DOM-appended hidden media elements
- `certificatesData.js`, PDF planes, and sprite planes: not connected to a live
  legacy section and containing unverified/placeholder entries

Theme/language controls, social links, CV downloads, portfolio content, camera
movement, the grid, and verified project assets have modern equivalents.

## Verification

Automated and browser checks covered:

- Formatting, ESLint, strict TypeScript, and production build
- Production loader prewarming and successful offline-to-online retry
- Image, video, and GLB presentation states
- Native keyboard activation
- Status/caption accessibility relationships
- English and German visualization content
- Dark and light active-card treatments
- Desktop and 390 px mobile composition
- 60/30 FPS and DPR profile data
- Asset cleanup when leaving Projects
- One canvas, one renderer loop, and no horizontal overflow
- Clean console in a fresh production smoke test

Automated browser verification used the available Chromium-based in-app
browser. Safari and Firefox remain a deployment gate because they are not
available in this workspace.

## Phase 7 exit criteria

- [x] Typed bilingual visualization context added
- [x] Project/preset metadata duplication removed
- [x] Presentation controls extracted into a focused React component
- [x] Visible retry state and fresh retry requests implemented
- [x] Loader chunks prewarmed only after Projects becomes active
- [x] Responsive per-asset layouts implemented
- [x] Theme-specific active presentation implemented
- [x] Desktop/mobile FPS and DPR limits implemented
- [x] Video and mixer reduced-motion behavior implemented
- [x] Legacy raycasting and remaining loader paths explicitly audited
- [x] Production recovery, keyboard, responsive, and console checks passed

## Phase 8 entry criteria

Phase 8 can prepare deployment and replace the legacy root application:

1. Configure the Vite base path for the actual GitHub Pages repository URL.
2. Convert every remaining root-absolute logo, social, and CV path to a
   base-aware public URL.
3. Test the production build from the exact Pages subpath.
4. Add the GitHub Pages build/deploy workflow and validate its artifact.
5. Complete metadata, favicon, social preview, and production error checks.
6. Run manual Safari and Firefox smoke tests plus a final accessibility and
   performance audit.
7. Promote `v2` to the repository root and remove retired legacy code only
   after the deployed preview passes.
