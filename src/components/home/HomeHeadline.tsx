import type { ReactElement } from 'react'

import { Typography } from '@/components/ui/typography'
import { cn } from '@/lib/utils'

type HomeHeadlineProps = {
  children: string
  as?: 'h1' | 'h2'
  className?: string
  underline?: boolean
}

/** Hand-drawn accent underline on the last word — presentational, matches Vetic Home 1. */
export function HomeHeadline(props: HomeHeadlineProps): ReactElement {
  const { children, as = 'h2', className, underline = true } = props
  const parts = children.trim().split(/\s+/)
  const last = parts.pop()
  const lead = parts.join(' ')

  return (
    <Typography
      as={as}
      variant={as === 'h1' ? 'display' : 'h2'}
      className={cn('text-balance tracking-tight', className)}
    >
      {lead ? <>{lead} </> : null}
      {last ? (
        <span className={cn(underline && 'relative inline-block pb-[0.45em]')}>
          {last}
          {underline ? (
            // eslint-disable-next-line @next/next/no-img-element -- decorative mark, not content imagery
            <img
              src="/home/underline-pink.webp"
              alt=""
              aria-hidden
              data-slot="home-headline-underline"
              className="pointer-events-none absolute left-1/2 top-[0.97em] h-[0.4em] w-[110%] max-w-none -translate-x-1/2 object-fill select-none"
            />
          ) : null}
        </span>
      ) : null}
    </Typography>
  )
}
