// Utility-specific types

/** Point for utility functions */
export interface UtilPoint {
  x: number
  y: number
  z?: number
}

/** Result of knot insertion operation */
export interface InsertKnotResult {
  knots: number[]
  controlPoints: UtilPoint[]
}

/** Result of bezier conversion */
export interface BezierResult {
  controlPoints: UtilPoint[]
  knots: number[]
}

/** Transform result with bounding box */
export interface TransformResult {
  element: string
  bbox: {
    x: number
    y: number
    width: number
    height: number
  }
}
