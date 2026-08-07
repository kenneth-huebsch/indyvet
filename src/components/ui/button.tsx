import { cva } from 'class-variance-authority'
import type { ButtonHTMLAttributes, ReactElement } from 'react'

import { cn } from '@/lib/utils'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link'

const buttonVariants = cva(
  'inline-flex min-h-button items-center justify-center rounded-button px-button-x py-button-y text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary/70',
        outline:
          'border border-border bg-transparent text-foreground hover:bg-muted active:bg-muted/80',
        ghost: 'bg-transparent text-foreground hover:bg-muted active:bg-muted/80',
        link: 'min-h-0 rounded-none p-0 text-foreground underline underline-offset-4 hover:no-underline',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
)

export function Button(
  props: ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant
  },
): ReactElement {
  const { variant = 'primary', type = 'button', className, children, ...rest } = props

  return (
    <button
      type={type}
      data-slot="button"
      className={cn(buttonVariants({ variant }), className)}
      {...rest}
    >
      {children}
    </button>
  )
}
