import type { LucideIcon, LucideProps } from 'lucide-react'
import type { ReactElement } from 'react'

import { cn } from '@/lib/utils'

export type IconSize = 'sm' | 'md' | 'lg' | 'xl'

const iconSizes: Record<IconSize, string> = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
  xl: 'h-8 w-8',
}

export function Icon(
  props: {
    icon: LucideIcon
    size?: IconSize
  } & Omit<LucideProps, 'size'>,
): ReactElement {
  const { icon: LucideComponent, size = 'md', className, 'aria-label': ariaLabel, ...rest } = props

  return (
    <LucideComponent
      data-slot="icon"
      className={cn(iconSizes[size], className)}
      {...rest}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel === undefined ? true : undefined}
    />
  )
}
