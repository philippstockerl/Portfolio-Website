# Phase 4: Typed content and static portfolio shell

Completed on 2026-07-03 on branch `codex/react-v2-migration`.

## Scope

Phase 4 replaces the legacy HTML structure, translation mutation, theme script,
and monolithic UI stylesheet with a responsive React-owned portfolio shell. The
Three.js engine remains on its hero preset throughout this phase.

## Implemented architecture

```text
src/
├── app/providers/       Theme and language state
├── components/layout/   Header, social rail, and footer
├── components/ui/       Icons, tags, and section headings
├── content/             Typed bilingual portfolio data
└── features/            Hero, projects, experience, and skills
```

## Content migration

English and German content now satisfy one `PortfolioContent` schema containing:

- Four navigation entries
- One hero and locale-specific CV link
- Six projects with stable IDs and future Three.js preset indices
- Three unique experience entries
- Six skills
- Section introductions, interface labels, and footer content

The project catalog was normalized across languages. The legacy English and
German lists represented different projects, repeated the thesis and web work,
and omitted the sixth German project. The new catalog preserves the available
subject matter while providing six matching bilingual project records.

The three duplicated `aria-hidden` experience cards used by the old infinite
carousel were removed; only the three unique experiences remain.

## React-owned state

### Theme provider

- Uses the system preference when no explicit choice exists
- Persists an explicit light or dark preference
- Updates `data-theme` and the browser `color-scheme`
- Passes the active theme directly to the Three.js adapter
- Does not dispatch global custom events

### Language provider

- Persists English or German
- Updates the document `lang` attribute
- Selects a complete typed content object
- Does not mutate rendered HTML or use `innerHTML`

## Interface structure

- Fixed frosted header with desktop and mobile navigation
- Accessible language, theme, and menu controls
- Skip-to-content link
- Hero with CV and projects actions
- Responsive project-card grid
- Three-entry experience timeline
- Six-card capability grid
- Wide-screen social rail without mobile overlap
- Responsive footer with social and email links
- Semantic sections and heading relationships

The design uses semantic light/dark tokens rather than copied legacy selectors.
Complex WebGL styling remains isolated from UI styling.

## Static assets

The following legacy assets were copied into `v2/public/assets` for independent
Vite builds:

- Portfolio logo
- GitHub and LinkedIn icons
- English CV
- German CV

No legacy script or stylesheet is required by the v2 shell.

## Browser verification

Desktop verification confirmed:

- Four semantic main sections
- Six project cards
- Three unique experience cards
- Six skill cards
- One running Three.js canvas
- Loaded logo asset
- No horizontal overflow
- No browser warnings or errors

Mobile verification at 390 x 844 confirmed:

- Desktop navigation hidden
- Menu button visible
- Four-link mobile menu opens and closes correctly
- Selecting Projects closes the menu and positions the section below the header
- Project cards remain readable without horizontal overflow
- The legacy email/social overlap is absent

Preference verification confirmed that German and light mode survived a full
page reload while the renderer remained a single canvas.

## Visual references

- [Desktop dark shell](baseline/phase-4-shell-desktop-dark.jpg)
- [Desktop light shell](baseline/phase-4-shell-desktop-light.jpg)
- [Mobile dark shell](baseline/phase-4-shell-mobile-dark.jpg)
- [Mobile navigation](baseline/phase-4-mobile-menu.jpg)
- [Mobile projects](baseline/phase-4-projects-mobile.jpg)

## Production output

```text
dist/index.html                              0.60 kB (0.36 kB gzip)
dist/assets/index-*.css                     25.82 kB (5.66 kB gzip)
dist/assets/index-*.js                     220.37 kB (68.56 kB gzip)
dist/assets/createThreeEngine-*.js         534.22 kB (133.83 kB gzip)
```

## Phase 4 exit criteria

- [x] Bilingual content represented as typed data
- [x] Theme and language controlled through React providers
- [x] Responsive semantic portfolio sections implemented
- [x] Mobile navigation implemented without global DOM listeners
- [x] Static assets available inside the v2 build
- [x] Renderer theme synchronized through an explicit prop
- [x] Legacy stylesheet and UI scripts remain unreferenced
- [x] Desktop, mobile, light, dark, and German states verified
- [x] Formatting, linting, type checks, and production build passed
- [x] Browser console clean

## Phase 5 entry criteria

Phase 5 can connect sections to camera presets under these constraints:

1. Track the active section with an isolated `IntersectionObserver` hook.
2. Expose renderer commands through a typed React bridge, not global events.
3. Apply the existing section preset map when active-section state changes.
4. Add active navigation state and preserve reduced-motion behavior.
5. Keep project preset IDs in content data, but do not load project assets yet.
6. Avoid legacy scroll snapping until normal scrolling and camera transitions are
   proven stable.
7. Asset loaders, model controls, and hover raycasting remain a later phase.
