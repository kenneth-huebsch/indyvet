import Link from 'next/link'
import type { ReactElement } from 'react'

import { Button, type ButtonVariant } from '@/components/ui/button'
import { resolveLink, type CmsLink } from '@/lib/links'
import { cn } from '@/lib/utils'

type CmsCtaProps = {
  link?: CmsLink | null
  variant?: ButtonVariant
  className?: string
}

export function CmsCta(props: CmsCtaProps): ReactElement | null {
  const { link, variant = 'primary', className } = props
  const resolved = resolveLink(link)
  const label = link?.label?.trim()

  if (resolved) {
    return (
      <Button
        as={Link}
        href={resolved.href}
        target={resolved.target}
        rel={resolved.rel}
        variant={variant}
        className={cn('no-underline hover:no-underline', className)}
      >
        {resolved.label}
      </Button>
    )
  }

  if (!label) {
    return null
  }

  return (
    <Button as="span" variant={variant} className={cn('pointer-events-none', className)}>
      {label}
    </Button>
  )
}
