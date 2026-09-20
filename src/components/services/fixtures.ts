import type { Service, ServicesPage } from '@/payload-types'

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

export const servicesPageFixture: ServicesPage = {
  id: 1,
  hero: {
    eyebrow: 'Veterinary services',
    title: 'This is the only place for all your pet care',
    description:
      'Located in Northern Liberties, Indy Veterinary Care offers quick & easy services for dogs, cats, and other pets.',
  },
  cta: {
    label: 'Book an appointment',
    url: '/contact',
  },
  promo: {
    title: 'Ready to book care for your pet?',
    description:
      'Schedule a visit with our Northern Liberties team for dogs, cats, and other pets.',
  },
  seo: {
    title: 'Veterinary Services | Indy Veterinary Care',
    description: 'Services for dogs, cats, and other pets in Northern Liberties.',
  },
  updatedAt: '2026-01-01T00:00:00.000Z',
  createdAt: '2026-01-01T00:00:00.000Z',
}

export const publishedServicesFixture: Service[] = [
  {
    id: 1,
    title: 'Anesthesia',
    slug: 'anesthesia',
    shortDescription: 'Safe anesthesia with constant monitoring.',
    body: richTextParagraph(
      'We provide the safest possible anesthetics and constant monitoring of vital signs.',
    ),
    featured: true,
    sortOrder: 1,
    updatedAt: '2026-01-01T00:00:00.000Z',
    createdAt: '2026-01-01T00:00:00.000Z',
    _status: 'published',
  },
  {
    id: 2,
    title: 'Examinations',
    slug: 'examinations',
    shortDescription: 'Thorough physical exams from nose to tail.',
    body: richTextParagraph('Every pet we see gets a thorough physical exam from nose to tail.'),
    featured: true,
    sortOrder: 2,
    updatedAt: '2026-01-01T00:00:00.000Z',
    createdAt: '2026-01-01T00:00:00.000Z',
    _status: 'published',
  },
  {
    id: 3,
    title: 'Surgery',
    slug: 'surgery',
    shortDescription: 'Routine and complex soft tissue procedures.',
    body: richTextParagraph('From routine spay/neuter to more complex soft tissue operations.'),
    featured: true,
    sortOrder: 3,
    updatedAt: '2026-01-01T00:00:00.000Z',
    createdAt: '2026-01-01T00:00:00.000Z',
    _status: 'published',
  },
]
