import type { ReactElement } from 'react'

import { Container } from '@/components/ui/container'

type ContactMapProps = {
  mapEmbedUrl?: string | null
}

export function ContactMap(props: ContactMapProps): ReactElement | null {
  const url = props.mapEmbedUrl?.trim()

  if (!url) {
    return null
  }

  return (
    <section data-slot="contact-map" className="border-t border-line bg-background">
      <Container className="py-10 md:py-14">
        <div className="overflow-hidden border border-line">
          <iframe
            title="Clinic location map"
            src={url}
            className="aspect-[16/9] w-full border-0 md:aspect-[21/9]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </Container>
    </section>
  )
}
