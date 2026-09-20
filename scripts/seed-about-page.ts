/**
 * Seed About Page global + three team members with live-site copy and photos.
 *
 * Run:
 *   npx cross-env NODE_OPTIONS=--no-deprecation tsx -r dotenv/config scripts/seed-about-page.ts
 */
import { mkdir, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'

import { getPayload } from 'payload'
import config from '@payload-config'

type LexicalNode = Record<string, unknown>

function textNode(text: string): LexicalNode {
  return {
    type: 'text',
    text,
    format: 0,
    detail: 0,
    mode: 'normal',
    style: '',
    version: 1,
  }
}

function paragraph(...children: LexicalNode[]): LexicalNode {
  return {
    type: 'paragraph',
    children,
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
    textFormat: 0,
  }
}

function richText(...paragraphs: string[]) {
  return {
    root: {
      type: 'root' as const,
      children: paragraphs.map((text) => paragraph(textNode(text))),
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1,
    },
  }
}

async function upsertMedia(args: {
  payload: Awaited<ReturnType<typeof getPayload>>
  imageUrl: string
  alt: string
  tmpDir: string
}): Promise<number> {
  const { payload, imageUrl, alt, tmpDir } = args
  const filename = path.basename(new URL(imageUrl).pathname)
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
    throw new Error(`Failed to download ${imageUrl}: ${response.status}`)
  }

  const buffer = Buffer.from(await response.arrayBuffer())
  const filePath = path.join(tmpDir, filename)
  await writeFile(filePath, buffer)

  const media = await payload.create({
    collection: 'media',
    data: { alt },
    filePath,
  })

  console.log(`Uploaded media: ${filename}`)
  return media.id
}

async function upsertTeamMember(args: {
  payload: Awaited<ReturnType<typeof getPayload>>
  slug: string
  data: Record<string, unknown>
}) {
  const { payload, slug, data } = args
  const existing = await payload.find({
    collection: 'team-members',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
  })

  if (existing.docs[0]) {
    return payload.update({
      collection: 'team-members',
      id: existing.docs[0].id,
      data,
      draft: false,
    })
  }

  return payload.create({
    collection: 'team-members',
    data: { ...data, slug },
    draft: false,
  })
}

const memberDefs = [
  {
    slug: 'dr-sara-organist',
    name: 'Dr. Sara Organist',
    role: 'Founder / Veterinarian',
    sortOrder: 1,
    imageUrl: 'https://indyvetcare.com/wp-content/uploads/2020/10/Dr-Sara-Portrait.jpg',
    bio: richText(
      'Dr. Organist has practiced veterinarian medicine in the Philadelphia area for the past 14 years. She has a passion for providing high quality medical care that emphasizes each pet’s individual needs in a low stress setting. She also strongly believes in client education and will partner with you to make the best, most informed decisions for your pet’s health care and overall well-being. Dr. Organist has a background in emergency medicine and experience leading hospital teams, so she can offer extensive surgical and medical procedures not available in most general practices.',
      'She maintains a welcoming bedside manner and treats every pet with compassion, courtesy, and professionalism.',
      'Dr. Organist is a 2004 graduate from the University of Pennsylvania School of Veterinary Medicine. She obtained her undergraduate degree in Animal Bioscience from Penn State University in 2000. Dr. Organist shares her home in Fishtown with her husband and 4-legged family- Celia, Vegas, Benjamin, Diego, and Isabelle.',
    ),
  },
  {
    slug: 'dr-eric-matkowski',
    name: 'Dr. Eric Matkowski',
    role: 'Veterinarian',
    sortOrder: 2,
    imageUrl: 'https://indyvetcare.com/wp-content/uploads/2021/05/IMG_4203.jpg',
    bio: richText(
      'Dr. Eric Matkowski grew up and has lived in Philadelphia for almost his entire life. He obtained his Bachelor’s degree from Clemson University and a Master’s degree from Drexel University. He graduated from the University of Pennsylvania School of Veterinary Medicine in 2004, where he and Dr Organist were classmates!',
      'Dr. Matkowski has worked in general practice his whole career and returns to Philadelphia where he previously worked for nearly a decade. He has interests in all aspects of medicine and surgery in dogs and cats and especially values being able to educate and help pet parents care for their loved ones. He was also voted as “One of the Best” Vets in Bucks County in 2020.',
      'Dr. Matkowski lives in Philadelphia with his (very active!) family. He loves training for triathlon races, especially Ironman events. He has two cats (Kitty and Cat) and a dog (Stanley a big ole Pittie/American Bulldog mix). Kitty and Cat were adopted from shelters. Stanley was found emaciated in a ditch in Fairmount Park by Dr. Matkowski and a group of friends out for a run in the spring of 2016. After great care and love, Stanley made a wonderful recovery – he quickly fell in love with his new family and became a ridiculously odd pup with many quirks! After caring for several older chihuahuas (Two, Linny Lou, and Marcel) over recent years, he and his family recently also took in a big ole silly dog named Hank who has heartworm disease – Stanley is super-happy to have another big pup to play with now!',
    ),
  },
  {
    slug: 'dr-rachel-ellis',
    name: 'Dr. Rachel Ellis',
    role: 'Veterinarian',
    sortOrder: 3,
    imageUrl: 'https://indyvetcare.com/wp-content/uploads/2026/09/IMG_1190-scaled.jpeg',
    bio: richText(
      'Dr. Rachel Ellis grew up in Orlando, Florida, where she earned her undergraduate degree in Biology from Jacksonville University in 2015. She then moved across the pond to Glasgow, Scotland, where she graduated from the University of Glasgow in 2021. After graduating, she remained in rural Scotland, working in mixed animal practice and caring for animals great and small.',
      'Since moving to Philadelphia, Dr. Ellis has been working in small animal practice, continuing to foster her passion for feline medicine and surgery. She is particularly passionate about providing compassionate care to her feline patients and building lasting relationships with their families.',
    ),
  },
] as const

