import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { ContactEmergency } from './ContactEmergency'
import { ContactFormPanel } from './ContactFormPanel'
import { ContactHero } from './ContactHero'
import { ContactMap } from './ContactMap'
import {
  contactPageFixture,
  contactReferralsFixture,
  contactSiteSettingsFixture,
} from './fixtures'

describe('Contact components', () => {
  it('ContactHero renders title and lede', () => {
    const markup = renderToStaticMarkup(
      <ContactHero hero={contactPageFixture.hero} intro={contactPageFixture.intro} />,
    )

    expect(markup).toContain('data-slot="contact-hero"')
    expect(markup).toContain('Contact')
    expect(markup).toContain('Northern Liberties')
  })

  it('ContactFormPanel renders form labels and NAP', () => {
    const markup = renderToStaticMarkup(
      <ContactFormPanel
        form={contactPageFixture.form}
        contact={contactSiteSettingsFixture.contact}
      />,
    )

    expect(markup).toContain('data-slot="contact-form-panel"')
    expect(markup).toContain('data-slot="contact-form"')
    expect(markup).toContain('Send message')
    expect(markup).toContain('(215) 923-2300')
    expect(markup).toContain('info@indyvetcare.com')
    expect(markup).toContain('917 N Front Street')
    expect(markup).toContain('Mon–Thu')
  })

  it('ContactMap renders iframe when embed URL is set', () => {
    const markup = renderToStaticMarkup(
      <ContactMap mapEmbedUrl={contactPageFixture.mapEmbedUrl} />,
    )

    expect(markup).toContain('data-slot="contact-map"')
    expect(markup).toContain('iframe')
    expect(markup).toContain('maps.google.com')
  })

  it('ContactEmergency renders referrals with tel links and emergency anchor', () => {
    const markup = renderToStaticMarkup(
      <ContactEmergency
        emergency={{
          ...contactPageFixture.emergency,
          referrals: contactReferralsFixture,
        }}
      />,
    )

    expect(markup).toContain('data-slot="contact-emergency"')
    expect(markup).toContain('id="emergency"')
    expect(markup).toContain('Emergency Information')
    expect(markup).toContain('VSEC')
    expect(markup).toContain('href="tel:2678001950"')
    expect(markup).toContain('Ryan Veterinary Hospital')
    expect(markup).toContain('href="tel:2157468911"')
  })
})
