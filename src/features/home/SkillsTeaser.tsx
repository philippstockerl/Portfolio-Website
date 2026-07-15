import { pageHref } from '../../app/routes'
import { ArrowUpRightIcon } from '../../components/ui/Icons'
import { SectionHeading } from '../../components/ui/SectionHeading'
import type { PortfolioContent } from '../../content/portfolio'

export function SkillsTeaser({ content }: { content: PortfolioContent }) {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="scroll-mt-28"
    >
      <a
        href={pageHref('skills')}
        className="group block max-w-3xl overflow-hidden rounded-[1.4rem] border border-line bg-panel shadow-xl shadow-black/5 backdrop-blur-lg transition duration-300 hover:-translate-y-1 hover:border-accent/60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        <span className="flex items-center gap-2 border-b border-line bg-page/60 px-5 py-3">
          <span
            aria-hidden="true"
            className="h-2.5 w-2.5 rounded-full bg-line transition duration-300 group-hover:bg-accent/70"
          />
          <span
            aria-hidden="true"
            className="h-2.5 w-2.5 rounded-full bg-line transition duration-300 delay-75 group-hover:bg-accent/50"
          />
          <span
            aria-hidden="true"
            className="h-2.5 w-2.5 rounded-full bg-line transition duration-300 delay-150 group-hover:bg-accent/30"
          />
          <span className="ml-2 font-mono text-[0.65rem] tracking-wide text-muted">
            philipp@passau:~/skills
          </span>
        </span>

        <span className="block p-8 sm:p-12">
          <SectionHeading id="skills-heading" intro={content.skillsIntro} />

          <span className="mt-9 block font-mono text-xs text-muted">
            <span className="text-accent">$</span> skills --list
          </span>
          <span className="mt-4 flex flex-wrap gap-2">
            {content.skills.map((skill) => (
              <span
                key={skill.id}
                className="rounded-md border border-line bg-page/60 px-3 py-1.5 font-mono text-xs text-ink transition duration-300 group-hover:border-accent/40"
              >
                {skill.title}
              </span>
            ))}
          </span>

          <span className="mt-7 block font-mono text-xs text-muted">
            <span className="text-accent">$</span> languages
          </span>
          <span className="mt-3 flex flex-wrap gap-x-6 gap-y-1.5 font-mono text-xs text-muted">
            {content.languages.map((language) => (
              <span key={language.id}>
                {language.name}{' '}
                <span className="text-accent">[{language.level}]</span>
              </span>
            ))}
          </span>

          <span className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-accent">
            {content.teasers.skills.cta}
            <ArrowUpRightIcon className="h-4 w-4 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </span>
      </a>
    </section>
  )
}
