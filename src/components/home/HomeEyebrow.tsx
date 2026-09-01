import type { ReactElement } from 'react'

import { Typography } from '@/components/ui/typography'
import { cn } from '@/lib/utils'

type HomeEyebrowProps = {
  children: string
  className?: string
}

export function HomeEyebrow(props: HomeEyebrowProps): ReactElement {
  const { children, className } = props

  return (
    <Typography as="p" variant="label" className={cn(className)}>
      {children}
    </Typography>
  )
}
