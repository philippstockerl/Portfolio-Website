import type { SectionIntro } from '../../content/portfolio'

interface SectionHeadingProps {
  align?: 'left' | 'right'
  id: string
  intro: SectionIntro
}

export function SectionHeading({
  align = 'left',
  id,
  intro,
}: SectionHeadingProps) {
  return (
    <div
      className={`max-w-3xl ${align === 'right' ? 'ml-auto text-right' : ''}`}
    >
      <p className="font-mono text-xs tracking-[0.24em] text-accent uppercase">
        {intro.eyebrow}
      </p>
      <h2
        id={id}
        className="mt-5 text-3xl font-semibold tracking-[-0.035em] text-balance text-ink sm:text-5xl"
      >
        {intro.title}
      </h2>
      <p className="mt-5 text-base leading-7 text-muted sm:text-lg">
        {intro.description}
      </p>
    </div>
  )
}
