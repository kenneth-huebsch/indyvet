import { renderToStaticMarkup } from 'react-dom/server'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import ContactRoute from './page'
import { contactPageFixture, contactSiteSettingsFixture } from '@/components/contact/fixtures'
import type { SiteSetting } from '@/payload-types'

vi.mock('@/lib/payload', () => ({
  getContactPage: vi.fn(),
  getSiteChrome: vi.fn(),
}))

import { getContactPage, getSiteChrome } from '@/lib/payload'

const siteSettings = contactSiteSettingsFixture as SiteSetting

describe('Contact page', () => {
  beforeEach(() => {
    vi.mocked(getContactPage).mockResolvedValue(contactPageFixture)
    vi.mocked(getSiteChrome).mockResolvedValue({
      header: { id: 1 },
      footer: { id: 1 },
      siteSettings,
    } as Awaited<ReturnType<typeof getSiteChrome>>)
  })

  it('renders hero, form panel, map, and emergency referrals', async () => {
    const element = await ContactRoute()
    const markup = renderToStaticMarkup(element)

    expect(markup).toContain('data-slot="contact-page"')
    expect(markup).toContain('data-slot="contact-hero"')
    expect(markup).toContain('data-slot="contact-form-panel"')
    expect(markup).toContain('data-slot="contact-map"')
    expect(markup).toContain('data-slot="contact-emergency"')
    expect(markup).toContain('id="emergency"')
    expect(markup).toContain('VSEC')
    expect(markup).toContain('(215) 923-2300')
  })
})
