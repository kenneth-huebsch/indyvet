import Link from 'next/link'
import type { ReactElement } from 'react'

import { MediaImage } from '@/components/media/MediaImage'
import { MobileNav } from '@/components/site/MobileNav'
import { VetterBookingButton, VetterBookingHost } from '@/components/site/VetterBooking'
import { Button } from '@/components/ui/button'
import { resolveHeaderBookingCta } from '@/lib/booking'
import { resolveLink } from '@/lib/links'
import { getMediaUrl, isMedia } from '@/lib/media'
import { cn } from '@/lib/utils'
import type { Header, SiteSetting } from '@/payload-types'

type SiteHeaderProps = {
  header: Header
  siteSettings: SiteSetting
  className?: string
}

export function SiteHeader(props: SiteHeaderProps): ReactElement {
  const { header, siteSettings, className } = props
  const siteName = siteSettings.brand.siteName
  const tagline = siteSettings.brand.tagline?.trim()
  const navItems =
    header.navItems
      ?.map((item) => resolveLink({ label: item.label, url: item.url }))
      .filter((item): item is NonNullable<typeof item> => item !== null) ?? []
  const cta = resolveHeaderBookingCta(header, siteSettings)
  const showTextLogo = !isMedia(header.logo) || !getMediaUrl(header.logo)

  return (
    <header
      data-slot="site-header"
      className={cn('relative sticky top-0 z-40 border-b border-line bg-sage-light', className)}
    >
      <div className="mx-auto flex h-[82px] max-w-content items-center justify-between gap-6 px-[1.125rem] md:h-[82px] md:px-gutter">
        <Link
          href="/"
          className="inline-flex shrink-0 items-center gap-2 text-foreground no-underline hover:no-underline"
          aria-label={siteName}
        >
          <MediaImage
            media={header.logo}
            fallbackAlt={siteName}
            className="h-auto max-h-[74px] w-auto max-w-[min(18rem,calc(100vw-7.5rem))] object-contain"
            sizes="280px"
            quality={100}
            priority
          />
          {showTextLogo ? (
            <span className="font-heading text-[21px] tracking-[0.12em] md:text-[25px]">
              {siteName}
              {tagline ? (
                <small className="mt-1 block font-sans text-[9px] font-semibold tracking-[0.19em]">
                  {tagline}
                </small>
              ) : null}
            </span>
          ) : null}
        </Link>

        <nav className="hidden min-[821px]:block" aria-label="Primary">
          <ul className="flex items-center gap-6 text-[12px] font-bold tracking-[0.05em]">
            {navItems.map((item) => (
              <li key={`${item.label}-${item.href}`}>
                <Link
                  href={item.href}
                  target={item.target}
                  rel={item.rel}
                  className="text-foreground no-underline transition-colors hover:text-muted-foreground hover:no-underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {cta?.mode === 'link' ? (
            <Button
              as={Link}
              href={cta.link.href}
              target={cta.link.target}
              rel={cta.link.rel}
              variant="primary"
              className="hidden no-underline hover:no-underline min-[821px]:inline-flex"
            >
              {cta.link.label}
            </Button>
          ) : null}
          {cta?.mode === 'vetter' ? (
            <VetterBookingButton
              label={cta.label}
              className="hidden no-underline hover:no-underline min-[821px]:inline-flex"
            />
          ) : null}

          <MobileNav items={navItems} cta={cta} />
        </div>
      </div>
      {cta?.mode === 'vetter' ? (
        <VetterBookingHost scriptSrc={cta.embed.scriptSrc} identifier={cta.embed.identifier} />
      ) : null}
    </header>
  )
}
