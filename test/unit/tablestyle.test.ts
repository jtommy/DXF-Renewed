import expectModule from 'expect'
import fs from 'fs'
import { getResourcePath } from './test-helpers.ts'
const expect = expectModule.expect || expectModule.default

import { parseString } from '../../src'

describe('OBJECTS - TABLESTYLE', () => {
  it('parses TABLESTYLE object from fixture', () => {
    const dxfContents = fs.readFileSync(
      getResourcePath(import.meta.url, 'tablestyle-basic.dxf'),
      'utf-8',
    )
    const parsed = parseString(dxfContents)

    expect(parsed.objects).toBeDefined()
    expect(parsed.objects?.tableStyles).toBeDefined()

    const tableStyles = parsed.objects?.tableStyles || {}
    const handles = Object.keys(tableStyles)
    expect(handles.length).toBeGreaterThan(0)

    const tableStyle = tableStyles[handles[0]]
    expect(tableStyle).toBeDefined()
    expect(tableStyle.type).toBe('TABLESTYLE')
    expect(tableStyle.handle).toBe('D')
    expect(tableStyle.name).toBe('Standard')
  })

  it('parses TABLESTYLE from inline DXF', () => {
    const dxf = `0
SECTION
2
OBJECTS
0
TABLESTYLE
5
ABC
330
C
100
AcDbTableStyle
3
MyTableStyle
70
0
0
ENDSEC
0
EOF
`
    const parsed = parseString(dxf)

    expect(parsed.objects?.tableStyles).toBeDefined()
    expect(parsed.objects?.tableStyles?.['ABC']).toBeDefined()
    expect(parsed.objects?.tableStyles?.['ABC'].type).toBe('TABLESTYLE')
    expect(parsed.objects?.tableStyles?.['ABC'].name).toBe('MyTableStyle')
    expect(parsed.objects?.tableStyles?.['ABC'].handle).toBe('ABC')
  })

  it('does not crash when TABLESTYLE is missing handle', () => {
    const dxf = `0
SECTION
2
OBJECTS
0
TABLESTYLE
3
NoHandle
0
ENDSEC
0
EOF
`
    const parsed = parseString(dxf)
    expect(parsed.objects?.tableStyles).toBeDefined()
  })
})
