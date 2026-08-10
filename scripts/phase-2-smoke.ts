/**
 * One-off Phase 2 schema smoke test via Local API.
 * Run: npx cross-env NODE_OPTIONS=--no-deprecation tsx scripts/phase-2-smoke.ts
 */
import { getPayload } from 'payload'
import config from '@payload-config'

async function main() {
  const payload = await getPayload({ config })

  const service = await payload.create({
    collection: 'services',
    draft: false,
    data: {
      title: 'Smoke Test Service',
      slug: 'smoke-test-service',
      shortDescription: 'Short blurb for smoke test.',
      featured: true,
      sortOrder: 1,
      _status: 'published',
    },
  })

  const member = await payload.create({
    collection: 'team-members',
    draft: false,
    data: {
      name: 'Dr. Smoke Test',
      slug: 'dr-smoke-test',
      role: 'Veterinarian',
      sortOrder: 1,
      _status: 'published',
    },
  })

  const testimonial = await payload.create({
    collection: 'testimonials',
    data: {
      quote: 'Great care for our pets.',
      authorName: 'Smoke Tester',
      location: 'Philadelphia, PA',
      sortOrder: 1,
    },
  })

  const post = await payload.create({
    collection: 'posts',
    draft: false,
    data: {
      title: 'Smoke Test Post',
      slug: 'smoke-test-post',
      excerpt: 'Excerpt',
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [{ type: 'text', text: 'Hello from smoke test.', version: 1 }],
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
      publishedAt: new Date().toISOString(),
      _status: 'published',
    },
  })

  const faq = await payload.create({
    collection: 'faqs',
    data: {
      question: 'Do you offer smoke tests?',
      answer: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [{ type: 'text', text: 'Only in development.', version: 1 }],
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
      sortOrder: 1,
    },
  })

  const referral = await payload.create({
    collection: 'emergency-referrals',
    data: {
      name: 'Smoke ER',
      phone: '(555) 555-0100',
      address: '123 Test St',
      sortOrder: 1,
    },
  })

  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      brand: {
        siteName: 'Indy Veterinary Care',
        tagline: 'Friendly veterinary care',
      },
      booking: {
        label: 'Book Now',
        url: 'https://example.com/book',
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
        headline: 'Smoke test headline',
        description: 'Hero description',
      },
      featuredPosts: {
        eyebrow: 'From the blog',
        title: 'Featured posts',
        posts: [post.id],
      },
      services: {
        featuredServices: [service.id],
      },
      team: {
        members: [member.id],
      },
      testimonials: {
        items: [testimonial.id],
      },
    },
  })

  await payload.updateGlobal({
    slug: 'about-page',
    data: {
      hero: { title: 'About smoke test' },
      team: { members: [member.id] },
      testimonials: { items: [testimonial.id] },
    },
  })

  await payload.updateGlobal({
    slug: 'contact-page',
    data: {
      hero: { title: 'Contact smoke test' },
      faqs: [faq.id],
    },
  })

  await payload.updateGlobal({
    slug: 'emergency-page',
    data: {
      hero: { title: 'Emergency smoke test' },
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
      copyright: '© 2026 Indy Veterinary Care, Inc.',
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

  if (!home.featuredPosts?.posts?.length) {
    throw new Error('Home featuredPosts relationship missing')
  }
  if (!settings.booking?.url || !settings.pharmacy?.url) {
    throw new Error('Site settings booking/pharmacy missing')
  }
  if ('products' in home) {
    throw new Error('Unexpected products field on home-page')
  }

  await payload.delete({ collection: 'services', id: service.id })
  await payload.delete({ collection: 'team-members', id: member.id })
  await payload.delete({ collection: 'testimonials', id: testimonial.id })
  await payload.delete({ collection: 'posts', id: post.id })
  await payload.delete({ collection: 'faqs', id: faq.id })
  await payload.delete({ collection: 'emergency-referrals', id: referral.id })

  console.log('Phase 2 smoke test passed')
  process.exit(0)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
