import Image from 'next/image'
import type { ImageProps } from 'next/image'
import type { ReactElement } from 'react'

import { getMediaAlt, getMediaDimensions, getMediaUrl, type MediaRelation } from '@/lib/media'
import { cn } from '@/lib/utils'

type MediaImageProps = Omit<ImageProps, 'src' | 'alt'> & {
  media: MediaRelation
  alt?: string
  fallbackAlt?: string
}

export function MediaImage(props: MediaImageProps): ReactElement | null {
  const { media, alt, fallbackAlt = '', className, width, height, fill, ...rest } = props
  const src = getMediaUrl(media)

  if (!src) {
    return null
  }

  const dimensions = getMediaDimensions(media)
  const resolvedAlt = alt ?? getMediaAlt(media, fallbackAlt)

  if (fill) {
    return <Image src={src} alt={resolvedAlt} fill className={cn(className)} {...rest} />
  }

  const resolvedWidth = width ?? dimensions.width ?? 100
  const resolvedHeight = height ?? dimensions.height ?? 100

  return (
    <Image
      src={src}
      alt={resolvedAlt}
      width={resolvedWidth}
      height={resolvedHeight}
      className={cn(className)}
      {...rest}
    />
  )
}
