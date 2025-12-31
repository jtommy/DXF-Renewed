import expectModule from 'expect'
import fs from 'node:fs'
import { getResourcePath } from './test-helpers.js'
const expect = expectModule.expect || expectModule.default

import { parseString } from '../../src'

describe('Objects', () => {
  it('parses DICTIONARY objects into a handle map', () => {
    const contents = fs.readFileSync(
      getResourcePath(import.meta.url, 'dictionary-basic.dxf'),
      'utf-8',
    )

    const parsed = parseString(contents)

    expect(parsed.objects).toBeDefined()
    expect(parsed.objects.dictionaries).toBeDefined()
    expect(parsed.objects.dictionaries.AB).toBeDefined()
    expect(parsed.objects.dictionaries.AB.handle).toEqual('AB')
    expect(parsed.objects.dictionaries.AB.entries.MYKEY).toEqual('CD')
  })

  it('parses XRECORD objects into a handle map', () => {
    const contents = fs.readFileSync(
      getResourcePath(import.meta.url, 'xrecord-basic.dxf'),
      'utf-8',
    )

    const parsed = parseString(contents)

    expect(parsed.objects).toBeDefined()
    expect(parsed.objects.xRecords).toBeDefined()
    expect(parsed.objects.xRecords.AB).toBeDefined()
    expect(parsed.objects.xRecords.AB.handle).toEqual('AB')

    const tuples = parsed.objects.xRecords.AB.tuples
    expect(tuples).toEqual(expect.arrayContaining([[1, 'HELLO'], [40, 3.14]]))
  })

  it('parses IMAGEDEF and IMAGEDEF_REACTOR objects into handle maps', () => {
    const contents = fs.readFileSync(
      getResourcePath(import.meta.url, 'imagedef-basic.dxf'),
      'utf-8',
    )

    const parsed = parseString(contents)

    expect(parsed.objects).toBeDefined()
    expect(parsed.objects.imageDefs).toBeDefined()
    expect(parsed.objects.imageDefs.AD).toBeDefined()
    expect(parsed.objects.imageDefs.AD.handle).toEqual('AD')
    expect(parsed.objects.imageDefs.AD.fileName).toEqual('my.png')
    expect(parsed.objects.imageDefs.AD.pixelSizeX).toEqual(640)
    expect(parsed.objects.imageDefs.AD.pixelSizeY).toEqual(480)

    expect(parsed.objects.imageDefReactors).toBeDefined()
    expect(parsed.objects.imageDefReactors.AE).toBeDefined()
    expect(parsed.objects.imageDefReactors.AE.handle).toEqual('AE')
    expect(parsed.objects.imageDefReactors.AE.imageHandle).toEqual('FF')
  })
})
