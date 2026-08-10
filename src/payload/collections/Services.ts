import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { authenticated, authenticatedOrPublished } from '../access'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'featured', 'sortOrder', '_status', 'updatedAt'],
    group: 'Content',
  },
  versions: {
    drafts: true,
  },
  access: {
    read: authenticatedOrPublished,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    slugField({
      name: 'slug',
      useAsSlug: 'title',
      required: true,
    }),
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Short blurb for cards and listings.',
      },
    },
    {
      name: 'body',
      type: 'richText',
      admin: {
        description: 'Full service detail content.',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Eligible for homepage featured services.',
      },
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
