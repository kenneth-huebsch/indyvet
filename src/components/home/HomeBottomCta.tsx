import type { ReactElement } from 'react'

import { CmsCta } from '@/components/home/CmsCta'
import { HomeHeadline } from '@/components/home/HomeHeadline'
import { HomePhoto } from '@/components/home/HomePhoto'
import { ScrollReveal } from '@/components/home/ScrollReveal'
import { isMedia } from '@/lib/media'
import type { HomePage, Media } from '@/payload-types'

type HomeBottomCtaProps = {
  bottomCta: NonNullable<HomePage['bottomCta']>
}

export function HomeBottomCta(props: HomeBottomCtaProps): ReactElement | null {
  const { bottomCta } = props
  const image = bottomCta.images
    ?.map((row) => row.image)
    .find((value): value is Media => isMedia(value) && Boolean(value.url))

  if (!bottomCta.headline?.trim() && !bottomCta.cta?.label && !image) {
    return null
  }

  return (
    <section data-slot="home-bottom-cta" className="grid min-h-[330px] border-t border-line bg-background md:grid-cols-2">
      {image ? (
        <HomePhoto
          media={image}
          className="min-h-[240px] md:min-h-[330px]"
          sizes="(max-width: 768px) 100vw, 50vw"
          fallbackAlt="Bottom call to action"
        />
      ) : (
        <div className="min-h-[240px] bg-background md:min-h-[330px]" aria-hidden />
      )}

      <div className="flex items-center bg-background">
        <ScrollReveal className="px-6 py-10 md:px-[54px] md:py-[54px]">
          {bottomCta.headline?.trim() ? (
            <HomeHeadline as="h2">{bottomCta.headline.trim()}</HomeHeadline>
          ) : null}
          <div className="mt-7">
            <CmsCta link={bottomCta.cta} />
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
