import { renderToStaticMarkup } from 'react-dom/server'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import ServicesRoute from './page'
import { publishedServicesFixture, servicesPageFixture } from '@/components/services/fixtures'
import type { SiteSetting } from '@/payload-types'

vi.mock('@/lib/payload', () => ({
  getServicesPage: vi.fn(),
  getPublishedServices: vi.fn(),
  getSiteChrome: vi.fn(),
}))

import { getPublishedServices, getServicesPage, getSiteChrome } from '@/lib/payload'

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

describe('Services page', () => {
  beforeEach(() => {
    vi.mocked(getServicesPage).mockResolvedValue(servicesPageFixture)
    vi.mocked(getPublishedServices).mockResolvedValue(publishedServicesFixture)
    vi.mocked(getSiteChrome).mockResolvedValue({
      header: { id: 1 },
      footer: { id: 1 },
      siteSettings,
    } as Awaited<ReturnType<typeof getSiteChrome>>)
  })

  it('renders hero, accordion list, and bottom CTA', async () => {
    const element = await ServicesRoute()
    const markup = renderToStaticMarkup(element)

    expect(markup).toContain('data-slot="services-page"')
    expect(markup).toContain('data-slot="services-hero"')
    expect(markup).toContain('This is the only place for all your pet care')
    expect(markup).not.toContain('data-slot="services-jump-nav"')
    expect(markup).toContain('data-slot="services-accordion"')
    expect(markup).toContain('Anesthesia')
    expect(markup).toContain('Examinations')
    expect(markup).toContain('Surgery')
    expect(markup).toContain('data-slot="services-bottom-cta"')
  })
})
