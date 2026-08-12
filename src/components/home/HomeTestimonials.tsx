import type { ReactElement } from 'react'

import { HomeEyebrow } from '@/components/home/HomeEyebrow'
import { HomeHeadline } from '@/components/home/HomeHeadline'
import { ScrollReveal } from '@/components/home/ScrollReveal'
import { MediaImage } from '@/components/media/MediaImage'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Typography } from '@/components/ui/typography'
import { isMedia } from '@/lib/media'
import { populatedDocs } from '@/lib/relations'
import { cn } from '@/lib/utils'
import type { HomePage, Testimonial } from '@/payload-types'

type HomeTestimonialsProps = {
  testimonials: NonNullable<HomePage['testimonials']>
}

function TestimonialCard(props: { item: Testimonial }): ReactElement {
  const { item } = props

  return (
    <article
      data-slot="home-testimonial-card"
      className="w-[min(100vw-3rem,28rem)] shrink-0 rounded-3xl bg-card p-6 sm:w-[30rem] sm:p-8"
    >
      <div className="mb-5 flex items-center gap-4">
        <div className="relative size-14 overflow-hidden rounded-full bg-muted">
          {isMedia(item.avatar) ? (
            <MediaImage
              media={item.avatar}
              fill
              sizes="56px"
              className="object-cover"
              fallbackAlt={item.authorName}
            />
          ) : (
            <span className="flex size-full items-center justify-center text-lg font-semibold text-muted-foreground">
              {item.authorName.charAt(0)}
            </span>
          )}
        </div>
        <div>
          <Typography as="p" variant="h4" className="text-base">
            {item.authorName}
          </Typography>
          {item.location?.trim() ? (
            <Typography variant="small" className="text-muted-foreground">
              {item.location.trim()}
            </Typography>
          ) : null}
        </div>
      </div>
      <Typography className="text-muted-foreground">&ldquo;{item.quote}&rdquo;</Typography>
    </article>
  )
}

export function HomeTestimonials(props: HomeTestimonialsProps): ReactElement | null {
  const { testimonials } = props
  const items = populatedDocs<Testimonial>(testimonials.items)

  if (!testimonials.title?.trim() && items.length === 0) {
    return null
  }

  const loop = items.length > 0 ? [...items, ...items] : []

  return (
    <Section data-slot="home-testimonials" spacing="md" className="overflow-hidden">
      <Container>
        <ScrollReveal className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
          {testimonials.eyebrow?.trim() ? (
            <HomeEyebrow className="mb-4 justify-center">{testimonials.eyebrow.trim()}</HomeEyebrow>
          ) : null}
          {testimonials.title?.trim() ? (
            <HomeHeadline>{testimonials.title.trim()}</HomeHeadline>
          ) : null}
        </ScrollReveal>
      </Container>

      {loop.length > 0 ? (
        <div className="overflow-hidden" aria-label="Testimonials">
          <div
            className={cn('flex w-max gap-5 px-4', 'animate-marquee motion-reduce:animate-none')}
          >
            {loop.map((item, index) => (
              <TestimonialCard key={`${item.id}-${index}`} item={item} />
            ))}
          </div>
        </div>
      ) : null}
    </Section>
  )
}
