import type { PipelineStageId } from '../../content/portfolio'

export function getPipelineStageAnchor(stageId: PipelineStageId) {
  return `pipeline-stage-${stageId}` as const
}
