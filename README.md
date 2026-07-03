# Portfolio v2

This directory is the temporary home of the React migration. The legacy site at
the repository root remains the working reference until v2 reaches feature
parity.

## Migration status

- Phase 1: legacy baseline captured
- Phase 2: modern application backbone complete
- Phase 3: Three.js engine extraction complete
- Phase 4: typed content and static portfolio shell complete
- Phase 5: section-to-renderer integration complete
- Phase 6: typed project asset pipeline complete
- Phase 7: presentation, resilience, and performance complete
- Phase 8: GitHub Pages deployment package ready; external activation pending

## Technology baseline

- React 19
- TypeScript 6 in strict mode
- Vite 8
- Tailwind CSS 4
- ESLint 10
- Prettier 3
- npm lockfile with zero reported vulnerabilities

## Local development

Node.js 24 is recommended and recorded in `.nvmrc`. The minimum supported
version is declared in `package.json`.

```sh
nvm use
npm install
npm run dev
```

Before committing application changes, run:

```sh
npm run format:check
npm run lint
npm run typecheck
npm run build
```

## Current application structure

```text
src/
├── app/         Application shell and state providers
├── components/  Reusable layout and UI components
├── content/     Typed bilingual portfolio content
├── features/    Hero, projects, experience, and skills sections
├── styles/      Design tokens, Tailwind entry point, and global safeguards
├── three/       Lazy renderer, asset loaders, engine, configuration, and presets
└── main.tsx     Browser entry point
```

Hook and asset-integration directories will be introduced when the corresponding
migration phase begins. Empty architecture folders are not committed
speculatively.

## Working rules

1. React will own all UI DOM and UI state.
2. Three.js will own only its canvas, scene, renderer, animation loop, and WebGL
   resources.
3. Communication between React and Three.js will use a small explicit lifecycle
   API rather than global DOM queries or custom window events.
4. Legacy UI scripts and the monolithic stylesheet will not be imported into
   v2.
5. Rendering algorithms, camera presets, asset loaders, content, and media will
   be migrated selectively after their dependencies are understood.
6. The `v2` directory is temporary. After feature parity, it will become the
   repository-root application.

See [docs/phase-1-baseline.md](docs/phase-1-baseline.md) for the legacy baseline
and [docs/phase-2-backbone.md](docs/phase-2-backbone.md) for the application
foundation. The renderer extraction is documented in
[docs/phase-3-three-engine.md](docs/phase-3-three-engine.md), and the static
portfolio shell in [docs/phase-4-static-shell.md](docs/phase-4-static-shell.md).
Section tracking and camera integration are documented in
[docs/phase-5-section-integration.md](docs/phase-5-section-integration.md). The
typed project asset pipeline is documented in
[docs/phase-6-project-assets.md](docs/phase-6-project-assets.md). Presentation,
retry behavior, renderer budgets, and the legacy interaction audit are
documented in
[docs/phase-7-presentation-performance.md](docs/phase-7-presentation-performance.md).
GitHub Pages configuration, activation, rollback, and root cleanup are
documented in [docs/phase-8-github-pages.md](docs/phase-8-github-pages.md).
