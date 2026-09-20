import type { Metadata } from 'next'
import type { ReactElement } from 'react'

import { AboutBottomCta } from '@/components/about/AboutBottomCta'
import { AboutHero } from '@/components/about/AboutHero'
import { AboutMission } from '@/components/about/AboutMission'
import { AboutNamesake } from '@/components/about/AboutNamesake'
import { AboutTeam } from '@/components/about/AboutTeam'
import { getAboutPage, getSiteChrome } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  const [page, { siteSettings }] = await Promise.all([getAboutPage(), getSiteChrome()])

  return buildMetadata({
    pageSeo: page.seo,
    defaults: siteSettings.defaultSeo,
    siteName: siteSettings.brand.siteName,
  })
}

export default async function AboutRoute(): Promise<ReactElement> {
  const page = await getAboutPage()

  return (
    <div data-slot="about-page" className="bg-background">
      <AboutHero hero={page.hero} cta={page.cta} />
      {page.mission ? <AboutMission mission={page.mission} /> : null}
      {page.namesake ? <AboutNamesake namesake={page.namesake} /> : null}
      {page.team ? <AboutTeam team={page.team} /> : null}
      <AboutBottomCta promo={page.promo} cta={page.cta} />
    </div>
  )
}
