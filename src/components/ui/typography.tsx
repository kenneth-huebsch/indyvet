import { cva } from 'class-variance-authority'
import type { ComponentPropsWithoutRef, ElementType, ReactElement } from 'react'

import { cn } from '@/lib/utils'

export type TypographyVariant =
  | 'display'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'body-large'
  | 'body'
  | 'small'
  | 'caption'
  | 'label'
  | 'link'

const variantElementMap: Record<TypographyVariant, ElementType> = {
  display: 'h1',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  'body-large': 'p',
  body: 'p',
  small: 'p',
  caption: 'span',
  label: 'label',
  link: 'a',
}

const typographyVariants = cva('font-heading', {
  variants: {
    variant: {
      display: 'text-5xl font-semibold leading-tight tracking-tight sm:text-6xl lg:text-7xl',
      h1: 'text-5xl font-semibold leading-tight tracking-tight',
      h2: 'text-4xl font-semibold leading-tight tracking-tight lg:text-5xl',
      h3: 'text-3xl font-semibold leading-tight tracking-tight',
      h4: 'text-2xl font-semibold leading-tight tracking-tight',
      'body-large': 'text-lg font-medium leading-relaxed',
      body: 'text-base font-medium leading-normal',
      small: 'text-sm font-medium leading-normal',
      caption: 'text-xs text-muted-foreground',
      label: 'text-sm font-semibold leading-normal',
      link: 'text-base font-medium underline underline-offset-4',
    },
  },
  defaultVariants: {
    variant: 'body',
  },
})

type TypographyOwnProps<T extends ElementType> = {
  as?: T
  variant?: TypographyVariant
  className?: string
}

export type TypographyProps<T extends ElementType = 'p'> = TypographyOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof TypographyOwnProps<T>>

export function Typography<T extends ElementType = 'p'>(props: TypographyProps<T>): ReactElement {
  const { as, variant = 'body', className, children, ...rest } = props

  const Component = as ?? variantElementMap[variant]

  return (
    <Component className={cn(typographyVariants({ variant }), className)} {...rest}>
      {children}
    </Component>
  )
}
