import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { authenticated, authenticatedOrPublished } from '../access'
import { seoField } from '../fields/seo'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: {
    singular: 'Blog Post',
    plural: 'Blog Posts',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'publishedAt', '_status', 'updatedAt'],
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
      name: 'excerpt',
      type: 'textarea',
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'categories',
      type: 'array',
      labels: {
        singular: 'Category',
        plural: 'Categories',
      },
      admin: {
        description: 'Display labels only (no public category archives).',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    seoField(),
  ],
}
