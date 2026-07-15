import { SectionHeading } from '../../components/ui/SectionHeading'
import type { PortfolioContent } from '../../content/portfolio'
import { useActivePipelineStage } from '../../hooks/useActivePipelineStage'
import { PipelineStageSummary } from './PipelineStageSummary'
import { PipelineTimeline } from './PipelineTimeline'

export function EndToEndSection({ content }: { content: PortfolioContent }) {
  const activeStageId = useActivePipelineStage()

  return (
    <section
      id="pipeline"
      aria-labelledby="pipeline-heading"
      className="scroll-mt-24"
    >
      <SectionHeading id="pipeline-heading" intro={content.pipelineIntro} />

      <PipelineTimeline
        activeStageId={activeStageId}
        label={content.controls.pipelineNavigation}
        stages={content.pipelineStages}
      />

      <div className="mt-8">
        {content.pipelineStages.map((stage, index) => (
          <PipelineStageSummary
            key={stage.id}
            controls={content.controls}
            index={index}
            isActive={stage.id === activeStageId}
            projects={content.projects}
            stage={stage}
            total={content.pipelineStages.length}
          />
        ))}
      </div>
    </section>
  )
}
