import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { AboutBottomCta } from './AboutBottomCta'
import { AboutHero } from './AboutHero'
import { AboutMission } from './AboutMission'
import { AboutNamesake } from './AboutNamesake'
import { AboutTeam } from './AboutTeam'
import { aboutPageFixture } from './fixtures'

describe('about page sections', () => {
  it('AboutHero renders eyebrow, title, subtitle, and CTA', () => {
    const markup = renderToStaticMarkup(
      <AboutHero hero={aboutPageFixture.hero} cta={aboutPageFixture.cta} />,
    )

    expect(markup).toContain('data-slot="about-hero"')
    expect(markup).toContain('About us')
    expect(markup).toContain('Indy Veterinary Care')
    expect(markup).toContain('compassionate, courteous')
    expect(markup).toContain('Book an appointment')
    expect(markup).toContain('href="/contact"')
  })

  it('AboutMission renders copy and image', () => {
    const markup = renderToStaticMarkup(<AboutMission mission={aboutPageFixture.mission!} />)

    expect(markup).toContain('data-slot="about-mission"')
    expect(markup).toContain('Care that feels personal')
    expect(markup).toContain('high quality medical care')
    expect(markup).toContain('bg-cream')
  })

  it('AboutNamesake renders namesake story', () => {
    const markup = renderToStaticMarkup(<AboutNamesake namesake={aboutPageFixture.namesake!} />)

    expect(markup).toContain('data-slot="about-namesake"')
    expect(markup).toContain('Our Namesake')
    expect(markup).toContain('beloved first dog, Indy')
    expect(markup).toContain('bg-sage-light')
  })

  it('AboutTeam renders member bios', () => {
    const markup = renderToStaticMarkup(<AboutTeam team={aboutPageFixture.team!} />)

    expect(markup).toContain('data-slot="about-team"')
    expect(markup).toContain('Dr. Sara Organist')
    expect(markup).toContain('Dr. Eric Matkowski')
    expect(markup).toContain('Dr. Rachel Ellis')
    expect(markup).toContain('data-slot="about-team-member"')
    expect(markup).toContain('Philadelphia area for the past 14 years')
    expect(markup).not.toContain('data-slot="about-testimonials"')
  })

  it('AboutBottomCta renders promo copy and button', () => {
    const markup = renderToStaticMarkup(
      <AboutBottomCta promo={aboutPageFixture.promo} cta={aboutPageFixture.cta} />,
    )

    expect(markup).toContain('data-slot="about-bottom-cta"')
    expect(markup).toContain('Ready to meet our team?')
    expect(markup).toContain('Northern Liberties veterinarians')
    expect(markup).toContain('Book an appointment')
  })
})
