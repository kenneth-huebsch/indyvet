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

const typographyVariants = cva('', {
  variants: {
    variant: {
      display:
        'font-heading text-4xl font-normal leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-[3.75rem]',
      h1: 'font-heading text-4xl font-normal leading-[1.08] tracking-[-0.015em] sm:text-5xl',
      h2: 'font-heading text-[2.25rem] font-normal leading-[1.08] tracking-[-0.015em] lg:text-[2.625rem]',
      h3: 'font-heading text-2xl font-normal leading-[1.15]',
      h4: 'font-heading text-xl font-normal leading-tight',
      'body-large': 'text-lg font-normal leading-relaxed',
      body: 'text-base font-normal leading-normal',
      small: 'text-sm font-normal leading-normal',
      caption: 'text-xs text-muted-foreground',
      label:
        'text-[11px] font-extrabold uppercase leading-normal tracking-[0.18em] text-muted-foreground',
      link: 'text-base font-normal underline underline-offset-4',
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
