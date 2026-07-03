import type {
  PortfolioContent,
  ProjectId,
  ProjectVisualizationContent,
} from '../../content/portfolio'
import type {
  AssetLoadStatus,
  ProjectAssetDescriptor,
} from '../../three/assets/types'

interface ProjectVisualizationControlsProps {
  asset: ProjectAssetDescriptor
  assetStatus: AssetLoadStatus
  controls: PortfolioContent['controls']
  isSelected: boolean
  onRetryAsset(asset: ProjectAssetDescriptor): void
  onToggleAsset(asset: ProjectAssetDescriptor): void
  projectId: ProjectId
  visualization?: ProjectVisualizationContent
}

export function ProjectVisualizationControls({
  asset,
  assetStatus,
  controls,
  isSelected,
  onRetryAsset,
  onToggleAsset,
  projectId,
  visualization,
}: ProjectVisualizationControlsProps) {
  const statusId = `${projectId}-visualization-status`
  const captionId = `${projectId}-visualization-caption`
  const selectedState =
    isSelected && assetStatus.assetId === asset.id
      ? assetStatus.state
      : 'loading'

  return (
    <div className="mt-6 border-t border-line pt-5">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          aria-busy={selectedState === 'loading'}
          aria-controls="portfolio-three-background"
          aria-describedby={
            isSelected
              ? `${statusId}${visualization ? ` ${captionId}` : ''}`
              : undefined
          }
          aria-pressed={isSelected}
          className="inline-flex min-h-11 cursor-pointer items-center rounded-full border border-accent/50 bg-panel-strong px-4 py-2 text-sm font-semibold text-ink transition hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          onClick={() => onToggleAsset(asset)}
        >
          {isSelected ? controls.hideVisualization : controls.showVisualization}
        </button>

        {isSelected && selectedState === 'error' ? (
          <button
            type="button"
            aria-controls="portfolio-three-background"
            aria-describedby={statusId}
            className="inline-flex min-h-11 cursor-pointer items-center rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-contrast transition hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            onClick={() => onRetryAsset(asset)}
          >
            {controls.retryVisualization}
          </button>
        ) : null}
      </div>

      {isSelected ? (
        <div className="mt-4 space-y-4">
          <p
            id={statusId}
            role="status"
            aria-atomic="true"
            aria-live="polite"
            className="text-xs leading-5 text-muted"
          >
            {selectedState === 'loading'
              ? controls.visualizationLoading
              : selectedState === 'error'
                ? controls.visualizationError
                : controls.visualizationReady}
          </p>

          {visualization ? (
            <div
              id={captionId}
              className="rounded-2xl border border-line bg-panel-strong p-4"
            >
              <p className="text-sm font-semibold text-ink">
                {visualization.title}
              </p>
              <p className="mt-2 text-xs leading-5 text-muted">
                {visualization.description}
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {visualization.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-line px-2.5 py-1 font-mono text-[0.65rem] tracking-wide text-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <p className="hidden text-xs leading-5 text-muted motion-reduce:block">
            {controls.visualizationReducedMotion}
          </p>
        </div>
      ) : null}
    </div>
  )
}
