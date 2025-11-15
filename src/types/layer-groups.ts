// Layer grouping types

import type { Entity } from './entity'

/** Entities grouped by layer */
export interface LayerGroups {
  [layerName: string]: Entity[]
}
