import { renderToStaticMarkup } from 'react-dom/server'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import BlogPostRoute from './page'
import { publishedPostsFixture } from '@/components/blog/fixtures'
import type { SiteSetting } from '@/payload-types'

vi.mock('next/navigation', () => ({
  notFound: vi.fn(() => {
    throw new Error('NEXT_NOT_FOUND')
  }),
}))

vi.mock('@/lib/payload', () => ({
  getPostBySlug: vi.fn(),
  getPublishedPosts: vi.fn(),
  getSiteChrome: vi.fn(),
}))

import { getPostBySlug, getSiteChrome } from '@/lib/payload'

const siteSettings: SiteSetting = {
  id: 1,
  brand: {
    siteName: 'Indy Veterinary Care',
  },
  defaultSeo: {
    title: 'Default SEO',
    description: 'Default description',
  },
}

describe('Blog post page', () => {
  beforeEach(() => {
    vi.mocked(getPostBySlug).mockResolvedValue(publishedPostsFixture[0]!)
    vi.mocked(getSiteChrome).mockResolvedValue({
      header: { id: 1 },
      footer: { id: 1 },
      siteSettings,
    } as Awaited<ReturnType<typeof getSiteChrome>>)
  })

  it('renders the article for a published slug', async () => {
    const element = await BlogPostRoute({
      params: Promise.resolve({ slug: 'hot-weather-safety-tips-for-dogs-cats' }),
    })
    const markup = renderToStaticMarkup(element)

    expect(markup).toContain('data-slot="blog-post-page"')
    expect(markup).toContain('data-slot="blog-post-article"')
    expect(markup).toContain('Hot Weather Safety Tips for Dogs &amp; Cats')
  })
})
