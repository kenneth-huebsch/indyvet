/**
 * Seed Services Page global + all nine IndyVet services with live-site copy and feature images.
 *
 * Run:
 *   npx cross-env NODE_OPTIONS=--no-deprecation tsx -r dotenv/config scripts/seed-services-page.ts
 */
import { mkdir, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'

import { getPayload } from 'payload'
import config from '@payload-config'

type LexicalNode = Record<string, unknown>

function textNode(text: string, format = 0): LexicalNode {
  return {
    type: 'text',
    text,
    format,
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

function heading(tag: 'h2' | 'h3', text: string): LexicalNode {
  return {
    type: 'heading',
    tag,
    children: [textNode(text)],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  }
}

function listItem(text: string): LexicalNode {
  return {
    type: 'listitem',
    children: [textNode(text)],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
    value: 1,
  }
}

function bulletList(items: string[]): LexicalNode {
  return {
    type: 'list',
    listType: 'bullet',
    start: 1,
    tag: 'ul',
    children: items.map(listItem),
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  }
}

function richText(...children: LexicalNode[]) {
  return {
    root: {
      type: 'root' as const,
      children,
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1,
    },
  }
}

function p(text: string) {
  return paragraph(textNode(text))
}

const LIVE_UPLOADS = 'https://indyvetcare.com/wp-content/uploads/2020/10'

async function upsertServiceImage(args: {
  payload: Awaited<ReturnType<typeof getPayload>>
  slug: string
  title: string
  imageUrl: string
  tmpDir: string
}): Promise<number> {
  const { payload, slug, title, imageUrl, tmpDir } = args
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
    data: {
      alt: `${title} at Indy Veterinary Care`,
    },
    filePath,
  })

  console.log(`Uploaded media for ${slug}: ${filename}`)
  return media.id
}

const serviceDefs = [
  {
    slug: 'anesthesia',
    title: 'Anesthesia',
    imageUrl: `${LIVE_UPLOADS}/anthesia-feature1.jpg`,
    shortDescription:
      'When your pet requires anesthesia for surgical or dental procedures, we provide the safest possible care with constant monitoring.',
    sortOrder: 1,
    featured: true,
    body: richText(
      heading('h2', 'Indy Veterinary Care Anesthesia'),
      p(
        'When your pet requires anesthesia for surgical or dental procedures, we provide the safest possible anesthetics, assisted ventilation and oxygen delivery, and constant monitoring and support of vital signs. During the procedure, we use equipment to monitor your pet’s heartbeat, respiratory rate, blood pressure, oxygen levels and other parameters to keep them safe. Each pet has a dedicated team of nurses and a veterinarian assigned to them and receives IV fluids throughout their hospital stay. Our focus is safety, pain management and precise surgery.',
      ),
    ),
  },
  {
    slug: 'dentistry-teeth-cleaning',
    title: 'Dentistry & Teeth Cleaning',
    imageUrl: `${LIVE_UPLOADS}/dentistry-feature2.jpg`,
    shortDescription:
      'Whether you need a cat dentist or a dog dentist, or general pet dental services, we’re the vets for you.',
    sortOrder: 2,
    featured: false,
    body: richText(
      heading('h2', 'Pet Teeth Cleaning Services in Philly'),
      p(
        'Whether you need a cat dentist or a dog dentist, or general pet dental services, we’re the vets for you. We’re pet dentists who care about your pet.',
      ),
      p(
        'Philadelphia, PA is a city where any one person can own up to 12 animals at a time, so it’s clear we’re a very pet orientated city. Administering services to pet owners in the immediate areas of Northern Liberties, Queen Village, and Old City, and also beyond, Indy Vet Care has a long history of vet dentistry, and plenty of experience to offer you.',
      ),
      p(
        'Pet dentists should be people who get to know your pet and your expectations. If you can’t trust the pet dental care on offer in your area, you’ll feel safe coming to our pet dentists.',
      ),
      p(
        'How many times have you needed to see a dog dentist or a cat dentist? In the past, pet dentists might have seemed entirely unnecessary – increased variety in the pet food market means pet owners are in need of pet dental services more than ever. A pet teeth cleaning might seem like something you can do at home, but sometimes, it’s essential to rely on vet dentistry and professional pet dental care!',
      ),
      p(
        'Maybe you’re new to the areas of Northern Liberties, Queen Village or Old City and you need a veterinary dentistry specialist as soon as possible. There are a variety of pet dentists and pet dental care in Philly – but pet dental care, and even just pet teeth cleaning, can get expensive.',
      ),
      heading('h3', 'Pet Dentists and Pet Dental Services'),
      p(
        'Do you need pet teeth cleaning services for your furry friend? Do you need to get in touch with a cat dentist, or a dog dentist, specifically? Your search for the right pet dentists ends here. We’ve got plenty of pet dental services for you to rely on in the heart of Philly. Pet dental care is more important than ever, and in Philadelphia, PA, we know the value of veterinary dentistry.',
      ),
      heading('h3', 'Dog & Cat Dental Services'),
      p(
        'Finding an affordable provider of pet vaccinations in Philadelphia can be difficult alone, but your pet dental care needs shouldn’t be equally as hard. Your pet’s mouth is one of the key components of their health, and any pet teeth cleaning or further pet dental services shouldn’t be hard to access, whether you need a dog dentist or a cat dentist.',
      ),
      p(
        'You can also book in for spay services in Philadelphia right here. The veterinarians of Philly intend to make sure your pet lives a healthy and happy life, at little extra cost to you. There could be more pet teeth cleaning costs on the horizon.',
      ),
      p(
        'The vets of Philadelphia, PA, are here to help you. It’s our mission as pet dentists to ensure you have everything you need to be a responsible pet owner and give your furry friend the life they deserve. Don’t delay – in the neighborhoods of Northern Liberties, Queen Village, and Old City, we’re pet dentists who’ve got all your pet’s needs covered.',
      ),
    ),
  },
  {
    slug: 'diagnostic-services',
    title: 'Diagnostic Services',
    imageUrl: `${LIVE_UPLOADS}/radiology-featutr.jpg`,
    shortDescription:
      'We have a variety of in-house diagnostic laboratory equipment to quickly and accurately diagnose and treat your pet.',
    sortOrder: 3,
    featured: false,
    body: richText(
      heading('h2', 'Diagnostic Services at Indy Veterinary Care'),
      p(
        'We have a variety of in-house diagnostic laboratory equipment to quickly and accurately diagnose and treat your pet. We also work with a reference laboratory that offers the best diagnostic technology equipment available. Some of the services offered include:',
      ),
      bulletList([
        'Blood testing',
        'Cytology',
        'Infectious disease screening',
        'Parasite screening',
      ]),
    ),
  },
  {
    slug: 'examinations',
    title: 'Examinations',
    imageUrl: `${LIVE_UPLOADS}/examinations-feature.jpg`,
    shortDescription:
      'For wellness and illness, every pet we see gets a thorough physical exam from nose to tail.',
    sortOrder: 4,
    featured: true,
    body: richText(
      heading('h2', 'Indy Veterinary Care Examinations'),
      p(
        'For wellness and illness, every pet we see gets a thorough physical exam from nose to tail. We will discuss any concerns you may have, any abnormalities we find and come up with a treatment plan together. We take the time to thoroughly answer all questions and educate our clients about their pet’s health. Indy Veterinary Care is dedicated to examining and caring for your pet in a low-stress environment. We recommend annual physical exams for healthy young adult pets and biannual exams for senior pets over 7 years old.',
      ),
    ),
  },
  {
    slug: 'hospice-and-euthanasia',
    title: 'Hospice and Euthanasia',
    imageUrl: `${LIVE_UPLOADS}/Hospice-updated-feature.jpg`,
    shortDescription:
      'Our pets are family members and losing a beloved pet is devastating. We are here to help with compassion.',
    sortOrder: 5,
    featured: false,
    body: richText(
      heading('h2', 'Hospice and Euthanasia Services'),
      p(
        'Our pets are family members and losing a beloved pet is devastating. If we can improve your sick pet’s quality of life, we will discuss all available options with you. However, when the time comes, we are here to help your pet pass peacefully. We know this a stressful time and encourage you to speak with us about any questions or concerns. We can also direct you to help with grief counseling when needed.',
      ),
    ),
  },
  {
    slug: 'radiology',
    title: 'Radiology',
    imageUrl: `${LIVE_UPLOADS}/pet-xray1.jpg`,
    shortDescription:
      'We offer the latest technology in radiography—a full-body digital radiography system with cloud access.',
    sortOrder: 6,
    featured: false,
    body: richText(
      heading('h2', 'Indy Veterinary Care Radiology Services'),
      p(
        'We offer the latest technology in radiography- a full-body digital radiography system that stores images on a cloud based software platform. This is important because it allows images to be accessed anytime and anywhere, such as during emergencies or visits to a specialty hospital.',
      ),
    ),
  },
  {
    slug: 'spaying-neutering',
    title: 'Spaying & Neutering',
    imageUrl: `${LIVE_UPLOADS}/spaying-neutering-feature.jpg`,
    shortDescription:
      'One of the most important things you can do for your pet is to get them spayed or neutered.',
    sortOrder: 7,
    featured: false,
    body: richText(
      heading(
        'h2',
        'Animal Spaying and Neutering: An Owner’s Guide to Safe Reproductive Management',
      ),
      p(
        'Your pet is a part of your family. They go on adventures with you. They keep you safe. They take up that special spot at the end of your bed. They also come with a range of responsibilities. Pet ownership is an expensive, time-consuming task, from pet vaccinations to pet dentistry in Philadelphia. One of the most important things you can do for your pet is to get them spayed or neutered. Though it might seem like a minute detail, going through with this procedure for your pet is very important.',
      ),
      heading('h2', 'What is the difference between spaying and neutering procedures?'),
      p(
        'Often referred to as getting an animal “fixed,” spaying and neutering consists of creating interference in an animal’s reproductive organs to eliminate the likelihood of producing offspring. Spay services consist of a veterinarian removing an animal’s ovaries and uterus. When the animal’s heat cycle is eliminated, typical breeding behaviors subside, as well. While some spay services involved the removal of an animal’s uterus, others do not. Either spay services procedure is safe or renders an animal incapable of reproduction.',
      ),
      p(
        'In comparison, neutering an animal involves the removal of both testicles and the associated structures. Also known as castration, dog neutering and cat neutering renders an animal unable to reproduce. Associated breeding behaviors may or may not subside. In opposition to dog neutering, vasectomies are also an option but are seldom chosen.',
      ),
      heading(
        'h2',
        'Why should an owner opt for veterinary intervention via neutering and spay services?',
      ),
      p(
        'Due to the constant influx of animals into shelters across the country, dog neutering, cat neutering, and spay services are crucial to reducing shelter animal populations. Reducing unwanted litters correlates with a reduction in unwanted pets, thus lowering the number of animals turned over to shelter services.',
      ),
      p(
        'In addition, having a vet perform spay services or dog neutering/cat neutering can also help avoid pets in your litter(s) from being abused by breeders. A spayed or neutered puppy or kitten is just as important as a spayed or neutered adult animal, if not more so due to the ability to reduce unwanted reproduction or abusive practices by breeders.',
      ),
      heading('h3', 'How can veterinary neuter or spay services enhance the health of an animal?'),
      p(
        'Specific health benefits can be generated by veterinary dog neutering, cat neutering, or spaying. The likelihood of developing mammary cancer or pyometra can be greatly reduced by vet spaying.',
      ),
      p(
        'Dog neutering can also help prevent the development of testicular cancer in male dogs. Dog neutering has also proven effective in changing the temperament of male dogs, making them less aggressive and less likely to stray from home. However, some vet references would agree that other conditions are made more likely through neutering, so this procedure also has some downfalls.',
      ),
      heading('h3', 'What to expect after a dog or cat neutering/spaying.'),
      p(
        'After dog/cat neutering procedures, owners can expect the animal to be a bit out of it for up to a day. The grogginess should eventually wear off and appetite will return, but owners should expect disorientation and queasiness from vet-administered drugs for a while after the procedure. Veterinary care is required for a period after the surgery, until the animal begins to show signs of positive recovery.',
      ),
      p(
        'Following a cat neutering/spaying, a vet will recommend reduced activity, limited movement, and close monitoring of the animal for at least a week. The veterinarian may want to examine the animal and/or remove stitches later.',
      ),
    ),
  },
  {
    slug: 'surgery',
    title: 'Surgery',
    imageUrl: `${LIVE_UPLOADS}/Surgery-feature1.jpg`,
    shortDescription:
      'The experienced veterinary team at Indy Veterinary Care offers a variety of surgical procedures from routine to complex.',
    sortOrder: 8,
    featured: true,
    body: richText(
      heading('h2', 'Pet Surgery at Indy Veterinary Care'),
      p(
        'The experienced veterinary team at Indy Veterinary Care offers a variety of surgical procedures from routine spay/neuter to more complex soft tissue operations including:',
      ),
      bulletList([
        'Cystotomy',
        'Gastropexy',
        'Foreign body/Obstruction repair',
        'Mass/Tumor Removal',
        'Spay/Neuter',
      ]),
    ),
  },
  {
    slug: 'vaccinations',
    title: 'Vaccinations',
    imageUrl: `${LIVE_UPLOADS}/vaccations-feature1.jpg`,
    shortDescription:
      'Routine physical exams, lab work, dental exams, and pet vaccinations are all responsibilities that a pet owner must undertake.',
    sortOrder: 9,
    featured: false,
    body: richText(
      heading('h2', 'Understanding Animal Vaccinations and Their Role in Pet Health'),
      p(
        'You visit the doctor every year to determine your physical health. Why wouldn’t we want to provide the same care to our four-legged friends? Routine physical exams, lab work, dental exams, and pet vaccinations are all responsibilities that a pet owner must undertake.',
      ),
      heading('h2', 'What Pet Vaccinations are Required?'),
      p(
        'Typically, a veterinarian in Philadelphia, PA will break vaccination services down into two categories: core and non-core pet vaccinations. Core vaccination services are recommended for every pet, while non-core pet vaccinations may be recommended based on a pet’s lifestyle and disposition to certain illnesses or conditions.',
      ),
      p(
        'Differences exist for a vaccine client based on the type of pet they are caring for. Cat vaccinations and dog vaccinations vary in type and amount. Core dog vaccinations for pets in Society Hill or Fishtown would include the following:',
      ),
      bulletList([
        'Rabies 1-year',
        'Rabies 3-year',
        'Distemper',
        'Parvovirus',
        'Adenovirus, Type 2',
        'Parainfluenza',
      ]),
      p('Non-core dog vaccinations include:'),
      bulletList(['Bordetella', 'Lyme Disease', 'Leptospirosis', 'Canine Influenza']),
      p('In contrast, core cat vaccinations in Olde Kensington or Queen Village include:'),
      bulletList([
        'Rabies',
        'Feline Distemper (Panleukopenia)',
        'Feline Herpesvirus 1',
        'Calicivirus',
      ]),
      p('Non-core cat vaccinations include:'),
      bulletList(['Feline Leukemia Virus', 'Bordetella']),
      heading('h2', 'When Should I Seek Out Vaccine Services for my Pets?'),
      p(
        'A veterinarian in Philly will provide a recommended vaccine client schedule at the first check-up. These schedules are tentative but should be used to provide rough timelines of vaccine requirements. Most cat vaccinations and dog vaccinations begin at 6-8 weeks of age. Some may require a booster or a series of boosters at a later time. Many veterinarians in Olde Kensington, Queen Village, or Society Hill will mail postcards or generate emails to help vaccine clients stay up to date with vaccination services.',
      ),
      heading('h3', 'Rabies Vaccines: The Most Well-Known Remedy'),
      p(
        'Rabies vaccines are some of the most notorious vaccines. This is partly due to city requirements that are placed on pets in cities like Olde Kensington, Society Hill, and Queen Village. Many cities in and around Philly have pet registration requirements and rabies ordinances that are used to track animals within the city, prevent rabies outbreaks, and protect the public. Rabies vaccines are important, because animals can get this disease from coming into contact with other animals who have been exposed. If an animal is not up to date on rabies vaccines and they bite a person, that animal may be quarantined or put down. The person must also receive medical treatment and receive a series of painful immunizations to lower their risk of contracting rabies. Rabies vaccines are extremely important in highly populated cities, like Philly. Infection with Rabies in humans and animals is not treatable.',
      ),
      heading('h3', 'What to Look for in a Veterinarian'),
      p(
        'Finding a pet who is dedicated to proper vaccinations in Fishtown may not be as easy as it sounds. Clients in Philadelphia, PA should ask potential veterinarians their stance on vaccination schedules at the first appointment. Veterinarians around Olde Kensington, Queen Village, and Society Hill who are committed to pet safety will recommend a safe amount of time to wait between vaccine administration and will be aware of any potential side effects from the immunization. While typical vaccine fees are due up front, veterinarians in Fishtown and Philadelphia, PA may be able to suggest a payment schedule for multiple vaccines. Many veterinarians in Fishtown will also be able to recommend spaying/neutering and teeth cleaning in Philadelphia for ultimate pet health.',
      ),
    ),
  },
] as const

async function upsertBySlug(args: {
  payload: Awaited<ReturnType<typeof getPayload>>
  slug: string
  data: Record<string, unknown>
}) {
  const { payload, slug, data } = args
  const existing = await payload.find({
    collection: 'services',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
  })

  if (existing.docs[0]) {
    return payload.update({
      collection: 'services',
      id: existing.docs[0].id,
      data,
      draft: false,
    })
  }

  return payload.create({
    collection: 'services',
    data: { ...data, slug },
    draft: false,
  })
}

async function main() {
  const payload = await getPayload({ config })
  const tmpDir = path.join(os.tmpdir(), 'indyvet-service-images')
  await mkdir(tmpDir, { recursive: true })

  const services = []
  for (const def of serviceDefs) {
    const imageId = await upsertServiceImage({
      payload,
      slug: def.slug,
      title: def.title,
      imageUrl: def.imageUrl,
      tmpDir,
    })

    services.push(
      await upsertBySlug({
        payload,
        slug: def.slug,
        data: {
          title: def.title,
          shortDescription: def.shortDescription,
          body: def.body,
          featured: def.featured,
          sortOrder: def.sortOrder,
          image: imageId,
          _status: 'published',
        },
      }),
    )
  }

  await payload.updateGlobal({
    slug: 'services-page',
    data: {
      hero: {
        eyebrow: 'Veterinary services',
        title: 'This is the only place for all your pet care',
        description:
          'Located in Northern Liberties, Indy Veterinary Care offers quick & easy services for dogs, cats, and other pets. No matter their size or age, we can provide unrivaled quality care.',
      },
      cta: {
        label: 'Book an appointment',
        url: '/contact',
      },
      promo: {
        title: 'Ready to book care for your pet?',
        description:
          'Schedule a visit with our Northern Liberties team for dogs, cats, and other pets.',
      },
      seo: {
        title: 'Veterinary Services in Philadelphia, PA | Indy Veterinary Care',
        description:
          'Located in Northern Liberties, Indy Veterinary Care offers quick & easy services for dogs, cats, and other pets.',
      },
    },
  })

  const featuredIds = services
    .filter((doc) => serviceDefs.some((def) => def.slug === doc.slug && def.featured))
    .map((doc) => doc.id)

  const home = await payload.findGlobal({ slug: 'home-page', depth: 0 })
  await payload.updateGlobal({
    slug: 'home-page',
    data: {
      ...home,
      services: {
        ...(typeof home.services === 'object' && home.services ? home.services : {}),
        eyebrow: 'Services we provide',
        title: 'Veterinary services tailored for your pet’s needs',
        featuredServices: featuredIds,
      },
    },
  })

  const keepSlugs = new Set(serviceDefs.map((def) => def.slug))
  const allServices = await payload.find({
    collection: 'services',
    limit: 100,
    depth: 0,
    draft: true,
  })

  for (const doc of allServices.docs) {
    if (!keepSlugs.has(doc.slug)) {
      await payload.delete({
        collection: 'services',
        id: doc.id,
      })
    }
  }

  console.log(`Seeded services-page and ${services.length} services.`)
  process.exit(0)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
