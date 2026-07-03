# Phase 2: Modern application backbone

Completed on 2026-07-03 on branch `codex/react-v2-migration`.

## Scope

Phase 2 establishes a production-buildable frontend without migrating legacy
UI or Three.js behavior. The application is isolated in `v2`; the repository
root remains the legacy deployment.

## Implemented foundation

- React application entry point using `createRoot` and development `StrictMode`
- TypeScript project references with strict compiler checks
- Vite development, preview, and production-build configuration
- Tailwind CSS through its Vite plugin
- ESLint flat configuration for TypeScript, React hooks, and Vite refresh
- Prettier configuration and format-check script
- npm lockfile and explicit Node/package-manager requirements
- Responsive placeholder shell proving that the compiled styling pipeline works
- Global reduced-motion safeguards
- Metadata and semantic document structure

## Dependency baseline

The initial lockfile contains:

- React 19.2.7
- React DOM 19.2.7
- Vite 8.1.3
- TypeScript 6.0.3
- Tailwind CSS 4.3.2
- ESLint 10.6.0
- Prettier 3.9.4

The install audit reported zero vulnerabilities when Phase 2 was completed.

## Verification results

All required checks passed:

```text
npm run format:check  ready
npm run lint          passed
npm run typecheck     passed
npm run build         passed
```

Production output at completion:

```text
dist/index.html                   0.55 kB (0.34 kB gzip)
dist/assets/index-*.css          11.62 kB (3.13 kB gzip)
dist/assets/index-*.js          191.46 kB (60.53 kB gzip)
```

Browser verification confirmed:

- React mounted one root application
- Expected page title and heading rendered
- No horizontal overflow at 1280 px or 390 px
- No browser console warnings or errors

## Visual references

- [Desktop backbone](baseline/phase-2-backbone-desktop.jpg)
- [Mobile backbone](baseline/phase-2-backbone-mobile.jpg)

The placeholder is intentionally not the portfolio design. It verifies the
toolchain and responsive layout only.

## Architecture decisions

1. React owns the document structure and interface state.
2. `StrictMode` remains enabled so the future Three.js adapter must implement
   correct setup and cleanup behavior.
3. Three.js is not installed until the renderer extraction begins.
4. UI component libraries are not installed until actual interface components
   require them.
5. Legacy CSS and UI scripts are not dependencies of the new application.
6. New directories are created when features enter the migration, avoiding an
   empty speculative hierarchy.

## Phase 2 exit criteria

- [x] Supported Node.js runtime available to the migration environment
- [x] React + TypeScript + Vite application scaffolded in `v2`
- [x] Tailwind, linting, formatting, and strict type checking configured
- [x] Dependency versions locked
- [x] Production build successful
- [x] Desktop and mobile runtime verified
- [x] Legacy application left unchanged

## Phase 3 entry criteria

Phase 3 can extract the Three.js renderer after these constraints are accepted:

1. Preserve rendering behavior and preset data before changing visuals.
2. Install Three.js from npm and replace CDN imports.
3. Keep Three.js under `src/three` with no dependency on React-owned selectors.
4. Add deterministic `mount`, `start`, `stop`, and `dispose` behavior.
5. Verify React `StrictMode` does not create duplicate canvases, listeners, or
   animation loops.
6. Render only the background canvas in Phase 3; section-to-preset integration
   belongs to a later UI integration phase.
