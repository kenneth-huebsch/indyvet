import type { ReactElement } from 'react'

import { HomeEyebrow } from '@/components/home/HomeEyebrow'
import { HomeHeadline } from '@/components/home/HomeHeadline'
import { PAW_BADGE_FILLS, PawBadge } from '@/components/home/PawBall'
import { ScrollReveal } from '@/components/home/ScrollReveal'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Typography } from '@/components/ui/typography'
import { populatedDocs } from '@/lib/relations'
import type { HomePage, Service } from '@/payload-types'

type HomeServicesProps = {
  services: NonNullable<HomePage['services']>
}

export function HomeServices(props: HomeServicesProps): ReactElement | null {
  const { services } = props
  const items = populatedDocs<Service>(services.featuredServices)

  if (!services.title?.trim() && items.length === 0) {
    return null
  }

  return (
    <Section data-slot="home-services" spacing="md">
      <Container>
        <div className="rounded-3xl bg-card px-5 py-10 sm:px-8 md:px-12 md:py-14">
          <ScrollReveal className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
            {services.eyebrow?.trim() ? (
              <HomeEyebrow className="mb-4 justify-center">{services.eyebrow.trim()}</HomeEyebrow>
            ) : null}
            {services.title?.trim() ? <HomeHeadline>{services.title.trim()}</HomeHeadline> : null}
          </ScrollReveal>

          {items.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-3 md:gap-6">
              {items.map((service, index) => (
                <ScrollReveal key={service.id}>
                  <article
                    data-slot="home-service-card"
                    className="relative flex h-full flex-col rounded-2xl bg-secondary px-6 pb-8 pt-14"
                  >
                    <PawBadge
                      fill={PAW_BADGE_FILLS[index % PAW_BADGE_FILLS.length]}
                      data-slot="home-service-paw"
                      className="absolute left-1/2 top-0 size-16 -translate-x-1/2 -translate-y-1/2"
                    />
                    <Typography as="h3" variant="h4" className="text-center">
                      {service.title}
                    </Typography>
                    <Typography className="mt-3 text-center text-muted-foreground">
                      {service.shortDescription}
                    </Typography>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          ) : null}
        </div>
      </Container>
    </Section>
  )
}
