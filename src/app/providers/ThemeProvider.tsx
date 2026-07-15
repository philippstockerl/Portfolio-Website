import { useEffect, useMemo, useState, type ReactNode } from 'react'

import { ThemeContext, type Theme } from './theme-context'

const storageKey = 'portfolio-theme'

const themeCycle: readonly Theme[] = ['light', 'dark', 'matrix']

function readStoredTheme(): Theme | null {
  try {
    const storedTheme = window.localStorage.getItem(storageKey)
    return themeCycle.find((theme) => theme === storedTheme) ?? null
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
    // 'matrix' is not a valid CSS color-scheme; it behaves like a dark theme.
    document.documentElement.style.colorScheme =
      theme === 'matrix' ? 'dark' : theme
  }, [theme])

  const value = useMemo(
    () => ({
      theme,
      toggleTheme: () => {
        const nextTheme =
          themeCycle[(themeCycle.indexOf(theme) + 1) % themeCycle.length]
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
