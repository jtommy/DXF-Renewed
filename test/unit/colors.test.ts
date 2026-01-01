import expectModule from 'expect'
const expect = expectModule.expect || expectModule.default

import { colors } from '../../src'

describe('colors', () => {
  it('are exposed in the API', () => {
    expect(colors[3]).toEqual([0, 255, 0])
  })
})
