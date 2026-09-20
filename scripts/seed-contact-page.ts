/**
 * Seed Contact Page global + two emergency referrals; retarget Emergency nav to /contact#emergency.
 *
 * Run:
 *   npx cross-env NODE_OPTIONS=--no-deprecation tsx -r dotenv/config scripts/seed-contact-page.ts
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
          children: [
            {
              type: 'text' as const,
              text,
              format: 0,
              detail: 0,
              mode: 'normal' as const,
              style: '',
              version: 1,
            },
          ],
          direction: 'ltr' as const,
          format: '' as const,
          indent: 0,
          version: 1,
          textFormat: 0,
        },
      ],
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1,
    },
  }
}

const REFERRALS = [
  {
    name: 'VSEC – Veterinary Specialty & Emergency Care',
    phone: '267-800-1950',
    address: '1114 South Front Street\nPhiladelphia, PA 19147',
    sortOrder: 1,
  },
  {
    name: 'Matthew J. Ryan Veterinary Hospital of the University of Pennsylvania',
    phone: '215-746-8911',
    address: '3900 Spruce Street\nPhiladelphia, PA 19104',
    sortOrder: 2,
  },
] as const

async function main() {
  const payload = await getPayload({ config })
  const referralIds: number[] = []

  for (const def of REFERRALS) {
    const existing = await payload.find({
      collection: 'emergency-referrals',
      where: { name: { equals: def.name } },
      limit: 1,
      depth: 0,
    })

    if (existing.docs[0]) {
      const updated = await payload.update({
        collection: 'emergency-referrals',
        id: existing.docs[0].id,
        data: {
          phone: def.phone,
          address: def.address,
          sortOrder: def.sortOrder,
        },
      })
      referralIds.push(updated.id)
      console.log('updated referral', def.name)
    } else {
      const created = await payload.create({
        collection: 'emergency-referrals',
        data: {
          name: def.name,
          phone: def.phone,
          address: def.address,
          sortOrder: def.sortOrder,
        },
      })
      referralIds.push(created.id)
      console.log('created referral', def.name)
    }
  }

  await payload.updateGlobal({
    slug: 'contact-page',
    data: {
      hero: {
        eyebrow: 'Get in touch',
        title: 'Contact',
        description:
          'We’re in Northern Liberties. Reach out by phone, text, email, or the form—and find after-hours emergency options below.',
      },
      intro: richTextParagraph(
        'Call or text us with questions, or send a message and our team will follow up as soon as we can.',
      ),
      form: {
        nameLabel: 'Name',
        emailLabel: 'Email',
        phoneLabel: 'Phone',
        messageLabel: 'Message',
        submitLabel: 'Send message',
        successMessage: 'Thanks — we will be in touch soon.',
      },
      mapEmbedUrl:
        'https://maps.google.com/maps?q=917%20N%20Front%20Street%20Philadelphia%20PA%2019123&t=&z=15&ie=UTF8&iwloc=&output=embed',
      emergency: {
        eyebrow: 'After hours',
        title: 'Emergency Information',
        intro: richTextParagraph(
          'Contact us immediately if you have an emergency. If our office is closed, please contact one of the following emergency veterinary offices.',
        ),
        referrals: referralIds,
      },
      seo: {
        title: 'Contact Us | Indy Veterinary Care',
        description:
          'Contact Indy Veterinary Care in Northern Liberties—phone, text, email, clinic hours, and after-hours emergency referrals.',
      },
    },
  })
  console.log('contact-page updated')

  const header = await payload.findGlobal({ slug: 'header', depth: 0 })
  await payload.updateGlobal({
    slug: 'header',
    data: {
      navItems: (header.navItems ?? []).map((item) =>
        item.label?.trim().toLowerCase() === 'emergency'
          ? { ...item, url: '/contact#emergency' }
          : item,
      ),
    },
  })
  console.log('header Emergency → /contact#emergency')

  const footer = await payload.findGlobal({ slug: 'footer', depth: 0 })
  await payload.updateGlobal({
    slug: 'footer',
    data: {
      linkGroups: (footer.linkGroups ?? []).map((group) => ({
        ...group,
        links: (group.links ?? []).map((link) =>
          link.label?.trim().toLowerCase() === 'emergency'
            ? { ...link, url: '/contact#emergency' }
            : link,
        ),
      })),
    },
  })
  console.log('footer Emergency → /contact#emergency')

  process.exit(0)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
