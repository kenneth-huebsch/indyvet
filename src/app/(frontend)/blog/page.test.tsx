import { renderToStaticMarkup } from 'react-dom/server'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import BlogIndexRoute from './page'
import { blogPageFixture, publishedPostsFixture } from '@/components/blog/fixtures'
import type { SiteSetting } from '@/payload-types'

vi.mock('next/navigation', () => ({
  redirect: vi.fn((url: string) => {
    throw new Error(`NEXT_REDIRECT:${url}`)
  }),
}))

vi.mock('@/lib/payload', () => ({
  getBlogPage: vi.fn(),
  getPublishedPostsPage: vi.fn(),
  getSiteChrome: vi.fn(),
}))

import { getBlogPage, getPublishedPostsPage, getSiteChrome } from '@/lib/payload'

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

describe('Blog index page', () => {
  beforeEach(() => {
    vi.mocked(getBlogPage).mockResolvedValue(blogPageFixture)
    vi.mocked(getPublishedPostsPage).mockResolvedValue({
      docs: publishedPostsFixture,
      page: 1,
      totalPages: 4,
      totalDocs: 56,
      hasNextPage: true,
      hasPrevPage: false,
    })
    vi.mocked(getSiteChrome).mockResolvedValue({
      header: { id: 1 },
      footer: { id: 1 },
      siteSettings,
    } as Awaited<ReturnType<typeof getSiteChrome>>)
  })

  it('renders hero, post grid, pagination, and bottom CTA', async () => {
    const element = await BlogIndexRoute({ searchParams: Promise.resolve({}) })
    const markup = renderToStaticMarkup(element)

    expect(markup).toContain('data-slot="blog-page"')
    expect(markup).toContain('data-slot="blog-hero"')
    expect(markup).toContain('data-slot="blog-post-grid"')
    expect(markup).toContain('Hot Weather Safety Tips')
    expect(markup).toContain('href="/blog/hot-weather-safety-tips-for-dogs-cats"')
    expect(markup).toContain('data-slot="blog-pagination"')
    expect(markup).toContain('Page 1 of 4')
    expect(markup).toContain('href="/blog?page=2"')
    expect(markup).toContain('data-slot="blog-bottom-cta"')
    expect(markup).toContain('Questions about your pet')
    expect(markup).toContain('Northern Liberties team')
  })
})
