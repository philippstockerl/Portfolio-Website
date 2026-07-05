import type { MouseEvent } from 'react'

import { ArrowUpRightIcon } from '../../components/ui/Icons'
import type {
  PipelineCapabilityStatus,
  PipelineStageContent,
  PortfolioContent,
  ProjectContent,
} from '../../content/portfolio'
import { getProjectAnchor } from '../projects/projectNavigation'
import { getPipelineStageAnchor } from './pipelineNavigation'

interface PipelineStageSummaryProps {
  controls: Pick<
    PortfolioContent['controls'],
    | 'pipelineDeliverables'
    | 'pipelineEvidence'
    | 'pipelineMethods'
    | 'pipelineRelatedWork'
    | 'pipelineStatus'
  >
  index: number
  isActive: boolean
  projects: ProjectContent[]
  stage: PipelineStageContent
  total: number
}

const capabilityStatusStyles: Record<PipelineCapabilityStatus, string> = {
  applied: 'border-accent/30 bg-accent/10 text-accent',
  prototyped: 'border-line bg-panel-strong text-ink',
  developing: 'border-line bg-page text-muted',
}

export function PipelineStageSummary({
  controls,
  index,
  isActive,
  projects,
  stage,
  total,
}: PipelineStageSummaryProps) {
  const headingId = `${getPipelineStageAnchor(stage.id)}-heading`
  const relatedProjects = stage.relatedProjectIds.flatMap((projectId) => {
    const project = projects.find((item) => item.id === projectId)
    return project ? [project] : []
  })

  const navigateToProject = (
    event: MouseEvent<HTMLAnchorElement>,
    projectId: ProjectContent['id'],
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
    const anchor = getProjectAnchor(projectId)
    window.history.pushState(null, '', `#${anchor}`)
    document.getElementById(anchor)?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
      block: 'start',
    })
  }

  return (
    <article
      id={getPipelineStageAnchor(stage.id)}
      aria-labelledby={headingId}
      data-pipeline-stage={stage.id}
      data-active={isActive}
      className="grid min-h-[72svh] scroll-mt-48 items-center gap-7 border-t border-line py-12 first:border-t-0 lg:grid-cols-[8rem_minmax(0,1fr)] lg:gap-10 lg:py-16"
    >
      <div className="flex items-center gap-4 lg:block lg:self-start lg:pt-8">
        <span
          className={`grid h-14 w-14 shrink-0 place-items-center rounded-full border font-mono text-xs font-semibold transition duration-300 ${
            isActive
              ? 'border-accent bg-accent text-accent-contrast ring-8 ring-accent/10'
              : 'border-line bg-page text-muted'
          }`}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="min-w-0 lg:mt-5">
          <p className="font-mono text-[0.66rem] tracking-[0.16em] text-accent uppercase">
            {stage.shortLabel}
          </p>
          <p className="mt-1 text-xs text-muted">
            {index + 1} / {total}
          </p>
        </div>
      </div>

      <div
        className={`rounded-3xl border bg-panel p-6 shadow-xl shadow-black/5 backdrop-blur-lg transition duration-300 sm:p-8 lg:p-10 ${
          isActive ? 'border-accent/60 bg-panel-strong' : 'border-line'
        }`}
      >
        <h3
          id={headingId}
          className="text-3xl font-semibold tracking-[-0.035em] text-balance text-ink sm:text-4xl"
        >
          {stage.title}
        </h3>
        <p className="mt-6 max-w-3xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
          {stage.description}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
          <span className="font-mono text-[0.66rem] tracking-[0.16em] text-accent uppercase">
            {controls.pipelineEvidence}
          </span>
          <span aria-hidden="true" className="h-px w-5 bg-line" />
          <span className="font-medium text-ink">{stage.evidence}</span>
        </div>

        <div className="mt-9 grid gap-8 border-t border-line pt-8 xl:grid-cols-[minmax(0,1.1fr)_minmax(17rem,0.9fr)] xl:gap-10">
          <div>
            <h4 className="font-mono text-[0.68rem] tracking-[0.16em] text-accent uppercase">
              {controls.pipelineDeliverables}
            </h4>
            <ul className="mt-5 grid gap-4">
              {stage.deliverables.map((deliverable, deliverableIndex) => (
                <li
                  key={deliverable}
                  className="grid grid-cols-[1.75rem_1fr] gap-3 text-sm leading-6 text-muted sm:text-base sm:leading-7"
                >
                  <span
                    aria-hidden="true"
                    className="mt-0.5 grid h-7 w-7 place-items-center rounded-full border border-accent/30 bg-accent/10 font-mono text-[0.6rem] font-semibold text-accent"
                  >
                    {String(deliverableIndex + 1).padStart(2, '0')}
                  </span>
                  <span>{deliverable}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[0.68rem] tracking-[0.16em] text-accent uppercase">
              {controls.pipelineMethods}
            </h4>
            <ul className="mt-5 grid gap-2.5">
              {stage.capabilities.map((capability) => (
                <li
                  key={capability.label}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-line bg-page/55 px-4 py-3"
                >
                  <span className="text-sm font-medium text-ink">
                    {capability.label}
                  </span>
                  <span
                    className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[0.6rem] tracking-wide uppercase ${capabilityStatusStyles[capability.status]}`}
                  >
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 rounded-full bg-current"
                    />
                    {controls.pipelineStatus[capability.status]}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-9 border-t border-line pt-8">
          <h4 className="font-mono text-[0.68rem] tracking-[0.16em] text-accent uppercase">
            {controls.pipelineEvidence}
          </h4>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {stage.evidenceItems.map((item) => (
              <div
                key={`${item.organization}-${item.title}`}
                className="rounded-2xl border border-line bg-page/55 p-5"
              >
                <p className="font-mono text-[0.64rem] tracking-[0.14em] text-accent uppercase">
                  {item.organization}
                </p>
                <h5 className="mt-3 text-base font-semibold tracking-[-0.015em] text-ink">
                  {item.title}
                </h5>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {relatedProjects.length > 0 ? (
          <div className="mt-8 border-t border-line pt-7">
            <h4 className="font-mono text-[0.68rem] tracking-[0.16em] text-accent uppercase">
              {controls.pipelineRelatedWork}
            </h4>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {relatedProjects.map((project) => (
                <a
                  key={project.id}
                  href={`#${getProjectAnchor(project.id)}`}
                  onClick={(event) => navigateToProject(event, project.id)}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-page/55 px-4 py-2 text-sm font-medium text-ink transition hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {project.title}
                  <ArrowUpRightIcon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </article>
  )
}
