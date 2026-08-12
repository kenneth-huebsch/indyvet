import React from 'react'
import { Urbanist } from 'next/font/google'
import type { Metadata } from 'next'

import { SiteFooter } from '@/components/site/SiteFooter'
import { SiteHeader } from '@/components/site/SiteHeader'
import { getSiteChrome } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo'
import '@/styles/globals.css'

export const dynamic = 'force-dynamic'

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-urbanist',
  display: 'swap',
})

export async function generateMetadata(): Promise<Metadata> {
  const { siteSettings } = await getSiteChrome()

  return buildMetadata({
    defaults: siteSettings.defaultSeo,
    siteName: siteSettings.brand.siteName,
  })
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const { header, footer, siteSettings } = await getSiteChrome()

  return (
    <html lang="en" className={urbanist.variable}>
      <body className={urbanist.className}>
        <SiteHeader header={header} siteSettings={siteSettings} />
        <main>{children}</main>
        <SiteFooter footer={footer} siteSettings={siteSettings} />
      </body>
    </html>
  )
}
