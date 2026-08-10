'use client'

import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useId, useState, type ReactElement } from 'react'

import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import type { ResolvedLink } from '@/lib/links'
import { cn } from '@/lib/utils'

type MobileNavProps = {
  items: ResolvedLink[]
  cta: ResolvedLink | null
}

export function MobileNav(props: MobileNavProps): ReactElement {
  const { items, cta } = props
  const [open, setOpen] = useState(false)
  const panelId = useId()

  return (
    <div className="max-[991px]:block min-[992px]:hidden" data-slot="mobile-nav">
      <Button
        type="button"
        variant="ghost"
        className="h-11 w-11 shrink-0 rounded-full p-0"
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
          'absolute left-0 right-0 top-full z-50 mt-3 rounded-3xl bg-card p-4 shadow-md',
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
                  className="block rounded-2xl px-4 py-3 text-base font-semibold text-foreground hover:bg-muted"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {cta ? (
          <Button
            as={Link}
            href={cta.href}
            target={cta.target}
            rel={cta.rel}
            variant="primary"
            className="mt-3 w-full"
            onClick={() => setOpen(false)}
          >
            {cta.label}
          </Button>
        ) : null}
      </div>
    </div>
  )
}
