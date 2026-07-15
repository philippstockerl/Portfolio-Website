import type { PortfolioContent } from '../../content/portfolio'
import { socialLinks } from '../../content/portfolio'
import { ArrowDownIcon, ArrowUpRightIcon } from '../../components/ui/Icons'
import { pageHref } from '../../app/routes'

export function HeroSection({ hero }: { hero: PortfolioContent['hero'] }) {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative flex min-h-svh scroll-mt-28 items-center px-6 pt-28 pb-24 sm:px-8 lg:px-12"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="hero-veil relative max-w-3xl">
          <p className="font-mono text-xs tracking-[0.24em] text-accent uppercase">
            {hero.eyebrow}
          </p>
          <h1
            id="hero-heading"
            className="mt-5 text-5xl font-semibold tracking-[-0.055em] text-ink sm:text-7xl lg:text-8xl"
          >
            {hero.name}
          </h1>

          <ul className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[0.7rem] tracking-wide text-muted">
            {hero.meta.map((item, index) => (
              <li key={item} className="flex items-center gap-3">
                {index > 0 ? (
                  <span aria-hidden="true" className="text-accent">
                    ·
                  </span>
                ) : null}
                {item}
              </li>
            ))}
          </ul>

          <p className="mt-12 max-w-2xl text-2xl leading-[1.15] font-semibold tracking-[-0.035em] text-balance text-ink sm:text-4xl">
            {hero.headline}
          </p>
          <p className="mt-6 max-w-xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
            {hero.bio}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
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
              href={pageHref('projects')}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-panel px-5 py-3 text-sm font-semibold text-ink backdrop-blur transition hover:border-accent focus-visible:outline-2 focus-visible:outline-accent"
            >
              {hero.projectsLabel}
              <ArrowUpRightIcon className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-9 flex items-center gap-3 2xl:hidden">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                aria-label={link.label}
                className="grid h-10 w-10 place-items-center rounded-full border border-line bg-panel backdrop-blur transition hover:border-accent"
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
