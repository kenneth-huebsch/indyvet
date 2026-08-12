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
    hours: [
      { id: 'h1', label: 'Mon–Thu', value: '9:00 AM – 7:00 PM' },
      { id: 'h2', label: 'Sunday', value: 'Closed' },
    ],
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
  it('renders link groups, separate hours/contact columns, pink icons, and paw mark', () => {
    const markup = renderToStaticMarkup(<SiteFooter footer={footer} siteSettings={siteSettings} />)

    expect(markup).toContain('data-slot="site-footer"')
    expect(markup).toContain('Explore')
    expect(markup).toContain('Services')
    expect(markup).toContain('href="/services"')
    expect(markup).toContain('Blog')
    expect(markup).toContain('data-slot="site-footer-hours"')
    expect(markup).toContain('Hours of Operation')
    expect(markup).toContain('Mon–Thu')
    expect(markup).toContain('9:00 AM – 7:00 PM')
    expect(markup).toContain('data-slot="site-footer-contact"')
    expect(markup).toContain('(215) 923-2300')
    expect(markup).toContain('hello@indyvetcare.com')
    expect(markup).toContain('123 Clinic Street')
    expect(markup).toContain('Order Online')
    expect(markup).toContain('href="https://pharmacy.example.com"')
    expect(markup).toContain('bg-brand-pink')
    expect(markup).toContain('data-slot="site-footer-paw"')
    expect(markup).toContain('/home/footer-paw.svg')
    expect(markup).not.toContain('© 2026 Indy Veterinary Care, Inc. All rights reserved.')
    expect(markup).not.toContain('border-t')
  })
})
