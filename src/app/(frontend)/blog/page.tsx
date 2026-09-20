import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import type { ReactElement } from 'react'

import { BlogBottomCta } from '@/components/blog/BlogBottomCta'
import { BlogHero } from '@/components/blog/BlogHero'
import { BlogPostGrid } from '@/components/blog/BlogPostGrid'
import { getBlogPage, getPublishedPostsPage, getSiteChrome } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo'

type BlogIndexRouteProps = {
  searchParams: Promise<{
    page?: string | string[]
  }>
}

function parsePageParam(value: string | string[] | undefined): number {
  const raw = Array.isArray(value) ? value[0] : value
  const parsed = Number.parseInt(raw ?? '1', 10)

  if (!Number.isFinite(parsed) || parsed < 1) {
    return 1
  }

  return parsed
}

export async function generateMetadata(): Promise<Metadata> {
  const [page, { siteSettings }] = await Promise.all([getBlogPage(), getSiteChrome()])

  return buildMetadata({
    pageSeo: page.seo,
    defaults: siteSettings.defaultSeo,
    siteName: siteSettings.brand.siteName,
  })
}

export default async function BlogIndexRoute(props: BlogIndexRouteProps): Promise<ReactElement> {
  const searchParams = await props.searchParams
  const requestedPage = parsePageParam(searchParams.page)
  const [page, postsPage] = await Promise.all([
    getBlogPage(),
    getPublishedPostsPage(requestedPage),
  ])

  if (requestedPage > postsPage.totalPages && postsPage.totalPages > 0) {
    redirect(postsPage.totalPages === 1 ? '/blog' : `/blog?page=${postsPage.totalPages}`)
  }

  return (
    <div data-slot="blog-page" className="bg-background">
      <BlogHero hero={page.hero} cta={page.cta} />
      <BlogPostGrid
        posts={postsPage.docs}
        pagination={{
          page: postsPage.page,
          totalPages: postsPage.totalPages,
          hasNextPage: postsPage.hasNextPage,
          hasPrevPage: postsPage.hasPrevPage,
        }}
      />
      <BlogBottomCta promo={page.promo} cta={page.cta} />
    </div>
  )
}
