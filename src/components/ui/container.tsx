import { cva } from 'class-variance-authority'
import type { HTMLAttributes, ReactElement } from 'react'

import { cn } from '@/lib/utils'

export type ContainerSize = 'content' | 'medium'

const containerVariants = cva('mx-auto w-full px-4 sm:px-6 lg:px-gutter', {
  variants: {
    size: {
      content: 'max-w-content',
      medium: 'max-w-medium',
    },
  },
  defaultVariants: {
    size: 'content',
  },
})

export function Container(
  props: HTMLAttributes<HTMLDivElement> & {
    size?: ContainerSize
  },
): ReactElement {
  const { size = 'content', className, children, ...rest } = props

  return (
    <div data-slot="container" className={cn(containerVariants({ size }), className)} {...rest}>
      {children}
    </div>
  )
}
