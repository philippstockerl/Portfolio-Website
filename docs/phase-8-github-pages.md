# Phase 8: GitHub Pages deployment readiness

Prepared on 2026-07-03 on branch `codex/react-v2-migration`.

## Status

The React portfolio is ready to deploy through GitHub Pages, but no branch was
pushed, merged, or deployed during this phase. The legacy root application is
intentionally retained as the rollback source until the new Pages artifact is
verified at its public URL.

## Production target

Repository:

```text
github.com/philippstockerl/Portfolio-Website
```

Project Pages URL:

```text
https://philippstockerl.github.io/Portfolio-Website/
```

Vite therefore builds with:

```text
base = /Portfolio-Website/
```

Development continues to use `/`, so the normal local Vite URL remains
`http://localhost:5173/`.

## Base-aware assets

`src/lib/publicAsset.ts` is the single helper for files copied from `public`.
It uses `import.meta.env.BASE_URL`, covering:

- Header logo
- GitHub and LinkedIn icons
- English and German CV files
- Project images and videos
- GLB models

The HTML favicon uses Vite's `%BASE_URL%` replacement. Production scripts,
styles, and lazy chunks are rewritten automatically by Vite.

## Metadata

The production document now includes:

- Canonical Pages URL
- Description, author, and robots metadata
- Dark/light browser theme colors
- Open Graph title, description, URL, and image
- Twitter summary card metadata
- Base-aware favicon
- `robots.txt`
- `sitemap.xml`

The site uses hash anchors rather than client-side routes, so no SPA `404.html`
fallback is required.

## Deployment workflow

`.github/workflows/deploy-pages.yml` runs on pushes to `main` that affect `v2`
or the workflow, and can also be started manually.

The build job:

1. Checks out the repository.
2. Reads Node 24.14.0 from `v2/.nvmrc`.
3. Restores npm cache using `v2/package-lock.json`.
4. Runs `npm ci`.
5. Checks formatting, linting, and strict TypeScript.
6. Builds `v2/dist`.
7. Configures Pages and uploads the artifact.

The deploy job uses the protected `github-pages` environment and the
Pages/OIDC permissions required by GitHub.

Action revisions are pinned to the current immutable commits shown in the
official Vite Pages workflow example.

## One-time GitHub activation

Before the first workflow deployment:

1. Merge the migration branch into `main`.
2. Open the repository on GitHub.
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to **GitHub Actions**.
5. Open **Actions → Deploy portfolio to GitHub Pages**.
6. Run the workflow manually, or let the merge-to-main push trigger it.
7. Verify the deployment environment URL.

These external actions were not performed automatically.

## Exact-subpath verification

The build was copied below a local `Portfolio-Website/` directory and served
from its parent, reproducing the GitHub Pages path instead of testing at `/`.

Verified HTTP 200 responses included:

- `/Portfolio-Website/`
- Hashed application JavaScript and CSS
- Logo and social icons
- Lazy Three.js engine and all loader chunks
- Robust formulation PNG and random-field WebM
- Network-flow GLB model

Browser checks confirmed:

- URL and all runtime asset paths retain `/Portfolio-Website/`
- English CV points to the correct subpath
- Grid engine starts and renders
- Composite image/video visualization reaches `ready`
- GLB replacement reaches `ready`
- Desktop and 390 px mobile layouts work
- No horizontal overflow
- One canvas remains mounted
- Canonical/Open Graph metadata is present
- Browser console is clean

`robots.txt` and `sitemap.xml` are present in the artifact.

## Rollback

The legacy root files remain on the migration branch specifically to preserve a
low-risk rollback:

1. Open **Settings → Pages**.
2. Change **Source** from **GitHub Actions** back to **Deploy from a branch**.
3. Select `main` and `/(root)`.
4. Save and wait for the legacy Pages build.

Alternatively, re-run a previously successful Pages workflow deployment or
revert the migration merge and deploy a corrected artifact.

Do not delete the legacy root until the React deployment has passed live mobile,
desktop, CV, social, asset, and console checks.

## Final root cutover

After the public artifact is stable:

1. Create a separate cleanup branch.
2. Move the React project from `v2` to the repository root.
3. Update workflow working directories and artifact path.
4. Rebuild and repeat the exact-subpath test.
5. Remove retired HTML, CSS, JS, Manim build output, and duplicate media only
   after reviewing the cleanup diff.
6. Merge the cleanup separately from the first production deployment.

Keeping initial deployment and repository cleanup separate makes rollback
small and auditable.

## Phase 8 exit criteria

- [x] Exact GitHub Pages base path configured
- [x] All runtime public assets made base-aware
- [x] Production metadata, robots, and sitemap added
- [x] Current Pages artifact workflow added and YAML validated
- [x] Formatting, linting, type checks, and production build passed
- [x] Exact-subpath desktop/mobile browser verification passed
- [x] Image, video, model, CV, icon, and lazy-chunk paths verified
- [x] Rollback and final root-cleanup procedures documented
- [ ] Migration branch merged into `main`
- [ ] Pages source changed to GitHub Actions
- [ ] Public deployment and final live-browser audit completed
