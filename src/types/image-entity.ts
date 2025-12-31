// IMAGE entity type

import type { BaseEntity } from './base-entity'
import type { Point3D } from './common'

export interface ImageEntity extends BaseEntity {
  type: 'IMAGE'

  insertionPoint: Point3D
  uVector: Point3D
  vVector: Point3D

  /** Image size in pixels. */
  pixelSizeX: number
  pixelSizeY: number

  /** Hard reference to IMAGEDEF object. */
  imageDefHandle?: string

  /** Hard reference to IMAGEDEF_REACTOR object. */
  imageDefReactorHandle?: string

  /** Image display properties bitmask. */
  displayProperties?: number

  /** Clipping state: 0 = Off; 1 = On. */
  clippingState?: number

  brightness?: number
  contrast?: number
  fade?: number

  /** DXF class version. */
  classVersion?: number
}
