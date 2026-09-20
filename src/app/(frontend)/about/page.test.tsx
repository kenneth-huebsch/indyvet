import { renderToStaticMarkup } from 'react-dom/server'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import AboutRoute from './page'
import { aboutPageFixture } from '@/components/about/fixtures'
import type { SiteSetting } from '@/payload-types'

vi.mock('@/lib/payload', () => ({
  getAboutPage: vi.fn(),
  getSiteChrome: vi.fn(),
}))

import { getAboutPage, getSiteChrome } from '@/lib/payload'

const siteSettings: SiteSetting = {
  id: 1,
  brand: {
    siteName: 'Indy Veterinary Care',
  },
  defaultSeo: {
    title: 'Default SEO',
    description: 'Default description',
  },
}

describe('About page', () => {
  beforeEach(() => {
    vi.mocked(getAboutPage).mockResolvedValue(aboutPageFixture)
    vi.mocked(getSiteChrome).mockResolvedValue({
      header: { id: 1 },
      footer: { id: 1 },
      siteSettings,
    } as Awaited<ReturnType<typeof getSiteChrome>>)
  })

  it('renders hero, mission, namesake, team, and bottom CTA without testimonials', async () => {
    const element = await AboutRoute()
    const markup = renderToStaticMarkup(element)

    expect(markup).toContain('data-slot="about-page"')
    expect(markup).toContain('data-slot="about-hero"')
    expect(markup).toContain('Indy Veterinary Care')
    expect(markup).toContain('data-slot="about-mission"')
    expect(markup).toContain('data-slot="about-namesake"')
    expect(markup).toContain('data-slot="about-team"')
    expect(markup).toContain('Dr. Sara Organist')
    expect(markup).toContain('data-slot="about-bottom-cta"')
    expect(markup).toContain('Ready to meet our team?')
    expect(markup).not.toContain('data-slot="about-testimonials"')
  })
})
