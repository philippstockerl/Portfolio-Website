import { useCallback, useEffect, useState } from 'react'

import { MatrixRain } from '../components/background/MatrixRain'
import { SiteFooter } from '../components/layout/SiteFooter'
import { SiteHeader } from '../components/layout/SiteHeader'
import { SocialRail } from '../components/layout/SocialRail'
import { portfolioContent } from '../content/portfolio'
import { ExperiencePage } from '../pages/ExperiencePage'
import { HomePage } from '../pages/HomePage'
import { PipelinePage } from '../pages/PipelinePage'
import { ProjectsPage } from '../pages/ProjectsPage'
import { SkillsPage } from '../pages/SkillsPage'
import { ThreeBackground } from '../three/ThreeBackground'
import type {
  AssetLoadStatus,
  ProjectAssetDescriptor,
} from '../three/assets/types'
import { useActiveSection } from '../hooks/useActiveSection'
import { useHashRoute } from '../hooks/useHashRoute'
import { useLanguage } from './providers/useLanguage'
import { useTheme } from './providers/useTheme'

export function App() {
  const route = useHashRoute()
  const { locale, toggleLocale } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const content = portfolioContent[locale]
  const scrolledSection = useActiveSection(route.page)
  const activeSection = route.page === 'hero' ? scrolledSection : route.page
  const [selectedAsset, setSelectedAsset] =
    useState<ProjectAssetDescriptor | null>(null)
  const [assetStatus, setAssetStatus] = useState<AssetLoadStatus>({
    assetId: null,
    state: 'idle',
  })
  const [assetRequestKey, setAssetRequestKey] = useState(0)

  const toggleAsset = useCallback((asset: ProjectAssetDescriptor) => {
    setSelectedAsset((current) => (current?.id === asset.id ? null : asset))
  }, [])

  const retryAsset = useCallback((asset: ProjectAssetDescriptor) => {
    setSelectedAsset(asset)
    setAssetRequestKey((current) => current + 1)
  }, [])

  // Drop the selected visualization when leaving the projects page.
  const [assetPage, setAssetPage] = useState(route.page)
  if (assetPage !== route.page) {
    setAssetPage(route.page)
    if (route.page !== 'projects') setSelectedAsset(null)
  }

  useEffect(() => {
    // Detail routes scroll to their own anchor inside the page.
    if (route.detail) return
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [route])

  return (
    <div className="relative isolate min-h-screen bg-page text-ink">
      <a
        href="#main-content"
        className="fixed top-3 left-3 z-[100] -translate-y-20 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-contrast transition focus:translate-y-0"
      >
        {content.controls.skipToContent}
      </a>

      <ThreeBackground
        activeSection={activeSection}
        asset={route.page === 'projects' ? selectedAsset : null}
        assetRequestKey={assetRequestKey}
        theme={theme}
        onAssetStatusChange={setAssetStatus}
      />
      {theme === 'matrix' ? <MatrixRain /> : null}
      <SiteHeader
        activeSection={activeSection}
        content={content}
        locale={locale}
        theme={theme}
        onToggleLocale={toggleLocale}
        onToggleTheme={toggleTheme}
      />
      <SocialRail label={content.controls.socialLinks} />

      <main id="main-content" className="relative z-10">
        {route.page === 'hero' ? (
          <HomePage content={content} />
        ) : route.page === 'pipeline' ? (
          <PipelinePage content={content} focusStageId={route.detail} />
        ) : route.page === 'projects' ? (
          <ProjectsPage
            activeAssetId={selectedAsset?.id ?? null}
            assetStatus={assetStatus}
            content={content}
            focusProjectId={route.detail}
            onRetryAsset={retryAsset}
            onToggleAsset={toggleAsset}
          />
        ) : route.page === 'experience' ? (
          <ExperiencePage content={content} />
        ) : (
          <SkillsPage content={content} />
        )}
      </main>
      <SiteFooter content={content} />
    </div>
  )
}
