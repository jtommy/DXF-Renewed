// LEADER entity type

import type { BaseEntity } from './base-entity'
import type { Point3D } from './common'

export interface LeaderEntity extends BaseEntity {
  type: 'LEADER'

  /** Leader vertices, in drawing coordinates. */
  vertices: Point3D[]

  /** Dimension style name. */
  dimensionStyleName?: string

  /** Arrowhead flag: 0 = Disabled; 1 = Enabled. */
  arrowheadFlag?: number

  /** Leader path type: 0 = Straight line segments; 1 = Spline. */
  pathType?: number

  /** Leader creation flag: 0 = text; 1 = tolerance; 2 = insert; 3 = none. */
  creationFlag?: number

  hooklineDirectionFlag?: number
  hooklineFlag?: number

  textHeight?: number
  textWidth?: number

  /** Color to use if leader's DIMCLR D = BYBLOCK. */
  color?: number

  /** Hard reference to associated annotation entity. */
  annotationHandle?: string

  normal?: Point3D
  horizontalDirection?: Point3D
  blockOffset?: Point3D
  annotationOffset?: Point3D
}
