import { SectionHeading } from '../../components/ui/SectionHeading'
import type { PortfolioContent } from '../../content/portfolio'

export function SkillsSection({ content }: { content: PortfolioContent }) {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="section-shell scroll-mt-28"
    >
      <SectionHeading id="skills-heading" intro={content.skillsIntro} />

      <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {content.skills.map((skill, index) => (
          <article
            key={skill.id}
            className="min-h-64 bg-panel p-7 backdrop-blur-lg sm:p-8"
          >
            <span className="font-mono text-xs tracking-[0.18em] text-accent">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-8 text-xl font-semibold tracking-[-0.025em] text-ink">
              {skill.title}
            </h3>
            <p className="mt-2 text-sm font-medium text-accent">
              {skill.subtitle}
            </p>
            <p className="mt-5 text-sm leading-6 text-muted">
              {skill.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
