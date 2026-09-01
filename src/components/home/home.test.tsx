import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { CmsCta } from './CmsCta'
import { HomeAbout } from './HomeAbout'
import { HomeBottomCta } from './HomeBottomCta'
import { HomeFeaturedPosts } from './HomeFeaturedPosts'
import { HomeHero } from './HomeHero'
import { HomeProcess } from './HomeProcess'
import { HomeServices } from './HomeServices'
import { HomeTeam } from './HomeTeam'
import { HomeTestimonials } from './HomeTestimonials'
import { fixtureMedia, homePageFixture } from './fixtures'

describe('home sections', () => {
  it('HomeHero renders eyebrow, headline, CTAs, and a single photo', () => {
    const markup = renderToStaticMarkup(<HomeHero hero={homePageFixture.hero} />)

    expect(markup).toContain('data-slot="home-hero"')
    expect(markup).toContain('bg-background')
    expect(markup).not.toContain('linear-gradient')
    expect(markup).toContain('Indy Veterinary Care')
    expect(markup).toContain('Your reliable partner for pet wellness')
    expect(markup).not.toContain('underline-pink.webp')
    expect(markup).not.toContain('home-hero-paw')
    expect(markup).toContain('Contact us')
    expect(markup).toContain('href="/contact"')
    expect(markup).toContain('See all services')
    expect(markup).toContain('data-slot="home-hero-visual"')
    expect(markup).toContain('data-slot="home-hero-image"')
    expect(markup.match(/data-slot="home-hero-image"/g)?.length).toBe(1)
  })

  it('HomeHero does not pad missing images with placeholders', () => {
    const markup = renderToStaticMarkup(
      <HomeHero
        hero={{
          ...homePageFixture.hero,
          images: [{ id: 'h1', image: homePageFixture.hero.images![0]!.image }],
        }}
      />,
    )

    expect(markup.match(/data-slot="home-hero-image"/g)?.length).toBe(1)
    expect(markup).not.toContain('home-hero-placeholder')
    expect(markup).not.toContain('hero-placeholder')
  })

  it('HomeServices renders featured service cards with index marks', () => {
    const markup = renderToStaticMarkup(<HomeServices services={homePageFixture.services!} />)

    expect(markup).toContain('data-slot="home-services"')
    expect(markup).toContain('Preventative care')
    expect(markup).toContain('Essential vaccinations')
    expect(markup).toContain('Surgical care')
    expect(markup).toContain('data-slot="home-service-card"')
    expect(markup).toContain('01')
    expect(markup).toContain('02')
    expect(markup).toContain('03')
    expect(markup).not.toContain('home-service-paw')
  })

  it('HomeProcess renders promo and numbered steps', () => {
    const markup = renderToStaticMarkup(<HomeProcess process={homePageFixture.process!} />)

    expect(markup).toContain('data-slot="home-process"')
    expect(markup).toContain('Book Your Pet’s Check-Up Today!')
    expect(markup).toContain('Schedule your visit')
    expect(markup).toContain('Visit your veterinarian')
    expect(markup).toContain('Ongoing support')
    expect(markup).toContain('data-slot="home-process-promo"')
    expect(markup).toContain('data-slot="home-process-step"')
    expect(markup.indexOf('data-slot="home-process-step"')).toBeLessThan(
      markup.indexOf('data-slot="home-process-promo"'),
    )
  })

  it('HomeFeaturedPosts renders posts without commerce UI', () => {
    const markup = renderToStaticMarkup(
      <HomeFeaturedPosts featuredPosts={homePageFixture.featuredPosts!} />,
    )

    expect(markup).toContain('data-slot="home-featured-posts"')
    expect(markup).toContain('Spring wellness tips')
    expect(markup).toContain('Dental care basics')
    expect(markup).toContain('View all')
    expect(markup.toLowerCase()).not.toContain('usd')
    expect(markup.toLowerCase()).not.toContain('buy now')
    expect(markup.toLowerCase()).not.toContain('add to cart')
    expect(markup.toLowerCase()).not.toContain('out of stock')
  })

  it('HomeAbout renders body and static tags', () => {
    const markup = renderToStaticMarkup(
      <HomeAbout about={homePageFixture.about!} photo={fixtureMedia.hero2} />,
    )

    expect(markup).toContain('data-slot="home-about"')
    expect(markup).toContain('Your pet’s health, our passion')
    expect(markup).toContain('Personalized attention for every pet.')
    expect(markup).toContain('data-slot="home-about-tags"')
    expect(markup).toContain('Wellness care')
    expect(markup).not.toContain('home-about-marquees')
    expect(markup).not.toContain('animate-marquee')
  })

  it('HomeTeam renders members with roles', () => {
    const markup = renderToStaticMarkup(<HomeTeam team={homePageFixture.team!} />)

    expect(markup).toContain('data-slot="home-team"')
    expect(markup).toContain('Dr. Smith')
    expect(markup).toContain('Veterinarian')
    expect(markup).toContain('Dr. Jones')
    expect(markup).toContain('Join our team')
  })

  it('HomeTestimonials renders quote and attribution in a static grid', () => {
    const markup = renderToStaticMarkup(
      <HomeTestimonials testimonials={homePageFixture.testimonials!} />,
    )

    expect(markup).toContain('data-slot="home-testimonials"')
    expect(markup).toContain('They treated Bella like family.')
    expect(markup).toContain('Mac Jonas')
    expect(markup).toContain('New York, NY')
    expect(markup).not.toContain('animate-marquee')
  })

  it('HomeBottomCta renders headline and a single photo panel', () => {
    const markup = renderToStaticMarkup(<HomeBottomCta bottomCta={homePageFixture.bottomCta!} />)

    expect(markup).toContain('data-slot="home-bottom-cta"')
    expect(markup).toContain('Because your pets deserve the best, always')
    expect(markup).not.toContain('home-bottom-cta-images-left')
    expect(markup).not.toContain('home-bottom-cta-images-right')
  })

  it('CmsCta renders non-linking surface when url is missing', () => {
    const markup = renderToStaticMarkup(<CmsCta link={{ label: 'Coming soon', url: null }} />)

    expect(markup).toContain('Coming soon')
    expect(markup).not.toContain('href=')
    expect(markup).toContain('pointer-events-none')
  })
})
