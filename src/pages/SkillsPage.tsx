import type { PortfolioContent } from '../content/portfolio'
import { SkillsSection } from '../features/skills/SkillsSection'
import { PageShell } from './PageShell'

export function SkillsPage({ content }: { content: PortfolioContent }) {
  return (
    <PageShell backLabel={content.controls.backToHome}>
      <SkillsSection content={content} />

      <section aria-labelledby="languages-heading" className="mt-24">
        <h2
          id="languages-heading"
          className="font-mono text-xs tracking-[0.24em] text-accent uppercase"
        >
          {content.controls.languages}
        </h2>
        <ul className="mt-7 flex flex-wrap gap-3">
          {content.languages.map((language) => (
            <li
              key={language.id}
              className="flex items-center gap-3 rounded-full border border-line bg-panel px-5 py-2.5 backdrop-blur"
            >
              <span className="text-sm font-semibold text-ink">
                {language.name}
              </span>
              <span className="font-mono text-[0.65rem] tracking-wide text-accent uppercase">
                {language.level}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </PageShell>
  )
}
