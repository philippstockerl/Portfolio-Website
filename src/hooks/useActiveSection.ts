import { useEffect, useState } from 'react'

import { isSectionId, sectionIds, type SectionId } from '../app/navigation'

function getInitialSection(): SectionId {
  const hash = window.location.hash.slice(1)
  return isSectionId(hash) ? hash : 'hero'
}

export function useActiveSection(refreshKey?: unknown): SectionId {
  const [activeSection, setActiveSection] =
    useState<SectionId>(getInitialSection)

  useEffect(() => {
    const observedEntries = new Map<SectionId, IntersectionObserverEntry>()

    const updateActiveSection = () => {
      const viewportAnchor = window.innerHeight * 0.4
      const candidates = sectionIds
        .map((id) => ({ id, entry: observedEntries.get(id) }))
        .filter(
          (
            candidate,
          ): candidate is { id: SectionId; entry: IntersectionObserverEntry } =>
            Boolean(candidate.entry?.isIntersecting),
        )

      if (!candidates.length) return

      candidates.sort((left, right) => {
        const leftDistance = Math.abs(
          left.entry.boundingClientRect.top - viewportAnchor,
        )
        const rightDistance = Math.abs(
          right.entry.boundingClientRect.top - viewportAnchor,
        )
        return leftDistance - rightDistance
      })

      const nextSection = candidates[0]?.id
      if (nextSection) setActiveSection(nextSection)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (isSectionId(entry.target.id))
            observedEntries.set(entry.target.id, entry)
        })
        updateActiveSection()
      },
      {
        rootMargin: '-32% 0px -58% 0px',
        threshold: [0, 0.01, 0.25, 0.5, 0.75, 1],
      },
    )

    sectionIds.forEach((id) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })

    return () => {
      observer.disconnect()
      observedEntries.clear()
    }
    // The observed sections are re-mounted whenever the route changes.
  }, [refreshKey])

  return activeSection
}
