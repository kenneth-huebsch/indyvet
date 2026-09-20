import type { GlobalConfig } from 'payload'

import { anyone, authenticated } from '../access'
import { seoField } from '../fields/seo'

export const ContactPage: GlobalConfig = {
  slug: 'contact-page',
  label: 'Contact Page',
  admin: {
    group: 'Pages',
    description:
      'Contact copy, form labels, and emergency referrals. Submission / email delivery is wired in a later phase. NAP/hours come from Site Settings.',
  },
  access: {
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text' },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
      ],
    },
    {
      name: 'intro',
      type: 'richText',
      label: 'Intro copy',
    },
    {
      name: 'form',
      type: 'group',
      label: 'Form labels',
      fields: [
        {
          name: 'nameLabel',
          type: 'text',
          defaultValue: 'Name',
        },
        {
          name: 'emailLabel',
          type: 'text',
          defaultValue: 'Email',
        },
        {
          name: 'phoneLabel',
          type: 'text',
          defaultValue: 'Phone',
        },
        {
          name: 'messageLabel',
          type: 'text',
          defaultValue: 'Message',
        },
        {
          name: 'submitLabel',
          type: 'text',
          defaultValue: 'Send message',
        },
        {
          name: 'successMessage',
          type: 'textarea',
          defaultValue: 'Thanks — we will be in touch soon.',
        },
      ],
    },
    {
      name: 'mapEmbedUrl',
      type: 'text',
      label: 'Map embed URL',
      admin: {
        description: 'Google Maps embed URL or similar.',
      },
    },
    {
      name: 'emergency',
      type: 'group',
      label: 'Emergency section',
      admin: {
        description: 'After-hours band on /contact (#emergency). Referrals live on Emergency Referrals.',
      },
      fields: [
        { name: 'eyebrow', type: 'text' },
        { name: 'title', type: 'text' },
        { name: 'intro', type: 'richText', label: 'Intro' },
        {
          name: 'referrals',
          type: 'relationship',
          relationTo: 'emergency-referrals',
          hasMany: true,
          label: 'Emergency referrals',
        },
      ],
    },
    {
      name: 'faqs',
      type: 'relationship',
      relationTo: 'faqs',
      hasMany: true,
      label: 'FAQs',
      admin: {
        description: 'Optional. Not rendered on the public page when empty.',
      },
    },
    seoField(),
  ],
}
