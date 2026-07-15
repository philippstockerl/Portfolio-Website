import { createContext } from 'react'

export type Theme = 'dark' | 'light' | 'matrix'

export interface ThemeContextValue {
  theme: Theme
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)
