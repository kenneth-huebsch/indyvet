import type { GlobalConfig } from 'payload'

import { anyone, authenticated } from '../access'
import { linkField } from '../fields/link'
import { seoField } from '../fields/seo'

export const BlogPage: GlobalConfig = {
  slug: 'blog-page',
  label: 'Blog Page',
  admin: {
    group: 'Pages',
    description: 'Hero, CTA, and SEO for the public /blog index. Post bodies live on Blog Posts.',
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
        description: 'Ink band at the bottom of /blog. Uses the Page CTA button.',
      },
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
      ],
    },
    seoField(),
  ],
}
