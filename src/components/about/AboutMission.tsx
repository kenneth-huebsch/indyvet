import type { ReactElement } from 'react'

import { HomeEyebrow } from '@/components/home/HomeEyebrow'
import { HomeHeadline } from '@/components/home/HomeHeadline'
import { HomePhoto } from '@/components/home/HomePhoto'
import { ScrollReveal } from '@/components/home/ScrollReveal'
import { RichText } from '@/components/rich-text/RichText'
import { Container } from '@/components/ui/container'
import { isMedia } from '@/lib/media'
import type { AboutPage, Media } from '@/payload-types'

type AboutMissionProps = {
  mission: NonNullable<AboutPage['mission']>
}

export function AboutMission(props: AboutMissionProps): ReactElement | null {
  const { mission } = props
  const photo = isMedia(mission.image) && mission.image.url ? (mission.image as Media) : null
  const hasCopy = Boolean(mission.title?.trim() || mission.body || mission.eyebrow?.trim())

  if (!hasCopy && !photo) {
    return null
  }

  return (
    <section data-slot="about-mission" className="border-t border-line bg-cream">
      <Container>
        <div
          className={
            photo ? 'grid items-center gap-10 py-[68px] md:grid-cols-2 md:gap-[54px]' : 'py-[68px]'
          }
        >
          {photo ? (
            <HomePhoto
              media={photo}
              className="min-h-[280px] md:min-h-[360px]"
              sizes="(max-width: 768px) 100vw, 560px"
              fallbackAlt="About Indy Veterinary Care"
            />
          ) : null}
          <ScrollReveal>
            {mission.eyebrow?.trim() ? (
              <HomeEyebrow className="mb-4">{mission.eyebrow.trim()}</HomeEyebrow>
            ) : null}
            {mission.title?.trim() ? <HomeHeadline>{mission.title.trim()}</HomeHeadline> : null}
            {mission.body ? (
              <RichText
                data={mission.body}
                className="mt-5 max-w-[720px] text-[#435149] [&_p]:text-[#435149]"
              />
            ) : null}
          </ScrollReveal>
        </div>
      </Container>
    </section>
  )
}
