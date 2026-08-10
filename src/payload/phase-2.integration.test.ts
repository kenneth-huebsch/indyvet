import { getPayload, type Payload } from 'payload'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import config from '@payload-config'

function richText(text: string) {
  return {
    root: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [{ type: 'text', text, version: 1 }],
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

const suffix = `p2-${Date.now()}`

describe('Phase 2 Payload Local API', () => {
  let payload: Payload
  const created: Array<{ collection: string; id: number | string }> = []

  beforeAll(async () => {
    if (!process.env.DATABASE_URI || !process.env.PAYLOAD_SECRET) {
      throw new Error('DATABASE_URI and PAYLOAD_SECRET are required for Phase 2 integration tests')
    }

    payload = await getPayload({ config })
  })

  afterAll(async () => {
    for (const entry of [...created].reverse()) {
      try {
        await payload.delete({
          collection: entry.collection as 'services',
          id: entry.id,
          overrideAccess: true,
        })
      } catch {
        // Document may already be deleted by a focused assertion.
      }
    }
  })

  function track(collection: string, id: number | string) {
    created.push({ collection, id })
    return id
  }

  it('creates and reads one document per content collection', async () => {
    const service = await payload.create({
      collection: 'services',
      draft: false,
      data: {
        title: `Service ${suffix}`,
        slug: `service-${suffix}`,
        shortDescription: 'Short description',
        featured: true,
        sortOrder: 1,
        _status: 'published',
      },
    })
    track('services', service.id)

    const member = await payload.create({
      collection: 'team-members',
      draft: false,
      data: {
        name: `Member ${suffix}`,
        slug: `member-${suffix}`,
        role: 'Veterinarian',
        sortOrder: 1,
        _status: 'published',
      },
    })
    track('team-members', member.id)

    const testimonial = await payload.create({
      collection: 'testimonials',
      data: {
        quote: 'Excellent care.',
        authorName: `Author ${suffix}`,
        location: 'Philadelphia, PA',
        sortOrder: 1,
      },
    })
    track('testimonials', testimonial.id)

    const post = await payload.create({
      collection: 'posts',
      draft: false,
      data: {
        title: `Post ${suffix}`,
        slug: `post-${suffix}`,
        excerpt: 'Excerpt',
        content: richText('Body'),
        publishedAt: new Date().toISOString(),
        _status: 'published',
      },
    })
    track('posts', post.id)

    const faq = await payload.create({
      collection: 'faqs',
      data: {
        question: `Question ${suffix}?`,
        answer: richText('Answer'),
        sortOrder: 1,
      },
    })
    track('faqs', faq.id)

    const referral = await payload.create({
      collection: 'emergency-referrals',
      data: {
        name: `Referral ${suffix}`,
        phone: '(555) 010-0000',
        address: '123 Test St',
        sortOrder: 1,
      },
    })
    track('emergency-referrals', referral.id)

    const foundService = await payload.findByID({ collection: 'services', id: service.id })
    const foundPost = await payload.findByID({ collection: 'posts', id: post.id })

    expect(foundService.title).toBe(`Service ${suffix}`)
    expect(foundPost.slug).toBe(`post-${suffix}`)
  })

  it('hides draft services from anonymous readers and shows published ones', async () => {
    const draft = await payload.create({
      collection: 'services',
      draft: true,
      data: {
        title: `Draft Service ${suffix}`,
        slug: `draft-service-${suffix}`,
        shortDescription: 'Draft only',
        sortOrder: 99,
      },
    })
    track('services', draft.id)

    const anonymousDraft = await payload.find({
      collection: 'services',
      overrideAccess: false,
      where: { id: { equals: draft.id } },
    })
    expect(anonymousDraft.docs).toHaveLength(0)

    await payload.update({
      collection: 'services',
      id: draft.id,
      draft: false,
      data: {
        _status: 'published',
      },
    })

    const anonymousPublished = await payload.find({
      collection: 'services',
      overrideAccess: false,
      where: { id: { equals: draft.id } },
    })
    expect(anonymousPublished.docs).toHaveLength(1)
  })

  it('denies unauthenticated creates', async () => {
    await expect(
      payload.create({
        collection: 'testimonials',
        overrideAccess: false,
        data: {
          quote: 'Should fail',
          authorName: 'Anonymous',
        },
      }),
    ).rejects.toBeTruthy()
  })

  it('updates page and settings globals including Featured Posts and booking links', async () => {
    const post = await payload.create({
      collection: 'posts',
      draft: false,
      data: {
        title: `Featured ${suffix}`,
        slug: `featured-${suffix}`,
        excerpt: 'Featured excerpt',
        content: richText('Featured body'),
        publishedAt: new Date().toISOString(),
        _status: 'published',
      },
    })
    track('posts', post.id)

    const faq = await payload.create({
      collection: 'faqs',
      data: {
        question: `Contact FAQ ${suffix}?`,
        answer: richText('FAQ answer'),
        sortOrder: 2,
      },
    })
    track('faqs', faq.id)

    const referral = await payload.create({
      collection: 'emergency-referrals',
      data: {
        name: `Emergency ${suffix}`,
        phone: '(555) 010-0001',
        sortOrder: 2,
      },
    })
    track('emergency-referrals', referral.id)

    await payload.updateGlobal({
      slug: 'site-settings',
      data: {
        brand: {
          siteName: 'Indy Veterinary Care',
          tagline: 'Test tagline',
        },
        booking: {
          label: 'Book Now',
          url: 'https://example.com/book',
          embedScriptUrl: 'https://example.com/embed.js',
        },
        pharmacy: {
          label: 'Order Online',
          url: 'https://indyvetcare.vetsfirstchoice.com/',
        },
      },
    })

    await payload.updateGlobal({
      slug: 'home-page',
      data: {
        hero: {
          headline: `Headline ${suffix}`,
        },
        featuredPosts: {
          eyebrow: 'From the blog',
          title: 'Featured posts',
          posts: [post.id],
        },
      },
    })

    await payload.updateGlobal({
      slug: 'about-page',
      data: {
        hero: { title: `About ${suffix}` },
      },
    })

    await payload.updateGlobal({
      slug: 'contact-page',
      data: {
        hero: { title: `Contact ${suffix}` },
        faqs: [faq.id],
      },
    })

    await payload.updateGlobal({
      slug: 'emergency-page',
      data: {
        hero: { title: `Emergency ${suffix}` },
        referrals: [referral.id],
      },
    })

    await payload.updateGlobal({
      slug: 'header',
      data: {
        navItems: [{ label: 'Home', url: '/' }],
        cta: { label: 'Book Now', url: 'https://example.com/book' },
      },
    })

    await payload.updateGlobal({
      slug: 'footer',
      data: {
        copyright: '© Test',
        linkGroups: [
          {
            title: 'Explore',
            links: [{ label: 'About', url: '/about' }],
          },
        ],
      },
    })

    const home = await payload.findGlobal({ slug: 'home-page' })
    const settings = await payload.findGlobal({ slug: 'site-settings' })
    const contact = await payload.findGlobal({ slug: 'contact-page' })
    const emergency = await payload.findGlobal({ slug: 'emergency-page' })

    expect(home.featuredPosts?.posts).toHaveLength(1)
    expect(home).not.toHaveProperty('products')
    expect(settings.booking?.url).toBe('https://example.com/book')
    expect(settings.pharmacy?.url).toBe('https://indyvetcare.vetsfirstchoice.com/')
    expect(contact.faqs).toHaveLength(1)
    expect(emergency.referrals).toHaveLength(1)
  })
})
