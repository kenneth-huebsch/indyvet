/**
 * Upsert the two Google-review testimonials and wire them on home-page.
 *
 * Run:
 *   npx cross-env NODE_OPTIONS=--no-deprecation tsx -r dotenv/config scripts/seed-testimonials.ts
 */
import { getPayload } from 'payload'
import config from '@payload-config'

const TESTIMONIALS = [
  {
    authorName: 'Sophia Julia',
    quote: 'Best vet experience I’ve had with my cat Violet!',
    reviewUrl: 'https://maps.app.goo.gl/JAWYSNtJGWbEHbie6',
    sortOrder: 1,
  },
  {
    authorName: 'Mark Nardone',
    quote: 'Super friendly and compassionate doctors, nurses, and staff.',
    reviewUrl: 'https://maps.app.goo.gl/2hsDRHJySwaw1MvF7',
    sortOrder: 2,
  },
] as const

async function main() {
  const payload = await getPayload({ config })
  const ids: number[] = []

  for (const def of TESTIMONIALS) {
    const existing = await payload.find({
      collection: 'testimonials',
      where: { authorName: { equals: def.authorName } },
      limit: 1,
      depth: 0,
    })

    if (existing.docs[0]) {
      const updated = await payload.update({
        collection: 'testimonials',
        id: existing.docs[0].id,
        data: {
          quote: def.quote,
          reviewUrl: def.reviewUrl,
          sortOrder: def.sortOrder,
          location: null,
          avatar: null,
        },
      })
      ids.push(updated.id)
      console.log('updated', def.authorName)
    } else {
      const created = await payload.create({
        collection: 'testimonials',
        data: {
          quote: def.quote,
          authorName: def.authorName,
          reviewUrl: def.reviewUrl,
          sortOrder: def.sortOrder,
        },
      })
      ids.push(created.id)
      console.log('created', def.authorName)
    }
  }

  const others = await payload.find({
    collection: 'testimonials',
    where: {
      authorName: {
        not_in: TESTIMONIALS.map((item) => item.authorName),
      },
    },
    limit: 50,
    depth: 0,
  })

  for (const doc of others.docs) {
    await payload.delete({ collection: 'testimonials', id: doc.id })
    console.log('deleted', doc.authorName)
  }

  const home = await payload.findGlobal({ slug: 'home-page', depth: 0 })
  await payload.updateGlobal({
    slug: 'home-page',
    data: {
      testimonials: {
        eyebrow: home.testimonials?.eyebrow ?? 'Testimonials',
        title: home.testimonials?.title ?? 'What our happy pet parents say',
        items: ids,
      },
    },
  })

  console.log('Wired home testimonials to', TESTIMONIALS.map((item) => item.authorName).join(', '))
  process.exit(0)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
