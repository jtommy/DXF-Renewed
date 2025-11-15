import type { DXFTuple } from '../types/dxf'
import type { Entity } from '../types/entity'
import type { PolylineEntity } from '../types/polyline-entity'

import logger from '../util/logger'
import arc from './entity/arc'
import attdef from './entity/attdef'
import attrib from './entity/attrib'
import circle from './entity/circle'
import dimension from './entity/dimension'
import ellipse from './entity/ellipse'
import hatch from './entity/hatch'
import insert from './entity/insert'
import line from './entity/line'
import lwpolyline from './entity/lwpolyline'
import mtext from './entity/mtext'
import ole2Frame from './entity/ole2Frame'
import point from './entity/point'
import polyline from './entity/polyline'
import solid from './entity/solid'
import spline from './entity/spline'
import text from './entity/text'
import threeDFace from './entity/threeDFace'
import vertex from './entity/vertex'
import viewport from './entity/viewport'

interface EntityHandler {
  TYPE: string
  process: (tuples: DXFTuple[]) => Entity
}

const handlers: Record<string, EntityHandler> = [
  point,
  line,
  lwpolyline,
  polyline,
  vertex,
  circle,
  arc,
  ellipse,
  spline,
  solid,
  hatch,
  mtext,
  attdef,
  attrib,
  text,
  insert,
  dimension,
  threeDFace,
  viewport,
  ole2Frame,
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
export default function parseEntities(tuples: DXFTuple[]): Entity[] {
  const entities: Entity[] = []
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

  let currentPolyline: PolylineEntity | undefined
  for (const tuples of entityGroups) {
    const entityType = tuples[0][1]
    const contentTuples = tuples.slice(1)

    if (entityType in handlers) {
      const e = handlers[entityType].process(contentTuples)
      // "POLYLINE" cannot be parsed in isolation, it is followed by
      // N "VERTEX" entities and ended with a "SEQEND" entity.
      // Essentially we convert POLYLINE to LWPOLYLINE - the extra
      // vertex flags are not supported
      if (entityType === 'POLYLINE') {
        currentPolyline = e as PolylineEntity
        entities.push(e)
      } else if (entityType === 'VERTEX') {
        if (currentPolyline) {
          currentPolyline.vertices.push(e as any)
        } else {
          logger.error('ignoring invalid VERTEX entity')
        }
      } else if (entityType === 'SEQEND') {
        currentPolyline = undefined
      } else {
        // All other entities
        entities.push(e)
      }
    } else {
      logger.warn('unsupported type in ENTITIES section:', entityType)
    }
  }

  return entities
}
