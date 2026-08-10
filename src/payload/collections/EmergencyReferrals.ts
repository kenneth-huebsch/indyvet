import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'

export const EmergencyReferrals: CollectionConfig = {
  slug: 'emergency-referrals',
  labels: {
    singular: 'Emergency Referral',
    plural: 'Emergency Referrals',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'phone', 'sortOrder', 'updatedAt'],
    group: 'Content',
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
    },
    {
      name: 'address',
      type: 'textarea',
    },
    {
      name: 'notes',
      type: 'textarea',
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
