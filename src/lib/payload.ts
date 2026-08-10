import config from '@payload-config'
import { getPayload, type Payload } from 'payload'
import { cache } from 'react'

import type { Footer, Header, SiteSetting } from '@/payload-types'

export type SiteChrome = {
  header: Header
  footer: Footer
  siteSettings: SiteSetting
}

let payloadClient: Payload | null = null

export async function getPayloadClient(): Promise<Payload> {
  if (payloadClient) {
    return payloadClient
  }

  payloadClient = await getPayload({ config })
  return payloadClient
}

export const getSiteChrome = cache(async (): Promise<SiteChrome> => {
  const payload = await getPayloadClient()

  const [header, footer, siteSettings] = await Promise.all([
    payload.findGlobal({ slug: 'header', depth: 1 }),
    payload.findGlobal({ slug: 'footer', depth: 1 }),
    payload.findGlobal({ slug: 'site-settings', depth: 1 }),
  ])

  return { header, footer, siteSettings }
})
