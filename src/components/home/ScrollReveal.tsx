'use client'

import { useEffect, useRef, type ReactElement, type ReactNode } from 'react'

import { cn } from '@/lib/utils'

type ScrollRevealProps = {
  children: ReactNode
  className?: string
}

export function ScrollReveal(props: ScrollRevealProps): ReactElement {
  const { children, className } = props
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) {
      return
    }

    const reveal = () => {
      node.dataset.revealed = 'true'
    }

    if (typeof IntersectionObserver === 'undefined') {
      reveal()
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          reveal()
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      data-slot="scroll-reveal"
      className={cn(
        'translate-y-4 opacity-0 transition-[opacity,transform] duration-500 ease-out',
        'data-[revealed=true]:translate-y-0 data-[revealed=true]:opacity-100',
        'motion-reduce:translate-y-0 motion-reduce:opacity-100',
        className,
      )}
    >
      {children}
    </div>
  )
}
