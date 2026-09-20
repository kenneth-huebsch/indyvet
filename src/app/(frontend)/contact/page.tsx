import type { Metadata } from 'next'
import type { ReactElement } from 'react'

import { ContactEmergency } from '@/components/contact/ContactEmergency'
import { ContactFormPanel } from '@/components/contact/ContactFormPanel'
import { ContactHero } from '@/components/contact/ContactHero'
import { ContactMap } from '@/components/contact/ContactMap'
import { getContactPage, getSiteChrome } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  const [page, { siteSettings }] = await Promise.all([getContactPage(), getSiteChrome()])

  return buildMetadata({
    pageSeo: page.seo,
    defaults: siteSettings.defaultSeo,
    siteName: siteSettings.brand.siteName,
  })
}

export default async function ContactRoute(): Promise<ReactElement> {
  const [page, { siteSettings }] = await Promise.all([getContactPage(), getSiteChrome()])

  return (
    <div data-slot="contact-page" className="bg-background">
      <ContactHero hero={page.hero} intro={page.intro} />
      <ContactFormPanel form={page.form} contact={siteSettings.contact} />
      <ContactMap mapEmbedUrl={page.mapEmbedUrl} />
      <ContactEmergency emergency={page.emergency} />
    </div>
  )
}
