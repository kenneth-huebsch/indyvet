import { describe, expect, it } from 'vitest'

import { isPopulatedDoc, populatedDocs } from './relations'

describe('relations helpers', () => {
  it('detects populated documents vs numeric ids', () => {
    expect(isPopulatedDoc(12)).toBe(false)
    expect(isPopulatedDoc({ id: 12, title: 'Preventative care' })).toBe(true)
    expect(isPopulatedDoc(null)).toBe(false)
  })

  it('filters relationship arrays to populated docs only', () => {
    const docs = populatedDocs([
      1,
      { id: 2, title: 'Surgical care' },
      { id: 3, title: 'Dental care' },
    ])

    expect(docs).toHaveLength(2)
    expect(docs.map((doc) => doc.id)).toEqual([2, 3])
  })
})
