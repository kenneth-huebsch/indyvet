import type { ReactElement } from 'react'

import { CmsCta } from '@/components/home/CmsCta'
import { HomeHeadline } from '@/components/home/HomeHeadline'
import { ScrollReveal } from '@/components/home/ScrollReveal'
import { Container } from '@/components/ui/container'
import { Typography } from '@/components/ui/typography'
import type { AboutPage } from '@/payload-types'

type AboutBottomCtaProps = {
  promo?: AboutPage['promo']
  cta?: AboutPage['cta']
}

export function AboutBottomCta(props: AboutBottomCtaProps): ReactElement | null {
  const { promo, cta } = props
  const title = promo?.title?.trim()
  const description = promo?.description?.trim()
  const hasCta = Boolean(cta?.label?.trim())

  if (!title && !description && !hasCta) {
    return null
  }

  return (
    <section
      data-slot="about-bottom-cta"
      className="border-t border-line bg-primary text-[#f8f4eb]"
    >
      <Container>
        <ScrollReveal className="max-w-[590px] py-[68px]">
          {title ? <HomeHeadline className="text-[#f8f4eb]">{title}</HomeHeadline> : null}
          {description ? (
            <Typography className="mt-5 text-[#d9e0db]">{description}</Typography>
          ) : null}
          {hasCta ? (
            <div className={title || description ? 'mt-6' : undefined}>
              <CmsCta
                link={cta}
                className="border-primary-foreground bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              />
            </div>
          ) : null}
        </ScrollReveal>
      </Container>
    </section>
  )
}
