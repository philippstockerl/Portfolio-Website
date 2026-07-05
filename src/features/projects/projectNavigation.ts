import type { ProjectId } from '../../content/portfolio'

export function getProjectAnchor(projectId: ProjectId) {
  return `project-${projectId}`
}
