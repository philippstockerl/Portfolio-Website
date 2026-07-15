import type { PortfolioContent } from '../content/portfolio'
import { ExperienceSection } from '../features/experience/ExperienceSection'
import { PageShell } from './PageShell'

export function ExperiencePage({ content }: { content: PortfolioContent }) {
  return (
    <PageShell backLabel={content.controls.backToHome}>
      <ExperienceSection content={content} />

      <section aria-labelledby="education-heading" className="mt-24">
        <h2
          id="education-heading"
          className="font-mono text-xs tracking-[0.24em] text-accent uppercase"
        >
          {content.controls.education}
        </h2>
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {content.education.map((entry) => (
            <article
              key={entry.id}
              className="rounded-2xl border border-line bg-panel p-6 backdrop-blur-lg"
            >
              <p className="font-mono text-[0.65rem] tracking-[0.14em] text-muted uppercase">
                {entry.period}
              </p>
              <h3 className="mt-4 text-base font-semibold tracking-[-0.015em] text-ink">
                {entry.degree}
              </h3>
              <p className="mt-1.5 text-sm font-medium text-accent">
                {entry.institution}
              </p>
              <p className="mt-3 text-sm leading-6 text-muted">{entry.focus}</p>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  )
}
