import { describe, expect, it } from 'vitest'

import { EmergencyReferrals } from './collections/EmergencyReferrals'
import { FAQs } from './collections/FAQs'
import { Media } from './collections/Media'
import { Posts } from './collections/Posts'
import { Services } from './collections/Services'
import { TeamMembers } from './collections/TeamMembers'
import { Testimonials } from './collections/Testimonials'
import { Users } from './collections/Users'
import { linkField } from './fields/link'
import { seoField } from './fields/seo'
import { AboutPage } from './globals/AboutPage'
import { ContactPage } from './globals/ContactPage'
import { EmergencyPage } from './globals/EmergencyPage'
import { Footer } from './globals/Footer'
import { Header } from './globals/Header'
import { HomePage } from './globals/HomePage'
import { SiteSettings } from './globals/SiteSettings'

describe('shared field helpers', () => {
  it('linkField exposes label and url', () => {
    const field = linkField({ name: 'cta', label: 'CTA' })

    expect(field.type).toBe('group')
    expect(field.name).toBe('cta')
    expect(field.fields.map((entry) => entry.name)).toEqual(['label', 'url'])
  })

  it('seoField targets media for OG image', () => {
    const field = seoField()
    const ogImage = field.fields.find((entry) => entry.name === 'ogImage')

    expect(ogImage).toMatchObject({
      type: 'upload',
      relationTo: 'media',
    })
  })
})

describe('payload content model definitions', () => {
  it('registers Phase 2 collections and globals without commerce entities', () => {
    const collectionSlugs = [
      Users.slug,
      Media.slug,
      Services.slug,
      TeamMembers.slug,
      Testimonials.slug,
      Posts.slug,
      FAQs.slug,
      EmergencyReferrals.slug,
    ]
    const globalSlugs = [
      SiteSettings.slug,
      Header.slug,
      Footer.slug,
      HomePage.slug,
      AboutPage.slug,
      ContactPage.slug,
      EmergencyPage.slug,
    ]

    expect(collectionSlugs).toEqual([
      'users',
      'media',
      'services',
      'team-members',
      'testimonials',
      'posts',
      'faqs',
      'emergency-referrals',
    ])
    expect(collectionSlugs).not.toContain('products')
    expect(globalSlugs).toEqual([
      'site-settings',
      'header',
      'footer',
      'home-page',
      'about-page',
      'contact-page',
      'emergency-page',
    ])
  })

  it('models Featured Posts on home-page instead of Products', () => {
    const fieldNames = HomePage.fields.map((field) => ('name' in field ? field.name : undefined))

    expect(fieldNames).toContain('featuredPosts')
    expect(fieldNames).not.toContain('products')

    const featuredPosts = HomePage.fields.find(
      (field) => 'name' in field && field.name === 'featuredPosts',
    )
    expect(featuredPosts).toMatchObject({ type: 'group' })
  })

  it('keeps booking and pharmacy outbound links on site settings', () => {
    const fieldNames = SiteSettings.fields.map((field) =>
      'name' in field ? field.name : undefined,
    )

    expect(fieldNames).toEqual(expect.arrayContaining(['booking', 'pharmacy']))
  })
})
