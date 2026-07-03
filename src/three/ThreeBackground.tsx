import { useCallback, useEffect, useRef } from 'react'

import type { SectionId } from '../app/navigation'
import type { AssetLoadStatus, ProjectAssetDescriptor } from './assets/types'
import { sectionPresetMap } from './presets/sectionPresetMap'
import type { ThreeEngine, ThreeTheme } from './types'

interface ThreeBackgroundProps {
  activeSection: SectionId
  asset: ProjectAssetDescriptor | null
  assetRequestKey: number
  onAssetStatusChange(status: AssetLoadStatus): void
  theme: ThreeTheme
}

export function ThreeBackground({
  activeSection,
  asset,
  assetRequestKey,
  onAssetStatusChange,
  theme,
}: ThreeBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const engineRef = useRef<ThreeEngine | null>(null)
  const activeSectionRef = useRef<SectionId>(activeSection)
  const assetRef = useRef<ProjectAssetDescriptor | null>(asset)
  const assetRequestKeyRef = useRef(assetRequestKey)
  const onAssetStatusChangeRef = useRef(onAssetStatusChange)
  const reducedMotionRef = useRef(false)
  const themeRef = useRef<ThreeTheme>(theme)

  const getPresetIndex = useCallback(
    () =>
      activeSectionRef.current === 'projects' && assetRef.current
        ? assetRef.current.presetIndex
        : sectionPresetMap[activeSectionRef.current],
    [],
  )

  const publishAssetStatus = useCallback((status: AssetLoadStatus) => {
    onAssetStatusChangeRef.current(status)
  }, [])

  const syncAsset = useCallback(
    (engine: ThreeEngine, fresh = false) => {
      const currentAsset =
        activeSectionRef.current === 'projects' ? assetRef.current : null

      if (!currentAsset) {
        engine.clearAsset()
        publishAssetStatus({ assetId: null, state: 'idle' })
        return
      }

      publishAssetStatus({ assetId: currentAsset.id, state: 'loading' })
      void engine
        .loadAsset(currentAsset, { fresh })
        .then((result) => {
          if (
            result === 'loaded' &&
            activeSectionRef.current === 'projects' &&
            assetRef.current?.id === currentAsset.id
          ) {
            publishAssetStatus({ assetId: currentAsset.id, state: 'ready' })
          }
        })
        .catch((error: unknown) => {
          if (assetRef.current?.id !== currentAsset.id) return

          const message =
            error instanceof Error
              ? error.message
              : 'Unknown asset loading error'
          publishAssetStatus({
            assetId: currentAsset.id,
            message,
            state: 'error',
          })
          console.error(`Unable to load asset ${currentAsset.id}`, error)
        })
    },
    [publishAssetStatus],
  )

  useEffect(() => {
    activeSectionRef.current = activeSection
    engineRef.current?.applyPreset(getPresetIndex(), reducedMotionRef.current)

    if (activeSection !== 'projects' && engineRef.current) {
      syncAsset(engineRef.current)
    }

    if (activeSection === 'projects') {
      const container = containerRef.current
      if (container) container.dataset.assetLoaders = 'loading'

      void import('./assets/loadProjectAsset')
        .then(({ preloadProjectAssetLoaders }) => preloadProjectAssetLoaders())
        .then(() => {
          if (container) container.dataset.assetLoaders = 'ready'
        })
        .catch(() => {
          if (container) container.dataset.assetLoaders = 'error'
        })
    }
  }, [activeSection, getPresetIndex, syncAsset])

  useEffect(() => {
    const fresh = assetRequestKey !== assetRequestKeyRef.current
    assetRequestKeyRef.current = assetRequestKey
    assetRef.current = asset
    const engine = engineRef.current
    if (!engine) return

    engine.applyPreset(getPresetIndex(), reducedMotionRef.current)
    syncAsset(engine, fresh)
  }, [asset, assetRequestKey, getPresetIndex, syncAsset])

  useEffect(() => {
    onAssetStatusChangeRef.current = onAssetStatusChange
  }, [onAssetStatusChange])

  useEffect(() => {
    themeRef.current = theme
    engineRef.current?.setTheme(theme)
  }, [theme])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let cancelled = false
    const reducedMotionQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    )

    const syncMotionPreference = () => {
      reducedMotionRef.current = reducedMotionQuery.matches
      engineRef.current?.applyPreset(
        getPresetIndex(),
        reducedMotionQuery.matches,
      )
    }

    const syncVisibility = () => {
      if (document.hidden) engineRef.current?.stop()
      else engineRef.current?.start()
    }

    const mountEngine = async () => {
      const { createThreeEngine } = await import('./engine/createThreeEngine')
      if (cancelled) return

      const nextEngine = createThreeEngine()
      if (cancelled) {
        nextEngine.dispose()
        return
      }

      engineRef.current = nextEngine
      nextEngine.mount(container)
      nextEngine.setTheme(themeRef.current)
      syncMotionPreference()
      syncAsset(nextEngine)
      syncVisibility()

      reducedMotionQuery.addEventListener('change', syncMotionPreference)
      document.addEventListener('visibilitychange', syncVisibility)
      container.dataset.threeStatus = 'ready'
    }

    container.dataset.threeStatus = 'loading'
    void mountEngine().catch((error: unknown) => {
      if (cancelled) return
      container.dataset.threeStatus = 'error'
      console.error('Unable to initialize the Three.js background', error)
    })

    return () => {
      cancelled = true
      reducedMotionQuery.removeEventListener('change', syncMotionPreference)
      document.removeEventListener('visibilitychange', syncVisibility)
      engineRef.current?.dispose()
      engineRef.current = null
    }
  }, [getPresetIndex, syncAsset])

  return (
    <div
      ref={containerRef}
      id="portfolio-three-background"
      aria-hidden="true"
      className="three-background"
      data-active-section={activeSection}
      data-three-background
    />
  )
}
