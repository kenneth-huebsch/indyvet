import type { GlobalConfig } from 'payload'

import { anyone, authenticated } from '../access'
import { linkField } from '../fields/link'
import { seoField } from '../fields/seo'

export const ServicesPage: GlobalConfig = {
  slug: 'services-page',
  label: 'Services Page',
  admin: {
    group: 'Pages',
    description:
      'Hero, CTA, and SEO for the public /services index. Service bodies live on the Services collection.',
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
    linkField({ name: 'cta', label: 'Page CTA', required: false }),
    {
      name: 'promo',
      type: 'group',
      label: 'Bottom promo',
      admin: {
        description: 'Ink band at the bottom of /services. Uses the Page CTA button.',
      },
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
      ],
    },
    seoField(),
  ],
}
