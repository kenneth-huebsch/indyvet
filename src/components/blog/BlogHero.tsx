import type { ReactElement } from 'react'

import { CmsCta } from '@/components/home/CmsCta'
import { HomeEyebrow } from '@/components/home/HomeEyebrow'
import { HomeHeadline } from '@/components/home/HomeHeadline'
import { ScrollReveal } from '@/components/home/ScrollReveal'
import { Container } from '@/components/ui/container'
import { Typography } from '@/components/ui/typography'
import type { BlogPage } from '@/payload-types'

type BlogHeroProps = {
  hero: BlogPage['hero']
  cta?: BlogPage['cta']
}

export function BlogHero(props: BlogHeroProps): ReactElement | null {
  const { hero, cta } = props

  if (!hero?.title?.trim()) {
    return null
  }

  return (
    <section data-slot="blog-hero" className="bg-background">
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
          {cta?.label?.trim() ? (
            <div className="mt-7">
              <CmsCta link={cta} />
            </div>
          ) : null}
        </ScrollReveal>
      </Container>
    </section>
  )
}
