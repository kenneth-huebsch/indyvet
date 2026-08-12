import type { ReactElement } from 'react'

import { cn } from '@/lib/utils'

const DOT_COLORS = ['bg-brand-blue', 'bg-brand-pink', 'bg-brand-yellow', 'bg-primary'] as const

export type MarqueeTag = {
  label: string
  id?: string | null
}

type HomeMarqueeProps = {
  tags: MarqueeTag[]
  reverse?: boolean
  className?: string
  'aria-label'?: string
}

function TagPill(props: { label: string; colorIndex: number }): ReactElement {
  const { label, colorIndex } = props
  const dotColor = DOT_COLORS[colorIndex % DOT_COLORS.length]

  return (
    <span className="inline-flex shrink-0 items-center gap-2.5 rounded-full bg-card px-5 py-2.5 text-sm font-semibold text-foreground">
      <span aria-hidden className={cn('size-2.5 rounded-full', dotColor)} />
      {label}
    </span>
  )
}

export function HomeMarquee(props: HomeMarqueeProps): ReactElement | null {
  const { tags, reverse = false, className, 'aria-label': ariaLabel = 'Service tags' } = props
  const labels = tags.map((tag) => tag.label.trim()).filter(Boolean)

  if (!labels.length) {
    return null
  }

  const loop = [...labels, ...labels]

  return (
    <div
      data-slot="home-marquee"
      aria-label={ariaLabel}
      className={cn('overflow-hidden py-4', className)}
    >
      <div
        className={cn(
          'flex w-max gap-3',
          reverse ? 'animate-marquee-reverse' : 'animate-marquee',
          'motion-reduce:animate-none',
        )}
      >
        {loop.map((label, index) => (
          <TagPill key={`${label}-${index}`} label={label} colorIndex={index} />
        ))}
      </div>
    </div>
  )
}
