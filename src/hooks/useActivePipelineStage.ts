import { useEffect, useState } from 'react'

import { pipelineStageIds, type PipelineStageId } from '../content/portfolio'
import { getPipelineStageAnchor } from '../features/pipeline/pipelineNavigation'

function getInitialPipelineStage(): PipelineStageId {
  const hash = window.location.hash.slice(1)
  return (
    pipelineStageIds.find(
      (stageId) => getPipelineStageAnchor(stageId) === hash,
    ) ?? pipelineStageIds[0]
  )
}

export function useActivePipelineStage(): PipelineStageId {
  const [activeStage, setActiveStage] = useState<PipelineStageId>(
    getInitialPipelineStage,
  )

  useEffect(() => {
    const observedEntries = new Map<
      PipelineStageId,
      IntersectionObserverEntry
    >()

    const updateActiveStage = () => {
      const viewportAnchor = window.innerHeight * 0.42
      const candidates = pipelineStageIds
        .map((stageId) => ({
          entry: observedEntries.get(stageId),
          stageId,
        }))
        .filter(
          (
            candidate,
          ): candidate is {
            entry: IntersectionObserverEntry
            stageId: PipelineStageId
          } => Boolean(candidate.entry?.isIntersecting),
        )

      if (!candidates.length) return

      candidates.sort(
        (left, right) =>
          Math.abs(left.entry.boundingClientRect.top - viewportAnchor) -
          Math.abs(right.entry.boundingClientRect.top - viewportAnchor),
      )

      const nextStage = candidates[0]?.stageId
      if (nextStage) setActiveStage(nextStage)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const stageId = entry.target.getAttribute(
            'data-pipeline-stage',
          ) as PipelineStageId | null
          if (stageId && pipelineStageIds.includes(stageId)) {
            observedEntries.set(stageId, entry)
          }
        })
        updateActiveStage()
      },
      {
        rootMargin: '-22% 0px -56% 0px',
        threshold: [0, 0.01, 0.25, 0.5, 0.75, 1],
      },
    )

    pipelineStageIds.forEach((stageId) => {
      const stage = document.getElementById(getPipelineStageAnchor(stageId))
      if (stage) observer.observe(stage)
    })

    const initialStage = getInitialPipelineStage()
    const initialAnchor = getPipelineStageAnchor(initialStage)
    const shouldRestoreStage = window.location.hash === `#${initialAnchor}`
    const frameId = shouldRestoreStage
      ? window.requestAnimationFrame(() => {
          document.getElementById(initialAnchor)?.scrollIntoView({
            block: 'start',
          })
        })
      : null

    return () => {
      if (frameId !== null) window.cancelAnimationFrame(frameId)
      observer.disconnect()
      observedEntries.clear()
    }
  }, [])

  return activeStage
}
