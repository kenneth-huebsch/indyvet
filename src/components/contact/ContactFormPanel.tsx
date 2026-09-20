import type { ReactElement } from 'react'

import { ContactForm } from '@/components/contact/ContactForm'
import { HomeEyebrow } from '@/components/home/HomeEyebrow'
import { HomeHeadline } from '@/components/home/HomeHeadline'
import { ScrollReveal } from '@/components/home/ScrollReveal'
import { Container } from '@/components/ui/container'
import { Typography } from '@/components/ui/typography'
import type { ContactPage, SiteSetting } from '@/payload-types'

type ContactFormPanelProps = {
  form?: ContactPage['form']
  contact?: SiteSetting['contact']
}

function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, '')}`
}

export function ContactFormPanel(props: ContactFormPanelProps): ReactElement | null {
  const { form, contact } = props
  const hours = contact?.hours?.filter((row) => row.label.trim() && row.value.trim()) ?? []
  const hasNap = Boolean(
    contact?.address?.trim() ||
      contact?.phone?.trim() ||
      contact?.textPhone?.trim() ||
      contact?.email?.trim() ||
      hours.length > 0,
  )

  if (!form && !hasNap) {
    return null
  }

  return (
    <section data-slot="contact-form-panel" className="border-t border-line bg-cream py-[68px]">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
          {form ? (
            <ScrollReveal>
              <ContactForm form={form} />
            </ScrollReveal>
          ) : null}

          {hasNap ? (
            <ScrollReveal className="space-y-8">
              <div>
                <HomeEyebrow className="mb-3">Visit us</HomeEyebrow>
                <HomeHeadline as="h2" className="text-[2rem]">
                  Clinic details
                </HomeHeadline>
              </div>

              {contact?.address?.trim() ? (
                <div>
                  <Typography className="mb-2 text-[11px] uppercase tracking-[0.14em] text-[#59645f]">
                    Address
                  </Typography>
                  <Typography className="whitespace-pre-line text-[#415149]">
                    {contact.address.trim()}
                  </Typography>
                </div>
              ) : null}

              {contact?.phone?.trim() ? (
                <div>
                  <Typography className="mb-2 text-[11px] uppercase tracking-[0.14em] text-[#59645f]">
                    Call
                  </Typography>
                  <a
                    href={telHref(contact.phone)}
                    className="text-[#415149] underline underline-offset-4 hover:no-underline"
                  >
                    {contact.phone.trim()}
                  </a>
                </div>
              ) : null}

              {contact?.textPhone?.trim() ? (
                <div>
                  <Typography className="mb-2 text-[11px] uppercase tracking-[0.14em] text-[#59645f]">
                    Text
                  </Typography>
                  <a
                    href={telHref(contact.textPhone)}
                    className="text-[#415149] underline underline-offset-4 hover:no-underline"
                  >
                    {contact.textPhone.trim()}
                  </a>
                </div>
              ) : null}

              {contact?.email?.trim() ? (
                <div>
                  <Typography className="mb-2 text-[11px] uppercase tracking-[0.14em] text-[#59645f]">
                    Email
                  </Typography>
                  <a
                    href={`mailto:${contact.email.trim()}`}
                    className="text-[#415149] underline underline-offset-4 hover:no-underline"
                  >
                    {contact.email.trim()}
                  </a>
                </div>
              ) : null}

              {hours.length > 0 ? (
                <div>
                  <Typography className="mb-2 text-[11px] uppercase tracking-[0.14em] text-[#59645f]">
                    Hours
                  </Typography>
                  <ul className="space-y-1">
                    {hours.map((row) => (
                      <li
                        key={`${row.label}-${row.value}`}
                        className="flex justify-between gap-4 text-[#415149]"
                      >
                        <span>{row.label.trim()}</span>
                        <span className="text-right">{row.value.trim()}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </ScrollReveal>
          ) : null}
        </div>
      </Container>
    </section>
  )
}
