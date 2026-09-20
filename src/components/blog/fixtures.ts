import type { BlogPage, Post } from '@/payload-types'

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

export const blogPageFixture: BlogPage = {
  id: 1,
  hero: {
    eyebrow: 'From the clinic',
    title: 'Blog',
    description: 'Guides, seasonal tips, and pet care advice from our team.',
  },
  cta: {
    label: 'Book an appointment',
    url: '/contact',
  },
  promo: {
    title: 'Questions about your pet’s health?',
    description:
      'Our Northern Liberties team is here to help—book a visit anytime for dogs, cats, and other pets.',
  },
  seo: {
    title: 'Blog | Indy Veterinary Care',
    description: 'Pet care tips from Indy Veterinary Care.',
  },
  updatedAt: '2026-01-01T00:00:00.000Z',
  createdAt: '2026-01-01T00:00:00.000Z',
}

export const publishedPostsFixture: Post[] = [
  {
    id: 1,
    title: 'Hot Weather Safety Tips for Dogs & Cats',
    slug: 'hot-weather-safety-tips-for-dogs-cats',
    excerpt: 'As temperatures rise, pets are more vulnerable to heat than humans.',
    publishedAt: '2026-04-29T16:23:18.000Z',
    categories: [{ id: 'c1', label: 'Tips' }, { id: 'c2', label: 'Safety' }],
    content: richTextParagraph(
      'As temperatures rise, it is important for pet owners to recognize heat risks.',
    ),
    updatedAt: '2026-04-29T16:23:18.000Z',
    createdAt: '2026-04-29T16:23:18.000Z',
    _status: 'published',
  },
  {
    id: 2,
    title: 'Dental care basics',
    slug: 'dental-care-basics',
    excerpt: 'Why dental visits matter.',
    publishedAt: '2025-01-15T12:00:00.000Z',
    categories: [{ id: 'c3', label: 'Dogs' }],
    content: richTextParagraph('Dental care keeps pets comfortable and healthy.'),
    updatedAt: '2025-01-15T12:00:00.000Z',
    createdAt: '2025-01-15T12:00:00.000Z',
    _status: 'published',
  },
]
