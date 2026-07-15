import { pageHref } from '../../app/routes'
import { ArrowUpRightIcon } from '../../components/ui/Icons'
import { SectionHeading } from '../../components/ui/SectionHeading'
import type { PortfolioContent } from '../../content/portfolio'

export function PipelineTeaser({ content }: { content: PortfolioContent }) {
  return (
    <section
      id="pipeline"
      aria-labelledby="pipeline-heading"
      className="scroll-mt-28"
    >
      <a
        href={pageHref('pipeline')}
        className="group relative block max-w-4xl overflow-hidden rounded-[2rem] border border-line bg-panel p-8 shadow-xl shadow-black/5 backdrop-blur-lg transition duration-300 hover:-translate-y-1 hover:border-accent/60 hover:bg-panel-strong focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:p-12"
      >
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent"
        />

        <SectionHeading id="pipeline-heading" intro={content.pipelineIntro} />

        <ol className="mt-10 flex flex-wrap items-center gap-y-4">
          {content.pipelineStages.map((stage, index) => (
            <li key={stage.id} className="flex items-center">
              <span className="flex items-center gap-2.5">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line bg-page font-mono text-[0.62rem] font-semibold text-muted transition duration-300 group-hover:border-accent/50 group-hover:text-accent">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-xs font-medium text-muted transition group-hover:text-ink">
                  {stage.shortLabel}
                </span>
              </span>
              {index < content.pipelineStages.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="mx-3 h-px w-4 bg-line sm:w-7"
                />
              ) : null}
            </li>
          ))}
        </ol>

        <span className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-accent">
          {content.teasers.pipeline.cta}
          <ArrowUpRightIcon className="h-4 w-4 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </a>
    </section>
  )
}
