import type { GlobalConfig } from 'payload'

import { anyone, authenticated } from '../access'
import { linkField } from '../fields/link'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Header',
  admin: {
    group: 'Settings',
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
      name: 'navItems',
      type: 'array',
      label: 'Navigation',
      labels: {
        singular: 'Nav item',
        plural: 'Nav items',
      },
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
    linkField({
      name: 'cta',
      label: 'Primary CTA',
      required: false,
    }),
  ],
}
