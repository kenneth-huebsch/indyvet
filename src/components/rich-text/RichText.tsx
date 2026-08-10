import { RichText as PayloadRichText } from '@payloadcms/richtext-lexical/react'
import type { ComponentProps, ReactElement } from 'react'

import { cn } from '@/lib/utils'

type PayloadRichTextProps = ComponentProps<typeof PayloadRichText>

type RichTextProps = {
  data: PayloadRichTextProps['data'] | null | undefined
  className?: string
}

export function RichText(props: RichTextProps): ReactElement | null {
  const { data, className } = props

  if (!data) {
    return null
  }

  return (
    <PayloadRichText
      data={data}
      className={cn(
        'space-y-4 text-base font-medium leading-relaxed text-foreground',
        '[&_a]:underline [&_a]:underline-offset-4',
        '[&_h1]:text-4xl [&_h1]:font-semibold [&_h1]:tracking-tight',
        '[&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:tracking-tight',
        '[&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:tracking-tight',
        '[&_ul]:list-disc [&_ul]:pl-5',
        '[&_ol]:list-decimal [&_ol]:pl-5',
        className,
      )}
    />
  )
}
