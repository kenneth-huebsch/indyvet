import type { HTMLAttributes, ReactElement } from 'react'

import { cn } from '@/lib/utils'

export function Card(props: HTMLAttributes<HTMLDivElement>): ReactElement {
  const { className, children, ...rest } = props

  return (
    <div
      data-slot="card"
      className={cn(
        'rounded-lg border border-border bg-card text-card-foreground shadow-sm',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
