import { pageHref } from '../../app/routes'
import { ArrowUpRightIcon } from '../../components/ui/Icons'
import { SectionHeading } from '../../components/ui/SectionHeading'
import type { PortfolioContent } from '../../content/portfolio'

export function ProjectsTeaser({ content }: { content: PortfolioContent }) {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="scroll-mt-28"
    >
      <SectionHeading
        id="projects-heading"
        intro={content.projectsIntro}
        align="center"
      />

      <div className="edge-fade-x -mx-4 mt-12 overflow-x-auto pb-4 [scrollbar-width:none] sm:-mx-6 lg:-mx-8 [&::-webkit-scrollbar]:hidden">
        <ul className="mx-auto flex w-max snap-x gap-4 px-10 sm:gap-5 lg:px-16">
          {content.projects.map((project, index) => (
            <li key={project.id} className="snap-center">
              <a
                href={pageHref('projects', project.id)}
                className="group flex h-full w-60 flex-col rounded-2xl border border-line/70 bg-panel/60 p-5 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-accent/60 hover:bg-panel focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:w-64"
              >
                <span className="font-mono text-[0.62rem] tracking-[0.18em] text-accent">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-4 text-base leading-snug font-semibold tracking-[-0.02em] text-ink">
                  {project.title}
                </h3>
                <p className="mt-1.5 text-xs font-medium text-accent">
                  {project.subtitle}
                </p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-5 font-mono text-[0.65rem] tracking-wide text-muted transition group-hover:text-accent">
                  {project.tags[0]}
                  <ArrowUpRightIcon className="h-3.5 w-3.5" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10 text-center">
        <a
          href={pageHref('projects')}
          className="inline-flex items-center gap-2 rounded-full border border-line bg-panel px-5 py-2.5 text-sm font-semibold text-ink backdrop-blur transition hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {content.teasers.projects.cta}
          <ArrowUpRightIcon className="h-4 w-4" />
        </a>
      </div>
    </section>
  )
}
