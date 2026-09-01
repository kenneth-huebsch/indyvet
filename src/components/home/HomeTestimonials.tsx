import type { ReactElement } from 'react'

import { HomeEyebrow } from '@/components/home/HomeEyebrow'
import { HomeHeadline } from '@/components/home/HomeHeadline'
import { HomePhoto } from '@/components/home/HomePhoto'
import { ScrollReveal } from '@/components/home/ScrollReveal'
import { Container } from '@/components/ui/container'
import { Typography } from '@/components/ui/typography'
import { isMedia } from '@/lib/media'
import { populatedDocs } from '@/lib/relations'
import type { HomePage, Testimonial } from '@/payload-types'

type HomeTestimonialsProps = {
  testimonials: NonNullable<HomePage['testimonials']>
}

function TestimonialCard(props: { item: Testimonial }): ReactElement {
  const { item } = props

  return (
    <article
      data-slot="home-testimonial-card"
      className="border-b border-r border-line bg-background p-6 sm:p-8"
    >
      <Typography className="text-[#435149]">&ldquo;{item.quote}&rdquo;</Typography>
      <div className="mt-5 flex items-center gap-3">
        <HomePhoto
          media={isMedia(item.avatar) ? item.avatar : null}
          className="size-12 shrink-0"
          sizes="48px"
          fallbackAlt={item.authorName}
        />
        <div>
          <Typography as="p" className="text-sm">
            {item.authorName}
          </Typography>
          {item.location?.trim() ? (
            <Typography variant="small" className="text-muted-foreground">
              {item.location.trim()}
            </Typography>
          ) : null}
        </div>
      </div>
    </article>
  )
}

export function HomeTestimonials(props: HomeTestimonialsProps): ReactElement | null {
  const { testimonials } = props
  const items = populatedDocs<Testimonial>(testimonials.items)

  if (!testimonials.title?.trim() && items.length === 0) {
    return null
  }

  return (
    <section data-slot="home-testimonials" className="border-t border-line bg-background py-[68px]">
      <Container>
        <ScrollReveal className="mb-8 max-w-2xl">
          {testimonials.eyebrow?.trim() ? (
            <HomeEyebrow className="mb-3">{testimonials.eyebrow.trim()}</HomeEyebrow>
          ) : null}
          {testimonials.title?.trim() ? (
            <HomeHeadline>{testimonials.title.trim()}</HomeHeadline>
          ) : null}
        </ScrollReveal>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 border-t border-l border-line sm:grid-cols-2">
            {items.map((item) => (
              <TestimonialCard key={item.id} item={item} />
            ))}
          </div>
        ) : null}
      </Container>
    </section>
  )
}
