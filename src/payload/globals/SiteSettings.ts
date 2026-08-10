import type { GlobalConfig } from 'payload'

import { anyone, authenticated } from '../access'
import { seoField } from '../fields/seo'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: {
    group: 'Settings',
  },
  access: {
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'brand',
      type: 'group',
      fields: [
        {
          name: 'siteName',
          type: 'text',
          required: true,
          defaultValue: 'Indy Veterinary Care',
        },
        {
          name: 'tagline',
          type: 'text',
        },
      ],
    },
    {
      name: 'contact',
      type: 'group',
      label: 'Contact (NAP)',
      fields: [
        {
          name: 'phone',
          type: 'text',
          admin: {
            description: 'Primary voice number, e.g. (215) 923-2300',
          },
        },
        {
          name: 'textPhone',
          type: 'text',
          label: 'Text number',
        },
        {
          name: 'email',
          type: 'email',
        },
        {
          name: 'address',
          type: 'textarea',
        },
        {
          name: 'hours',
          type: 'array',
          labels: {
            singular: 'Hours row',
            plural: 'Hours',
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              admin: {
                description: 'e.g. Mon–Thu',
              },
            },
            {
              name: 'value',
              type: 'text',
              required: true,
              admin: {
                description: 'e.g. 9am–7pm',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'social',
      type: 'group',
      fields: [
        {
          name: 'facebook',
          type: 'text',
        },
        {
          name: 'instagram',
          type: 'text',
        },
      ],
    },
    {
      name: 'booking',
      type: 'group',
      label: 'Booking CTA (Vetter)',
      fields: [
        {
          name: 'label',
          type: 'text',
          defaultValue: 'Book Now',
        },
        {
          name: 'url',
          type: 'text',
          admin: {
            description: 'External booking URL or page that hosts the embed.',
          },
        },
        {
          name: 'embedScriptUrl',
          type: 'text',
          label: 'Embed script URL',
          admin: {
            description: 'Optional Vetter (or similar) script URL for Phase 3 wiring.',
          },
        },
      ],
    },
    {
      name: 'pharmacy',
      type: 'group',
      label: 'Pharmacy / Order Online',
      fields: [
        {
          name: 'label',
          type: 'text',
          defaultValue: 'Order Online',
        },
        {
          name: 'url',
          type: 'text',
          admin: {
            description: 'Outbound pharmacy URL (e.g. VetsFirstChoice).',
          },
        },
      ],
    },
    seoField({
      name: 'defaultSeo',
      label: 'Default SEO',
    }),
  ],
}
