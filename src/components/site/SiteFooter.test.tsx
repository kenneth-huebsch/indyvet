import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { SiteFooter } from './SiteFooter'
import type { Footer, SiteSetting } from '@/payload-types'

const siteSettings: SiteSetting = {
  id: 1,
  brand: {
    siteName: 'Indy Veterinary Care',
  },
  contact: {
    phone: '(215) 923-2300',
    email: 'hello@indyvetcare.com',
    address: '123 Clinic Street\nPhiladelphia, PA',
  },
  pharmacy: {
    label: 'Order Online',
    url: 'https://pharmacy.example.com',
  },
}

const footer: Footer = {
  id: 1,
  linkGroups: [
    {
      id: 'g1',
      title: 'Explore',
      links: [
        { id: 'l1', label: 'Services', url: '/services' },
        { id: 'l2', label: 'Blog', url: '/blog' },
      ],
    },
  ],
  copyright: '© 2026 Indy Veterinary Care, Inc. All rights reserved.',
}

describe('SiteFooter', () => {
  it('renders Payload link groups, copyright, and NAP from Site Settings', () => {
    const markup = renderToStaticMarkup(<SiteFooter footer={footer} siteSettings={siteSettings} />)

    expect(markup).toContain('data-slot="site-footer"')
    expect(markup).toContain('Explore')
    expect(markup).toContain('Services')
    expect(markup).toContain('href="/services"')
    expect(markup).toContain('Blog')
    expect(markup).toContain('© 2026 Indy Veterinary Care, Inc. All rights reserved.')
    expect(markup).toContain('(215) 923-2300')
    expect(markup).toContain('hello@indyvetcare.com')
    expect(markup).toContain('123 Clinic Street')
    expect(markup).toContain('Order Online')
    expect(markup).toContain('href="https://pharmacy.example.com"')
  })
})
