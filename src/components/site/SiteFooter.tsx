import Link from 'next/link'
import type { ReactElement } from 'react'

import { MediaImage } from '@/components/media/MediaImage'
import { resolveLink } from '@/lib/links'
import { getMediaUrl, isMedia } from '@/lib/media'
import { cn } from '@/lib/utils'
import type { Footer, SiteSetting } from '@/payload-types'

type SiteFooterProps = {
  footer: Footer
  siteSettings: SiteSetting
  className?: string
}

export function SiteFooter(props: SiteFooterProps): ReactElement {
  const { footer, siteSettings, className } = props
  const siteName = siteSettings.brand.siteName
  const tagline = siteSettings.brand.tagline?.trim()
  const contact = siteSettings.contact
  const pharmacy = resolveLink(siteSettings.pharmacy)
  const facebook = siteSettings.social?.facebook?.trim()
  const instagram = siteSettings.social?.instagram?.trim()
  const linkGroups = footer.linkGroups ?? []
  const hours = contact?.hours?.filter((row) => row.label.trim() && row.value.trim()) ?? []
  const hasContact = Boolean(
    contact?.address || contact?.phone || contact?.email || pharmacy || facebook || instagram,
  )
  const showTextLogo = !isMedia(footer.logo) || !getMediaUrl(footer.logo)
  const copyright = footer.copyright?.trim()

  return (
    <footer
      data-slot="site-footer"
      className={cn('border-t border-line bg-sage-light py-[42px] text-foreground', className)}
    >
      <div className="mx-auto max-w-content px-[1.125rem] md:px-gutter">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr] lg:gap-[34px]">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-foreground no-underline hover:no-underline"
              aria-label={siteName}
            >
              <MediaImage
                media={footer.logo}
                fallbackAlt={siteName}
                className="h-10 w-auto object-contain"
                sizes="240px"
                quality={100}
              />
              {showTextLogo ? (
                <span className="font-heading text-[21px] tracking-[0.12em] md:text-[25px]">
                  {siteName}
                  {tagline ? (
                    <small className="mt-1 block font-sans text-[9px] font-semibold tracking-[0.19em] text-muted-foreground">
                      {tagline}
                    </small>
                  ) : null}
                </span>
              ) : null}
            </Link>
          </div>

          {linkGroups.map((group) => (
            <div key={group.id ?? group.title}>
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.1em] text-foreground">
                {group.title}
              </p>
              <ul>
                {group.links?.map((link) => {
                  const resolved = resolveLink({ label: link.label, url: link.url })
                  if (!resolved) {
                    return null
                  }

                  return (
                    <li key={link.id ?? `${link.label}-${link.url}`}>
                      <Link
                        href={resolved.href}
                        target={resolved.target}
                        rel={resolved.rel}
                        className="my-1 block text-xs text-muted-foreground no-underline hover:text-foreground hover:no-underline"
                      >
                        {resolved.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}

          {hours.length > 0 ? (
            <div data-slot="site-footer-hours">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.1em] text-foreground">
                Hours
              </p>
              <ul>
                {hours.map((row) => (
                  <li
                    key={row.id ?? `${row.label}-${row.value}`}
                    className="my-1 text-xs text-muted-foreground"
                  >
                    <span className="text-foreground">{row.label.trim()}:</span> {row.value.trim()}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {hasContact ? (
            <div data-slot="site-footer-contact">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.1em] text-foreground">
                Contact
              </p>
              <div>
                {contact?.address ? (
                  <p className="my-1 whitespace-pre-line text-xs text-muted-foreground">
                    {contact.address}
                  </p>
                ) : null}
                {contact?.phone ? (
                  <a
                    href={`tel:${contact.phone.replace(/[^\d+]/g, '')}`}
                    className="my-1 block text-xs text-muted-foreground no-underline hover:text-foreground hover:no-underline"
                  >
                    {contact.phone}
                  </a>
                ) : null}
                {contact?.email ? (
                  <a
                    href={`mailto:${contact.email}`}
                    className="my-1 block text-xs text-muted-foreground no-underline hover:text-foreground hover:no-underline"
                  >
                    {contact.email}
                  </a>
                ) : null}
                {pharmacy ? (
                  <Link
                    href={pharmacy.href}
                    target={pharmacy.target}
                    rel={pharmacy.rel}
                    className="my-1 block text-xs text-muted-foreground no-underline hover:text-foreground hover:no-underline"
                  >
                    {pharmacy.label}
                  </Link>
                ) : null}
                {instagram ? (
                  <a
                    href={instagram}
                    className="my-1 block text-xs text-muted-foreground no-underline hover:text-foreground hover:no-underline"
                  >
                    Instagram
                  </a>
                ) : null}
                {facebook ? (
                  <a
                    href={facebook}
                    className="my-1 block text-xs text-muted-foreground no-underline hover:text-foreground hover:no-underline"
                  >
                    Facebook
                  </a>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>

        {copyright ? (
          <p className="mt-8 text-xs text-muted-foreground" data-slot="site-footer-copyright">
            {copyright}
          </p>
        ) : null}
      </div>
    </footer>
  )
}
