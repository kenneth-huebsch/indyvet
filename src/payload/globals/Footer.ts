import type { GlobalConfig } from 'payload'

import { anyone, authenticated } from '../access'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  admin: {
    group: 'Settings',
    description: 'Link columns and copyright. Clinic NAP and social URLs live in Site Settings.',
  },
  access: {
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'linkGroups',
      type: 'array',
      labels: {
        singular: 'Link group',
        plural: 'Link groups',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'links',
          type: 'array',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'url',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'copyright',
      type: 'text',
      admin: {
        description: 'e.g. © 2026 Indy Veterinary Care, Inc. All rights reserved.',
      },
    },
  ],
}
