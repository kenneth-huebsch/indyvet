import { describe, expect, it } from 'vitest'

import { anyone, authenticated, authenticatedOrPublished } from './access'

describe('payload access helpers', () => {
  it('anyone always allows', () => {
    expect(anyone({} as never)).toBe(true)
  })

  it('authenticated requires a user', () => {
    expect(authenticated({ req: { user: null } } as never)).toBe(false)
    expect(authenticated({ req: { user: { id: 1 } } } as never)).toBe(true)
  })

  it('authenticatedOrPublished returns true for users', () => {
    expect(authenticatedOrPublished({ req: { user: { id: 1 } } } as never)).toBe(true)
  })

  it('authenticatedOrPublished restricts anonymous readers to published docs', () => {
    expect(authenticatedOrPublished({ req: { user: null } } as never)).toEqual({
      _status: { equals: 'published' },
    })
  })
})
