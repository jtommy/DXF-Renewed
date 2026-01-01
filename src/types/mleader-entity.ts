import type { BaseEntity } from './base-entity'

export interface MLeaderEntity extends BaseEntity {
  type: 'MLEADER'

  styleName?: string
  text?: string
}
