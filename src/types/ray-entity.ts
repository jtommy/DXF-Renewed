// RAY entity type

import type { BaseEntity } from './base-entity'
import type { Point3D } from './common'

export interface RayEntity extends BaseEntity {
  type: 'RAY'
  /** Starting point for the ray. */
  start: Point3D
  /** Unit direction vector. */
  direction: Point3D
}
