import { useState } from 'react'

import type { SectionId } from '../../app/navigation'
import type { Locale, PortfolioContent } from '../../content/portfolio'
import { publicAsset } from '../../lib/publicAsset'
import type { Theme } from '../../app/providers/theme-context'
import { CloseIcon, MenuIcon, MoonIcon, SunIcon } from '../ui/Icons'

interface SiteHeaderProps {
  activeSection: SectionId
  content: PortfolioContent
  locale: Locale
  onToggleLocale: () => void
  onToggleTheme: () => void
  theme: Theme
}

export function SiteHeader({
  activeSection,
  content,
  locale,
  onToggleLocale,
  onToggleTheme,
  theme,
}: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-header shadow-lg shadow-black/5 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <a
            href="#hero"
            className="flex items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            aria-label={`Philipp Stockerl — ${content.controls.home}`}
          >
            <img
              src={publicAsset('assets/logo.png')}
              alt=""
              className="h-9 w-9 rounded-full object-cover ring-1 ring-line"
            />
            <span className="hidden text-sm font-semibold tracking-tight text-ink sm:block">
              Philipp Stockerl
            </span>
          </a>

          <nav
            aria-label={content.controls.primaryNavigation}
            className="hidden md:block"
          >
            <ul className="flex items-center gap-1">
              {content.navigation.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={
                      activeSection === item.id ? 'location' : undefined
                    }
                    className={`block rounded-full px-4 py-2 text-sm transition focus-visible:outline-2 focus-visible:outline-accent ${
                      activeSection === item.id
                        ? 'bg-panel-strong text-ink shadow-sm'
                        : 'text-muted hover:bg-panel-strong hover:text-ink'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onToggleLocale}
              aria-label={content.controls.language}
              className="control-button grid min-w-11 font-mono text-xs font-semibold"
            >
              {locale === 'en' ? 'DE' : 'EN'}
            </button>
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={content.controls.theme}
              aria-pressed={theme === 'light'}
              className="control-button grid"
            >
              {theme === 'dark' ? (
                <SunIcon className="h-4 w-4" />
              ) : (
                <MoonIcon className="h-4 w-4" />
              )}
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={
                menuOpen
                  ? content.controls.closeMenu
                  : content.controls.openMenu
              }
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              className="control-button grid md:hidden"
            >
              {menuOpen ? (
                <CloseIcon className="h-5 w-5" />
              ) : (
                <MenuIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav
            id="mobile-navigation"
            aria-label={content.controls.mobileNavigation}
            className="pb-4 md:hidden"
          >
            <ul className="grid gap-1 border-t border-line pt-3">
              {content.navigation.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setMenuOpen(false)}
                    aria-current={
                      activeSection === item.id ? 'location' : undefined
                    }
                    className={`block rounded-xl px-4 py-3 text-sm transition focus-visible:outline-2 focus-visible:outline-accent ${
                      activeSection === item.id
                        ? 'bg-panel-strong text-ink'
                        : 'text-muted hover:bg-panel-strong hover:text-ink'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  )
}
