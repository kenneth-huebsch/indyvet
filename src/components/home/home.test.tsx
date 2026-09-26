import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { CmsCta } from './CmsCta'
import { HomeAbout } from './HomeAbout'
import { HomeBottomCta } from './HomeBottomCta'
import { HomeFeaturedPosts } from './HomeFeaturedPosts'
import { HomeHero } from './HomeHero'
import { HomeProcess } from './HomeProcess'
import { HomeServices } from './HomeServices'
import { HomeTestimonials } from './HomeTestimonials'
import { fixtureMedia, homePageFixture } from './fixtures'

describe('home sections', () => {
  it('HomeHero renders eyebrow, headline, CTAs, and a single photo', () => {
    const markup = renderToStaticMarkup(<HomeHero hero={homePageFixture.hero} />)

    expect(markup).toContain('data-slot="home-hero"')
    expect(markup).toContain('bg-background')
    expect(markup).not.toContain('linear-gradient')
    expect(markup).toContain('Independent veterinary care in Philadelphia')
    expect(markup).toContain('Thoughtful veterinary care.')
    expect(markup).toContain('For pets. For people.')
    expect(markup).toContain('Modern, compassionate veterinary medicine')
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
    expect(markup).toContain('Examinations')
    expect(markup).toContain('Surgery')
    expect(markup).toContain('Anesthesia')
    expect(markup).toContain('data-slot="home-service-card"')
    expect(markup).toContain('01')
    expect(markup).toContain('02')
    expect(markup).toContain('03')
    expect(markup).toContain('href="/services#examinations"')
    expect(markup).toContain('href="/services#surgery"')
    expect(markup).toContain('href="/services#anesthesia"')
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
    expect(markup).toContain('href="/blog/spring-wellness-tips"')
    expect(markup).toContain('href="/blog/dental-care-basics"')
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

  it('HomeTestimonials renders quote, author, and Read More link', () => {
    const markup = renderToStaticMarkup(
      <HomeTestimonials testimonials={homePageFixture.testimonials!} />,
    )

    expect(markup).toContain('data-slot="home-testimonials"')
    expect(markup).toMatch(/data-slot="home-testimonials"[^>]*bg-cream/)
    expect(markup).toContain('Best vet experience')
    expect(markup).toContain('Sophia Julia')
    expect(markup).toContain('Mark Nardone')
    expect(markup).toContain('Read More')
    expect(markup).toContain('href="https://maps.app.goo.gl/JAWYSNtJGWbEHbie6"')
    expect(markup).toContain('href="https://maps.app.goo.gl/2hsDRHJySwaw1MvF7"')
    expect(markup).not.toContain('animate-marquee')
  })

  it('HomeBottomCta renders headline and a single photo panel', () => {
    const markup = renderToStaticMarkup(<HomeBottomCta bottomCta={homePageFixture.bottomCta!} />)

    expect(markup).toContain('data-slot="home-bottom-cta"')
    expect(markup).toMatch(/data-slot="home-bottom-cta"[^>]*bg-background/)
    expect(markup).not.toContain('bg-sage-light')
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
