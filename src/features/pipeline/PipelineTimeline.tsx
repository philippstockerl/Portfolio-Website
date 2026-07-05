import { useEffect, useRef, type MouseEvent } from 'react'

import type {
  PipelineStageContent,
  PipelineStageId,
} from '../../content/portfolio'
import { getPipelineStageAnchor } from './pipelineNavigation'

interface PipelineTimelineProps {
  activeStageId: PipelineStageId
  label: string
  stages: PipelineStageContent[]
}

export function PipelineTimeline({
  activeStageId,
  label,
  stages,
}: PipelineTimelineProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const activeIndex = stages.findIndex((stage) => stage.id === activeStageId)

  const navigateToStage = (
    event: MouseEvent<HTMLAnchorElement>,
    stageId: PipelineStageId,
  ) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return

    event.preventDefault()
    const anchor = getPipelineStageAnchor(stageId)
    window.history.pushState(null, '', `#${anchor}`)
    document.getElementById(anchor)?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
      block: 'start',
    })
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    const activeNode = container?.querySelector<HTMLElement>(
      `[data-pipeline-node="${activeStageId}"]`,
    )
    if (
      !container ||
      !activeNode ||
      container.scrollWidth <= container.clientWidth
    )
      return

    const containerBounds = container.getBoundingClientRect()
    const activeNodeBounds = activeNode.getBoundingClientRect()
    const left =
      container.scrollLeft +
      activeNodeBounds.left -
      containerBounds.left -
      (container.clientWidth - activeNodeBounds.width) / 2
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    container.scrollTo({
      behavior: reducedMotion ? 'auto' : 'smooth',
      left,
    })
  }, [activeStageId])

  return (
    <nav
      aria-label={label}
      className="sticky top-20 z-30 mt-10 rounded-2xl border border-line bg-page/90 p-2 shadow-xl shadow-black/10 backdrop-blur-xl sm:p-3"
    >
      <div
        ref={scrollContainerRef}
        className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <ol className="relative flex min-w-[44rem] items-start px-3 py-2">
          {stages.map((stage, index) => {
            const isActive = index === activeIndex
            const isComplete = index < activeIndex
            const isLast = index === stages.length - 1

            return (
              <li key={stage.id} className="relative min-w-0 flex-1">
                <span
                  aria-hidden="true"
                  className={`absolute top-[1.08rem] left-1/2 h-0.5 ${
                    isLast ? 'w-[calc(50%-0.4rem)]' : 'w-full'
                  } ${
                    index < activeIndex || (isLast && isActive)
                      ? 'bg-accent'
                      : 'bg-line'
                  }`}
                />
                {isLast ? (
                  <span
                    aria-hidden="true"
                    className="absolute top-[0.22rem] right-0 text-2xl leading-none text-muted"
                  >
                    →
                  </span>
                ) : null}

                <a
                  href={`#${getPipelineStageAnchor(stage.id)}`}
                  aria-current={isActive ? 'step' : undefined}
                  data-pipeline-node={stage.id}
                  data-state={
                    isActive ? 'active' : isComplete ? 'complete' : 'upcoming'
                  }
                  onClick={(event) => navigateToStage(event, stage.id)}
                  className="group relative flex flex-col items-center gap-2 px-1 text-center focus-visible:rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <span
                    className={`grid h-9 w-9 place-items-center rounded-full border font-mono text-[0.65rem] font-semibold shadow-[0_0_0_5px_var(--surface-page)] transition duration-300 ${
                      isActive
                        ? 'border-accent bg-accent text-accent-contrast ring-4 ring-accent/20'
                        : isComplete
                          ? 'border-accent bg-accent/80 text-accent-contrast'
                          : 'border-line bg-page text-muted group-hover:border-accent group-hover:text-ink'
                    }`}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`text-xs font-medium transition ${
                      isActive ? 'text-ink' : 'text-muted group-hover:text-ink'
                    }`}
                  >
                    {stage.shortLabel}
                  </span>
                </a>
              </li>
            )
          })}
        </ol>
      </div>
    </nav>
  )
}
