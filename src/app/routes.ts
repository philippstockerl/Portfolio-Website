import { sectionIds, type SectionId } from './navigation'

/**
 * Hash-based routing that stays compatible with GitHub Pages and with the
 * plain in-page anchors used for scrolling (e.g. `#pipeline-stage-process`).
 * Only hashes that start with `#/` are treated as routes; the home page is
 * identified by the `hero` section id.
 */
export interface AppRoute {
  detail: string | null
  page: SectionId
}

export const homeRoute: AppRoute = { detail: null, page: 'hero' }

const pagePaths = {
  hero: '',
  pipeline: 'end-to-end',
  projects: 'projects',
  experience: 'experience',
  skills: 'skills',
} as const satisfies Record<SectionId, string>

export function pageHref(page: SectionId, detail?: string): string {
  const base = `#/${pagePaths[page]}`
  return detail ? `${base}/${detail}` : base
}

/**
 * Returns the route for a location hash, or `null` when the hash is a plain
 * in-page anchor that should not change the current page.
 */
export function parseRoute(hash: string): AppRoute | null {
  if (hash === '' || hash === '#' || hash === '#/') return homeRoute
  if (!hash.startsWith('#/')) return null

  const segments = hash.slice(2).split('/').filter(Boolean)
  const page = sectionIds.find(
    (sectionId) =>
      pagePaths[sectionId] !== '' && pagePaths[sectionId] === segments[0],
  )

  if (!page) return homeRoute
  return { detail: segments[1] ?? null, page }
}
