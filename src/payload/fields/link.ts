import type { Field, GroupField } from 'payload'

type LinkFieldOptions = {
  name?: string
  label?: string
  required?: boolean
}

/**
 * Simple CTA / nav link: label + URL (internal path or external).
 */
export const linkField = ({
  name = 'link',
  label = 'Link',
  required = true,
}: LinkFieldOptions = {}): GroupField => ({
  name,
  type: 'group',
  label,
  admin: {
    hideGutter: true,
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      required,
    },
    {
      name: 'url',
      type: 'text',
      required,
      admin: {
        description: 'Internal path (e.g. /contact) or full external URL.',
      },
    },
  ],
})

export const optionalLinkField = (options: LinkFieldOptions = {}): Field =>
  linkField({ ...options, required: false })
