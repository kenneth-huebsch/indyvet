import Link from 'next/link'
import type { ReactElement } from 'react'

import { MediaImage } from '@/components/media/MediaImage'
import { MobileNav } from '@/components/site/MobileNav'
import { Button } from '@/components/ui/button'
import { resolveLink } from '@/lib/links'
import { getMediaUrl, isMedia } from '@/lib/media'
import { cn } from '@/lib/utils'
import type { Header, SiteSetting } from '@/payload-types'

type SiteHeaderProps = {
  header: Header
  siteSettings: SiteSetting
  className?: string
}

function resolveHeaderCta(header: Header, siteSettings: SiteSetting) {
  return (
    resolveLink(header.cta) ??
    resolveLink({
      label: siteSettings.booking?.label,
      url: siteSettings.booking?.url,
    })
  )
}

export function SiteHeader(props: SiteHeaderProps): ReactElement {
  const { header, siteSettings, className } = props
  const siteName = siteSettings.brand.siteName
  const navItems =
    header.navItems
      ?.map((item) => resolveLink({ label: item.label, url: item.url }))
      .filter((item): item is NonNullable<typeof item> => item !== null) ?? []
  const cta = resolveHeaderCta(header, siteSettings)
  const showTextLogo = !isMedia(header.logo) || !getMediaUrl(header.logo)

  return (
    <header data-slot="site-header" className={cn('relative z-40 px-5 pt-5', className)}>
      <div className="mx-auto max-w-content">
        <div
          data-slot="site-header-pill"
          className="relative flex items-center justify-between gap-4 rounded-nav bg-card py-3 pl-6 pr-3 shadow-sm"
        >
          <Link
            href="/"
            className="inline-flex shrink-0 items-center gap-2 text-base font-semibold tracking-tight text-foreground no-underline hover:no-underline"
            aria-label={siteName}
          >
            <MediaImage
              media={header.logo}
              fallbackAlt={siteName}
              className="h-8 w-auto object-contain"
              width={140}
              height={32}
            />
            {showTextLogo ? <span>{siteName}</span> : null}
          </Link>

          <nav className="hidden min-[992px]:block" aria-label="Primary">
            <ul className="flex items-center gap-10">
              {navItems.map((item) => (
                <li key={`${item.label}-${item.href}`}>
                  <Link
                    href={item.href}
                    target={item.target}
                    rel={item.rel}
                    className="text-base font-semibold text-foreground no-underline transition-colors hover:text-muted-foreground hover:no-underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            {cta ? (
              <Button
                as={Link}
                href={cta.href}
                target={cta.target}
                rel={cta.rel}
                variant="primary"
                className="hidden min-[992px]:inline-flex no-underline hover:no-underline"
              >
                {cta.label}
              </Button>
            ) : null}

            <MobileNav items={navItems} cta={cta} />
          </div>
        </div>
      </div>
    </header>
  )
}
