import type { PortfolioContent } from '../../content/portfolio'
import { socialLinks } from '../../content/portfolio'
import { ArrowDownIcon, ArrowUpRightIcon } from '../../components/ui/Icons'

export function HeroSection({ hero }: { hero: PortfolioContent['hero'] }) {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative flex min-h-svh scroll-mt-28 items-center px-6 pt-28 pb-16 sm:px-8 lg:px-12"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="max-w-4xl rounded-[2rem] border border-line bg-hero p-7 shadow-2xl shadow-black/10 backdrop-blur-md sm:p-10 lg:p-14">
          <p className="font-mono text-xs tracking-[0.24em] text-accent uppercase">
            {hero.eyebrow}
          </p>
          <h1
            id="hero-heading"
            className="mt-4 text-5xl font-semibold tracking-[-0.055em] text-ink sm:text-7xl"
          >
            {hero.name}
          </h1>
          <p className="mt-10 text-sm font-medium text-muted">{hero.focus}</p>
          <p className="mt-3 max-w-4xl text-3xl leading-[1.08] font-semibold tracking-[-0.045em] text-balance text-ink sm:text-5xl lg:text-6xl">
            {hero.headline}
          </p>
          <p className="mt-7 max-w-2xl text-base leading-7 text-muted sm:text-lg">
            {hero.bio}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href={hero.cvHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-contrast shadow-lg shadow-accent/15 transition hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              {hero.cvLabel}
              <ArrowDownIcon className="h-4 w-4" />
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-panel px-5 py-3 text-sm font-semibold text-ink transition hover:border-accent focus-visible:outline-2 focus-visible:outline-accent"
            >
              {hero.projectsLabel}
              <ArrowUpRightIcon className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-8 flex items-center gap-3 2xl:hidden">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                aria-label={link.label}
                className="grid h-10 w-10 place-items-center rounded-full border border-line bg-panel"
              >
                <img src={link.icon} alt="" className="theme-icon h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
