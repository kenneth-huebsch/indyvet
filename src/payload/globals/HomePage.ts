import type { GlobalConfig } from 'payload'

import { anyone, authenticated } from '../access'
import { linkField } from '../fields/link'
import { seoField } from '../fields/seo'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Home Page',
  admin: {
    group: 'Pages',
    description:
      'Home 1 section content. Products are replaced by Featured Posts. Layout is fixed in code.',
  },
  access: {
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      admin: {
        description: 'Hero section',
      },
      fields: [
        { name: 'eyebrow', type: 'text' },
        { name: 'headline', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        linkField({ name: 'primaryCta', label: 'Primary CTA', required: false }),
        linkField({ name: 'secondaryCta', label: 'Secondary CTA', required: false }),
        {
          name: 'images',
          type: 'array',
          maxRows: 3,
          labels: {
            singular: 'Hero image',
            plural: 'Hero images',
          },
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
          ],
        },
        {
          name: 'marqueeTags',
          type: 'array',
          labels: {
            singular: 'Tag',
            plural: 'Marquee tags',
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'services',
      type: 'group',
      admin: {
        description: 'Featured services section',
      },
      fields: [
        { name: 'eyebrow', type: 'text' },
        { name: 'title', type: 'text' },
        {
          name: 'featuredServices',
          type: 'relationship',
          relationTo: 'services',
          hasMany: true,
        },
      ],
    },
    {
      name: 'process',
      type: 'group',
      admin: {
        description: 'Three-step process section',
      },
      fields: [
        { name: 'eyebrow', type: 'text' },
        { name: 'title', type: 'text' },
        {
          name: 'promo',
          type: 'group',
          label: 'Side promo card',
          fields: [
            { name: 'title', type: 'text' },
            { name: 'description', type: 'textarea' },
            linkField({ name: 'cta', label: 'CTA', required: false }),
          ],
        },
        {
          name: 'steps',
          type: 'array',
          maxRows: 3,
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'textarea' },
          ],
        },
      ],
    },
    {
      name: 'featuredPosts',
      type: 'group',
      label: 'Featured Posts',
      admin: {
        description: 'Replaces the template Products section. No commerce fields.',
      },
      fields: [
        { name: 'eyebrow', type: 'text' },
        { name: 'title', type: 'text' },
        linkField({ name: 'viewAll', label: 'View all link', required: false }),
        {
          name: 'posts',
          type: 'relationship',
          relationTo: 'posts',
          hasMany: true,
        },
      ],
    },
    {
      name: 'about',
      type: 'group',
      label: 'About teaser',
      fields: [
        { name: 'eyebrow', type: 'text' },
        { name: 'title', type: 'text' },
        { name: 'body', type: 'richText' },
        linkField({ name: 'cta', label: 'CTA', required: false }),
        {
          name: 'tags',
          type: 'array',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'team',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text' },
        { name: 'title', type: 'text' },
        linkField({ name: 'cta', label: 'CTA', required: false }),
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
    {
      name: 'bottomCta',
      type: 'group',
      label: 'Bottom CTA',
      fields: [
        { name: 'headline', type: 'text' },
        linkField({ name: 'cta', label: 'CTA', required: false }),
        {
          name: 'images',
          type: 'array',
          label: 'Collage images',
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
          ],
        },
      ],
    },
    seoField(),
  ],
}
