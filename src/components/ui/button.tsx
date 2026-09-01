import { cva } from 'class-variance-authority'
import type { ComponentPropsWithoutRef, ElementType, ReactElement } from 'react'

import { cn } from '@/lib/utils'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link'

export const buttonVariants = cva(
  'inline-flex min-h-button items-center justify-center rounded-none border border-primary px-button-x py-button-y text-[11px] font-extrabold uppercase tracking-[0.08em] transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary/70',
        outline: 'bg-transparent text-foreground hover:bg-cream active:bg-cream/80',
        ghost:
          'border-transparent bg-transparent text-foreground hover:bg-muted active:bg-muted/80',
        link: 'min-h-0 rounded-none border-0 p-0 text-foreground underline underline-offset-4 hover:no-underline',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
)

type ButtonOwnProps<T extends ElementType> = {
  as?: T
  variant?: ButtonVariant
  className?: string
}

export type ButtonProps<T extends ElementType = 'button'> = ButtonOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof ButtonOwnProps<T>>

export function Button<T extends ElementType = 'button'>(props: ButtonProps<T>): ReactElement {
  const { as, variant = 'primary', className, children, ...rest } = props
  const Component = (as ?? 'button') as ElementType

  if (Component === 'button') {
    const { type = 'button', ...buttonRest } = rest as ComponentPropsWithoutRef<'button'>

    return (
      <button
        type={type}
        data-slot="button"
        className={cn(buttonVariants({ variant }), className)}
        {...buttonRest}
      >
        {children}
      </button>
    )
  }

  return (
    <Component data-slot="button" className={cn(buttonVariants({ variant }), className)} {...rest}>
      {children}
    </Component>
  )
}
