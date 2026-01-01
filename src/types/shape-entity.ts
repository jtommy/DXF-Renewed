// SHAPE entity type

import type { BaseEntity } from './base-entity'
import type { Point3D } from './common'

export interface ShapeEntity extends BaseEntity {
  type: 'SHAPE'
  insertionPoint: Point3D
  /** Shape name (from a loaded SHX shape file). */
  name: string
  /** Size in drawing units. */
  size: number
  rotation?: number
  relativeXScale?: number
  oblique?: number
  thickness?: number
  extrusionX?: number
  extrusionY?: number
}
