# Phase 5: Section-to-renderer integration

Completed on 2026-07-03 on branch `codex/react-v2-migration`.

## Scope

Phase 5 connects normal document scrolling to the existing Three.js camera
presets. It adds active navigation state without reintroducing legacy scroll
snapping, global custom events, or direct UI mutation by the renderer.

## State flow

```text
IntersectionObserver
  → active SectionId in React
  → active navigation link
  → typed sectionPresetMap
  → ThreeBackground prop synchronization
  → ThreeEngine.applyPreset()
```

React remains the source of truth. Three.js receives a preset index and does not
query sections or navigation elements.

## Shared section contract

`src/app/navigation.ts` defines the only valid portfolio section IDs:

```ts
const sectionIds = ['hero', 'projects', 'experience', 'skills'] as const
```

The same `SectionId` type is used by content, observation, navigation, and the
renderer preset map. Adding or removing a section therefore causes compile-time
errors until all mappings are updated.

## Active-section tracking

`useActiveSection` owns the `IntersectionObserver` lifecycle:

- Observes the four semantic section elements
- Uses a narrow viewport activation band instead of continuous scroll handlers
- Retains the previous section while crossing small gaps
- Disconnects and clears retained entries during cleanup
- Reads a valid initial URL hash for deep links
- Does not rewrite browser history during normal scrolling

Hash changes do not directly set active state. Anchor navigation scrolls the
target into the observer band, ensuring the observer remains the authoritative
source after initial load.

## Preset mapping

The typed map in `src/three/presets/sectionPresetMap.ts` is:

```text
hero        → 0
projects    → 1
experience  → 2
skills      → 6
```

The legacy untyped section map was removed so this is the single source of
truth.

## Renderer synchronization

`ThreeBackground` now accepts `activeSection` and `theme` as declarative props.
It retains the latest section during asynchronous Three.js loading and applies
the correct preset immediately after the engine becomes available.

Normal motion uses the engine's camera, target, world-transform, and scale
interpolation. When `prefers-reduced-motion` is active, `applyPreset` jumps to
the requested state and disables world rotation.

The resize path reapplies the active preset with the appropriate mobile,
laptop, desktop, or ultrawide profile.

## Navigation state

Desktop and mobile navigation links now receive:

- `aria-current="location"` when active
- A visible selected state using existing design tokens
- The same active section state used by the renderer

No scrollspy classes are toggled manually.

## Browser verification

The development build verified the complete desktop sequence:

```text
section       preset   aria-current
hero          0        #hero
projects      1        #projects
experience    2        #experience
skills        6        #skills
```

Additional checks confirmed:

- Anchor navigation updates only after the observer sees the target
- Each target is positioned below the fixed header
- One Three.js canvas remains mounted through every transition
- The animation loop remains running
- Resizing from desktop to mobile recalculates the active section after layout
  reflow and reapplies its responsive preset
- Mobile navigation highlights the same section as the renderer
- No horizontal overflow
- No browser warnings or errors

## Visual references

- [Projects preset and active desktop navigation](baseline/phase-5-projects-preset.jpg)
- [Mobile active navigation and experience preset](baseline/phase-5-mobile-active-nav.jpg)

## Deliberately excluded

- Legacy scroll snapping and delayed auto-snapping
- Wheel interception inside project cards
- Project-specific camera buttons
- Asset presets and model/media loading
- Raycasting and asset overlays
- URL updates during passive scrolling

## Phase 5 exit criteria

- [x] Shared typed section IDs established
- [x] Active section derived through `IntersectionObserver`
- [x] Typed section-to-camera map established
- [x] Renderer synchronized through React props
- [x] Desktop and mobile navigation expose active state accessibly
- [x] Presets 0, 1, 2, and 6 verified in the browser
- [x] Responsive reflow verified
- [x] Reduced-motion path retained
- [x] Formatting, linting, type checks, and production build passed
- [x] Browser console clean

## Phase 6 entry criteria

Phase 6 can migrate the project asset pipeline under these constraints:

1. Extend the engine with typed asset attachment and removal methods.
2. Port asset presets as data without DOM selectors or dynamic path guessing.
3. Load project assets through explicit React actions, not section observation.
4. Lazy-load model and media loaders so the initial bundle remains unchanged.
5. Guarantee cancellation and disposal for in-flight and replaced assets.
6. Add accessible project controls only when their corresponding asset works.
7. Preserve one renderer, one animation loop, and normal page scrolling.
8. Keep hover raycasting and presentation overlays deferred until asset loading
   is stable.
