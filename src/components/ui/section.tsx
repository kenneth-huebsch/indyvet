import { cva } from 'class-variance-authority'
import type { HTMLAttributes, ReactElement } from 'react'

import { cn } from '@/lib/utils'

export type SectionSpacing = 'none' | 'sm' | 'md' | 'lg'

const sectionVariants = cva('w-full', {
  variants: {
    spacing: {
      none: '',
      sm: 'py-section-sm',
      md: 'py-section-md',
      lg: 'py-section-lg',
    },
  },
  defaultVariants: {
    spacing: 'md',
  },
})

export function Section(
  props: HTMLAttributes<HTMLElement> & {
    spacing?: SectionSpacing
  },
): ReactElement {
  const { spacing = 'md', className, children, ...rest } = props

  return (
    <section data-slot="section" className={cn(sectionVariants({ spacing }), className)} {...rest}>
      {children}
    </section>
  )
}
