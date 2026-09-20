import type { ContactPage, EmergencyReferral, SiteSetting } from '@/payload-types'

function richTextParagraph(text: string) {
  return {
    root: {
      type: 'root' as const,
      children: [
        {
          type: 'paragraph' as const,
          children: [{ type: 'text' as const, text, version: 1 }],
          direction: 'ltr' as const,
          format: '' as const,
          indent: 0,
          version: 1,
        },
      ],
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1,
    },
  }
}

export const contactReferralsFixture: EmergencyReferral[] = [
  {
    id: 1,
    name: 'VSEC – Veterinary Specialty & Emergency Care',
    phone: '267-800-1950',
    address: '1114 South Front Street\nPhiladelphia, PA 19147',
    sortOrder: 1,
    updatedAt: '2026-01-01T00:00:00.000Z',
    createdAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 2,
    name: 'Matthew J. Ryan Veterinary Hospital of the University of Pennsylvania',
    phone: '215-746-8911',
    address: '3900 Spruce Street\nPhiladelphia, PA 19104',
    sortOrder: 2,
    updatedAt: '2026-01-01T00:00:00.000Z',
    createdAt: '2026-01-01T00:00:00.000Z',
  },
]

export const contactPageFixture: ContactPage = {
  id: 1,
  hero: {
    eyebrow: 'Get in touch',
    title: 'Contact',
    description: 'We’re in Northern Liberties.',
  },
  intro: richTextParagraph('Call or text us with questions, or send a message.'),
  form: {
    nameLabel: 'Name',
    emailLabel: 'Email',
    phoneLabel: 'Phone',
    messageLabel: 'Message',
    submitLabel: 'Send message',
    successMessage: 'Thanks — we will be in touch soon.',
  },
  mapEmbedUrl:
    'https://maps.google.com/maps?q=917%20N%20Front%20Street%20Philadelphia%20PA%2019123&output=embed',
  emergency: {
    eyebrow: 'After hours',
    title: 'Emergency Information',
    intro: richTextParagraph(
      'Contact us immediately if you have an emergency. If our office is closed, please contact one of the following emergency veterinary offices.',
    ),
    referrals: contactReferralsFixture,
  },
  seo: {
    title: 'Contact Us | Indy Veterinary Care',
    description: 'Contact Indy Veterinary Care in Northern Liberties.',
  },
  updatedAt: '2026-01-01T00:00:00.000Z',
  createdAt: '2026-01-01T00:00:00.000Z',
}

export const contactSiteSettingsFixture: Pick<SiteSetting, 'id' | 'brand' | 'contact' | 'defaultSeo'> =
  {
    id: 1,
    brand: {
      siteName: 'Indy Veterinary Care',
    },
    contact: {
      phone: '(215) 923-2300',
      textPhone: '(844) 968-1296',
      email: 'info@indyvetcare.com',
      address: '917 N Front Street\nPhiladelphia, PA 19123',
      hours: [
        { id: 'h1', label: 'Mon–Thu', value: '9:00 AM – 7:00 PM' },
        { id: 'h2', label: 'Friday', value: '9:00 AM – 5:00 PM' },
      ],
    },
    defaultSeo: {
      title: 'Default SEO',
      description: 'Default description',
    },
  }
