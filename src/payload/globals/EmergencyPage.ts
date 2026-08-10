import type { GlobalConfig } from 'payload'

import { anyone, authenticated } from '../access'
import { seoField } from '../fields/seo'

export const EmergencyPage: GlobalConfig = {
  slug: 'emergency-page',
  label: 'Emergency Page',
  admin: {
    group: 'Pages',
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
      label: 'Intro',
    },
    {
      name: 'referrals',
      type: 'relationship',
      relationTo: 'emergency-referrals',
      hasMany: true,
      label: 'Emergency referrals',
    },
    seoField(),
  ],
}
