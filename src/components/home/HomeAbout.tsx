import type { ReactElement } from 'react'

import { CmsCta } from '@/components/home/CmsCta'
import { HomeEyebrow } from '@/components/home/HomeEyebrow'
import { HomeHeadline } from '@/components/home/HomeHeadline'
import { HomeMarquee } from '@/components/home/HomeMarquee'
import { ScrollReveal } from '@/components/home/ScrollReveal'
import { RichText } from '@/components/rich-text/RichText'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import type { HomePage } from '@/payload-types'

type HomeAboutProps = {
  about: NonNullable<HomePage['about']>
}

export function HomeAbout(props: HomeAboutProps): ReactElement | null {
  const { about } = props
  const tags = about.tags?.filter((tag) => tag.label.trim()) ?? []
  const hasCopy = Boolean(about.title?.trim() || about.body || about.eyebrow?.trim())

  if (!hasCopy && tags.length === 0) {
    return null
  }

  return (
    <Section data-slot="home-about" spacing="md" className="overflow-hidden">
      <Container>
        <ScrollReveal className="mx-auto max-w-3xl text-center">
          {about.eyebrow?.trim() ? (
            <HomeEyebrow className="mb-4 justify-center">{about.eyebrow.trim()}</HomeEyebrow>
          ) : null}
          {about.title?.trim() ? <HomeHeadline>{about.title.trim()}</HomeHeadline> : null}
          {about.body ? (
            <RichText
              data={about.body}
              className="mt-5 text-muted-foreground [&_p]:text-muted-foreground"
            />
          ) : null}
          <div className="mt-6 flex justify-center">
            <CmsCta link={about.cta} variant="outline" />
          </div>
        </ScrollReveal>
      </Container>

      {tags.length > 0 ? (
        <div className="mt-12 space-y-3" data-slot="home-about-marquees">
          <HomeMarquee tags={tags} aria-label="About tags" />
          <HomeMarquee tags={tags} reverse aria-label="About tags reverse" />
          <HomeMarquee tags={[...tags].reverse()} aria-label="About tags row three" />
        </div>
      ) : null}
    </Section>
  )
}