const keepSlugs = new Set(memberDefs.map((def) => def.slug))

async function main() {
  const payload = await getPayload({ config })
  const tmpDir = path.join(os.tmpdir(), 'indyvet-about-images')
  await mkdir(tmpDir, { recursive: true })

  const missionImageId = await upsertMedia({
    payload,
    imageUrl: 'https://indyvetcare.com/wp-content/uploads/2020/11/about-us-newfirst.jpg',
    alt: 'Indy Veterinary Care clinic',
    tmpDir,
  })

  const members = []
  for (const def of memberDefs) {
    const photoId = await upsertMedia({
      payload,
      imageUrl: def.imageUrl,
      alt: def.name,
      tmpDir,
    })

    members.push(
      await upsertTeamMember({
        payload,
        slug: def.slug,
        data: {
          name: def.name,
          role: def.role,
          sortOrder: def.sortOrder,
          photo: photoId,
          bio: def.bio,
          _status: 'published',
        },
      }),
    )
  }

  await payload.updateGlobal({
    slug: 'about-page',
    data: {
      hero: {
        eyebrow: 'About us',
        title: 'Indy Veterinary Care',
        subtitle:
          'High quality medical care in a compassionate, courteous and low stress environment—locally and family owned in Northern Liberties.',
      },
      mission: {
        eyebrow: 'Our mission',
        title: 'Care that feels personal',
        body: richText(
          'Our mission is to provide high quality medical care in a compassionate, courteous and low stress environment. We ensure the comfort and well-being of your pets throughout their life and partner with you to make educated health care decisions. Indy Veterinary Care was founded by Dr. Sara Organist as an alternative to large, impersonal or corporate veterinary practices. We are locally and family owned, and pride ourselves on providing individualized care to our patients and their families.',
        ),
        image: missionImageId,
      },
      namesake: {
        title: 'Our Namesake',
        body: richText(
          'Dr. Organist named the practice after her beloved first dog, Indy. Dr. Organist rescued Indy during her first year of veterinary school at the University of Pennsylvania and enjoyed 15 wonderful, fun, loving years with her. Our name also sets us apart as an independent, local, family business with roots in our community.',
        ),
      },
      team: {
        eyebrow: 'Our team',
        title: 'Meet the veterinarians caring for your pets',
        members: members.map((member) => member.id),
      },
      cta: {
        label: 'Book an appointment',
        url: '/contact',
      },
      promo: {
        title: 'Ready to meet our team?',
        description:
          'Schedule a visit with our Northern Liberties veterinarians—locally and family owned care for dogs, cats, and other pets.',
      },
      seo: {
        title: 'About Our Philadelphia Veterinary Clinic | Indy Vet Care',
        description:
          'Meet Indy Veterinary Care—locally and family owned in Northern Liberties—and the veterinarians who partner with you on your pet’s health.',
      },
    },
  })

  const allMembers = await payload.find({
    collection: 'team-members',
    limit: 100,
    depth: 0,
    draft: true,
  })

  for (const doc of allMembers.docs) {
    if (!keepSlugs.has(doc.slug)) {
      await payload.delete({ collection: 'team-members', id: doc.id })
      console.log('Deleted placeholder team member:', doc.slug)
    }
  }

  const home = await payload.findGlobal({ slug: 'home-page', depth: 0 })
  await payload.updateGlobal({
    slug: 'home-page',
    data: {
      team: {
        ...(typeof home.team === 'object' && home.team ? home.team : {}),
        eyebrow: home.team?.eyebrow ?? 'Our team',
        title: home.team?.title ?? 'Meet the people behind Indy Veterinary Care',
        members: members.map((member) => member.id),
        cta: home.team?.cta ?? { label: 'About us', url: '/about' },
      },
    },
  })

  console.log(`Seeded about-page and ${members.length} team members.`)
  process.exit(0)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
