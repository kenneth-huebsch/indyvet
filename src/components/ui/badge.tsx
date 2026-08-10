import { cva } from 'class-variance-authority'
import type { HTMLAttributes, ReactElement } from 'react'

import { cn } from '@/lib/utils'

export type BadgeVariant =
  'default' | 'secondary' | 'accent' | 'outline' | 'success' | 'warning' | 'destructive'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        accent: 'bg-accent text-accent-foreground',
        outline: 'border border-border bg-transparent text-foreground',
        success: 'bg-success text-success-foreground',
        warning: 'bg-warning text-warning-foreground',
        destructive: 'bg-destructive text-destructive-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export function Badge(
  props: HTMLAttributes<HTMLSpanElement> & {
    variant?: BadgeVariant
  },
): ReactElement {
  const { variant = 'default', className, children, ...rest } = props

  return (
    <span data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...rest}>
      {children}
    </span>
  )
}
