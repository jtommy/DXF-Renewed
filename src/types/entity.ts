// Union type for all entity types

import type { ArcEntity } from './arc-entity'
import type { BaseEntity } from './base-entity'
import type { CircleEntity } from './circle-entity'
import type { DimensionEntity } from './dimension-entity'
import type { EllipseEntity } from './ellipse-entity'
import type { HatchEntity } from './hatch-entity'
import type { ImageEntity } from './image-entity'
import type { InsertEntity } from './insert-entity'
import type { LeaderEntity } from './leader-entity'
import type { LineEntity } from './line-entity'
import type { MTextEntity } from './mtext-entity'
import type { PointEntity } from './point-entity'
import type { PolylineEntity } from './polyline-entity'
import type { SolidEntity } from './solid-entity'
import type { SplineEntity } from './spline-entity'
import type { TextEntity } from './text-entity'
import type { ToleranceEntity } from './tolerance-entity'
import type { DgnUnderlayEntity, DwfUnderlayEntity } from './underlay-entity'

export type Entity =
  | LineEntity
  | CircleEntity
  | ArcEntity
  | EllipseEntity
  | TextEntity
  | MTextEntity
  | PointEntity
  | PolylineEntity
  | SplineEntity
  | DimensionEntity
  | SolidEntity
  | InsertEntity
  | ImageEntity
  | LeaderEntity
  | ToleranceEntity
  | DwfUnderlayEntity
  | DgnUnderlayEntity
  | HatchEntity
  | BaseEntity
