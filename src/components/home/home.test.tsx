import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { CmsCta } from './CmsCta'
import { HomeAbout } from './HomeAbout'
import { HomeBottomCta } from './HomeBottomCta'
import { HomeFeaturedPosts } from './HomeFeaturedPosts'
import { HomeHero } from './HomeHero'
import { HomeMarquee } from './HomeMarquee'
import { HomeProcess } from './HomeProcess'
import { HomeServices } from './HomeServices'
import { HomeTeam } from './HomeTeam'
import { HomeTestimonials } from './HomeTestimonials'
import { homePageFixture } from './fixtures'

describe('home sections', () => {
  it('HomeHero renders eyebrow, headline, CTAs, collage, and paw badges', () => {
    const markup = renderToStaticMarkup(<HomeHero hero={homePageFixture.hero} />)

    expect(markup).toContain('data-slot="home-hero"')
    expect(markup).toContain('Indy Veterinary Care')
    expect(markup).toContain('Your reliable partner for pet')
    expect(markup).toContain('wellness')
    expect(markup).toContain('data-slot="home-headline-underline"')
    expect(markup).toContain('underline-pink.webp')
    expect(markup).toContain('Contact us')
    expect(markup).toContain('href="/contact"')
    expect(markup).toContain('See all services')
    expect(markup).toContain('data-slot="home-hero-visual"')
    expect(markup.match(/data-slot="home-hero-paw"/g)?.length).toBe(4)
    expect(markup).toContain('animate-hero-paw')
  })

  it('HomeMarquee renders duplicated tags for seamless loop', () => {
    const markup = renderToStaticMarkup(
      <HomeMarquee tags={homePageFixture.hero.marqueeTags ?? []} />,
    )

    expect(markup).toContain('data-slot="home-marquee"')
    expect(markup).toContain('Dental care')
    expect(markup.match(/Dental care/g)?.length).toBeGreaterThanOrEqual(2)
    expect(markup).toContain('animate-marquee')
  })

  it('HomeServices renders featured service cards with colored paw badges', () => {
    const markup = renderToStaticMarkup(<HomeServices services={homePageFixture.services!} />)

    expect(markup).toContain('data-slot="home-services"')
    expect(markup).toContain('Preventative care')
    expect(markup).toContain('Essential vaccinations')
    expect(markup).toContain('Surgical care')
    expect(markup).toContain('data-slot="home-service-card"')
    expect(markup.match(/data-slot="home-service-paw"/g)?.length).toBe(3)
    expect(markup).toContain('#beefff')
    expect(markup).toContain('#ffa500')
    expect(markup).toContain('#ffe500')
  })

  it('HomeProcess renders promo and three steps', () => {
    const markup = renderToStaticMarkup(<HomeProcess process={homePageFixture.process!} />)

    expect(markup).toContain('data-slot="home-process"')
    expect(markup).toContain('Book Your Pet’s Check-Up Today!')
    expect(markup).toContain('Schedule your visit')
    expect(markup).toContain('Visit your veterinarian')
    expect(markup).toContain('Ongoing support')
    expect(markup).toContain('data-slot="home-process-promo"')
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

  it('HomeAbout renders body and marquees', () => {
    const markup = renderToStaticMarkup(<HomeAbout about={homePageFixture.about!} />)

    expect(markup).toContain('data-slot="home-about"')
    expect(markup).toContain('Your pet’s health, our')
    expect(markup).toContain('passion')
    expect(markup).toContain('Personalized attention for every pet.')
    expect(markup).toContain('data-slot="home-about-marquees"')
  })

  it('HomeTeam renders members with roles', () => {
    const markup = renderToStaticMarkup(<HomeTeam team={homePageFixture.team!} />)

    expect(markup).toContain('data-slot="home-team"')
    expect(markup).toContain('Dr. Smith')
    expect(markup).toContain('Veterinarian')
    expect(markup).toContain('Dr. Jones')
    expect(markup).toContain('Join our team')
  })

  it('HomeTestimonials renders quote and attribution', () => {
    const markup = renderToStaticMarkup(
      <HomeTestimonials testimonials={homePageFixture.testimonials!} />,
    )

    expect(markup).toContain('data-slot="home-testimonials"')
    expect(markup).toContain('They treated Bella like family.')
    expect(markup).toContain('Mac Jonas')
    expect(markup).toContain('New York, NY')
  })

  it('HomeBottomCta renders headline and collage regions', () => {
    const markup = renderToStaticMarkup(<HomeBottomCta bottomCta={homePageFixture.bottomCta!} />)

    expect(markup).toContain('data-slot="home-bottom-cta"')
    expect(markup).toContain('Because your pets deserve the best,')
    expect(markup).toContain('always')
    expect(markup).toContain('data-slot="home-bottom-cta-images-left"')
    expect(markup).toContain('data-slot="home-bottom-cta-images-right"')
  })

  it('CmsCta renders non-linking surface when url is missing', () => {
    const markup = renderToStaticMarkup(<CmsCta link={{ label: 'Coming soon', url: null }} />)

    expect(markup).toContain('Coming soon')
    expect(markup).not.toContain('href=')
    expect(markup).toContain('pointer-events-none')
  })
})
