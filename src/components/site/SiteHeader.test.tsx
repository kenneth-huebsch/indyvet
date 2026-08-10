import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { SiteHeader } from './SiteHeader'
import type { Header, SiteSetting } from '@/payload-types'

const siteSettings: SiteSetting = {
  id: 1,
  brand: {
    siteName: 'Indy Veterinary Care',
  },
  booking: {
    label: 'Book Now',
    url: 'https://booking.example.com',
  },
}

const header: Header = {
  id: 1,
  logo: {
    id: 10,
    alt: 'IndyVet logo',
    url: '/api/media/file/logo.png',
    updatedAt: '2026-01-01T00:00:00.000Z',
    createdAt: '2026-01-01T00:00:00.000Z',
    width: 160,
    height: 40,
  },
  navItems: [
    { id: '1', label: 'Services', url: '/services' },
    { id: '2', label: 'About', url: '/about' },
    { id: '3', label: 'Contact', url: '/contact' },
  ],
  cta: {
    label: 'Schedule Visit',
    url: '/contact',
  },
}

describe('SiteHeader', () => {
  it('renders Payload nav items, CTA, and logo alt from globals', () => {
    const markup = renderToStaticMarkup(<SiteHeader header={header} siteSettings={siteSettings} />)

    expect(markup).toContain('data-slot="site-header"')
    expect(markup).toContain('data-slot="site-header-pill"')
    expect(markup).toContain('rounded-nav')
    expect(markup).toContain('Services')
    expect(markup).toContain('href="/services"')
    expect(markup).toContain('About')
    expect(markup).toContain('Contact')
    expect(markup).toContain('Schedule Visit')
    expect(markup).toContain('href="/contact"')
    expect(markup).toContain('alt="IndyVet logo"')
  })

  it('falls back to Site Settings booking CTA when Header CTA is empty', () => {
    const markup = renderToStaticMarkup(
      <SiteHeader
        header={{ ...header, cta: { label: null, url: null } }}
        siteSettings={siteSettings}
      />,
    )

    expect(markup).toContain('Book Now')
    expect(markup).toContain('href="https://booking.example.com"')
  })

  it('does not render cart or sign-in chrome', () => {
    const markup = renderToStaticMarkup(<SiteHeader header={header} siteSettings={siteSettings} />)

    expect(markup.toLowerCase()).not.toContain('cart')
    expect(markup.toLowerCase()).not.toContain('sign in')
    expect(markup.toLowerCase()).not.toContain('sign-in')
  })
})
