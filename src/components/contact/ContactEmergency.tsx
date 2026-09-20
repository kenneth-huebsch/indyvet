import type { ReactElement } from 'react'

import { HomeEyebrow } from '@/components/home/HomeEyebrow'
import { HomeHeadline } from '@/components/home/HomeHeadline'
import { ScrollReveal } from '@/components/home/ScrollReveal'
import { RichText } from '@/components/rich-text/RichText'
import { Container } from '@/components/ui/container'
import { Typography } from '@/components/ui/typography'
import { populatedDocs } from '@/lib/relations'
import type { ContactPage, EmergencyReferral } from '@/payload-types'

type ContactEmergencyProps = {
  emergency?: ContactPage['emergency']
}

function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, '')}`
}

export function ContactEmergency(props: ContactEmergencyProps): ReactElement | null {
  const { emergency } = props
  const referrals = populatedDocs<EmergencyReferral>(emergency?.referrals)
  const title = emergency?.title?.trim()
  const eyebrow = emergency?.eyebrow?.trim()
  const hasIntro = Boolean(emergency?.intro)

  if (!title && !hasIntro && referrals.length === 0) {
    return null
  }

  return (
    <section
      id="emergency"
      data-slot="contact-emergency"
      className="scroll-mt-24 border-t border-line bg-sage-light py-[68px]"
    >
      <Container>
        <ScrollReveal className="mb-10 max-w-[720px]">
          {eyebrow ? <HomeEyebrow className="mb-3">{eyebrow}</HomeEyebrow> : null}
          {title ? <HomeHeadline as="h2">{title}</HomeHeadline> : null}
          {emergency?.intro ? (
            <RichText data={emergency.intro} className="mt-5 text-[#415149]" />
          ) : null}
        </ScrollReveal>

        {referrals.length > 0 ? (
          <div className="border-t border-line">
            {referrals.map((referral) => (
              <article
                key={referral.id}
                data-slot="contact-emergency-referral"
                className="grid gap-3 border-b border-line py-6 md:grid-cols-[1.2fr_0.8fr] md:gap-8"
              >
                <div>
                  <Typography as="h3" className="text-sm uppercase tracking-[0.08em]">
                    {referral.name}
                  </Typography>
                  {referral.notes?.trim() ? (
                    <Typography className="mt-2 text-[13px] text-[#59645f]">
                      {referral.notes.trim()}
                    </Typography>
                  ) : null}
                </div>
                <div className="space-y-2">
                  {referral.phone?.trim() ? (
                    <a
                      href={telHref(referral.phone)}
                      className="block text-[#415149] underline underline-offset-4 hover:no-underline"
                    >
                      {referral.phone.trim()}
                    </a>
                  ) : null}
                  {referral.address?.trim() ? (
                    <Typography className="whitespace-pre-line text-[13px] text-[#59645f]">
                      {referral.address.trim()}
                    </Typography>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        ) : null}
      </Container>
    </section>
  )
}
