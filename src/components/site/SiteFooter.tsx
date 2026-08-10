import { Mail, MapPin, Phone } from 'lucide-react'
import Link from 'next/link'
import type { ReactElement, ReactNode } from 'react'

import { MediaImage } from '@/components/media/MediaImage'
import { Icon } from '@/components/ui/icon'
import { resolveLink } from '@/lib/links'
import { getMediaUrl, isMedia } from '@/lib/media'
import { cn } from '@/lib/utils'
import type { Footer, SiteSetting } from '@/payload-types'

type SiteFooterProps = {
  footer: Footer
  siteSettings: SiteSetting
  className?: string
}

function ContactRow(props: {
  icon: typeof Phone
  children: ReactNode
  href?: string
}): ReactElement {
  const { icon, children, href } = props
  const content = (
    <>
      <Icon icon={icon} size="sm" className="mt-0.5 shrink-0 text-primary-foreground/70" />
      <span>{children}</span>
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        className="flex items-start gap-3 text-sm font-medium text-primary-foreground/90 hover:text-primary-foreground"
      >
        {content}
      </a>
    )
  }

  return (
    <div className="flex items-start gap-3 text-sm font-medium text-primary-foreground/90">
      {content}
    </div>
  )
}

export function SiteFooter(props: SiteFooterProps): ReactElement {
  const { footer, siteSettings, className } = props
  const siteName = siteSettings.brand.siteName
  const contact = siteSettings.contact
  const pharmacy = resolveLink(siteSettings.pharmacy)
  const linkGroups = footer.linkGroups ?? []
  const hasNap = Boolean(
    contact?.address || contact?.phone || contact?.email || contact?.hours?.length,
  )
  const showTextLogo = !isMedia(footer.logo) || !getMediaUrl(footer.logo)

  return (
    <footer data-slot="site-footer" className={cn('px-5 pb-5 pt-section-md', className)}>
      <div className="mx-auto max-w-content overflow-hidden rounded-xl bg-primary text-primary-foreground">
        <div className="flex flex-col gap-10 p-8 lg:flex-row lg:justify-between lg:gap-16 lg:p-12">
          <div className="shrink-0">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-lg font-semibold tracking-tight text-primary-foreground"
              aria-label={siteName}
            >
              <MediaImage
                media={footer.logo}
                fallbackAlt={siteName}
                className="h-10 w-auto object-contain brightness-0 invert"
                width={160}
                height={40}
              />
              {showTextLogo ? <span>{siteName}</span> : null}
            </Link>
          </div>

          <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {linkGroups.map((group) => (
              <div key={group.id ?? group.title}>
                <p className="mb-4 text-sm font-semibold text-primary-foreground">{group.title}</p>
                <ul className="space-y-3">
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
                          className="text-sm font-medium text-primary-foreground/80 transition-colors hover:text-primary-foreground"
                        >
                          {resolved.label}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}

            {hasNap || pharmacy ? (
              <div>
                <p className="mb-4 text-sm font-semibold text-primary-foreground">Contact</p>
                <div className="space-y-3">
                  {contact?.address ? (
                    <ContactRow icon={MapPin}>
                      <span className="whitespace-pre-line">{contact.address}</span>
                    </ContactRow>
                  ) : null}
                  {contact?.phone ? (
                    <ContactRow icon={Phone} href={`tel:${contact.phone.replace(/[^\d+]/g, '')}`}>
                      {contact.phone}
                    </ContactRow>
                  ) : null}
                  {contact?.email ? (
                    <ContactRow icon={Mail} href={`mailto:${contact.email}`}>
                      {contact.email}
                    </ContactRow>
                  ) : null}
                  {contact?.hours?.map((row) => (
                    <p
                      key={row.id ?? `${row.label}-${row.value}`}
                      className="text-sm font-medium text-primary-foreground/80"
                    >
                      <span className="text-primary-foreground">{row.label}:</span> {row.value}
                    </p>
                  ))}
                  {pharmacy ? (
                    <Link
                      href={pharmacy.href}
                      target={pharmacy.target}
                      rel={pharmacy.rel}
                      className="inline-block text-sm font-semibold text-primary-foreground underline underline-offset-4"
                    >
                      {pharmacy.label}
                    </Link>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {footer.copyright ? (
          <div className="border-t border-primary-foreground/10 px-8 py-5 lg:px-12">
            <p className="text-sm font-medium text-primary-foreground/70">{footer.copyright}</p>
          </div>
        ) : null}
      </div>
    </footer>
  )
}
