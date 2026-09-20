import type { ReactElement } from 'react'

import { HomeEyebrow } from '@/components/home/HomeEyebrow'
import { HomeHeadline } from '@/components/home/HomeHeadline'
import { ScrollReveal } from '@/components/home/ScrollReveal'
import { Container } from '@/components/ui/container'
import { Typography } from '@/components/ui/typography'
import { populatedDocs } from '@/lib/relations'
import type { HomePage, Testimonial } from '@/payload-types'

type HomeTestimonialsProps = {
  testimonials: NonNullable<HomePage['testimonials']>
}

function TestimonialCard(props: { item: Testimonial }): ReactElement {
  const { item } = props
  const reviewUrl = item.reviewUrl?.trim()

  return (
    <article
      data-slot="home-testimonial-card"
      className="flex h-full flex-col border-b border-r border-line bg-background p-6 sm:p-8"
    >
      <Typography className="text-lg leading-relaxed text-[#435149] sm:text-xl">
        &ldquo;{item.quote}&rdquo;
      </Typography>
      <Typography as="p" className="mt-5 text-sm">
        {item.authorName}
      </Typography>
      {reviewUrl ? (
        <a
          href={reviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex text-[11px] font-extrabold uppercase tracking-[0.08em] text-foreground underline underline-offset-4 hover:no-underline"
        >
          Read More
        </a>
      ) : null}
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
