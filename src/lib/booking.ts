import type { Header, SiteSetting } from '@/payload-types'

import { resolveLink, type ResolvedLink } from '@/lib/links'

export const VETTER_BOOKING_SCRIPT_SRC = 'https://vettersoftware.com/view/dist/online-book.js'

export type VetterEmbed = {
  scriptSrc: string
  identifier: string
}

export type HeaderBookingCta =
  { mode: 'link'; link: ResolvedLink } | { mode: 'vetter'; label: string; embed: VetterEmbed }

function resolveHeaderLink(header: Header, siteSettings: SiteSetting): ResolvedLink | null {
  return (
    resolveLink(header.cta) ??
    resolveLink({
      label: siteSettings.booking?.label,
      url: siteSettings.booking?.url,
    })
  )
}

function bookingLabel(
  header: Header,
  siteSettings: SiteSetting,
  link: ResolvedLink | null,
): string {
  return (
    header.cta?.label?.trim() || siteSettings.booking?.label?.trim() || link?.label || 'Book Now'
  )
}

/**
 * Site Settings `booking.embedScriptUrl` stores the public Vetter identifier
 * (or the full embed snippet, or a script URL with an `identifier` query).
 * There is no separate identifier column.
 */
export function resolveVetterEmbed(embedScriptUrl: string | null | undefined): VetterEmbed | null {
  const raw = embedScriptUrl?.trim()
  if (!raw) {
    return null
  }

  const attribute = raw.match(/identifier\s*=\s*(?:"([^"]+)"|'([^']+)')/i)
  const attributeIdentifier = (attribute?.[1] ?? attribute?.[2])?.trim()
  if (attributeIdentifier) {
    const src = raw.match(/src\s*=\s*(?:"([^"]+)"|'([^']+)')/i)
    const scriptSrc = (src?.[1] ?? src?.[2] ?? VETTER_BOOKING_SCRIPT_SRC).split('?')[0]?.trim()
    if (!scriptSrc) {
      return null
    }

    return { scriptSrc, identifier: attributeIdentifier }
  }

  if (/^https?:\/\//i.test(raw)) {
    try {
      const url = new URL(raw)
      const identifier = url.searchParams.get('identifier')?.trim()
      if (!identifier) {
        return null
      }

      url.search = ''
      url.hash = ''
      return { scriptSrc: url.toString(), identifier }
    } catch {
      return null
    }
  }

  if (raw.startsWith('/') || /\s/.test(raw) || raw.includes('<')) {
    return null
  }

  return { scriptSrc: VETTER_BOOKING_SCRIPT_SRC, identifier: raw }
}

export function resolveHeaderBookingCta(
  header: Header,
  siteSettings: SiteSetting,
): HeaderBookingCta | null {
  const embed = resolveVetterEmbed(siteSettings.booking?.embedScriptUrl)
  const link = resolveHeaderLink(header, siteSettings)

  if (embed) {
    return {
      mode: 'vetter',
      label: bookingLabel(header, siteSettings, link),
      embed,
    }
  }

  if (!link) {
    return null
  }

  return { mode: 'link', link }
}
