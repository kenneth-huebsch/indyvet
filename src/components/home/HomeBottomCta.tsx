import type { ReactElement } from 'react'

import { CmsCta } from '@/components/home/CmsCta'
import { HomeHeadline } from '@/components/home/HomeHeadline'
import { ScrollReveal } from '@/components/home/ScrollReveal'
import { MediaImage } from '@/components/media/MediaImage'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { isMedia } from '@/lib/media'
import { cn } from '@/lib/utils'
import type { HomePage, Media } from '@/payload-types'

type HomeBottomCtaProps = {
  bottomCta: NonNullable<HomePage['bottomCta']>
}

function CollageImage(props: { media: Media; className?: string }): ReactElement {
  const { media, className } = props

  return (
    <div className={cn('relative overflow-hidden rounded-2xl bg-muted', className)}>
      <MediaImage
        media={media}
        fill
        sizes="(max-width: 1024px) 0px, 180px"
        className="object-cover"
        fallbackAlt="Collage image"
      />
    </div>
  )
}

export function HomeBottomCta(props: HomeBottomCtaProps): ReactElement | null {
  const { bottomCta } = props
  const images =
    bottomCta.images
      ?.map((row) => row.image)
      .filter((image): image is Media => isMedia(image) && Boolean(image.url)) ?? []

  if (!bottomCta.headline?.trim() && !bottomCta.cta?.label && images.length === 0) {
    return null
  }

  const left = images.slice(0, 2)
  const right = images.slice(2, 4)

  return (
    <Section data-slot="home-bottom-cta" spacing="md">
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_minmax(0,1.2fr)_1fr] lg:gap-6">
          <div className="hidden gap-4 lg:grid" data-slot="home-bottom-cta-images-left">
            {left.map((image, index) => (
              <ScrollReveal key={image.id}>
                <CollageImage
                  media={image}
                  className={cn('aspect-[4/5]', index === 1 && 'ml-8 aspect-square')}
                />
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="mx-auto max-w-xl text-center">
            {bottomCta.headline?.trim() ? (
              <HomeHeadline as="h2" className="text-3xl sm:text-4xl md:text-5xl">
                {bottomCta.headline.trim()}
              </HomeHeadline>
            ) : null}
            <div className="mt-8 flex justify-center">
              <CmsCta link={bottomCta.cta} />
            </div>
          </ScrollReveal>

          <div className="hidden gap-4 lg:grid" data-slot="home-bottom-cta-images-right">
            {right.map((image, index) => (
              <ScrollReveal key={image.id}>
                <CollageImage
                  media={image}
                  className={cn('aspect-[4/5]', index === 0 && 'mr-8 aspect-square')}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}
