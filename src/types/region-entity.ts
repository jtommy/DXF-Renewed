import type { BaseEntity } from './base-entity'

export interface RegionEntity extends BaseEntity {
  type: 'REGION'

  /**
   * ACIS data payload (text form). This project currently parses and stores it,
   * but does not attempt to interpret it.
   */
  acisData?: string[]
}
