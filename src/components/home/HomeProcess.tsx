import type { ReactElement } from 'react'

import { CmsCta } from '@/components/home/CmsCta'
import { HomeEyebrow } from '@/components/home/HomeEyebrow'
import { HomeHeadline } from '@/components/home/HomeHeadline'
import { ScrollReveal } from '@/components/home/ScrollReveal'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Typography } from '@/components/ui/typography'
import { cn } from '@/lib/utils'
import type { HomePage } from '@/payload-types'

type HomeProcessProps = {
  process: NonNullable<HomePage['process']>
}

const STEP_COLORS = ['bg-brand-blue', 'bg-brand-pink', 'bg-[#ffd8a8]'] as const

export function HomeProcess(props: HomeProcessProps): ReactElement | null {
  const { process } = props
  const steps = process.steps?.filter((step) => step.title.trim()) ?? []
  const hasPromo = Boolean(process.promo?.title?.trim() || process.promo?.description?.trim())

  if (!process.title?.trim() && steps.length === 0 && !hasPromo) {
    return null
  }

  return (
    <Section data-slot="home-process" spacing="md">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-14">
          <div className="flex flex-col">
            <ScrollReveal>
              {process.eyebrow?.trim() ? (
                <HomeEyebrow className="mb-4">{process.eyebrow.trim()}</HomeEyebrow>
              ) : null}
              {process.title?.trim() ? <HomeHeadline>{process.title.trim()}</HomeHeadline> : null}
            </ScrollReveal>

            {hasPromo ? (
              <ScrollReveal className="mt-8">
                <div
                  data-slot="home-process-promo"
                  className="relative overflow-hidden rounded-3xl bg-brand-blue p-8 md:p-10"
                >
                  {process.promo?.title?.trim() ? (
                    <Typography as="h3" variant="h3" className="max-w-sm">
                      {process.promo.title.trim()}
                    </Typography>
                  ) : null}
                  {process.promo?.description?.trim() ? (
                    <Typography className="mt-3 max-w-sm text-foreground/80">
                      {process.promo.description.trim()}
                    </Typography>
                  ) : null}
                  <div className="mt-6">
                    <CmsCta link={process.promo?.cta} />
                  </div>
                </div>
              </ScrollReveal>
            ) : null}
          </div>

          {steps.length > 0 ? (
            <div className="flex h-full min-h-0 flex-col gap-6">
              {steps.map((step, index) => (
                <ScrollReveal
                  key={step.id ?? `${step.title}-${index}`}
                  className="flex min-h-0 flex-1 flex-col"
                >
                  <article
                    data-slot="home-process-step"
                    className="flex h-full flex-1 gap-4 rounded-2xl bg-card p-5 sm:gap-5 sm:p-6"
                  >
                    <div
                      className={cn(
                        'flex size-12 shrink-0 items-center justify-center rounded-2xl text-base font-bold text-primary',
                        STEP_COLORS[index % STEP_COLORS.length],
                      )}
                    >
                      {index + 1}
                    </div>
                    <div className="min-w-0 self-center">
                      <Typography as="h3" variant="h4">
                        {step.title}
                      </Typography>
                      {step.description?.trim() ? (
                        <Typography className="mt-2 text-muted-foreground">
                          {step.description.trim()}
                        </Typography>
                      ) : null}
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          ) : null}
        </div>
      </Container>
    </Section>
  )
}
