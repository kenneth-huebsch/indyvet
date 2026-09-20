import Link from 'next/link'
import type { ReactElement } from 'react'

import { BlogPagination } from '@/components/blog/BlogPagination'
import { HomePhoto } from '@/components/home/HomePhoto'
import { Container } from '@/components/ui/container'
import { Typography } from '@/components/ui/typography'
import { isMedia } from '@/lib/media'
import type { Post } from '@/payload-types'

type BlogPostGridProps = {
  posts: Post[]
  pagination?: {
    page: number
    totalPages: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
}

function formatPostDate(value: string | null | undefined): string | null {
  if (!value) {
    return null
  }

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return null
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

export function BlogPostGrid(props: BlogPostGridProps): ReactElement | null {
  const { posts, pagination } = props

  if (posts.length === 0) {
    return null
  }

  return (
    <section data-slot="blog-post-grid" className="border-t border-line bg-cream py-[68px]">
      <Container>
        <div className="grid grid-cols-1 border-t border-l border-line sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            const dateLabel = formatPostDate(post.publishedAt)
            const categories =
              post.categories?.map((item) => item.label.trim()).filter(Boolean) ?? []

            return (
              <article
                key={post.id}
                data-slot="blog-post-card"
                className="flex h-full flex-col border-b border-r border-line bg-background"
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="flex h-full flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <HomePhoto
                    media={isMedia(post.featuredImage) ? post.featuredImage : null}
                    className="aspect-[4/3]"
                    sizes="(max-width: 1024px) 50vw, 360px"
                    fallbackAlt={post.title}
                  />
                  <div className="flex flex-1 flex-col p-6">
                    {(dateLabel || categories.length > 0) && (
                      <Typography className="mb-3 text-[11px] uppercase tracking-[0.14em] text-[#59645f]">
                        {[dateLabel, ...categories].filter(Boolean).join(' · ')}
                      </Typography>
                    )}
                    <Typography as="h2" className="text-sm uppercase tracking-[0.08em]">
                      {post.title}
                    </Typography>
                    {post.excerpt?.trim() ? (
                      <Typography className="mt-2 text-[13px] text-[#59645f]">
                        {post.excerpt.trim()}
                      </Typography>
                    ) : null}
                  </div>
                </Link>
              </article>
            )
          })}
        </div>

        {pagination ? (
          <BlogPagination
            page={pagination.page}
            totalPages={pagination.totalPages}
            hasNextPage={pagination.hasNextPage}
            hasPrevPage={pagination.hasPrevPage}
          />
        ) : null}
      </Container>
    </section>
  )
}
