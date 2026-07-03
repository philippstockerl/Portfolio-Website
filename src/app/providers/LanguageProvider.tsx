import { useEffect, useMemo, useState, type ReactNode } from 'react'

import type { Locale } from '../../content/portfolio'
import { LanguageContext } from './language-context'

const storageKey = 'portfolio-language'

function readStoredLocale(): Locale {
  try {
    return window.localStorage.getItem(storageKey) === 'de' ? 'de' : 'en'
  } catch {
    return 'en'
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(readStoredLocale)

  useEffect(() => {
    document.documentElement.lang = locale
    try {
      window.localStorage.setItem(storageKey, locale)
    } catch {
      // The selected language still applies for this session when storage is unavailable.
    }
  }, [locale])

  const value = useMemo(
    () => ({
      locale,
      toggleLocale: () =>
        setLocale((current) => (current === 'en' ? 'de' : 'en')),
    }),
    [locale],
  )

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}
