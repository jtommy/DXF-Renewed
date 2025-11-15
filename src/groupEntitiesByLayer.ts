import type { Entity, LayerGroups } from './types'

export default function groupEntitiesByLayer(
  entities: Entity[],
): LayerGroups {
  return entities.reduce((acc: LayerGroups, entity) => {
    const layer = entity.layer ?? '0'
    if (!acc[layer]) {
      acc[layer] = []
    }
    acc[layer].push(entity)
    return acc
  }, {})
}
