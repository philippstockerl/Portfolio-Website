import { pageHref } from '../../app/routes'
import { ArrowUpRightIcon } from '../../components/ui/Icons'
import { SectionHeading } from '../../components/ui/SectionHeading'
import type { PortfolioContent } from '../../content/portfolio'

const TEASER_STATION_COUNT = 4

export function ExperienceTeaser({ content }: { content: PortfolioContent }) {
  const stations = content.experience.slice(0, TEASER_STATION_COUNT)

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="scroll-mt-28"
    >
      <a
        href={pageHref('experience')}
        className="group ml-auto block max-w-3xl rounded-[2rem] border border-line bg-panel p-8 shadow-xl shadow-black/5 backdrop-blur-lg transition duration-300 hover:-translate-y-1 hover:border-accent/60 hover:bg-panel-strong focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:p-12"
      >
        <SectionHeading
          id="experience-heading"
          intro={content.experienceIntro}
        />

        <ol className="mt-10 space-y-7 border-l border-line pl-6">
          {stations.map((experience) => (
            <li key={experience.id} className="relative">
              <span
                aria-hidden="true"
                className="absolute top-1 -left-[1.83rem] h-2.5 w-2.5 rounded-full border-2 border-accent bg-page transition duration-300 group-hover:bg-accent"
              />
              <p className="font-mono text-[0.65rem] tracking-[0.14em] text-accent uppercase">
                {experience.period}
              </p>
              <p className="mt-1.5 text-sm font-semibold tracking-[-0.01em] text-ink sm:text-base">
                {experience.title}
              </p>
              <p className="mt-0.5 text-xs text-muted sm:text-sm">
                {experience.organization}
              </p>
            </li>
          ))}
        </ol>

        <span className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-accent">
          {content.teasers.experience.cta}
          <ArrowUpRightIcon className="h-4 w-4 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </a>
    </section>
  )
}
