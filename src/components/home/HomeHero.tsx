import Image from 'next/image'
import type { CSSProperties, ReactElement } from 'react'

import { CmsCta } from '@/components/home/CmsCta'
import { HomeEyebrow } from '@/components/home/HomeEyebrow'
import { HomeHeadline } from '@/components/home/HomeHeadline'
import { PawBall } from '@/components/home/PawBall'
import { MediaImage } from '@/components/media/MediaImage'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Typography } from '@/components/ui/typography'
import { isMedia } from '@/lib/media'
import { cn } from '@/lib/utils'
import type { HomePage, Media } from '@/payload-types'

type HomeHeroProps = {
  hero: HomePage['hero']
}

type PawBadge = {
  fill: string
  className: string
  style: CSSProperties
}

/** Vetic Home 1 assets: sides 600×800 (3:4), center 1076×800 — equal height, wider center. */
const HERO_COLLAGE_SLOTS = 3
const HERO_IMAGE_QUALITY = 90

const HERO_PLACEHOLDERS = [
  '/home/hero-placeholder-2.png',
  '/home/hero-placeholder-2.png',
  '/home/hero-placeholder-3.png',
] as const

const HERO_SIZES = [
  '(max-width: 768px) 40vw, 600px',
  '(max-width: 768px) 55vw, 1076px',
  '(max-width: 768px) 40vw, 600px',
] as const

/** Flanking paw badges on the section edges, clear of the centered headline. */
const PAW_BADGES: PawBadge[] = [
  {
    fill: '#7ca4d5',
    className: 'left-[3%] top-[18%] -rotate-[30deg] xl:left-[5%]',
    style: {
      '--hero-ball-from-x': '15rem',
      '--hero-ball-from-y': '3rem',
      '--hero-ball-rotate': '-30deg',
    } as CSSProperties,
  },
  {
    fill: '#ff9f57',
    className: 'right-[3%] top-[28%] rotate-[30deg] xl:right-[5%]',
    style: {
      '--hero-ball-from-x': '-15rem',
      '--hero-ball-from-y': '3rem',
      '--hero-ball-rotate': '30deg',
    } as CSSProperties,
  },
  {
    fill: '#ffe500',
    className: 'left-[5%] top-[58%] rotate-[23deg] xl:left-[7%]',
    style: {
      '--hero-ball-from-x': '27rem',
      '--hero-ball-from-y': '-3rem',
      '--hero-ball-rotate': '23deg',
    } as CSSProperties,
  },
  {
    fill: '#80fd8c',
    className: 'right-[5%] top-[68%] -rotate-[15deg] xl:right-[7%]',
    style: {
      '--hero-ball-from-x': '-27rem',
      '--hero-ball-from-y': '-4rem',
      '--hero-ball-rotate': '-15deg',
    } as CSSProperties,
  },
]

export function HomeHero(props: HomeHeroProps): ReactElement | null {
  const { hero } = props

  if (!hero?.headline?.trim()) {
    return null
  }

  const images =
    hero.images
      ?.map((row) => row.image)
      .filter((image): image is Media => isMedia(image) && Boolean(image.url)) ?? []

  return (
    <Section data-slot="home-hero" spacing="md" className="relative overflow-hidden pb-section-sm">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-0 hidden h-[min(32rem,70%)] min-[992px]:block"
        aria-hidden
      >
        {PAW_BADGES.map((badge, index) => (
          <PawBall key={index} fill={badge.fill} className={badge.className} style={badge.style} />
        ))}
      </div>

      <Container className="relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          {hero.eyebrow?.trim() ? (
            <HomeEyebrow className="mb-5 justify-center">{hero.eyebrow.trim()}</HomeEyebrow>
          ) : null}

          <HomeHeadline as="h1" className="text-4xl sm:text-5xl md:text-6xl">
            {hero.headline.trim()}
          </HomeHeadline>

          {hero.description?.trim() ? (
            <Typography className="mx-auto mt-5 max-w-xl text-muted-foreground">
              {hero.description.trim()}
            </Typography>
          ) : null}

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <CmsCta link={hero.primaryCta} />
            <CmsCta link={hero.secondaryCta} variant="outline" />
          </div>
        </div>

        <div
          data-slot="home-hero-visual"
          className="mt-12 grid grid-cols-[600fr_1076fr_600fr] items-stretch gap-2 sm:gap-4 md:mt-16 md:gap-6"
        >
          {Array.from({ length: HERO_COLLAGE_SLOTS }, (_, index) => {
            const image = images[index]
            const delayClass =
              index === 0
                ? '[animation-delay:80ms]'
                : index === 1
                  ? '[animation-delay:160ms]'
                  : '[animation-delay:240ms]'
            const isCenter = index === 1

            return (
              <div
                key={image?.id ?? `hero-placeholder-${index}`}
                data-slot={image ? 'home-hero-image' : 'home-hero-placeholder'}
                className={cn(
                  'relative overflow-hidden rounded-2xl bg-muted animate-hero-settle motion-reduce:animate-none md:rounded-[2rem]',
                  isCenter ? 'h-full min-h-0' : 'aspect-[3/4]',
                  delayClass,
                )}
              >
                {image ? (
                  <MediaImage
                    media={image}
                    fill
                    sizes={HERO_SIZES[index]}
                    quality={HERO_IMAGE_QUALITY}
                    priority={isCenter}
                    className="object-cover"
                    fallbackAlt={`Hero image ${index + 1}`}
                  />
                ) : (
                  <Image
                    src={HERO_PLACEHOLDERS[index]}
                    alt=""
                    fill
                    sizes={HERO_SIZES[index]}
                    quality={HERO_IMAGE_QUALITY}
                    className="object-cover"
                    aria-hidden
                  />
                )}
              </div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
