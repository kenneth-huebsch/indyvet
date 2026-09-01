import type { Metadata } from 'next'
import type { ReactElement } from 'react'

import { HomeAbout } from '@/components/home/HomeAbout'
import { HomeBottomCta } from '@/components/home/HomeBottomCta'
import { HomeFeaturedPosts } from '@/components/home/HomeFeaturedPosts'
import { HomeHero } from '@/components/home/HomeHero'
import { HomeProcess } from '@/components/home/HomeProcess'
import { HomeServices } from '@/components/home/HomeServices'
import { HomeTeam } from '@/components/home/HomeTeam'
import { HomeTestimonials } from '@/components/home/HomeTestimonials'
import { getHomePage, getSiteChrome } from '@/lib/payload'
import { isMedia } from '@/lib/media'
import { buildMetadata } from '@/lib/seo'
import type { HomePage, Media } from '@/payload-types'

export async function generateMetadata(): Promise<Metadata> {
  const [home, { siteSettings }] = await Promise.all([getHomePage(), getSiteChrome()])

  return buildMetadata({
    pageSeo: home.seo,
    defaults: siteSettings.defaultSeo,
    siteName: siteSettings.brand.siteName,
  })
}

function heroImageAt(home: HomePage, index: number): Media | null {
  const image = home.hero.images?.[index]?.image
  return isMedia(image) && Boolean(image.url) ? image : null
}

export default async function HomePage(): Promise<ReactElement> {
  const home = await getHomePage()

  return (
    <div data-slot="home-page" className="bg-background">
      <HomeHero hero={home.hero} />
      {home.about ? <HomeAbout about={home.about} photo={heroImageAt(home, 1)} /> : null}
      {home.services ? <HomeServices services={home.services} /> : null}
      {home.process ? <HomeProcess process={home.process} photo={heroImageAt(home, 2)} /> : null}
      {home.featuredPosts ? <HomeFeaturedPosts featuredPosts={home.featuredPosts} /> : null}
      {home.team ? <HomeTeam team={home.team} /> : null}
      {home.testimonials ? <HomeTestimonials testimonials={home.testimonials} /> : null}
      {home.bottomCta ? <HomeBottomCta bottomCta={home.bottomCta} /> : null}
    </div>
  )
}
