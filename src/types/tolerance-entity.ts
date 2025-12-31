// TOLERANCE entity type (feature control frame)

import type { BaseEntity } from './base-entity'
import type { Point3D } from './common'

export interface ToleranceEntity extends BaseEntity {
  type: 'TOLERANCE'

  /** Insertion point (WCS). */
  insertionPoint: Point3D

  /** Raw tolerance string (may include control codes like %%v). */
  text?: string

  /** Dimension style name (group code 3). */
  dimensionStyleName?: string

  /** X-axis direction vector (group codes 11/21/31). */
  xAxisDirection?: Point3D
}
