import type { DXFTuple } from '../types/dxf'
import type { Entity } from '../types/entity'
import type { PolylineEntity, Vertex } from '../types/polyline-entity'

import logger from '../util/logger'
import arc from './entity/arc'
import attdef from './entity/attdef'
import attrib from './entity/attrib'
import circle from './entity/circle'
import dgnUnderlay from './entity/dgnUnderlay'
import dimension from './entity/dimension'
import dwfUnderlay from './entity/dwfUnderlay'
import ellipse from './entity/ellipse'
import hatch from './entity/hatch'
import image from './entity/image'
import insert from './entity/insert'
import leader from './entity/leader'
import line from './entity/line'
import lwpolyline from './entity/lwpolyline'
import mleader from './entity/mleader'
import mline from './entity/mline'
import mtext from './entity/mtext'
import ole2Frame from './entity/ole2Frame'
import oleFrame from './entity/oleframe'
import pdfUnderlay from './entity/pdfUnderlay'
import point from './entity/point'
import polyline from './entity/polyline'
import ray from './entity/ray'
import region from './entity/region'
import shape from './entity/shape'
import solid from './entity/solid'
import spline from './entity/spline'
import table from './entity/table'
import text from './entity/text'
import threeDFace from './entity/threeDFace'
import tolerance from './entity/tolerance'
import trace from './entity/trace'
import vertex from './entity/vertex'
import viewport from './entity/viewport'
import wipeout from './entity/wipeout'
import xline from './entity/xline'

interface EntityHandler {
  TYPE: string
  process: (tuples: DXFTuple[]) => Entity
}

const handlers: Record<string, EntityHandler> = [
  point,
  line,
  lwpolyline,
  mline,
  mleader,
  polyline,
  vertex,
  circle,
  arc,
  ellipse,
  spline,
  table,
  solid,
  trace,
  hatch,
  image,
  leader,
  ray,
  region,
  dwfUnderlay,
  dgnUnderlay,
  pdfUnderlay,
  shape,
  mtext,
  tolerance,
  attdef,
  attrib,
  text,
  insert,
  dimension,
  threeDFace,
  viewport,
  ole2Frame,
  oleFrame,
  xline,
  wipeout,
].reduce((acc, mod) => {
  acc[mod.TYPE] = mod
  return acc
}, {} as Record<string, EntityHandler>)

/**
 * Parses entities from DXF tuples
 *
 * @param tuples - Array of DXF tuples representing entities
 * @returns Array of parsed entities
 */
class EntityGroupProcessor {
  private readonly entities: Entity[] = []
  private currentPolyline: PolylineEntity | undefined

  getEntities(): Entity[] {
    return this.entities
  }

  finalize(): void {
    this.flushOpenPolyline('DXF ended with an open POLYLINE (missing SEQEND); flushing open polyline')
  }

  processGroup(tuples: DXFTuple[]): void {
    const entityType = String(tuples[0][1])
    const contentTuples = tuples.slice(1)

    switch (entityType) {
      case 'SEQEND':
        this.endSequence()
        break
      case 'POLYLINE':
        this.startPolyline(contentTuples)
        break
      case 'VERTEX':
        this.addVertex(contentTuples)
        break
      default:
        this.addEntity(entityType, contentTuples)
        break
    }
  }

  private parseEntity(entityType: string, contentTuples: DXFTuple[]): Entity | undefined {
    const handler = handlers[entityType]
    if (!handler) {
      logger.warn('unsupported type in ENTITIES section:', entityType)
      return undefined
    }
    return handler.process(contentTuples)
  }

  private flushOpenPolyline(reason: string): void {
    if (!this.currentPolyline) return
    logger.warn(reason)
    this.currentPolyline = undefined
  }

  private endSequence(): void {
    // SEQEND may also terminate other sequences (e.g. INSERT attributes).
    // Only treat it as significant when we're inside a POLYLINE sequence.
    this.currentPolyline = undefined
  }

  private startPolyline(contentTuples: DXFTuple[]): void {
    this.flushOpenPolyline(
      'POLYLINE started while previous POLYLINE is still open; flushing previous polyline',
    )

    const e = this.parseEntity('POLYLINE', contentTuples)
    if (!e) return

    this.currentPolyline = e as PolylineEntity
    this.entities.push(e)
  }

  private addVertex(contentTuples: DXFTuple[]): void {
    const e = this.parseEntity('VERTEX', contentTuples)
    if (!e) return

    if (!this.currentPolyline) {
      logger.error('ignoring invalid VERTEX entity')
      return
    }

    this.currentPolyline.vertices.push(e as Vertex)
  }

  private addEntity(entityType: string, contentTuples: DXFTuple[]): void {
    this.flushOpenPolyline('POLYLINE sequence ended without SEQEND; flushing open polyline')

    const e = this.parseEntity(entityType, contentTuples)
    if (!e) return
    this.entities.push(e)
  }
}

function processEntityGroups(entityGroups: DXFTuple[][]): Entity[] {
  const processor = new EntityGroupProcessor()
  for (const tuples of entityGroups) {
    processor.processGroup(tuples)
  }
  processor.finalize()
  return processor.getEntities()
}

export default function parseEntities(tuples: DXFTuple[]): Entity[] {
  const entityGroups: DXFTuple[][] = []
  let currentEntityTuples: DXFTuple[] = []

  // First group them together for easy processing
  for (const tuple of tuples) {
    const type = tuple[0]
    if (type === 0) {
      currentEntityTuples = []
      entityGroups.push(currentEntityTuples)
    }
    currentEntityTuples.push(tuple)
  }

  return processEntityGroups(entityGroups)
}
