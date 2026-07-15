import { SectionHeading } from '../../components/ui/SectionHeading'
import { Tag } from '../../components/ui/Tag'
import type { PortfolioContent } from '../../content/portfolio'

export function ExperienceSection({ content }: { content: PortfolioContent }) {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="scroll-mt-28"
    >
      <SectionHeading id="experience-heading" intro={content.experienceIntro} />

      <div className="mt-14 border-l border-line pl-5 sm:pl-8">
        {content.experience.map((experience) => (
          <article
            key={experience.id}
            className="relative border-b border-line py-8 first:pt-2 last:border-b-0 sm:grid sm:grid-cols-[8.5rem_1fr] sm:gap-8"
          >
            <span className="absolute top-10 -left-[1.55rem] h-3 w-3 rounded-full border-2 border-accent bg-page sm:-left-[2.15rem]" />
            <p className="font-mono text-xs leading-5 tracking-[0.08em] text-accent">
              {experience.period}
            </p>
            <div className="mt-4 sm:mt-0">
              <h3 className="text-xl font-semibold tracking-[-0.025em] text-ink sm:text-2xl">
                {experience.title}
              </h3>
              <p className="mt-2 text-sm font-medium text-accent">
                {experience.organization}
              </p>
              <p className="mt-4 max-w-3xl text-sm leading-6 text-muted sm:text-base sm:leading-7">
                {experience.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {experience.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
