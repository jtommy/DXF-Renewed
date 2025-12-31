// UNDERLAY entity types (DWFUNDERLAY / DGNUNDERLAY)

import type { BaseEntity } from './base-entity'
import type { Point3D } from './common'

export interface UnderlayReferenceEntityBase extends BaseEntity {
  insertionPoint: Point3D
  scale: Point3D
  rotation?: number
  normal?: Point3D

  /** Hard reference to UNDERLAYDEFINITION object. */
  underlayDefinitionHandle?: string

  /** Display properties bitmask. */
  flags?: number

  /** Contrast in range [0, 100]. */
  contrast?: number

  /** Fade in range [0, 100]. */
  fade?: number
}

export interface DwfUnderlayEntity extends UnderlayReferenceEntityBase {
  type: 'DWFUNDERLAY'
}

export interface DgnUnderlayEntity extends UnderlayReferenceEntityBase {
  type: 'DGNUNDERLAY'
}
