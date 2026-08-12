import type { ReactElement } from 'react'

import { CmsCta } from '@/components/home/CmsCta'
import { HomeEyebrow } from '@/components/home/HomeEyebrow'
import { HomeHeadline } from '@/components/home/HomeHeadline'
import { ScrollReveal } from '@/components/home/ScrollReveal'
import { MediaImage } from '@/components/media/MediaImage'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Typography } from '@/components/ui/typography'
import { isMedia } from '@/lib/media'
import { populatedDocs } from '@/lib/relations'
import type { HomePage, Post } from '@/payload-types'

type HomeFeaturedPostsProps = {
  featuredPosts: NonNullable<HomePage['featuredPosts']>
}

export function HomeFeaturedPosts(props: HomeFeaturedPostsProps): ReactElement | null {
  const { featuredPosts } = props
  const posts = populatedDocs<Post>(featuredPosts.posts)

  if (!featuredPosts.title?.trim() && posts.length === 0) {
    return null
  }

  return (
    <Section data-slot="home-featured-posts" spacing="md">
      <Container>
        <div className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <ScrollReveal className="max-w-xl">
            {featuredPosts.eyebrow?.trim() ? (
              <HomeEyebrow className="mb-4">{featuredPosts.eyebrow.trim()}</HomeEyebrow>
            ) : null}
            {featuredPosts.title?.trim() ? (
              <HomeHeadline>{featuredPosts.title.trim()}</HomeHeadline>
            ) : null}
          </ScrollReveal>
          <CmsCta
            link={featuredPosts.viewAll}
            variant="outline"
            className="self-start sm:self-auto"
          />
        </div>

        {posts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <ScrollReveal key={post.id}>
                <article
                  data-slot="home-featured-post-card"
                  className="flex h-full flex-col overflow-hidden rounded-3xl bg-card"
                >
                  <div className="relative aspect-[4/3] bg-muted">
                    {isMedia(post.featuredImage) ? (
                      <MediaImage
                        media={post.featuredImage}
                        fill
                        sizes="(max-width: 1024px) 50vw, 360px"
                        className="object-cover"
                        fallbackAlt={post.title}
                      />
                    ) : null}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <Typography as="h3" variant="h4">
                      {post.title}
                    </Typography>
                    {post.excerpt?.trim() ? (
                      <Typography className="mt-2 text-muted-foreground">
                        {post.excerpt.trim()}
                      </Typography>
                    ) : null}
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        ) : null}
      </Container>
    </Section>
  )
}
