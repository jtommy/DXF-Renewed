import type { BaseEntity } from './base-entity'
import type { Point3D } from './common'

export interface MLineEntity extends BaseEntity {
  type: 'MLINE'

  startPoint?: Point3D
  endPoint?: Point3D

  vertexCount?: number
  styleName?: string
}
