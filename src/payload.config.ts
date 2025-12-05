import { cloudinaryStoragePlugin } from '@acewebs/payload-plugin-cloudinary'
import { mongooseAdapter } from '@payloadcms/db-mongodb'

import sharp from 'sharp' // sharp-import
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeLogin: ['@/components/BeforeLogin'],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeDashboard: ['@/components/BeforeDashboard'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  collections: [Pages, Posts, Media, Categories, Users],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer],
  localization: {
    locales: [
      {
        label: 'Slovak',
        code: 'sk',
      },
      {
        label: 'English',
        code: 'en',
      },
    ],
    defaultLocale: 'sk',
    fallback: true,
  },
  plugins: [
    ...plugins,
    // Cloudinary storage - používa sa len ak sú nastavené Cloudinary env vars
    ...(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET
      ? (() => {
          console.log('✅ Cloudinary plugin sa aktivuje')
          console.log('Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME)
          console.log('API Key:', process.env.CLOUDINARY_API_KEY ? '✅ Nastavené' : '❌ Chýba')
          console.log('API Secret:', process.env.CLOUDINARY_API_SECRET ? '✅ Nastavené' : '❌ Chýba')
          // Nastav DEBUG_CLOUDINARY pre detailné logovanie
          if (!process.env.DEBUG_CLOUDINARY) {
            process.env.DEBUG_CLOUDINARY = 'true'
          }
          return [
            cloudinaryStoragePlugin({
              cloudName: process.env.CLOUDINARY_CLOUD_NAME,
              apiKey: process.env.CLOUDINARY_API_KEY,
              apiSecret: process.env.CLOUDINARY_API_SECRET,
              collections: ['media'], // Povinné: kolekcie, na ktoré sa aplikuje Cloudinary
              rootFolder: process.env.CLOUDINARY_FOLDER || 'media', // Voliteľné: priečinok v Cloudinary
            }),
          ]
        })()
      : (() => {
          console.log('⚠️  Cloudinary env vars nie sú nastavené, používa sa lokálny filesystem')
          console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME || '❌ Chýba')
          console.log('CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY ? '✅' : '❌ Chýba')
          console.log('CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET ? '✅' : '❌ Chýba')
          return []
        })()),
  ],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${process.env.CRON_SECRET}`
      },
    },
    tasks: [],
  },
})
