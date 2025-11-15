// Polyline conversion types

import type { ColorRGB, PointTuple } from './common'

/** Polyline with color information */
export interface Polyline {
  vertices: PointTuple[]
  rgb?: ColorRGB
  color?: number
}

/** Result of toPolylines conversion */
export interface PolylineResult {
  polylines: Polyline[]
}

/** Options for entityToPolyline conversion */
export interface EntityToPolylineOptions {
  interpolationsPerSplineSegment?: number
}
