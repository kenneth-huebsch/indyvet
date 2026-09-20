/**
 * Import all WordPress blog posts into Payload + seed blog-page global.
 *
 * Run:
 *   npx cross-env NODE_OPTIONS=--no-deprecation tsx -r dotenv/config scripts/seed-blog.ts
 */
import { mkdir, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'

import { convertHTMLToLexical, editorConfigFactory } from '@payloadcms/richtext-lexical'
import { JSDOM } from 'jsdom'
import { getPayload } from 'payload'
import config from '@payload-config'

const WP_API = 'https://indyvetcare.com/wp-json/wp/v2'
const PLACEHOLDER_SLUGS = new Set([
  'spring-wellness-tips',
  'dental-care-basics',
  'sample-post',
  'parasite-prevention',
])

type WpRendered = {
  rendered: string
}

type WpCategory = {
  id: number
  name: string
  slug: string
}

type WpMedia = {
  id: number
  source_url: string
  alt_text?: string
  media_details?: {
    file?: string
    sizes?: Record<string, { source_url: string }>
  }
}

type WpPost = {
  id: number
  slug: string
  date: string
  title: WpRendered
  excerpt: WpRendered
  content: WpRendered
  featured_media: number
  categories: number[]
  _embedded?: {
    'wp:featuredmedia'?: WpMedia[]
    'wp:term'?: Array<Array<{ id: number; name: string; taxonomy: string }>>
  }
}

function decodeEntities(value: string): string {
  return new JSDOM(`<!DOCTYPE html><body>${value}</body>`).window.document.body.textContent ?? value
}

function stripHtml(value: string): string {
  return decodeEntities(value.replace(/<[^>]+>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim()
}

function cleanExcerpt(html: string): string {
  return stripHtml(html)
    .replace(/\s*\[?\s*[.…]*\s*Read\s+More\.?\s*\]?\s*$/i, '')
    .replace(/\s*\[\s*…\s*\]\s*$/i, '')
    .trim()
}

async function fetchAllPosts(): Promise<WpPost[]> {
  const posts: WpPost[] = []
  let page = 1

  while (true) {
    const url = `${WP_API}/posts?per_page=100&page=${page}&_embed=1&status=publish`
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Failed to fetch posts page ${page}: ${response.status}`)
    }

    const batch = (await response.json()) as WpPost[]
    posts.push(...batch)

    const totalPages = Number(response.headers.get('X-WP-TotalPages') ?? '1')
    if (page >= totalPages || batch.length === 0) {
      break
    }
    page += 1
  }

  return posts
}

async function fetchCategories(): Promise<Map<number, string>> {
  const map = new Map<number, string>()
  let page = 1

  while (true) {
    const response = await fetch(`${WP_API}/categories?per_page=100&page=${page}`)
    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.status}`)
    }

    const batch = (await response.json()) as WpCategory[]
    for (const category of batch) {
      if (category.name && category.name.toLowerCase() !== 'uncategorized') {
        map.set(category.id, category.name)
      }
    }

    if (batch.length < 100) {
      break
    }
    page += 1
  }

  return map
}

function categoryLabelsForPost(post: WpPost, categories: Map<number, string>): string[] {
  const fromEmbed =
    post._embedded?.['wp:term']
      ?.flat()
      .filter((term) => term.taxonomy === 'category')
      .map((term) => term.name)
      .filter((name) => name.toLowerCase() !== 'uncategorized') ?? []

  if (fromEmbed.length > 0) {
    return [...new Set(fromEmbed)]
  }

  return post.categories
    .map((id) => categories.get(id))
    .filter((label): label is string => Boolean(label))
}

async function upsertMedia(args: {
  payload: Awaited<ReturnType<typeof getPayload>>
  imageUrl: string
  alt: string
  tmpDir: string
}): Promise<number | undefined> {
  const { payload, imageUrl, alt, tmpDir } = args

  let filename: string
  try {
    filename = path.basename(new URL(imageUrl).pathname)
  } catch {
    return undefined
  }

  if (!filename) {
    return undefined
  }

  // Strip query/size variants that break filename matching
  filename = filename.split('?')[0] ?? filename

  const existing = await payload.find({
    collection: 'media',
    where: { filename: { equals: filename } },
    limit: 1,
    depth: 0,
  })

  if (existing.docs[0]) {
    return existing.docs[0].id
  }

  const response = await fetch(imageUrl)
  if (!response.ok) {
    console.warn(`  skip media ${imageUrl}: ${response.status}`)
    return undefined
  }

  const buffer = Buffer.from(await response.arrayBuffer())
  const filePath = path.join(tmpDir, filename)
  await writeFile(filePath, buffer)

  const media = await payload.create({
    collection: 'media',
    data: {
      alt: alt || filename,
    },
    filePath,
  })

  return media.id
}

type LexicalNode = {
  type?: string
  children?: LexicalNode[]
  pending?: { src?: string; formID?: string }
  relationTo?: string
  value?: number | string
  fields?: Record<string, unknown>
  id?: string
  [key: string]: unknown
}

async function resolvePendingUploads(args: {
  payload: Awaited<ReturnType<typeof getPayload>>
  nodes: LexicalNode[] | undefined
  tmpDir: string
  postTitle: string
}): Promise<LexicalNode[]> {
  const { payload, nodes, tmpDir, postTitle } = args
  const resolved: LexicalNode[] = []

  for (const node of nodes ?? []) {
    if (node.type === 'upload') {
      const src = node.pending?.src?.trim()
      if (src) {
        const mediaId = await upsertMedia({
          payload,
          imageUrl: src,
          alt: postTitle,
          tmpDir,
        })

        if (mediaId) {
          resolved.push({
            type: 'upload',
            version: 3,
            format: node.format ?? '',
            id: node.id ?? crypto.randomBytes(12).toString('hex'),
            relationTo: 'media',
            value: mediaId,
            fields: node.fields ?? {},
          })
        }
        // Drop unresolved pending uploads rather than failing validation
        continue
      }

      if (node.relationTo && node.value != null) {
        resolved.push(node)
        continue
      }

      continue
    }

    if (Array.isArray(node.children)) {
      resolved.push({
        ...node,
        children: await resolvePendingUploads({
          payload,
          nodes: node.children,
          tmpDir,
          postTitle,
        }),
      })
      continue
    }

    resolved.push(node)
  }

  return resolved
}

function featuredImageUrl(post: WpPost): string | undefined {
  const media = post._embedded?.['wp:featuredmedia']?.[0]
  if (!media) {
    return undefined
  }

  return (
    media.media_details?.sizes?.large?.source_url ??
    media.media_details?.sizes?.medium_large?.source_url ??
    media.source_url
  )
}

async function main() {
  const payload = await getPayload({ config })
  const editorConfig = await editorConfigFactory.default({ config: payload.config })
  const workDir = path.join(os.tmpdir(), `indyvet-blog-import-${Date.now()}`)
  await mkdir(workDir, { recursive: true })

  console.log('Seeding blog-page global…')
  await payload.updateGlobal({
    slug: 'blog-page',
    data: {
      hero: {
        eyebrow: 'From the clinic',
        title: 'Blog',
        description:
          'Guides, seasonal tips, and pet care advice from the Indy Veterinary Care team in Northern Liberties.',
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
        description:
          'Pet care tips, seasonal safety guides, and clinic updates from Indy Veterinary Care.',
      },
    },
  })

  console.log('Fetching WordPress posts…')
  const [wpPosts, categories] = await Promise.all([fetchAllPosts(), fetchCategories()])
  console.log(`Found ${wpPosts.length} published posts.`)

  let created = 0
  let updated = 0

  for (const wpPost of wpPosts) {
    const title = decodeEntities(wpPost.title.rendered)
    const excerpt = cleanExcerpt(wpPost.excerpt.rendered)
    const categoryLabels = categoryLabelsForPost(wpPost, categories)
    const imageUrl = featuredImageUrl(wpPost)
    const imageAlt =
      wpPost._embedded?.['wp:featuredmedia']?.[0]?.alt_text?.trim() || title

    let featuredImageId: number | undefined
    if (imageUrl) {
      featuredImageId = await upsertMedia({
        payload,
        imageUrl,
        alt: imageAlt,
        tmpDir: workDir,
      })
    }

    let content
    try {
      const converted = convertHTMLToLexical({
        editorConfig,
        html: wpPost.content.rendered,
        JSDOM,
      }) as { root: LexicalNode & { children?: LexicalNode[] } }

      converted.root.children = await resolvePendingUploads({
        payload,
        nodes: converted.root.children,
        tmpDir: workDir,
        postTitle: title,
      })
      content = converted
    } catch (error) {
      console.warn(`  HTML→Lexical failed for ${wpPost.slug}, using plain paragraph:`, error)
      content = {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: stripHtml(wpPost.content.rendered),
                  format: 0,
                  detail: 0,
                  mode: 'normal',
                  style: '',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
              textFormat: 0,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      }
    }

    const data = {
      title,
      slug: wpPost.slug,
      generateSlug: false,
      excerpt: excerpt || undefined,
      featuredImage: featuredImageId,
      categories: categoryLabels.map((label) => ({ label })),
      publishedAt: wpPost.date,
      content,
      seo: {
        title,
        description: excerpt || undefined,
        ogImage: featuredImageId,
      },
      _status: 'published' as const,
    }

    const existing = await payload.find({
      collection: 'posts',
      where: { slug: { equals: wpPost.slug } },
      limit: 1,
      depth: 0,
      draft: true,
      overrideAccess: true,
    })

    try {
      if (existing.docs[0]) {
        await payload.update({
          collection: 'posts',
          id: existing.docs[0].id,
          data,
          draft: false,
          overrideAccess: true,
        })
        updated += 1
        console.log(`  updated ${wpPost.slug}`)
      } else {
        await payload.create({
          collection: 'posts',
          data,
          draft: false,
          overrideAccess: true,
        })
        created += 1
        console.log(`  created ${wpPost.slug}`)
      }
    } catch (error) {
      console.error(`  FAILED ${wpPost.slug}:`, error)
    }
  }

  console.log(`Posts: ${created} created, ${updated} updated.`)

  // Soft-clean placeholder seed posts and wire featured posts to newest three
  const placeholders = await payload.find({
    collection: 'posts',
    where: {
      slug: {
        in: [...PLACEHOLDER_SLUGS],
      },
    },
    limit: 10,
    depth: 0,
    draft: true,
    overrideAccess: true,
  })

  for (const doc of placeholders.docs) {
    await payload.update({
      collection: 'posts',
      id: doc.id,
      data: { _status: 'draft' },
      draft: false,
      overrideAccess: true,
    })
    console.log(`  drafted placeholder ${doc.slug}`)
  }

  const newest = await payload.find({
    collection: 'posts',
    where: {
      and: [
        { _status: { equals: 'published' } },
        { slug: { not_in: [...PLACEHOLDER_SLUGS] } },
        { publishedAt: { exists: true } },
      ],
    },
    sort: '-publishedAt',
    limit: 3,
    depth: 0,
    draft: false,
    overrideAccess: true,
  })

  if (newest.docs.length > 0) {
    await payload.updateGlobal({
      slug: 'home-page',
      data: {
        featuredPosts: {
          eyebrow: 'From the blog',
          title: 'Guides and tips from our posts',
          viewAll: { label: 'View all', url: '/blog' },
          posts: newest.docs.map((doc) => doc.id),
        },
      },
      overrideAccess: true,
    })
    console.log(
      `Wired home featuredPosts to: ${newest.docs.map((doc) => doc.slug).join(', ')}`,
    )
  } else {
    console.warn('No published posts available to wire into home featuredPosts.')
  }

  console.log('Done.')
  process.exit(0)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
