export const sectionIds = ['hero', 'projects', 'experience', 'skills'] as const

export type SectionId = (typeof sectionIds)[number]

export function isSectionId(value: string): value is SectionId {
  return sectionIds.includes(value as SectionId)
}
