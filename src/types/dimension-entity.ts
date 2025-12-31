// DIMENSION entity type

import type { BaseEntity } from './base-entity'
import type { Point3D } from './common'

export interface DimensionEntity extends BaseEntity {
  type: 'DIMENSION'
  block?: string
  start: Point3D
  /**
   * Angular vertex for DIMENSION type 5 (Angular 3-point).
   * This is parsed from group codes 15/25/35.
   */
  angleVertex?: Point3D

  /**
   * Angular arc location point for DIMENSION angular types.
   * This is parsed from group codes 16/26/36 (OCS in the DXF reference).
   */
  arcPoint?: Point3D
  measureStart: Point3D
  measureEnd: Point3D
  textMidpoint: Point3D
  rotation?: number
  horizonRotation?: number
  extensionRotation?: number
  textRotation?: number
  attachementPoint: number
  dimensionType: number
  extrudeDirection?: Point3D
  text?: string
  styleName?: string
  [key: string]: unknown
}
