import type { GroupField } from 'payload'

type SeoFieldOptions = {
  name?: string
  label?: string
}

/**
 * Per-page / default SEO metadata group.
 */
export const seoField = ({ name = 'seo', label = 'SEO' }: SeoFieldOptions = {}): GroupField => ({
  name,
  type: 'group',
  label,
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Meta title',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Meta description',
    },
    {
      name: 'ogImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Open Graph image',
    },
  ],
})
