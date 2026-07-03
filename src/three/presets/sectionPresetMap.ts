import type { SectionId } from '../../app/navigation'

export const sectionPresetMap = {
  hero: 0,
  projects: 1,
  experience: 2,
  skills: 6,
} as const satisfies Record<SectionId, number>
