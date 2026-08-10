import type { Metadata } from 'next'

import { getMediaUrl, isMedia, type MediaRelation } from '@/lib/media'

export type SeoFields = {
  title?: string | null
  description?: string | null
  ogImage?: MediaRelation
}

type BuildMetadataArgs = {
  pageSeo?: SeoFields | null
  defaults?: SeoFields | null
  siteName?: string | null
}

function firstNonEmpty(...values: Array<string | null | undefined>): string | undefined {
  for (const value of values) {
    const trimmed = value?.trim()
    if (trimmed) {
      return trimmed
    }
  }

  return undefined
}

export function buildMetadata({ pageSeo, defaults, siteName }: BuildMetadataArgs): Metadata {
  const title = firstNonEmpty(pageSeo?.title, defaults?.title, siteName) ?? 'Indy Veterinary Care'
  const description = firstNonEmpty(pageSeo?.description, defaults?.description)
  const ogImage = pageSeo?.ogImage ?? defaults?.ogImage
  const ogImageUrl = getMediaUrl(ogImage)
  const metadataBase = process.env.NEXT_PUBLIC_SERVER_URL
    ? new URL(process.env.NEXT_PUBLIC_SERVER_URL)
    : undefined

  const metadata: Metadata = {
    title,
    description,
    metadataBase,
  }

  if (ogImageUrl) {
    metadata.openGraph = {
      title,
      description: description ?? undefined,
      images: [
        {
          url: ogImageUrl,
          alt: isMedia(ogImage) ? ogImage.alt : title,
        },
      ],
    }
  }

  return metadata
}
