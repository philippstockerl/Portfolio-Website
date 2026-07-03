import type { ThreeTheme } from '../types'

export const GRID_SIZE = 240
export const GRID_DIVISIONS = 20

export interface GridThemeConfig {
  grid: number
  main: number
  opacity: number
}

export interface GlassThemeConfig {
  clearcoat: number
  clearcoatRoughness: number
  color: number
  opacity: number
  roughness: number
  transmission: number
}

export const GRID_THEMES: Record<ThreeTheme, GridThemeConfig> = {
  dark: { main: 0xcdd2db, grid: 0xa3a9b6, opacity: 0.1 },
  light: { main: 0x3a3f4c, grid: 0x5b6270, opacity: 0.1 },
}

export const GLASS_THEMES: Record<ThreeTheme, GlassThemeConfig> = {
  dark: {
    color: 0x8da2ff,
    opacity: 0.03,
    transmission: 0.35,
    roughness: 0.18,
    clearcoat: 0.4,
    clearcoatRoughness: 0.2,
  },
  light: {
    color: 0xbfd0ff,
    opacity: 0.14,
    transmission: 0.3,
    roughness: 0.22,
    clearcoat: 0.35,
    clearcoatRoughness: 0.25,
  },
}
