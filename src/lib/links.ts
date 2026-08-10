export type CmsLink = {
  label?: string | null
  url?: string | null
}

export type ResolvedLink = {
  label: string
  href: string
  isExternal: boolean
  target?: '_blank'
  rel?: string
}

function isExternalUrl(url: string): boolean {
  return (
    /^https?:\/\//i.test(url) ||
    url.startsWith('//') ||
    url.startsWith('mailto:') ||
    url.startsWith('tel:')
  )
}

export function resolveLink(link: CmsLink | null | undefined): ResolvedLink | null {
  const label = link?.label?.trim()
  const href = link?.url?.trim()

  if (!label || !href) {
    return null
  }

  const external = isExternalUrl(href)

  return {
    label,
    href,
    isExternal: external,
    target: external && (href.startsWith('http') || href.startsWith('//')) ? '_blank' : undefined,
    rel:
      external && (href.startsWith('http') || href.startsWith('//'))
        ? 'noopener noreferrer'
        : undefined,
  }
}
