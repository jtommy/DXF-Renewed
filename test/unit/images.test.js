import expectModule from 'expect'
import fs from 'node:fs'
import { getResourcePath } from './test-helpers.js'
const expect = expectModule.expect || expectModule.default

import { parseString } from '../../src'

describe('IMAGE', () => {
  it('can be parsed', () => {
    const contents = fs.readFileSync(
      getResourcePath(import.meta.url, 'image-basic.dxf'),
      'utf-8',
    )

    const parsed = parseString(contents)

    expect(parsed.entities).toBeDefined()
    expect(parsed.entities.length).toEqual(1)

    const image = parsed.entities[0]
    expect(image.type).toEqual('IMAGE')
    expect(image.handle).toEqual('FF')

    expect(image.insertionPoint).toEqual({ x: 1, y: 2, z: 0 })
    expect(image.uVector).toEqual({ x: 1, y: 0, z: 0 })
    expect(image.vVector).toEqual({ x: 0, y: 1, z: 0 })
    expect(image.pixelSizeX).toEqual(640)
    expect(image.pixelSizeY).toEqual(480)

    expect(image.imageDefHandle).toEqual('AD')
    expect(image.imageDefReactorHandle).toEqual('AE')
  })
})
