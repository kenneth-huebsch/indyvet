/**
 * Upload the homepage bottom-CTA dog photo and wire it on home-page.
 *
 * Run:
 *   npx cross-env NODE_OPTIONS=--no-deprecation tsx -r dotenv/config scripts/seed-home-bottom-cta-image.ts
 */
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { getPayload } from 'payload'
import config from '@payload-config'

const FILENAME = 'home-bottom-cta-dog.jpg'
const ALT = 'Happy dog lying on a beach at sunset'

async function main() {
  const payload = await getPayload({ config })
  const assetPath = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    'assets',
    FILENAME,
  )

  const existing = await payload.find({
    collection: 'media',
    where: { filename: { equals: FILENAME } },
    limit: 1,
    depth: 0,
  })

  let mediaId = existing.docs[0]?.id

  if (!mediaId) {
    const media = await payload.create({
      collection: 'media',
      data: { alt: ALT },
      filePath: assetPath,
    })
    mediaId = media.id
    console.log('Uploaded', FILENAME, 'as media', mediaId)
  } else {
    console.log('Reusing existing media', mediaId, FILENAME)
  }

  const home = await payload.findGlobal({ slug: 'home-page', depth: 0 })

  await payload.updateGlobal({
    slug: 'home-page',
    data: {
      bottomCta: {
        headline: home.bottomCta?.headline ?? 'Because your pets deserve the best, always',
        cta: home.bottomCta?.cta ?? { label: 'Contact us', url: '/contact' },
        images: [{ image: mediaId }],
      },
    },
  })

  console.log('Wired home bottomCta image to', FILENAME)
  process.exit(0)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
