// WIPEOUT entity type

import type { BaseEntity } from './base-entity'
import type { Point2D, Point3D } from './common'

export interface WipeoutEntity extends BaseEntity {
  type: 'WIPEOUT'

  insertionPoint: Point3D
  uVector: Point3D
  vVector: Point3D

  clipBoundaryType?: 1 | 2
  clipBoundaryVertices?: Point2D[]

  displayProperties?: number
  clippingState?: 0 | 1
  classVersion?: number
  imageSizePixels?: { u: number; v: number }
}
