import type { ReactElement } from 'react'

import { CmsCta } from '@/components/home/CmsCta'
import { HomeEyebrow } from '@/components/home/HomeEyebrow'
import { HomeHeadline } from '@/components/home/HomeHeadline'
import { HomePhoto } from '@/components/home/HomePhoto'
import { ScrollReveal } from '@/components/home/ScrollReveal'
import { Container } from '@/components/ui/container'
import { Typography } from '@/components/ui/typography'
import type { HomePage, Media } from '@/payload-types'

type HomeProcessProps = {
  process: NonNullable<HomePage['process']>
  photo?: Media | null
}

function padIndex(index: number): string {
  return String(index + 1).padStart(2, '0')
}

export function HomeProcess(props: HomeProcessProps): ReactElement | null {
  const { process, photo } = props
  const steps = process.steps?.filter((step) => step.title.trim()) ?? []
  const hasPromo = Boolean(process.promo?.title?.trim() || process.promo?.description?.trim())

  if (!process.title?.trim() && steps.length === 0 && !hasPromo) {
    return null
  }

  return (
    <div data-slot="home-process">
      <section className="border-t border-line bg-sage-light py-[76px]">
        <Container>
          <div className="grid items-center gap-10 md:grid-cols-[0.88fr_1.12fr] md:gap-[52px]">
            <ScrollReveal>
              {process.eyebrow?.trim() ? (
                <HomeEyebrow className="mb-4">{process.eyebrow.trim()}</HomeEyebrow>
              ) : null}
              {process.title?.trim() ? <HomeHeadline>{process.title.trim()}</HomeHeadline> : null}
            </ScrollReveal>

            <HomePhoto
              media={photo}
              className="h-[280px] md:h-[360px]"
              sizes="(max-width: 768px) 100vw, 640px"
              fallbackAlt="Our approach"
            />
          </div>

          {steps.length > 0 ? (
            <div className="mt-10 grid grid-cols-1 border border-line sm:grid-cols-2 lg:grid-cols-3">
              {steps.map((step, index) => (
                <article
                  key={step.id ?? `${step.title}-${index}`}
                  data-slot="home-process-step"
                  className="border-line px-6 py-7 max-lg:border-b max-lg:last:border-b-0 sm:max-lg:odd:border-r lg:border-r lg:last:border-r-0"
                >
                  <Typography as="p" className="font-heading text-[34px] text-[#8c9992]">
                    {padIndex(index)}
                  </Typography>
                  <Typography as="h3" className="mt-2 text-sm">
                    {step.title}
                  </Typography>
                  {step.description?.trim() ? (
                    <Typography className="mt-2 text-[13px] text-[#606b65]">
                      {step.description.trim()}
                    </Typography>
                  ) : null}
                </article>
              ))}
            </div>
          ) : null}
        </Container>
      </section>

      {hasPromo ? (
        <section data-slot="home-process-promo" className="bg-primary text-[#f8f4eb]">
          <Container>
            <div className="max-w-[590px] py-[68px]">
              <ScrollReveal>
                {process.promo?.title?.trim() ? (
                  <HomeHeadline className="text-[#f8f4eb]">
                    {process.promo.title.trim()}
                  </HomeHeadline>
                ) : null}
                {process.promo?.description?.trim() ? (
                  <Typography className="mt-5 text-[#d9e0db]">
                    {process.promo.description.trim()}
                  </Typography>
                ) : null}
                <div className="mt-6">
                  <CmsCta
                    link={process.promo?.cta}
                    className="border-primary-foreground bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                  />
                </div>
              </ScrollReveal>
            </div>
          </Container>
        </section>
      ) : null}
    </div>
  )
}
