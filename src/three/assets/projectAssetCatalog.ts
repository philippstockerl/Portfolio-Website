import type { ProjectId } from '../../content/portfolio'
import { publicAsset } from '../../lib/publicAsset'
import type { ProjectAssetDescriptor } from './types'

export const projectAssetCatalog = {
  'robust-path-planning': {
    id: 'robust-path-planning-visualization',
    items: [
      {
        billboard: true,
        height: 50,
        id: 'robust-formulation',
        position: [-52, 18, -100],
        src: publicAsset('assets/project-media/robust-formulation.png'),
        type: 'image',
        width: 88,
      },
      {
        billboard: true,
        height: 64,
        id: 'random-cost-field',
        position: [48, 18, -100],
        src: publicAsset('assets/project-media/randomfield.webm'),
        type: 'video',
        width: 64,
      },
    ],
    layout: {
      mobile: { position: [12, -4, 0], scale: 0.62 },
      laptop: { position: [22, -2, 0], scale: 0.84 },
      desktop: { position: [32, 0, 0], scale: 0.92 },
      ultrawide: { position: [44, 0, 0], scale: 1 },
    },
    presetIndex: 8,
  },
  'operations-research': {
    id: 'network-flow-model',
    items: [
      {
        id: 'network-flow',
        position: [0, 15, -100],
        rotation: [0, -0.3, 0],
        src: publicAsset('assets/models/networkFlow.glb'),
        targetSize: 105,
        type: 'gltf',
      },
    ],
    layout: {
      mobile: { position: [18, -4, 0], scale: 0.78 },
      laptop: { position: [34, 0, 0], scale: 0.92 },
      desktop: { position: [48, 2, 0], scale: 1.05 },
      ultrawide: { position: [62, 4, 0], scale: 1.12 },
    },
    presetIndex: 10,
  },
  'business-processes': {
    id: 'process-flow-visualization',
    items: [
      {
        billboard: true,
        height: 68,
        id: 'process-flow',
        position: [0, 18, -100],
        src: publicAsset('assets/project-media/process-flow.webm'),
        type: 'video',
        width: 120,
      },
    ],
    layout: {
      mobile: { position: [12, -5, 0], scale: 0.68 },
      laptop: { position: [28, -2, 0], scale: 0.86 },
      desktop: { position: [42, 0, 0], scale: 0.96 },
      ultrawide: { position: [56, 0, 0], scale: 1.04 },
    },
    presetIndex: 12,
  },
} as const satisfies Partial<Record<ProjectId, ProjectAssetDescriptor>>

export function getProjectAsset(
  projectId: ProjectId,
): ProjectAssetDescriptor | undefined {
  return (
    projectAssetCatalog as Partial<Record<ProjectId, ProjectAssetDescriptor>>
  )[projectId]
}
