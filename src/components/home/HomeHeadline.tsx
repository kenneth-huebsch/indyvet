import type { ReactElement } from 'react'

import { Typography } from '@/components/ui/typography'
import { cn } from '@/lib/utils'

type HomeHeadlineProps = {
  children: string
  as?: 'h1' | 'h2'
  className?: string
}

export function HomeHeadline(props: HomeHeadlineProps): ReactElement {
  const { children, as = 'h2', className } = props

  return (
    <Typography
      as={as}
      variant={as === 'h1' ? 'display' : 'h2'}
      className={cn('text-balance', className)}
    >
      {children.trim()}
    </Typography>
  )
}
