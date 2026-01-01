// XLINE entity type

import type { BaseEntity } from './base-entity'
import type { Point3D } from './common'

export interface XLineEntity extends BaseEntity {
  type: 'XLINE'
  /** Base point for the infinite line. */
  basePoint: Point3D
  /** Unit direction vector. */
  direction: Point3D
}
