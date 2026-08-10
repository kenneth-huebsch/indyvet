import { describe, expect, it } from 'vitest'

import { buildMetadata } from './seo'
import type { Media } from '@/payload-types'

const ogImage: Media = {
  id: 3,
  alt: 'Open graph',
  url: '/api/media/file/og.jpg',
  updatedAt: '2026-01-01T00:00:00.000Z',
  createdAt: '2026-01-01T00:00:00.000Z',
}

describe('buildMetadata', () => {
  it('prefers page SEO over Site Settings defaults', () => {
    const metadata = buildMetadata({
      pageSeo: {
        title: 'About IndyVet',
        description: 'Page description',
      },
      defaults: {
        title: 'Default title',
        description: 'Default description',
        ogImage,
      },
      siteName: 'Indy Veterinary Care',
    })

    expect(metadata.title).toBe('About IndyVet')
    expect(metadata.description).toBe('Page description')
  })

  it('falls back to defaults and site name when page SEO is empty', () => {
    const metadata = buildMetadata({
      pageSeo: {
        title: '',
        description: null,
      },
      defaults: {
        title: 'Clinic defaults',
        description: 'Default description',
        ogImage,
      },
      siteName: 'Indy Veterinary Care',
    })

    expect(metadata.title).toBe('Clinic defaults')
    expect(metadata.description).toBe('Default description')
    expect(metadata.openGraph?.images).toEqual([
      {
        url: '/api/media/file/og.jpg',
        alt: 'Open graph',
      },
    ])
  })

  it('uses site name when both page and default titles are missing', () => {
    const metadata = buildMetadata({
      siteName: 'Indy Veterinary Care',
    })

    expect(metadata.title).toBe('Indy Veterinary Care')
  })
})
