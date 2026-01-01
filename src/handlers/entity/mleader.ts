import type { DXFTuple } from '../../types'

import common from './common'

export const TYPE = 'MLEADER'

interface MLeaderEntity {
  type: typeof TYPE

  styleName?: string
  text?: string

  [key: string]: unknown
}

export const process = (tuples: DXFTuple[]): MLeaderEntity => {
  return tuples.reduce(
    (entity, tuple) => {
      const code = tuple[0]
      const value = tuple[1]

      switch (code) {
        // Style name
        case 2:
          entity.styleName = String(value)
          break

        // Text string (simplified). MLEADER text can also be stored in more complex structures.
        case 1:
          entity.text = String(value)
          break

        default:
          Object.assign(entity, common(code, value))
          break
      }

      return entity
    },
    {
      type: TYPE,
    } as MLeaderEntity,
  )
}

export default { TYPE, process }
