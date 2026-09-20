import type { ReactElement } from 'react'

import { HomeHeadline } from '@/components/home/HomeHeadline'
import { ScrollReveal } from '@/components/home/ScrollReveal'
import { RichText } from '@/components/rich-text/RichText'
import { Container } from '@/components/ui/container'
import type { AboutPage } from '@/payload-types'

type AboutNamesakeProps = {
  namesake: NonNullable<AboutPage['namesake']>
}

export function AboutNamesake(props: AboutNamesakeProps): ReactElement | null {
  const { namesake } = props
  const hasCopy = Boolean(namesake.title?.trim() || namesake.body)

  if (!hasCopy) {
    return null
  }

  return (
    <section data-slot="about-namesake" className="border-t border-line bg-sage-light">
      <Container>
        <ScrollReveal className="max-w-[720px] py-[68px]">
          {namesake.title?.trim() ? <HomeHeadline>{namesake.title.trim()}</HomeHeadline> : null}
          {namesake.body ? (
            <RichText data={namesake.body} className="mt-5 text-[#435149] [&_p]:text-[#435149]" />
          ) : null}
        </ScrollReveal>
      </Container>
    </section>
  )
}
