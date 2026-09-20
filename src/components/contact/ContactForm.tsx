'use client'

import { useState, type FormEvent, type ReactElement } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Typography } from '@/components/ui/typography'
import type { ContactPage } from '@/payload-types'

type ContactFormProps = {
  form: NonNullable<ContactPage['form']>
}

export function ContactForm(props: ContactFormProps): ReactElement {
  const { form } = props
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div data-slot="contact-form-success" className="border border-line bg-background p-6 md:p-8">
        <Typography className="text-[#415149]">
          {form.successMessage?.trim() || 'Thanks — we will be in touch soon.'}
        </Typography>
      </div>
    )
  }

  return (
    <form
      data-slot="contact-form"
      onSubmit={handleSubmit}
      className="space-y-5 border border-line bg-background p-6 md:p-8"
    >
      <div className="space-y-2">
        <Label htmlFor="contact-name">{form.nameLabel?.trim() || 'Name'}</Label>
        <Input id="contact-name" name="name" type="text" autoComplete="name" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="contact-email">{form.emailLabel?.trim() || 'Email'}</Label>
        <Input id="contact-email" name="email" type="email" autoComplete="email" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="contact-phone">{form.phoneLabel?.trim() || 'Phone'}</Label>
        <Input id="contact-phone" name="phone" type="tel" autoComplete="tel" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="contact-message">{form.messageLabel?.trim() || 'Message'}</Label>
        <Textarea id="contact-message" name="message" required />
      </div>
      <Button type="submit">{form.submitLabel?.trim() || 'Send message'}</Button>
    </form>
  )
}
