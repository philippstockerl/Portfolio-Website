import { createContext } from 'react'

import type { Locale } from '../../content/portfolio'

export interface LanguageContextValue {
  locale: Locale
  toggleLocale: () => void
}

export const LanguageContext = createContext<LanguageContextValue | null>(null)
