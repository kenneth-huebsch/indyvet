/**
 * Seed representative Home Page content for Phase 4 visual QA.
 *
 * Run:
 *   npx cross-env NODE_OPTIONS=--no-deprecation tsx -r dotenv/config scripts/seed-home-page.ts
 *
 * Media uploads are optional — if Media documents already exist, the first few are reused.
 * Otherwise sections render with letter/placeholder fallbacks until you upload images in /admin.
 */
import { getPayload } from 'payload'
import config from '@payload-config'

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

async function upsertBySlug<T extends { id: number }>(args: {
  payload: Awaited<ReturnType<typeof getPayload>>
  collection: 'services' | 'team-members' | 'posts'
  slug: string
  data: Record<string, unknown>
}): Promise<T> {
  const { payload, collection, slug, data } = args
  const existing = await payload.find({
    collection,
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
  })

  if (existing.docs[0]) {
    return (await payload.update({
      collection,
      id: existing.docs[0].id,
      data,
      draft: false,
    })) as T
  }

  return (await payload.create({
    collection,
    data: { ...data, slug },
    draft: false,
  })) as T
}

async function main() {
  const payload = await getPayload({ config })

  const media = await payload.find({
    collection: 'media',
    limit: 8,
    depth: 0,
    sort: 'createdAt',
  })
  const mediaIds = media.docs.map((doc) => doc.id)

  const serviceDefs = [
    {
      slug: 'preventative-care',
      title: 'Preventative care',
      shortDescription:
        'Our preventative care services ensure your pet stays healthy and happy. Regular check-ups and vaccinations are key to preventing illness.',
      featured: true,
      sortOrder: 1,
    },
    {
      slug: 'essential-vaccinations',
      title: 'Essential vaccinations',
      shortDescription:
        'Vaccinations are crucial for your pet’s health and well-being. Our expert veterinarians provide comprehensive vaccination services.',
      featured: true,
      sortOrder: 2,
    },
    {
      slug: 'surgical-care',
      title: 'Surgical care',
      shortDescription:
        'Our surgical services are designed to ensure your pet receives the highest level of care, from routine procedures to complex surgeries.',
      featured: true,
      sortOrder: 3,
    },
  ] as const

  const services = []
  for (const def of serviceDefs) {
    services.push(
      await upsertBySlug({
        payload,
        collection: 'services',
        slug: def.slug,
        data: {
          title: def.title,
          shortDescription: def.shortDescription,
          featured: def.featured,
          sortOrder: def.sortOrder,
          image: mediaIds[0] ?? undefined,
          _status: 'published',
        },
      }),
    )
  }

  const memberDefs = [
    { slug: 'dr-smith', name: 'Dr. Smith', role: 'Veterinarian', sortOrder: 1 },
    { slug: 'dr-jones', name: 'Dr. Jones', role: 'Surgeon', sortOrder: 2 },
    { slug: 'alex-lee', name: 'Alex Lee', role: 'Technician', sortOrder: 3 },
    { slug: 'sam-patel', name: 'Sam Patel', role: 'Care Coordinator', sortOrder: 4 },
  ] as const

  const members = []
  for (const [index, def] of memberDefs.entries()) {
    members.push(
      await upsertBySlug({
        payload,
        collection: 'team-members',
        slug: def.slug,
        data: {
          name: def.name,
          role: def.role,
          sortOrder: def.sortOrder,
          photo: mediaIds[index % Math.max(mediaIds.length, 1)] ?? undefined,
          _status: 'published',
        },
      }),
    )
  }

  const existingTestimonials = await payload.find({
    collection: 'testimonials',
    where: { authorName: { equals: 'Mac Jonas' } },
    limit: 3,
    depth: 0,
  })

  const testimonials = [...existingTestimonials.docs]
  while (testimonials.length < 3) {
    testimonials.push(
      await payload.create({
        collection: 'testimonials',
        data: {
          quote:
            'Dr. Smith and the team are incredible! They treated Bella like family and made her surgery process so smooth. We couldn’t have asked for better care!',
          authorName: 'Mac Jonas',
          location: 'New York, NY',
          avatar: mediaIds[0] ?? undefined,
          sortOrder: testimonials.length + 1,
        },
      }),
    )
  }

  const postDefs = [
    {
      slug: 'spring-wellness-tips',
      title: 'Spring wellness tips',
      excerpt: 'Simple ways to keep your pet healthy as the seasons change.',
    },
    {
      slug: 'dental-care-basics',
      title: 'Dental care basics',
      excerpt: 'Why regular dental check-ups matter for every pet.',
    },
    {
      slug: 'parasite-prevention',
      title: 'Parasite prevention',
      excerpt: 'Year-round protection keeps your companion comfortable and safe.',
    },
  ] as const

  const posts = []
  for (const [index, def] of postDefs.entries()) {
    posts.push(
      await upsertBySlug({
        payload,
        collection: 'posts',
        slug: def.slug,
        data: {
          title: def.title,
          excerpt: def.excerpt,
          featuredImage: mediaIds[index % Math.max(mediaIds.length, 1)] ?? undefined,
          content: richTextParagraph(def.excerpt),
          publishedAt: new Date().toISOString(),
          _status: 'published',
        },
      }),
    )
  }

  const heroImages = mediaIds.slice(0, 3).map((id) => ({ image: id }))
  const ctaImages = mediaIds.slice(0, 4).map((id) => ({ image: id }))

  await payload.updateGlobal({
    slug: 'home-page',
    data: {
      hero: {
        eyebrow: 'Indy Veterinary Care',
        headline: 'Your reliable partner for pet wellness',
        description:
          'At our clinic, we prioritize the health and happiness of your beloved pets. Our expert veterinarians are dedicated to providing compassionate care.',
        primaryCta: { label: 'Contact us', url: '/contact' },
        secondaryCta: { label: 'See all services', url: '/services' },
        images: heroImages.length ? heroImages : undefined,
        marqueeTags: [
          { label: 'Dental care' },
          { label: 'In house laboratory' },
          { label: 'Wellness care' },
          { label: 'Parasite prevention' },
          { label: 'Pet grooming' },
          { label: 'Vaccinations' },
        ],
      },
      services: {
        eyebrow: 'Services we provide',
        title: 'Veterinary services tailored for your pet’s needs',
        featuredServices: services.map((doc) => doc.id),
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
            title: 'Schedule your visit',
            description: 'Book an appointment to discuss your pet’s health and wellness.',
          },
          {
            title: 'Visit your veterinarian',
            description: 'Receive tailored care designed around your pet’s needs.',
          },
          {
            title: 'Ongoing support',
            description: 'We prioritize your pet’s health through comprehensive follow-up care.',
          },
        ],
      },
      featuredPosts: {
        eyebrow: 'From the blog',
        title: 'Guides and tips from our posts',
        viewAll: { label: 'View all', url: '/blog' },
        posts: posts.map((doc) => doc.id),
      },
      about: {
        eyebrow: 'About IndyVet',
        title: 'Your pet’s health, our passion',
        body: richTextParagraph(
          'With years of experience, state-of-the-art facilities, and a commitment to compassionate service, we ensure your pets receive the personalized attention they deserve.',
        ),
        cta: { label: 'About us', url: '/about' },
        tags: [
          { label: 'In house laboratory' },
          { label: 'Wellness care' },
          { label: 'Parasite prevention' },
          { label: 'Pet grooming' },
          { label: 'Vaccinations' },
        ],
      },
      team: {
        eyebrow: 'Our team',
        title: 'Our amazing team',
        cta: { label: 'Join our team', url: '/contact' },
        members: members.map((doc) => doc.id),
      },
      testimonials: {
        eyebrow: 'Testimonials',
        title: 'What our happy pet parents say',
        items: testimonials.map((doc) => doc.id),
      },
      bottomCta: {
        headline: 'Because your pets deserve the best, always',
        cta: { label: 'Contact us', url: '/contact' },
        images: ctaImages.length ? ctaImages : undefined,
      },
      seo: {
        title: 'Indy Veterinary Care | Pet Wellness',
        description:
          'Compassionate veterinary care for pets in Indianapolis. Book a visit with Indy Veterinary Care.',
      },
    },
  })

  console.log('Home page seed complete.')
  console.log(`Services: ${services.length}, Team: ${members.length}, Posts: ${posts.length}`)
  console.log(`Media reused: ${mediaIds.length} (upload more in /admin for richer collage images)`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
