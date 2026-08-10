import type { HTMLAttributes, ReactElement } from 'react'

import { cn } from '@/lib/utils'

export function Divider(props: HTMLAttributes<HTMLHRElement>): ReactElement {
  const { className, ...rest } = props

  return (
    <hr
      data-slot="divider"
      className={cn('w-full border-0 border-t border-border', className)}
      {...rest}
    />
  )
}
