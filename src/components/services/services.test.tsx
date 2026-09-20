import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { ServicesAccordionList } from './ServicesAccordionList'
import { ServicesBottomCta } from './ServicesBottomCta'
import { ServicesHero } from './ServicesHero'
import { publishedServicesFixture, servicesPageFixture } from './fixtures'
import { fixtureMedia } from '@/components/home/fixtures'

describe('services page sections', () => {
  it('ServicesHero renders eyebrow, title, lede, and CTA', () => {
    const markup = renderToStaticMarkup(
      <ServicesHero hero={servicesPageFixture.hero} cta={servicesPageFixture.cta} />,
    )

    expect(markup).toContain('data-slot="services-hero"')
    expect(markup).toContain('Veterinary services')
    expect(markup).toContain('This is the only place for all your pet care')
    expect(markup).toContain('Northern Liberties')
    expect(markup).toContain('Book an appointment')
    expect(markup).toContain('href="/contact"')
  })

  it('ServicesAccordionList renders titles, blurbs, body copy, and images', () => {
    const withImages = publishedServicesFixture.map((service, index) =>
      index === 0 ? { ...service, image: fixtureMedia.service } : service,
    )
    const markup = renderToStaticMarkup(<ServicesAccordionList services={withImages} />)

    expect(markup).toContain('data-slot="services-accordion"')
    expect(markup).toContain('id="anesthesia"')
    expect(markup).toContain('Anesthesia')
    expect(markup).toContain('Safe anesthesia with constant monitoring.')
    expect(markup).toContain('safest possible anesthetics')
    expect(markup).toContain('data-slot="services-accordion-body"')
    expect(markup).toContain('data-slot="services-accordion-image"')
    expect(markup).toContain('01')
    expect(markup).toContain('02')
    expect(markup).toContain('03')
  })

  it('ServicesBottomCta renders promo copy and CTA', () => {
    const markup = renderToStaticMarkup(
      <ServicesBottomCta promo={servicesPageFixture.promo} cta={servicesPageFixture.cta} />,
    )

    expect(markup).toContain('data-slot="services-bottom-cta"')
    expect(markup).toContain('Ready to book care for your pet?')
    expect(markup).toContain('Northern Liberties team')
    expect(markup).toContain('Book an appointment')
  })
})
