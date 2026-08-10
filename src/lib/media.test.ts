import { describe, expect, it } from 'vitest'

import { getMediaAlt, getMediaUrl, isMedia } from './media'
import type { Media } from '@/payload-types'

const media: Media = {
  id: 1,
  alt: 'Clinic logo',
  url: '/api/media/file/logo.png',
  updatedAt: '2026-01-01T00:00:00.000Z',
  createdAt: '2026-01-01T00:00:00.000Z',
  width: 200,
  height: 80,
}

describe('media helpers', () => {
  it('recognizes populated Media documents', () => {
    expect(isMedia(media)).toBe(true)
    expect(isMedia(12)).toBe(false)
    expect(isMedia(null)).toBe(false)
  })

  it('reads url and alt from populated Media', () => {
    expect(getMediaUrl(media)).toBe('/api/media/file/logo.png')
    expect(getMediaAlt(media)).toBe('Clinic logo')
  })

  it('returns nullish fallbacks for id-only or missing media', () => {
    expect(getMediaUrl(9)).toBeNull()
    expect(getMediaUrl(null)).toBeNull()
    expect(getMediaAlt(9, 'fallback')).toBe('fallback')
  })
})
