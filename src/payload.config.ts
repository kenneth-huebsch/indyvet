import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { EmergencyReferrals } from './payload/collections/EmergencyReferrals'
import { FAQs } from './payload/collections/FAQs'
import { Media } from './payload/collections/Media'
import { Posts } from './payload/collections/Posts'
import { Services } from './payload/collections/Services'
import { TeamMembers } from './payload/collections/TeamMembers'
import { Testimonials } from './payload/collections/Testimonials'
import { Users } from './payload/collections/Users'
import { AboutPage } from './payload/globals/AboutPage'
import { ContactPage } from './payload/globals/ContactPage'
import { EmergencyPage } from './payload/globals/EmergencyPage'
import { Footer } from './payload/globals/Footer'
import { Header } from './payload/globals/Header'
import { HomePage } from './payload/globals/HomePage'
import { SiteSettings } from './payload/globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Services,
    TeamMembers,
    Testimonials,
    Posts,
    FAQs,
    EmergencyReferrals,
  ],
  globals: [SiteSettings, Header, Footer, HomePage, AboutPage, ContactPage, EmergencyPage],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET!,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI!,
    },
  }),
  sharp,
})
