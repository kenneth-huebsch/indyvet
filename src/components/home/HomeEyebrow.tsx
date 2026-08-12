import type { ReactElement } from 'react'

import { Typography } from '@/components/ui/typography'
import { cn } from '@/lib/utils'

const DOT_COLORS = ['bg-brand-blue', 'bg-brand-pink', 'bg-brand-yellow', 'bg-primary'] as const

type HomeEyebrowProps = {
  children: string
  className?: string
  dotIndex?: number
}

export function HomeEyebrow(props: HomeEyebrowProps): ReactElement {
  const { children, className, dotIndex = 0 } = props
  const dotColor = DOT_COLORS[dotIndex % DOT_COLORS.length]

  return (
    <Typography
      as="p"
      variant="label"
      className={cn(
        'inline-flex items-center gap-2 text-sm font-semibold tracking-wide',
        className,
      )}
    >
      <span aria-hidden className={cn('size-2.5 shrink-0 rounded-full', dotColor)} />
      {children}
    </Typography>
  )
}
