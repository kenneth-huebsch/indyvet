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
      <span
        aria-hidden
        className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-pink text-primary"
      >
        <Icon icon={icon} size="sm" />
      </span>
      <span>{children}</span>
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        className="flex items-start gap-3 text-sm font-medium text-primary-foreground/90 no-underline hover:text-primary-foreground hover:no-underline"
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
  const hours = contact?.hours?.filter((row) => row.label.trim() && row.value.trim()) ?? []
  const hasContact = Boolean(contact?.address || contact?.phone || contact?.email || pharmacy)
  const showTextLogo = !isMedia(footer.logo) || !getMediaUrl(footer.logo)

  return (
    <footer data-slot="site-footer" className={cn('px-5 pb-5 pt-section-md', className)}>
      <div className="relative mx-auto max-w-content overflow-hidden rounded-xl bg-primary text-primary-foreground">
        {/* Decorative paw cluster — Vetic Home 1 bottom-right treatment */}
        {/* eslint-disable-next-line @next/next/no-img-element -- decorative brand mark */}
        <img
          src="/home/footer-paw.svg"
          alt=""
          aria-hidden
          data-slot="site-footer-paw"
          className="pointer-events-none absolute -bottom-8 -right-6 w-[min(42%,18rem)] select-none opacity-90 sm:-bottom-10 sm:-right-4 sm:w-64"
        />

        <div className="relative z-10 flex flex-col gap-10 p-8 lg:flex-row lg:justify-between lg:gap-16 lg:p-12">
          <div className="shrink-0">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-lg font-semibold tracking-tight text-primary-foreground no-underline hover:no-underline"
              aria-label={siteName}
            >
              <MediaImage
                media={footer.logo}
                fallbackAlt={siteName}
                className="h-10 w-auto object-contain brightness-0 invert"
                sizes="240px"
                quality={100}
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
                          className="text-sm font-medium text-primary-foreground/80 no-underline transition-colors hover:text-primary-foreground hover:no-underline"
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
                <p className="mb-4 text-sm font-semibold text-primary-foreground">
                  Hours of Operation
                </p>
                <ul className="space-y-3">
                  {hours.map((row) => (
                    <li
                      key={row.id ?? `${row.label}-${row.value}`}
                      className="text-sm font-medium text-primary-foreground/80"
                    >
                      <span className="text-primary-foreground">{row.label.trim()}:</span>{' '}
                      {row.value.trim()}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {hasContact ? (
              <div data-slot="site-footer-contact">
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
                  {pharmacy ? (
                    <Link
                      href={pharmacy.href}
                      target={pharmacy.target}
                      rel={pharmacy.rel}
                      className="inline-block pl-12 text-sm font-semibold text-primary-foreground no-underline hover:no-underline"
                    >
                      {pharmacy.label}
                    </Link>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </footer>
  )
}
