import type { ReactElement } from 'react'

import { HomePhoto } from '@/components/home/HomePhoto'
import { HomeHeadline } from '@/components/home/HomeHeadline'
import { ScrollReveal } from '@/components/home/ScrollReveal'
import { RichText } from '@/components/rich-text/RichText'
import { Container } from '@/components/ui/container'
import { Typography } from '@/components/ui/typography'
import { isMedia } from '@/lib/media'
import type { Post } from '@/payload-types'

type BlogPostArticleProps = {
  post: Post
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

export function BlogPostArticle(props: BlogPostArticleProps): ReactElement {
  const { post } = props
  const dateLabel = formatPostDate(post.publishedAt)
  const categories = post.categories?.map((item) => item.label.trim()).filter(Boolean) ?? []
  const featuredImage = isMedia(post.featuredImage) ? post.featuredImage : null

  return (
    <article data-slot="blog-post-article" className="bg-background">
      <Container>
        <ScrollReveal className="max-w-[720px] py-10 md:py-[72px]">
          {(dateLabel || categories.length > 0) && (
            <Typography className="mb-4 text-[11px] uppercase tracking-[0.14em] text-[#59645f]">
              {[dateLabel, ...categories].filter(Boolean).join(' · ')}
            </Typography>
          )}
          <HomeHeadline as="h1">{post.title}</HomeHeadline>
          {post.excerpt?.trim() ? (
            <Typography className="mt-6 text-lg text-[#415149]">{post.excerpt.trim()}</Typography>
          ) : null}
        </ScrollReveal>
      </Container>

      {featuredImage ? (
        <Container>
          <HomePhoto
            media={featuredImage}
            className="aspect-[16/9] w-full border border-line"
            sizes="(max-width: 1024px) 100vw, 960px"
            fallbackAlt={post.title}
          />
        </Container>
      ) : null}

      <Container>
        <div className="mx-auto max-w-[720px] py-10 md:py-14">
          <RichText data={post.content} />
        </div>
      </Container>
    </article>
  )
}
