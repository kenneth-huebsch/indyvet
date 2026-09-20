import type { HomePage, Media, Post, Service, TeamMember, Testimonial } from '@/payload-types'

const media = (id: number, alt: string): Media => ({
  id,
  alt,
  url: `/api/media/file/${alt.replace(/\s+/g, '-').toLowerCase()}.jpg`,
  updatedAt: '2026-01-01T00:00:00.000Z',
  createdAt: '2026-01-01T00:00:00.000Z',
  width: 800,
  height: 1000,
})

export const fixtureMedia = {
  hero1: media(101, 'Hero one'),
  hero2: media(102, 'Hero two'),
  hero3: media(103, 'Hero three'),
  service: media(104, 'Service icon'),
  post: media(105, 'Post cover'),
  team: media(106, 'Team photo'),
  avatar: media(107, 'Avatar'),
  cta1: media(108, 'Cta one'),
  cta2: media(109, 'Cta two'),
  cta3: media(110, 'Cta three'),
  cta4: media(111, 'Cta four'),
}

export const fixtureServices: Service[] = [
  {
    id: 1,
    title: 'Examinations',
    slug: 'examinations',
    shortDescription: 'Thorough physical exams from nose to tail.',
    image: fixtureMedia.service,
    featured: true,
    sortOrder: 4,
    updatedAt: '2026-01-01T00:00:00.000Z',
    createdAt: '2026-01-01T00:00:00.000Z',
    _status: 'published',
  },
  {
    id: 2,
    title: 'Surgery',
    slug: 'surgery',
    shortDescription: 'Routine and complex soft tissue procedures.',
    featured: true,
    sortOrder: 8,
    updatedAt: '2026-01-01T00:00:00.000Z',
    createdAt: '2026-01-01T00:00:00.000Z',
    _status: 'published',
  },
  {
    id: 3,
    title: 'Anesthesia',
    slug: 'anesthesia',
    shortDescription: 'Safe anesthesia with constant monitoring.',
    featured: true,
    sortOrder: 1,
    updatedAt: '2026-01-01T00:00:00.000Z',
    createdAt: '2026-01-01T00:00:00.000Z',
    _status: 'published',
  },
]

export const fixturePosts: Post[] = [
  {
    id: 11,
    title: 'Spring wellness tips',
    slug: 'spring-wellness-tips',
    excerpt: 'Simple seasonal tips for pet health.',
    featuredImage: fixtureMedia.post,
    content: {
      root: {
        type: 'root',
        children: [],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    },
    updatedAt: '2026-01-01T00:00:00.000Z',
    createdAt: '2026-01-01T00:00:00.000Z',
    _status: 'published',
  },
  {
    id: 12,
    title: 'Dental care basics',
    slug: 'dental-care-basics',
    excerpt: 'Why dental visits matter.',
    content: {
      root: {
        type: 'root',
        children: [],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    },
    updatedAt: '2026-01-01T00:00:00.000Z',
    createdAt: '2026-01-01T00:00:00.000Z',
    _status: 'published',
  },
]

export const fixtureTeam: TeamMember[] = [
  {
    id: 21,
    name: 'Dr. Sara Organist',
    slug: 'dr-sara-organist',
    role: 'Founder / Veterinarian',
    photo: fixtureMedia.team,
    sortOrder: 1,
    updatedAt: '2026-01-01T00:00:00.000Z',
    createdAt: '2026-01-01T00:00:00.000Z',
    _status: 'published',
  },
  {
    id: 22,
    name: 'Dr. Eric Matkowski',
    slug: 'dr-eric-matkowski',
    role: 'Veterinarian',
    sortOrder: 2,
    updatedAt: '2026-01-01T00:00:00.000Z',
    createdAt: '2026-01-01T00:00:00.000Z',
    _status: 'published',
  },
]

export const fixtureTestimonials: Testimonial[] = [
  {
    id: 31,
    quote: 'Best vet experience I’ve had with my cat Violet!',
    authorName: 'Sophia Julia',
    reviewUrl: 'https://maps.app.goo.gl/JAWYSNtJGWbEHbie6',
    sortOrder: 1,
    updatedAt: '2026-01-01T00:00:00.000Z',
    createdAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 32,
    quote: 'Super friendly and compassionate doctors, nurses, and staff.',
    authorName: 'Mark Nardone',
    reviewUrl: 'https://maps.app.goo.gl/2hsDRHJySwaw1MvF7',
    sortOrder: 2,
    updatedAt: '2026-01-01T00:00:00.000Z',
    createdAt: '2026-01-01T00:00:00.000Z',
  },
]

export const homePageFixture: HomePage = {
  id: 1,
  hero: {
    eyebrow: 'Independent veterinary care in Philadelphia',
    headline: 'Thoughtful veterinary care.\nFor pets. For people.',
    description:
      'Modern, compassionate veterinary medicine in a welcoming neighborhood practice.',
    primaryCta: { label: 'Contact us', url: '/contact' },
    secondaryCta: { label: 'See all services', url: '/services' },
    images: [
      { id: 'h1', image: fixtureMedia.hero1 },
      { id: 'h2', image: fixtureMedia.hero2 },
      { id: 'h3', image: fixtureMedia.hero3 },
    ],
    marqueeTags: [
      { id: 't1', label: 'Dental care' },
      { id: 't2', label: 'Wellness care' },
      { id: 't3', label: 'Vaccinations' },
    ],
  },
  services: {
    eyebrow: 'Services we provide',
    title: 'Veterinary services tailored for your pet’s needs',
    featuredServices: fixtureServices,
  },
  process: {
    eyebrow: 'How it works',
    title: 'Discover our simple three-step process for exceptional pet care',
    promo: {
      title: 'Book Your Pet’s Check-Up Today!',
      description: '24/7 Emergency Services – We’re Here When You Need Us Most.',
      cta: { label: 'Book a service', url: '/contact' },
    },
    steps: [
      {
        id: 's1',
        title: 'Schedule your visit',
        description: 'Book an appointment to discuss your pet’s health.',
      },
      {
        id: 's2',
        title: 'Visit your veterinarian',
        description: 'Receive tailored care for your pet.',
      },
      {
        id: 's3',
        title: 'Ongoing support',
        description: 'Comprehensive follow-up care.',
      },
    ],
  },
  featuredPosts: {
    eyebrow: 'From the blog',
    title: 'Guides and tips from our posts',
    viewAll: { label: 'View all', url: '/blog' },
    posts: fixturePosts,
  },
  about: {
    eyebrow: 'About IndyVet',
    title: 'Your pet’s health, our passion',
    body: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Personalized attention for every pet.',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    },
    cta: { label: 'About us', url: '/about' },
    tags: [
      { id: 'a1', label: 'Wellness care' },
      { id: 'a2', label: 'Pet grooming' },
    ],
  },
  team: {
    eyebrow: 'Our team',
    title: 'Our amazing team',
    cta: { label: 'Join our team', url: '/contact' },
    members: fixtureTeam,
  },
  testimonials: {
    eyebrow: 'Testimonials',
    title: 'What our happy pet parents say',
    items: fixtureTestimonials,
  },
  bottomCta: {
    headline: 'Because your pets deserve the best, always',
    cta: { label: 'Contact us', url: '/contact' },
    images: [
      { id: 'c1', image: fixtureMedia.cta1 },
      { id: 'c2', image: fixtureMedia.cta2 },
      { id: 'c3', image: fixtureMedia.cta3 },
      { id: 'c4', image: fixtureMedia.cta4 },
    ],
  },
  seo: {
    title: 'Indy Veterinary Care | Home',
    description: 'Compassionate veterinary care.',
  },
}
