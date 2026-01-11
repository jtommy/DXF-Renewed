import expectModule from 'expect'
import fs from 'fs'
import { getResourcePath } from './test-helpers.ts'
const expect = expectModule.expect || expectModule.default

import { parseString } from '../../src'

describe('OBJECTS - GROUP', () => {
  it('parses GROUP object from fixture', () => {
    const dxfContents = fs.readFileSync(
      getResourcePath(import.meta.url, 'group-basic.dxf'),
      'utf-8',
    )
    const parsed = parseString(dxfContents)

    expect(parsed.objects).toBeDefined()
    expect(parsed.objects?.groups).toBeDefined()

    const groups = parsed.objects?.groups || {}
    const handles = Object.keys(groups)
    expect(handles.length).toBeGreaterThan(0)

    const group = groups[handles[0]]
    expect(group).toBeDefined()
    expect(group.type).toBe('GROUP')
    expect(group.handle).toBe('E')
    expect(group.name).toBe('MyGroup')
    expect(group.entityHandles).toBeDefined()
    expect(group.entityHandles?.length).toBe(2)
    expect(group.entityHandles).toContain('100')
    expect(group.entityHandles).toContain('101')
  })

  it('parses GROUP from inline DXF', () => {
    const dxf = `0
SECTION
2
OBJECTS
0
GROUP
5
XYZ
330
C
100
AcDbGroup
300
TestGroup
70
0
340
AAA
340
BBB
340
CCC
0
ENDSEC
0
EOF
`
    const parsed = parseString(dxf)

    expect(parsed.objects?.groups).toBeDefined()
    expect(parsed.objects?.groups?.['XYZ']).toBeDefined()
    expect(parsed.objects?.groups?.['XYZ'].type).toBe('GROUP')
    expect(parsed.objects?.groups?.['XYZ'].name).toBe('TestGroup')
    expect(parsed.objects?.groups?.['XYZ'].handle).toBe('XYZ')
    expect(parsed.objects?.groups?.['XYZ'].entityHandles).toEqual(['AAA', 'BBB', 'CCC'])
  })

  it('does not crash when GROUP is missing handle', () => {
    const dxf = `0
SECTION
2
OBJECTS
0
GROUP
300
NoHandle
340
123
0
ENDSEC
0
EOF
`
    const parsed = parseString(dxf)
    expect(parsed.objects?.groups).toBeDefined()
  })

  it('handles GROUP with no entity members', () => {
    const dxf = `0
SECTION
2
OBJECTS
0
GROUP
5
EMPTY
300
EmptyGroup
70
0
0
ENDSEC
0
EOF
`
    const parsed = parseString(dxf)

    expect(parsed.objects?.groups?.['EMPTY']).toBeDefined()
    expect(parsed.objects?.groups?.['EMPTY'].entityHandles).toEqual([])
  })
})
