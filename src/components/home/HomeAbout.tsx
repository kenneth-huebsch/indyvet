import type { ReactElement } from 'react'

import { CmsCta } from '@/components/home/CmsCta'
import { HomeEyebrow } from '@/components/home/HomeEyebrow'
import { HomeHeadline } from '@/components/home/HomeHeadline'
import { HomePhoto } from '@/components/home/HomePhoto'
import { ScrollReveal } from '@/components/home/ScrollReveal'
import { RichText } from '@/components/rich-text/RichText'
import { Container } from '@/components/ui/container'
import { Typography } from '@/components/ui/typography'
import type { HomePage, Media } from '@/payload-types'

type HomeAboutProps = {
  about: NonNullable<HomePage['about']>
  photo?: Media | null
}

export function HomeAbout(props: HomeAboutProps): ReactElement | null {
  const { about, photo } = props
  const tags = about.tags?.filter((tag) => tag.label.trim()) ?? []
  const hasCopy = Boolean(about.title?.trim() || about.body || about.eyebrow?.trim())

  if (!hasCopy && tags.length === 0) {
    return null
  }

  return (
    <section data-slot="home-about" className="border-t border-line bg-cream">
      <Container>
        <div className="grid items-center gap-10 py-[68px] md:grid-cols-2 md:gap-[54px]">
          <HomePhoto
            media={photo}
            className="min-h-[280px] md:min-h-[360px]"
            sizes="(max-width: 768px) 100vw, 560px"
            fallbackAlt="About Indy Veterinary Care"
          />

          <ScrollReveal>
            {about.eyebrow?.trim() ? (
              <HomeEyebrow className="mb-4">{about.eyebrow.trim()}</HomeEyebrow>
            ) : null}
            {about.title?.trim() ? <HomeHeadline>{about.title.trim()}</HomeHeadline> : null}
            {about.body ? (
              <RichText data={about.body} className="mt-5 text-[#435149] [&_p]:text-[#435149]" />
            ) : null}
            <div className="mt-6">
              <CmsCta link={about.cta} variant="outline" />
            </div>
            {tags.length > 0 ? (
              <ul data-slot="home-about-tags" className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
                {tags.map((tag) => (
                  <li key={tag.id ?? tag.label}>
                    <Typography variant="label">{tag.label.trim()}</Typography>
                  </li>
                ))}
              </ul>
            ) : null}
          </ScrollReveal>
        </div>
      </Container>
    </section>
  )
}
