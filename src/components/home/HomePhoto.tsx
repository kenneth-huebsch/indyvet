import type { ReactElement } from 'react'

import { MediaImage } from '@/components/media/MediaImage'
import { isMedia } from '@/lib/media'
import { cn } from '@/lib/utils'
import type { Media } from '@/payload-types'

type HomePhotoProps = {
  media: Media | null | undefined
  className?: string
  sizes: string
  fallbackAlt: string
  priority?: boolean
  'data-slot'?: string
}

export function HomePhoto(props: HomePhotoProps): ReactElement | null {
  const { media, className, sizes, fallbackAlt, priority, 'data-slot': dataSlot } = props

  if (!isMedia(media) || !media.url) {
    return null
  }

  return (
    <div
      data-slot={dataSlot}
      className={cn('relative overflow-hidden rounded-[2px] bg-muted', className)}
    >
      <MediaImage
        media={media}
        fill
        sizes={sizes}
        className="object-cover"
        fallbackAlt={fallbackAlt}
        priority={priority}
      />
    </div>
  )
}
