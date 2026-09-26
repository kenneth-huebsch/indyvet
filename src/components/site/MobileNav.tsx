'use client'

import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useId, useState, type ReactElement } from 'react'

import { VetterBookingButton } from '@/components/site/VetterBooking'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import type { HeaderBookingCta } from '@/lib/booking'
import type { ResolvedLink } from '@/lib/links'
import { cn } from '@/lib/utils'

type MobileNavProps = {
  items: ResolvedLink[]
  cta: HeaderBookingCta | null
}

export function MobileNav(props: MobileNavProps): ReactElement {
  const { items, cta } = props
  const [open, setOpen] = useState(false)
  const panelId = useId()

  return (
    <div className="max-[820px]:block min-[821px]:hidden" data-slot="mobile-nav">
      <Button
        type="button"
        variant="ghost"
        className="h-11 w-11 shrink-0 p-0"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen((current) => !current)}
      >
        <Icon icon={open ? X : Menu} size="lg" />
      </Button>

      <div
        id={panelId}
        hidden={!open}
        className={cn(
          'absolute left-0 right-0 top-full z-50 border-b border-line bg-sage-light p-4',
          open ? 'block' : 'hidden',
        )}
      >
        <nav aria-label="Mobile">
          <ul className="flex flex-col gap-1">
            {items.map((item) => (
              <li key={`${item.label}-${item.href}`}>
                <Link
                  href={item.href}
                  target={item.target}
                  rel={item.rel}
                  className="block px-4 py-3 text-[12px] font-bold tracking-[0.05em] text-foreground no-underline hover:bg-muted hover:no-underline"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {cta?.mode === 'link' ? (
          <Button
            as={Link}
            href={cta.link.href}
            target={cta.link.target}
            rel={cta.link.rel}
            variant="primary"
            className="mt-3 w-full no-underline hover:no-underline"
            onClick={() => setOpen(false)}
          >
            {cta.link.label}
          </Button>
        ) : null}
        {cta?.mode === 'vetter' ? (
          <VetterBookingButton
            label={cta.label}
            className="mt-3 w-full no-underline hover:no-underline"
            onOpen={() => setOpen(false)}
          />
        ) : null}
      </div>
    </div>
  )
}
