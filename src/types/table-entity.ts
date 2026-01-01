import type { BaseEntity } from './base-entity'

export interface TableEntity extends BaseEntity {
  type: 'TABLE'

  rows?: number
  columns?: number

  /**
   * Minimal extracted cell text (from group code 1).
   * This is intentionally lossy; full TABLE semantics are not implemented.
   */
  cellText?: string[]
}
