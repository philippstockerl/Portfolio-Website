import { SectionHeading } from '../../components/ui/SectionHeading'
import { Tag } from '../../components/ui/Tag'
import type { PortfolioContent } from '../../content/portfolio'
import { getProjectAsset } from '../../three/assets/projectAssetCatalog'
import type {
  AssetLoadStatus,
  ProjectAssetDescriptor,
} from '../../three/assets/types'
import { getProjectAnchor } from './projectNavigation'
import { ProjectVisualizationControls } from './ProjectVisualizationControls'

interface ProjectsSectionProps {
  activeAssetId: string | null
  assetStatus: AssetLoadStatus
  content: PortfolioContent
  onRetryAsset(asset: ProjectAssetDescriptor): void
  onToggleAsset(asset: ProjectAssetDescriptor): void
}

export function ProjectsSection({
  activeAssetId,
  assetStatus,
  content,
  onRetryAsset,
  onToggleAsset,
}: ProjectsSectionProps) {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      data-asset-active={activeAssetId !== null}
      data-asset-state={activeAssetId ? assetStatus.state : 'idle'}
      className="scroll-mt-28"
    >
      <SectionHeading id="projects-heading" intro={content.projectsIntro} />

      <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {content.projects.map((project, index) => {
          const asset = getProjectAsset(project.id)
          const isSelected = asset?.id === activeAssetId

          return (
            <article
              key={project.id}
              id={getProjectAnchor(project.id)}
              data-asset-selected={isSelected}
              className="group flex min-h-80 scroll-mt-28 flex-col rounded-3xl border border-line bg-panel p-6 shadow-lg shadow-black/5 backdrop-blur-lg transition duration-300 hover:-translate-y-1 hover:border-accent/60 hover:bg-panel-strong sm:p-7"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-xs tracking-[0.18em] text-accent">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="h-px flex-1 bg-line" />
              </div>
              <h3 className="mt-7 text-xl font-semibold tracking-[-0.025em] text-ink">
                {project.title}
              </h3>
              <p className="mt-2 text-sm font-medium text-accent">
                {project.subtitle}
              </p>
              <p className="mt-5 flex-1 text-sm leading-6 text-muted">
                {project.description}
              </p>
              <div className="mt-7 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>

              {asset ? (
                <ProjectVisualizationControls
                  asset={asset}
                  assetStatus={assetStatus}
                  controls={content.controls}
                  isSelected={isSelected}
                  projectId={project.id}
                  visualization={project.visualization}
                  onRetryAsset={onRetryAsset}
                  onToggleAsset={onToggleAsset}
                />
              ) : null}
            </article>
          )
        })}
      </div>
    </section>
  )
}
