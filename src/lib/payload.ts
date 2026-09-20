import config from '@payload-config'
import { getPayload, type Payload } from 'payload'
import { cache } from 'react'

import type {
  AboutPage,
  BlogPage,
  ContactPage,
  Footer,
  Header,
  HomePage,
  Post,
  Service,
  ServicesPage,
  SiteSetting,
} from '@/payload-types'

export type SiteChrome = {
  header: Header
  footer: Footer
  siteSettings: SiteSetting
}

let payloadClient: Payload | null = null

export async function getPayloadClient(): Promise<Payload> {
  if (payloadClient) {
    return payloadClient
  }

  payloadClient = await getPayload({ config })
  return payloadClient
}

export const getSiteChrome = cache(async (): Promise<SiteChrome> => {
  const payload = await getPayloadClient()

  const [header, footer, siteSettings] = await Promise.all([
    payload.findGlobal({ slug: 'header', depth: 1 }),
    payload.findGlobal({ slug: 'footer', depth: 1 }),
    payload.findGlobal({ slug: 'site-settings', depth: 1 }),
  ])

  return { header, footer, siteSettings }
})

export const getHomePage = cache(async (): Promise<HomePage> => {
  const payload = await getPayloadClient()

  return payload.findGlobal({ slug: 'home-page', depth: 2 })
})

export const getServicesPage = cache(async (): Promise<ServicesPage> => {
  const payload = await getPayloadClient()

  return payload.findGlobal({ slug: 'services-page', depth: 1 })
})

export const getAboutPage = cache(async (): Promise<AboutPage> => {
  const payload = await getPayloadClient()

  return payload.findGlobal({ slug: 'about-page', depth: 2 })
})

export const getPublishedServices = cache(async (): Promise<Service[]> => {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'services',
    where: {
      _status: {
        equals: 'published',
      },
    },
    sort: 'sortOrder',
    limit: 100,
    depth: 1,
    draft: false,
  })

  return result.docs
})

export const BLOG_POSTS_PER_PAGE = 15

export type PaginatedPosts = {
  docs: Post[]
  page: number
  totalPages: number
  totalDocs: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export const getBlogPage = cache(async (): Promise<BlogPage> => {
  const payload = await getPayloadClient()

  return payload.findGlobal({ slug: 'blog-page', depth: 1 })
})

export const getPublishedPosts = cache(async (): Promise<Post[]> => {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'posts',
    where: {
      _status: {
        equals: 'published',
      },
    },
    sort: '-publishedAt',
    limit: 100,
    depth: 1,
    draft: false,
  })

  return result.docs
})

export const getPublishedPostsPage = cache(async (page = 1): Promise<PaginatedPosts> => {
  const payload = await getPayloadClient()
  const safePage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1

  const result = await payload.find({
    collection: 'posts',
    where: {
      _status: {
        equals: 'published',
      },
    },
    sort: '-publishedAt',
    limit: BLOG_POSTS_PER_PAGE,
    page: safePage,
    depth: 1,
    draft: false,
  })

  return {
    docs: result.docs,
    page: result.page ?? safePage,
    totalPages: result.totalPages || 1,
    totalDocs: result.totalDocs,
    hasNextPage: Boolean(result.hasNextPage),
    hasPrevPage: Boolean(result.hasPrevPage),
  }
})

export const getPostBySlug = cache(async (slug: string): Promise<Post | null> => {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'posts',
    where: {
      and: [
        {
          slug: {
            equals: slug,
          },
        },
        {
          _status: {
            equals: 'published',
          },
        },
      ],
    },
    limit: 1,
    depth: 1,
    draft: false,
  })

  return result.docs[0] ?? null
})

export const getContactPage = cache(async (): Promise<ContactPage> => {
  const payload = await getPayloadClient()

  return payload.findGlobal({ slug: 'contact-page', depth: 2 })
})
