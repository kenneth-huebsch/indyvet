import type { AboutPage, TeamMember } from '@/payload-types'
import { fixtureMedia } from '@/components/home/fixtures'

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

export const fixtureTeamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Dr. Sara Organist',
    slug: 'dr-sara-organist',
    role: 'Founder / Veterinarian',
    photo: fixtureMedia.team,
    bio: richTextParagraph(
      'Dr. Organist has practiced veterinarian medicine in the Philadelphia area for the past 14 years.',
    ),
    sortOrder: 1,
    updatedAt: '2026-01-01T00:00:00.000Z',
    createdAt: '2026-01-01T00:00:00.000Z',
    _status: 'published',
  },
  {
    id: 2,
    name: 'Dr. Eric Matkowski',
    slug: 'dr-eric-matkowski',
    role: 'Veterinarian',
    photo: fixtureMedia.team,
    bio: richTextParagraph(
      'Dr. Eric Matkowski grew up and has lived in Philadelphia for almost his entire life.',
    ),
    sortOrder: 2,
    updatedAt: '2026-01-01T00:00:00.000Z',
    createdAt: '2026-01-01T00:00:00.000Z',
    _status: 'published',
  },
  {
    id: 3,
    name: 'Dr. Rachel Ellis',
    slug: 'dr-rachel-ellis',
    role: 'Veterinarian',
    photo: fixtureMedia.team,
    bio: richTextParagraph(
      'Dr. Rachel Ellis grew up in Orlando, Florida, where she earned her undergraduate degree in Biology.',
    ),
    sortOrder: 3,
    updatedAt: '2026-01-01T00:00:00.000Z',
    createdAt: '2026-01-01T00:00:00.000Z',
    _status: 'published',
  },
]

export const aboutPageFixture: AboutPage = {
  id: 1,
  hero: {
    eyebrow: 'About us',
    title: 'Indy Veterinary Care',
    subtitle: 'High quality medical care in a compassionate, courteous and low stress environment.',
  },
  mission: {
    eyebrow: 'Our mission',
    title: 'Care that feels personal',
    body: richTextParagraph(
      'Our mission is to provide high quality medical care in a compassionate, courteous and low stress environment.',
    ),
    image: fixtureMedia.hero2,
  },
  namesake: {
    title: 'Our Namesake',
    body: richTextParagraph('Dr. Organist named the practice after her beloved first dog, Indy.'),
  },
  team: {
    eyebrow: 'Our team',
    title: 'Meet the veterinarians caring for your pets',
    members: fixtureTeamMembers,
  },
  cta: {
    label: 'Book an appointment',
    url: '/contact',
  },
  promo: {
    title: 'Ready to meet our team?',
    description:
      'Schedule a visit with our Northern Liberties veterinarians—locally and family owned care for dogs, cats, and other pets.',
  },
  seo: {
    title: 'About Our Philadelphia Veterinary Clinic | Indy Vet Care',
    description: 'Meet Indy Veterinary Care and our veterinary team.',
  },
  updatedAt: '2026-01-01T00:00:00.000Z',
  createdAt: '2026-01-01T00:00:00.000Z',
}
