// Handler-internal types (não exportados na API pública)

/** Common properties extracted from DXF tuples */
export interface CommonEntityProperties {
  handle?: string
  lineTypeName?: string
  layer?: string
  lineTypeScale?: number
  visible?: boolean
  colorNumber?: number
  paperSpace?: number
  viewportOn?: number
  viewport?: number
  extrusionX?: number
  extrusionY?: number
  extrusionZ?: number
  layout?: string
}

/** Simple codes extraction result */
export interface SimpleCodes {
  [code: number]: string | number
}

/** Bit combinations result for dimensions */
export interface BitCombinationsResult {
  attachmentPoint?: number
  [key: string]: number | undefined
}

/** Polyline vertex with bulge */
export interface PolylineVertex {
  x: number
  y: number
  z?: number
  bulge?: number
}

/** Control point for splines */
export interface ControlPoint {
  x: number
  y: number
  z?: number
  weight?: number
}

/** Vertex for polylines - internal handler use */
export interface HandlerVertex {
  x: number
  y: number
  z?: number
  bulge?: number
  startWidth?: number
  endWidth?: number
}
