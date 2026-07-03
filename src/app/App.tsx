import { useCallback, useState } from 'react'

import { SiteFooter } from '../components/layout/SiteFooter'
import { SiteHeader } from '../components/layout/SiteHeader'
import { SocialRail } from '../components/layout/SocialRail'
import { portfolioContent } from '../content/portfolio'
import { ExperienceSection } from '../features/experience/ExperienceSection'
import { HeroSection } from '../features/hero/HeroSection'
import { ProjectsSection } from '../features/projects/ProjectsSection'
import { SkillsSection } from '../features/skills/SkillsSection'
import { ThreeBackground } from '../three/ThreeBackground'
import type {
  AssetLoadStatus,
  ProjectAssetDescriptor,
} from '../three/assets/types'
import { useActiveSection } from '../hooks/useActiveSection'
import { useLanguage } from './providers/useLanguage'
import { useTheme } from './providers/useTheme'

export function App() {
  const { locale, toggleLocale } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const content = portfolioContent[locale]
  const activeSection = useActiveSection()
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
        asset={activeSection === 'projects' ? selectedAsset : null}
        assetRequestKey={assetRequestKey}
        theme={theme}
        onAssetStatusChange={setAssetStatus}
      />
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
        <HeroSection hero={content.hero} />
        <div className="space-y-8 px-4 pb-20 sm:px-6 lg:px-8">
          <ProjectsSection
            activeAssetId={
              activeSection === 'projects' ? (selectedAsset?.id ?? null) : null
            }
            assetStatus={assetStatus}
            content={content}
            onRetryAsset={retryAsset}
            onToggleAsset={toggleAsset}
          />
          <ExperienceSection content={content} />
          <SkillsSection content={content} />
        </div>
      </main>
      <SiteFooter content={content} />
    </div>
  )
}
