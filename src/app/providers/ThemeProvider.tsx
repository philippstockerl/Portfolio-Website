import { useEffect, useMemo, useState, type ReactNode } from 'react'

import { ThemeContext, type Theme } from './theme-context'

const storageKey = 'portfolio-theme'

function readStoredTheme(): Theme | null {
  try {
    const storedTheme = window.localStorage.getItem(storageKey)
    return storedTheme === 'dark' || storedTheme === 'light'
      ? storedTheme
      : null
  } catch {
    return null
  }
}

function readSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [preference, setPreference] = useState<Theme | null>(readStoredTheme)
  const [systemTheme, setSystemTheme] = useState<Theme>(readSystemTheme)
  const theme = preference ?? systemTheme

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (event: MediaQueryListEvent) => {
      setSystemTheme(event.matches ? 'dark' : 'light')
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
  }, [theme])

  const value = useMemo(
    () => ({
      theme,
      toggleTheme: () => {
        const nextTheme = theme === 'dark' ? 'light' : 'dark'
        setPreference(nextTheme)
        try {
          window.localStorage.setItem(storageKey, nextTheme)
        } catch {
          // The selected theme still applies for this session when storage is unavailable.
        }
      },
    }),
    [theme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
