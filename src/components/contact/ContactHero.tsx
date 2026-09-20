import type { ReactElement } from 'react'

import { HomeEyebrow } from '@/components/home/HomeEyebrow'
import { HomeHeadline } from '@/components/home/HomeHeadline'
import { ScrollReveal } from '@/components/home/ScrollReveal'
import { RichText } from '@/components/rich-text/RichText'
import { Container } from '@/components/ui/container'
import { Typography } from '@/components/ui/typography'
import type { ContactPage } from '@/payload-types'

type ContactHeroProps = {
  hero: ContactPage['hero']
  intro?: ContactPage['intro']
}

export function ContactHero(props: ContactHeroProps): ReactElement | null {
  const { hero, intro } = props

  if (!hero?.title?.trim()) {
    return null
  }

  return (
    <section data-slot="contact-hero" className="bg-background">
      <Container>
        <ScrollReveal className="max-w-[640px] py-10 md:py-[72px]">
          {hero.eyebrow?.trim() ? (
            <HomeEyebrow className="mb-4">{hero.eyebrow.trim()}</HomeEyebrow>
          ) : null}
          <HomeHeadline as="h1">{hero.title.trim()}</HomeHeadline>
          {hero.description?.trim() ? (
            <Typography className="mt-6 text-lg text-[#415149]">
              {hero.description.trim()}
            </Typography>
          ) : null}
          {intro ? <RichText data={intro} className="mt-6 text-[#415149]" /> : null}
        </ScrollReveal>
      </Container>
    </section>
  )
}
