/** @vitest-environment jsdom */
import { render, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { openVetterBooking, VetterBookingHost } from './VetterBooking'
import { VETTER_BOOKING_SCRIPT_SRC } from '@/lib/booking'

describe('VetterBookingHost', () => {
  it('loads the Vetter script with the identifier attribute and keeps the vendor mount point', async () => {
    render(
      <VetterBookingHost scriptSrc={VETTER_BOOKING_SCRIPT_SRC} identifier="clinic+token/id=" />,
    )

    await waitFor(() => {
      const script = document.querySelector(`script[src="${VETTER_BOOKING_SCRIPT_SRC}"]`)
      expect(script?.getAttribute('identifier')).toBe('clinic+token/id=')
    })

    expect(document.getElementById('vetter-btn')).not.toBeNull()
    expect(document.querySelector('[data-vetter-host]')).not.toBeNull()
  })
})

describe('openVetterBooking', () => {
  it('starts the vendor workflow from the hidden Vetter button', () => {
    document.body.innerHTML =
      '<div data-vetter-host><div class="vetter"><button class="btn btn-vetter" type="button">Request Appointment</button></div></div>'
    const root = document.querySelector('.vetter') as HTMLElement & {
      __vue__?: { init: () => void; status: boolean }
    }
    let opened = false
    root.__vue__ = {
      status: true,
      init: () => {
        opened = true
      },
    }

    openVetterBooking()

    expect(opened).toBe(true)
  })
})
