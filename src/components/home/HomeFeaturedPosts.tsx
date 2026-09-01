import type { ReactElement } from 'react'

import { CmsCta } from '@/components/home/CmsCta'
import { HomeEyebrow } from '@/components/home/HomeEyebrow'
import { HomeHeadline } from '@/components/home/HomeHeadline'
import { HomePhoto } from '@/components/home/HomePhoto'
import { ScrollReveal } from '@/components/home/ScrollReveal'
import { Container } from '@/components/ui/container'
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
    <section
      data-slot="home-featured-posts"
      className="border-t border-line bg-background py-[68px]"
    >
      <Container>
        <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <ScrollReveal className="max-w-xl">
            {featuredPosts.eyebrow?.trim() ? (
              <HomeEyebrow className="mb-3">{featuredPosts.eyebrow.trim()}</HomeEyebrow>
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
          <div className="grid grid-cols-1 border-t border-l border-line sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.id}
                data-slot="home-featured-post-card"
                className="flex h-full flex-col border-b border-r border-line"
              >
                <HomePhoto
                  media={isMedia(post.featuredImage) ? post.featuredImage : null}
                  className="aspect-[4/3]"
                  sizes="(max-width: 1024px) 50vw, 360px"
                  fallbackAlt={post.title}
                />
                <div className="flex flex-1 flex-col p-6">
                  <Typography as="h3" className="text-sm uppercase tracking-[0.08em]">
                    {post.title}
                  </Typography>
                  {post.excerpt?.trim() ? (
                    <Typography className="mt-2 text-[13px] text-[#59645f]">
                      {post.excerpt.trim()}
                    </Typography>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        ) : null}
      </Container>
    </section>
  )
}
