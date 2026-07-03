import type { PortfolioContent } from '../../content/portfolio'
import { emailAddress, socialLinks } from '../../content/portfolio'
import { ArrowUpRightIcon } from '../ui/Icons'

export function SiteFooter({ content }: { content: PortfolioContent }) {
  return (
    <footer className="relative z-10 border-t border-line bg-page/80 px-6 py-10 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="max-w-md text-lg font-medium text-ink">
            {content.footer.closing}
          </p>
          <p className="mt-3 text-sm text-muted">{content.footer.copyright}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-panel px-4 py-2 text-sm text-muted transition hover:border-accent hover:text-ink focus-visible:outline-2 focus-visible:outline-accent"
            >
              {link.label}
              <ArrowUpRightIcon className="h-3.5 w-3.5" />
            </a>
          ))}
          <a
            href={`mailto:${emailAddress}`}
            className="inline-flex items-center rounded-full border border-line bg-panel px-4 py-2 text-sm text-muted transition hover:border-accent hover:text-ink focus-visible:outline-2 focus-visible:outline-accent"
          >
            {content.footer.email}
          </a>
        </div>
      </div>
    </footer>
  )
}
