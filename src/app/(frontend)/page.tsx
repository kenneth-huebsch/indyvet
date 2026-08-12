import type { Metadata } from 'next'
import type { ReactElement } from 'react'

import { HomeAbout } from '@/components/home/HomeAbout'
import { HomeBottomCta } from '@/components/home/HomeBottomCta'
import { HomeFeaturedPosts } from '@/components/home/HomeFeaturedPosts'
import { HomeHero } from '@/components/home/HomeHero'
import { HomeMarquee } from '@/components/home/HomeMarquee'
import { HomeProcess } from '@/components/home/HomeProcess'
import { HomeServices } from '@/components/home/HomeServices'
import { HomeTeam } from '@/components/home/HomeTeam'
import { HomeTestimonials } from '@/components/home/HomeTestimonials'
import { getHomePage, getSiteChrome } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  const [home, { siteSettings }] = await Promise.all([getHomePage(), getSiteChrome()])

  return buildMetadata({
    pageSeo: home.seo,
    defaults: siteSettings.defaultSeo,
    siteName: siteSettings.brand.siteName,
  })
}

export default async function HomePage(): Promise<ReactElement> {
  const home = await getHomePage()
  const marqueeTags = home.hero.marqueeTags?.filter((tag) => tag.label.trim()) ?? []

  return (
    <div data-slot="home-page" className="bg-background">
      <HomeHero hero={home.hero} />
      {marqueeTags.length > 0 ? (
        <div data-slot="home-hero-marquee" className="pb-section-sm">
          <HomeMarquee tags={marqueeTags} aria-label="Featured service tags" />
        </div>
      ) : null}
      {home.services ? <HomeServices services={home.services} /> : null}
      {home.process ? <HomeProcess process={home.process} /> : null}
      {home.featuredPosts ? <HomeFeaturedPosts featuredPosts={home.featuredPosts} /> : null}
      {home.about ? <HomeAbout about={home.about} /> : null}
      {home.team ? <HomeTeam team={home.team} /> : null}
      {home.testimonials ? <HomeTestimonials testimonials={home.testimonials} /> : null}
      {home.bottomCta ? <HomeBottomCta bottomCta={home.bottomCta} /> : null}
    </div>
  )
}
