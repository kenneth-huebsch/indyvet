import { describe, expect, it } from 'vitest'

import {
  resolveHeaderBookingCta,
  resolveVetterEmbed,
  VETTER_BOOKING_SCRIPT_SRC,
} from '@/lib/booking'
import type { Header, SiteSetting } from '@/payload-types'

const header: Header = {
  id: 1,
  cta: { label: 'Schedule Visit', url: '/contact' },
}

const siteSettings = {
  id: 1,
  brand: { siteName: 'Indy Veterinary Care' },
  booking: {
    label: 'Book Now',
    url: 'https://booking.example.com',
    embedScriptUrl: null,
  },
} as SiteSetting

describe('resolveVetterEmbed', () => {
  it('reads a bare Vetter identifier and keeps the vendor script URL', () => {
    expect(resolveVetterEmbed('clinic+token/id=')).toEqual({
      scriptSrc: VETTER_BOOKING_SCRIPT_SRC,
      identifier: 'clinic+token/id=',
    })
  })

  it('reads the identifier attribute from an embed snippet', () => {
    const snippet =
      '<div id="vetter-btn"></div><script src="https://vettersoftware.com/view/dist/online-book.js" identifier="clinic-token"></script>'

    expect(resolveVetterEmbed(snippet)).toEqual({
      scriptSrc: VETTER_BOOKING_SCRIPT_SRC,
      identifier: 'clinic-token',
    })
  })

  it('reads an identifier query parameter from a script URL', () => {
    expect(
      resolveVetterEmbed(
        'https://vettersoftware.com/view/dist/online-book.js?identifier=clinic%2Btoken',
      ),
    ).toEqual({
      scriptSrc: `${VETTER_BOOKING_SCRIPT_SRC}`,
      identifier: 'clinic+token',
    })
  })

  it('ignores a script URL that has no identifier', () => {
    expect(resolveVetterEmbed(VETTER_BOOKING_SCRIPT_SRC)).toBeNull()
    expect(resolveVetterEmbed(' /contact ')).toBeNull()
    expect(resolveVetterEmbed('')).toBeNull()
    expect(resolveVetterEmbed(null)).toBeNull()
  })
})

describe('resolveHeaderBookingCta', () => {
  it('keeps the header link when no Vetter identifier is set', () => {
    expect(resolveHeaderBookingCta(header, siteSettings)).toEqual({
      mode: 'link',
      link: {
        label: 'Schedule Visit',
        href: '/contact',
        isExternal: false,
      },
    })
  })

  it('uses the header label and Vetter embed when an identifier is set', () => {
    const action = resolveHeaderBookingCta(header, {
      ...siteSettings,
      booking: { ...siteSettings.booking, embedScriptUrl: 'clinic-token' },
    })

    expect(action).toEqual({
      mode: 'vetter',
      label: 'Schedule Visit',
      embed: { scriptSrc: VETTER_BOOKING_SCRIPT_SRC, identifier: 'clinic-token' },
    })
  })

  it('falls back to the site settings booking label', () => {
    const action = resolveHeaderBookingCta(
      { ...header, cta: { label: null, url: null } },
      {
        ...siteSettings,
        booking: { ...siteSettings.booking, embedScriptUrl: 'clinic-token' },
      },
    )

    expect(action?.mode).toBe('vetter')
    if (action?.mode === 'vetter') {
      expect(action.label).toBe('Book Now')
    }
  })
})
