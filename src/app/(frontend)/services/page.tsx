import type { Metadata } from 'next'
import type { ReactElement } from 'react'

import { ServicesAccordionList } from '@/components/services/ServicesAccordionList'
import { ServicesBottomCta } from '@/components/services/ServicesBottomCta'
import { ServicesHero } from '@/components/services/ServicesHero'
import { getPublishedServices, getServicesPage, getSiteChrome } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  const [page, { siteSettings }] = await Promise.all([getServicesPage(), getSiteChrome()])

  return buildMetadata({
    pageSeo: page.seo,
    defaults: siteSettings.defaultSeo,
    siteName: siteSettings.brand.siteName,
  })
}

export default async function ServicesRoute(): Promise<ReactElement> {
  const [page, services] = await Promise.all([getServicesPage(), getPublishedServices()])

  return (
    <div data-slot="services-page" className="bg-background">
      <ServicesHero hero={page.hero} cta={page.cta} />
      <ServicesAccordionList services={services} />
      <ServicesBottomCta promo={page.promo} cta={page.cta} />
    </div>
  )
}
