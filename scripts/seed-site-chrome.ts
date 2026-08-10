/**
 * Seed Header, Footer, and Site Settings with Indy Veterinary Care content.
 * Run: npx cross-env NODE_OPTIONS=--no-deprecation tsx -r dotenv/config scripts/seed-site-chrome.ts
 */
import { getPayload } from 'payload'
import config from '@payload-config'

async function main() {
  const payload = await getPayload({ config })

  const siteSettings = await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      brand: {
        siteName: 'Indy Veterinary Care',
        tagline: 'Friendly veterinary care in Northern Liberties',
      },
      contact: {
        phone: '(215) 923-2300',
        textPhone: '(844) 968-1296',
        email: 'info@indyvetcare.com',
        address: '917 N Front Street\nPhiladelphia, PA 19123',
        hours: [
          { label: 'Mon–Thu', value: '9:00 AM – 7:00 PM' },
          { label: 'Friday', value: '9:00 AM – 5:00 PM' },
          { label: 'Saturday', value: '9:00 AM – 1:00 PM' },
          { label: 'Sunday', value: 'Closed' },
        ],
      },
      social: {
        facebook: 'https://www.facebook.com/indyvetcare',
        instagram: 'https://www.instagram.com/indyvetcare/',
      },
      booking: {
        label: 'Book Now',
        url: '/contact',
        embedScriptUrl: 'https://vettersoftware.com/view/dist/online-book.js',
      },
      pharmacy: {
        label: 'Order Online',
        url: 'https://indyvetcare.vetsfirstchoice.com/',
      },
      defaultSeo: {
        title: 'Indy Veterinary Care | Northern Liberties, Philadelphia',
        description:
          'Compassionate, friendly veterinary care for dogs and cats in Northern Liberties, Fishtown, Kensington, and surrounding Philadelphia neighborhoods.',
      },
    },
  })

  const header = await payload.updateGlobal({
    slug: 'header',
    data: {
      navItems: [
        { label: 'Home', url: '/' },
        { label: 'About', url: '/about' },
        { label: 'Services', url: '/services' },
        { label: 'Blog', url: '/blog' },
        { label: 'Contact', url: '/contact' },
        { label: 'Emergency', url: '/emergency' },
      ],
      cta: {
        label: 'Book Now',
        url: '/contact',
      },
    },
  })

  const footer = await payload.updateGlobal({
    slug: 'footer',
    data: {
      linkGroups: [
        {
          title: 'Clinic',
          links: [
            { label: 'Home', url: '/' },
            { label: 'About', url: '/about' },
            { label: 'Services', url: '/services' },
            { label: 'Blog', url: '/blog' },
          ],
        },
        {
          title: 'Visit',
          links: [
            { label: 'Contact', url: '/contact' },
            { label: 'Emergency', url: '/emergency' },
            { label: 'FAQ', url: '/faq' },
          ],
        },
        {
          title: 'Online',
          links: [
            {
              label: 'Order Online',
              url: 'https://indyvetcare.vetsfirstchoice.com/',
            },
          ],
        },
      ],
      copyright: '© 2026 Indy Veterinary Care. All rights reserved.',
    },
  })

  console.log('Seeded site chrome:')
  console.log('- site-settings:', siteSettings.brand.siteName, siteSettings.contact?.phone)
  console.log('- header nav items:', header.navItems?.length ?? 0)
  console.log('- footer link groups:', footer.linkGroups?.length ?? 0)
  console.log('- footer copyright:', footer.copyright)
  process.exit(0)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
