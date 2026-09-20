import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { BlogBottomCta } from './BlogBottomCta'
import { BlogHero } from './BlogHero'
import { BlogPagination } from './BlogPagination'
import { BlogPostArticle } from './BlogPostArticle'
import { BlogPostGrid } from './BlogPostGrid'
import { blogPageFixture, publishedPostsFixture } from './fixtures'

describe('Blog components', () => {
  it('BlogHero renders title and lede', () => {
    const markup = renderToStaticMarkup(
      <BlogHero hero={blogPageFixture.hero} cta={blogPageFixture.cta} />,
    )

    expect(markup).toContain('data-slot="blog-hero"')
    expect(markup).toContain('Blog')
    expect(markup).toContain('Guides, seasonal tips')
    expect(markup).toContain('Book an appointment')
  })

  it('BlogPostGrid renders hairline cards linking to post slugs', () => {
    const markup = renderToStaticMarkup(<BlogPostGrid posts={publishedPostsFixture} />)

    expect(markup).toContain('data-slot="blog-post-grid"')
    expect(markup).toContain('data-slot="blog-post-card"')
    expect(markup).toContain('Hot Weather Safety Tips for Dogs &amp; Cats')
    expect(markup).toContain('href="/blog/hot-weather-safety-tips-for-dogs-cats"')
    expect(markup).toContain('Tips')
    expect(markup).toContain('Safety')
  })

  it('BlogPagination renders prev/next when multiple pages exist', () => {
    const markup = renderToStaticMarkup(
      <BlogPagination page={2} totalPages={4} hasNextPage hasPrevPage />,
    )

    expect(markup).toContain('data-slot="blog-pagination"')
    expect(markup).toContain('Page 2 of 4')
    expect(markup).toContain('href="/blog"')
    expect(markup).toContain('href="/blog?page=3"')
    expect(markup).toContain('Previous')
    expect(markup).toContain('Next')
  })

  it('BlogPagination is omitted for a single page', () => {
    const markup = renderToStaticMarkup(
      <BlogPagination page={1} totalPages={1} hasNextPage={false} hasPrevPage={false} />,
    )

    expect(markup).toBe('')
  })

  it('BlogBottomCta renders promo copy and button', () => {
    const markup = renderToStaticMarkup(
      <BlogBottomCta promo={blogPageFixture.promo} cta={blogPageFixture.cta} />,
    )

    expect(markup).toContain('data-slot="blog-bottom-cta"')
    expect(markup).toContain('Questions about your pet')
    expect(markup).toContain('Northern Liberties team')
    expect(markup).toContain('Book an appointment')
  })

  it('BlogPostArticle renders title, meta, and body', () => {
    const markup = renderToStaticMarkup(
      <BlogPostArticle post={publishedPostsFixture[0]!} />,
    )

    expect(markup).toContain('data-slot="blog-post-article"')
    expect(markup).toContain('Hot Weather Safety Tips for Dogs &amp; Cats')
    expect(markup).toContain('As temperatures rise')
    expect(markup).toContain('Tips')
  })
})
