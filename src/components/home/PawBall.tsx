import type { CSSProperties, ReactElement } from 'react'

import { cn } from '@/lib/utils'

export const PAW_BADGE_FILLS = ['#beefff', '#ffa500', '#ffe500', '#80fd8c'] as const

type PawBadgeProps = {
  fill: string
  className?: string
  style?: CSSProperties
  /** When true, applies hero float/entrance motion classes. */
  animated?: boolean
  'data-slot'?: string
}

/** Colored circular paw mark used in hero floats and service cards. */
export function PawBadge(props: PawBadgeProps): ReactElement {
  const {
    fill,
    className,
    style,
    animated = false,
    'data-slot': dataSlot = 'home-paw-badge',
  } = props

  return (
    <span
      aria-hidden
      data-slot={dataSlot}
      className={cn(
        'inline-block size-14 shrink-0',
        animated && 'pointer-events-none absolute animate-hero-paw motion-reduce:animate-none',
        className,
      )}
      style={style}
    >
      <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-full">
        <rect width="56" height="56" rx="28" fill="white" />
        <rect x="4" y="4" width="48" height="48" rx="24" fill={fill} />
        <path
          d="M23.7537 25.3981C23.7537 23.8301 22.482 22.5586 20.9137 22.5586C19.3454 22.5586 18.0742 23.8301 18.0742 25.3981C18.0742 26.9672 19.3451 28.2381 20.9137 28.2381C22.4823 28.2381 23.7537 26.9672 23.7537 25.3981ZM35.0783 23.1133C33.5103 23.1133 32.2389 24.3848 32.2389 25.9528C32.2389 27.5219 33.5103 28.7922 35.0783 28.7922C36.6466 28.7922 37.9181 27.5219 37.9181 25.9528C37.9181 24.3848 36.6469 23.1133 35.0783 23.1133ZM32.4993 29.1137C32.3019 28.8704 32.0224 28.5887 31.7015 28.2933C30.8453 27.1836 29.5061 26.4657 27.9963 26.4657C26.6526 26.4657 25.4447 27.0347 24.5909 27.9413C24.106 28.3633 23.6748 28.7752 23.4004 29.114L23.2167 29.3382C22.3599 30.3829 21.2934 31.6827 21.3012 33.8882C21.3088 35.9364 22.9767 37.6038 25.0191 37.6038C25.5858 37.6051 26.1452 37.4753 26.6536 37.2248C27.162 36.9742 27.6056 36.6096 27.9498 36.1593C28.2942 36.6097 28.7379 36.9744 29.2464 37.2249C29.755 37.4755 30.3145 37.6052 30.8814 37.6038C32.9229 37.6038 34.5906 35.9367 34.5984 33.8882C34.6063 31.6827 33.5395 30.3829 32.6829 29.3382L32.4993 29.1137Z"
          fill="#131313"
        />
        <path
          d="M28.1993 24.6545C29.9274 24.6545 31.3283 23.2536 31.3283 21.5255C31.3283 19.7974 29.9274 18.3965 28.1993 18.3965C26.4712 18.3965 25.0703 19.7974 25.0703 21.5255C25.0703 23.2536 26.4712 24.6545 28.1993 24.6545Z"
          fill="#131313"
        />
      </svg>
    </span>
  )
}

/** @deprecated Prefer PawBadge — kept as alias for hero float call sites. */
export function PawBall(props: Omit<PawBadgeProps, 'animated' | 'data-slot'>): ReactElement {
  return <PawBadge {...props} animated data-slot="home-hero-paw" />
}
