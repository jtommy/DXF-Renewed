// SVG-specific types

import type { Box2 } from 'vecks'

/** Bounding box with SVG element */
export interface BoundsAndElement {
  bbox: Box2
  element: string
  x?: number
  y?: number
  x2?: number
  y2?: number
}

/** Ellipse parameters for SVG */
export interface EllipseParams {
  cx: number
  cy: number
  rx: number
  ry: number
  rotation: number
}

/** Layer information */
export interface Layer {
  name: string
  colorNumber?: number
  color?: number
  frozen?: boolean
  [key: string]: unknown
}
