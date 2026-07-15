import { useEffect } from 'react'

import type { PortfolioContent } from '../content/portfolio'
import { projectIds } from '../content/portfolio'
import { ProjectsSection } from '../features/projects/ProjectsSection'
import { getProjectAnchor } from '../features/projects/projectNavigation'
import type {
  AssetLoadStatus,
  ProjectAssetDescriptor,
} from '../three/assets/types'
import { PageShell } from './PageShell'

interface ProjectsPageProps {
  activeAssetId: string | null
  assetStatus: AssetLoadStatus
  content: PortfolioContent
  focusProjectId: string | null
  onRetryAsset(asset: ProjectAssetDescriptor): void
  onToggleAsset(asset: ProjectAssetDescriptor): void
}

export function ProjectsPage({
  activeAssetId,
  assetStatus,
  content,
  focusProjectId,
  onRetryAsset,
  onToggleAsset,
}: ProjectsPageProps) {
  useEffect(() => {
    const projectId = projectIds.find((id) => id === focusProjectId)
    if (!projectId) return
    document
      .getElementById(getProjectAnchor(projectId))
      ?.scrollIntoView({ block: 'start' })
  }, [focusProjectId])

  return (
    <PageShell backLabel={content.controls.backToHome}>
      <ProjectsSection
        activeAssetId={activeAssetId}
        assetStatus={assetStatus}
        content={content}
        onRetryAsset={onRetryAsset}
        onToggleAsset={onToggleAsset}
      />
    </PageShell>
  )
}
