import type { PortfolioContent } from '../content/portfolio'
import { HeroSection } from '../features/hero/HeroSection'
import { ExperienceTeaser } from '../features/home/ExperienceTeaser'
import { PipelineTeaser } from '../features/home/PipelineTeaser'
import { ProjectsTeaser } from '../features/home/ProjectsTeaser'
import { SkillsTeaser } from '../features/home/SkillsTeaser'

export function HomePage({ content }: { content: PortfolioContent }) {
  return (
    <>
      <HeroSection hero={content.hero} />
      <div className="px-4 pb-36 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-28 sm:space-y-44">
          <PipelineTeaser content={content} />
          <ProjectsTeaser content={content} />
          <ExperienceTeaser content={content} />
          <SkillsTeaser content={content} />
        </div>
      </div>
    </>
  )
}
