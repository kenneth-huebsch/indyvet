import type { Media } from '@/payload-types'

export type MediaRelation = number | Media | null | undefined

export function isMedia(value: MediaRelation): value is Media {
  return typeof value === 'object' && value !== null && 'alt' in value
}

export function getMediaUrl(value: MediaRelation): string | null {
  if (!isMedia(value)) {
    return null
  }

  return value.url ?? null
}

export function getMediaAlt(value: MediaRelation, fallback = ''): string {
  if (!isMedia(value)) {
    return fallback
  }

  return value.alt || fallback
}

export function getMediaDimensions(value: MediaRelation): {
  width: number | undefined
  height: number | undefined
} {
  if (!isMedia(value)) {
    return { width: undefined, height: undefined }
  }

  return {
    width: value.width ?? undefined,
    height: value.height ?? undefined,
  }
}
