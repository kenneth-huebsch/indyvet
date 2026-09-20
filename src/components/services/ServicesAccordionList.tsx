import type { ReactElement } from 'react'

import { HomePhoto } from '@/components/home/HomePhoto'
import { RichText } from '@/components/rich-text/RichText'
import { Container } from '@/components/ui/container'
import { Typography } from '@/components/ui/typography'
import { isMedia } from '@/lib/media'
import type { Media, Service } from '@/payload-types'

type ServicesAccordionListProps = {
  services: Service[]
}

function padIndex(index: number): string {
  return String(index + 1).padStart(2, '0')
}

export function ServicesAccordionList(props: ServicesAccordionListProps): ReactElement | null {
  const { services } = props
  const items = services.filter((service) => service.title.trim())

  if (items.length === 0) {
    return null
  }

  return (
    <section
      data-slot="services-accordion"
      className="border-t border-line bg-cream py-[68px]"
    >
      <Container>
        <div>
          {items.map((service, index) => {
            const slug = service.slug?.trim() || `service-${service.id}`
            const photo =
              isMedia(service.image) && service.image.url ? (service.image as Media) : null

            return (
              <details
                key={service.id}
                id={slug}
                data-slot="services-accordion-item"
                className="group border-b border-line"
              >
                <summary className="flex cursor-pointer list-none items-start gap-5 py-7 marker:content-none [&::-webkit-details-marker]:hidden">
                  <Typography
                    as="span"
                    className="shrink-0 font-heading text-[25px] text-muted-foreground"
                  >
                    {padIndex(index)}
                  </Typography>
                  <div className="min-w-0 flex-1">
                    <Typography
                      as="h2"
                      className="text-[13px] font-normal uppercase tracking-[0.08em]"
                    >
                      {service.title.trim()}
                    </Typography>
                    {service.shortDescription?.trim() ? (
                      <Typography className="mt-2 text-[13px] text-[#59645f]">
                        {service.shortDescription.trim()}
                      </Typography>
                    ) : null}
                  </div>
                  <span
                    aria-hidden
                    className="mt-1 shrink-0 text-sm font-extrabold uppercase tracking-[0.12em] text-muted-foreground transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>

                <div
                  data-slot="services-accordion-body"
                  className="border-t border-line pb-8 pl-[calc(25px+1.25rem)] pr-8 pt-6 md:pl-[calc(2.5rem+1.25rem)]"
                >
                  <div
                    className={
                      photo
                        ? 'grid gap-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-start'
                        : undefined
                    }
                  >
                    {photo ? (
                      <HomePhoto
                        media={photo}
                        data-slot="services-accordion-image"
                        className="aspect-[16/10] min-h-[180px]"
                        sizes="(max-width: 768px) 100vw, 420px"
                        fallbackAlt={service.title}
                      />
                    ) : null}
                    <RichText
                      data={service.body}
                      className="max-w-[720px] text-[#435149] [&_h2]:mt-6 [&_h2]:first:mt-0 [&_h2]:text-[1.75rem] [&_h3]:mt-5 [&_li]:text-[#435149] [&_p]:text-[#435149]"
                    />
                  </div>
                </div>
              </details>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
