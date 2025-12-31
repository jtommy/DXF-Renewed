import expectModule from 'expect'
import fs from 'node:fs'
import { getResourcePath } from './test-helpers.js'
const expect = expectModule.expect || expectModule.default

import { parseString } from '../../src'

describe('UNDERLAY', () => {
  it('parses DWFUNDERLAY entity and UNDERLAYDEFINITION object', () => {
    const contents = fs.readFileSync(
      getResourcePath(import.meta.url, 'underlay-basic.dxf'),
      'utf-8',
    )

    const parsed = parseString(contents)

    expect(parsed.entities.length).toEqual(1)
    const entity = parsed.entities[0]

    expect(entity.type).toEqual('DWFUNDERLAY')
    expect(entity.handle).toEqual('UA')
    expect(entity.underlayDefinitionHandle).toEqual('UD')
    expect(entity.insertionPoint).toEqual({ x: 10, y: 20, z: 0 })
    expect(entity.scale).toEqual({ x: 1, y: 1, z: 1 })

    expect(parsed.objects).toBeDefined()
    expect(parsed.objects.underlayDefinitions).toBeDefined()
    expect(parsed.objects.underlayDefinitions.UD).toBeDefined()
    expect(parsed.objects.underlayDefinitions.UD.handle).toEqual('UD')
    expect(parsed.objects.underlayDefinitions.UD.fileName).toEqual('file.dwf')
    expect(parsed.objects.underlayDefinitions.UD.underlayName).toEqual('Sheet1')
  })
})
