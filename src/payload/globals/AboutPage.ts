import type { GlobalConfig } from 'payload'

import { anyone, authenticated } from '../access'
import { linkField } from '../fields/link'
import { seoField } from '../fields/seo'

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  label: 'About Page',
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
        { name: 'subtitle', type: 'textarea' },
      ],
    },
    {
      name: 'mission',
      type: 'group',
      label: 'Mission / story',
      fields: [
        { name: 'eyebrow', type: 'text' },
        { name: 'title', type: 'text' },
        { name: 'body', type: 'richText' },
      ],
    },
    {
      name: 'namesake',
      type: 'group',
      label: 'Namesake story',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'body', type: 'richText' },
      ],
    },
    {
      name: 'team',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text' },
        { name: 'title', type: 'text' },
        {
          name: 'members',
          type: 'relationship',
          relationTo: 'team-members',
          hasMany: true,
        },
      ],
    },
    {
      name: 'testimonials',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text' },
        { name: 'title', type: 'text' },
        {
          name: 'items',
          type: 'relationship',
          relationTo: 'testimonials',
          hasMany: true,
        },
      ],
    },
    linkField({ name: 'cta', label: 'Page CTA', required: false }),
    seoField(),
  ],
}
