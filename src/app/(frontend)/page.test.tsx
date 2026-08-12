import { renderToStaticMarkup } from 'react-dom/server'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import HomePage from './page'
import { homePageFixture } from '@/components/home/fixtures'
import type { SiteSetting } from '@/payload-types'

vi.mock('@/lib/payload', () => ({
  getHomePage: vi.fn(),
  getSiteChrome: vi.fn(),
}))

import { getHomePage, getSiteChrome } from '@/lib/payload'

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

describe('Home page', () => {
  beforeEach(() => {
    vi.mocked(getHomePage).mockResolvedValue(homePageFixture)
    vi.mocked(getSiteChrome).mockResolvedValue({
      header: { id: 1 },
      footer: { id: 1 },
      siteSettings,
    } as Awaited<ReturnType<typeof getSiteChrome>>)
  })

  it('renders CMS-driven homepage sections instead of the Phase 1 showcase', async () => {
    const element = await HomePage()
    const markup = renderToStaticMarkup(element)

    expect(markup).toContain('data-slot="home-page"')
    expect(markup).not.toContain('data-slot="phase1-showcase"')
    expect(markup).not.toContain('Component showcase')

    expect(markup).toContain('data-slot="home-hero"')
    expect(markup).toContain('Your reliable partner for pet')
    expect(markup).toContain('wellness')
    expect(markup).toContain('data-slot="home-hero-marquee"')
    expect(markup).toContain('data-slot="home-services"')
    expect(markup).toContain('data-slot="home-process"')
    expect(markup).toContain('data-slot="home-featured-posts"')
    expect(markup).toContain('data-slot="home-about"')
    expect(markup).toContain('data-slot="home-team"')
    expect(markup).toContain('data-slot="home-testimonials"')
    expect(markup).toContain('data-slot="home-bottom-cta"')
  })

  it('includes Featured Posts and omits Products commerce chrome', async () => {
    const element = await HomePage()
    const markup = renderToStaticMarkup(element)

    expect(markup).toContain('Guides and tips for your')
    expect(markup).toContain('pets')
    expect(markup).toContain('Spring wellness tips')
    expect(markup.toLowerCase()).not.toContain('products for your pets')
    expect(markup.toLowerCase()).not.toContain('buy now')
    expect(markup.toLowerCase()).not.toContain('add to cart')
    expect(markup.toLowerCase()).not.toContain('$ 20.00')
  })
})
