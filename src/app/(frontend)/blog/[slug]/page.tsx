import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { ReactElement } from 'react'

import { BlogPostArticle } from '@/components/blog/BlogPostArticle'
import { getPostBySlug, getPublishedPosts, getSiteChrome } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo'

type BlogPostRouteProps = {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const posts = await getPublishedPosts()

  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata(props: BlogPostRouteProps): Promise<Metadata> {
  const { slug } = await props.params
  const [post, { siteSettings }] = await Promise.all([getPostBySlug(slug), getSiteChrome()])

  if (!post) {
    return {}
  }

  return buildMetadata({
    pageSeo: {
      title: post.seo?.title ?? post.title,
      description: post.seo?.description ?? post.excerpt,
      ogImage: post.seo?.ogImage ?? post.featuredImage,
    },
    defaults: siteSettings.defaultSeo,
    siteName: siteSettings.brand.siteName,
  })
}

export default async function BlogPostRoute(props: BlogPostRouteProps): Promise<ReactElement> {
  const { slug } = await props.params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <div data-slot="blog-post-page" className="bg-background">
      <BlogPostArticle post={post} />
    </div>
  )
}
