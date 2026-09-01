import type { ReactElement } from 'react'

import { CmsCta } from '@/components/home/CmsCta'
import { HomeEyebrow } from '@/components/home/HomeEyebrow'
import { HomeHeadline } from '@/components/home/HomeHeadline'
import { HomePhoto } from '@/components/home/HomePhoto'
import { Container } from '@/components/ui/container'
import { Typography } from '@/components/ui/typography'
import { isMedia } from '@/lib/media'
import type { HomePage } from '@/payload-types'

type HomeHeroProps = {
  hero: HomePage['hero']
}

export function HomeHero(props: HomeHeroProps): ReactElement | null {
  const { hero } = props

  if (!hero?.headline?.trim()) {
    return null
  }

  const image = hero.images?.[0]?.image
  const heroImage = isMedia(image) && Boolean(image.url) ? image : undefined

  return (
    <section
      data-slot="home-hero"
      className="bg-background"
    >
      <Container>
        <div className="grid items-center gap-8 py-10 md:grid-cols-2 md:gap-12 md:py-[72px]">
          <div>
            {hero.eyebrow?.trim() ? (
              <HomeEyebrow className="mb-4">{hero.eyebrow.trim()}</HomeEyebrow>
            ) : null}

            <HomeHeadline as="h1">{hero.headline.trim()}</HomeHeadline>

            {hero.description?.trim() ? (
              <Typography className="mt-6 max-w-[560px] text-lg text-[#415149]">
                {hero.description.trim()}
              </Typography>
            ) : null}

            <div className="mt-7 flex flex-wrap gap-3.5">
              <CmsCta link={hero.primaryCta} />
              <CmsCta link={hero.secondaryCta} variant="outline" />
            </div>
          </div>

          {heroImage ? (
            <div data-slot="home-hero-visual">
              <HomePhoto
                media={heroImage}
                data-slot="home-hero-image"
                className="min-h-[330px] md:min-h-[445px]"
                sizes="(max-width: 768px) 100vw, 600px"
                fallbackAlt="Hero image"
                priority
              />
            </div>
          ) : (
            <div
              data-slot="home-hero-visual"
              className="min-h-[330px] bg-background md:min-h-[445px]"
              aria-hidden
            />
          )}
        </div>
      </Container>
    </section>
  )
}
