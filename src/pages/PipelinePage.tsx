import { useEffect } from 'react'

import type { PortfolioContent } from '../content/portfolio'
import { pipelineStageIds } from '../content/portfolio'
import { EndToEndSection } from '../features/pipeline/EndToEndSection'
import { getPipelineStageAnchor } from '../features/pipeline/pipelineNavigation'
import { PageShell } from './PageShell'

interface PipelinePageProps {
  content: PortfolioContent
  focusStageId: string | null
}

export function PipelinePage({ content, focusStageId }: PipelinePageProps) {
  useEffect(() => {
    const stageId = pipelineStageIds.find((id) => id === focusStageId)
    if (!stageId) return
    document
      .getElementById(getPipelineStageAnchor(stageId))
      ?.scrollIntoView({ block: 'start' })
  }, [focusStageId])

  return (
    <PageShell backLabel={content.controls.backToHome}>
      <EndToEndSection content={content} />
    </PageShell>
  )
}
