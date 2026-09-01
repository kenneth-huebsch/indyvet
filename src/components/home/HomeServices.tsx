import type { ReactElement } from 'react'

import { HomeEyebrow } from '@/components/home/HomeEyebrow'
import { HomeHeadline } from '@/components/home/HomeHeadline'
import { ScrollReveal } from '@/components/home/ScrollReveal'
import { Container } from '@/components/ui/container'
import { Typography } from '@/components/ui/typography'
import { populatedDocs } from '@/lib/relations'
import type { HomePage, Service } from '@/payload-types'

type HomeServicesProps = {
  services: NonNullable<HomePage['services']>
}

function padIndex(index: number): string {
  return String(index + 1).padStart(2, '0')
}

export function HomeServices(props: HomeServicesProps): ReactElement | null {
  const { services } = props
  const items = populatedDocs<Service>(services.featuredServices)

  if (!services.title?.trim() && items.length === 0) {
    return null
  }

  return (
    <section data-slot="home-services" className="border-t border-line bg-background py-[68px]">
      <Container>
        <ScrollReveal className="mb-[30px] flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            {services.eyebrow?.trim() ? (
              <HomeEyebrow className="mb-3">{services.eyebrow.trim()}</HomeEyebrow>
            ) : null}
            {services.title?.trim() ? <HomeHeadline>{services.title.trim()}</HomeHeadline> : null}
          </div>
        </ScrollReveal>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 border-t border-l border-line sm:grid-cols-2 lg:grid-cols-3">
            {items.map((service, index) => (
              <article
                key={service.id}
                data-slot="home-service-card"
                className="min-h-[190px] border-b border-r border-foreground/20 bg-background/30 p-7"
              >
                <Typography
                  as="p"
                  className="mb-[18px] font-heading text-[25px] text-muted-foreground"
                >
                  {padIndex(index)}
                </Typography>
                <Typography
                  as="h3"
                  className="mb-3 text-[13px] font-normal uppercase tracking-[0.08em]"
                >
                  {service.title}
                </Typography>
                <Typography className="text-[13px] text-[#59645f]">
                  {service.shortDescription}
                </Typography>
              </article>
            ))}
          </div>
        ) : null}
      </Container>
    </section>
  )
}
