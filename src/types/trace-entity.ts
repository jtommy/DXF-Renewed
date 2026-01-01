// TRACE entity type

import type { BaseEntity } from './base-entity'
import type { Point3D } from './common'

export interface TraceEntity extends BaseEntity {
  type: 'TRACE'

  /** Four corner points (10/20/30, 11/21/31, 12/22/32, 13/23/33). */
  corners: Point3D[]

  /** Optional thickness (39). */
  thickness?: number
}
