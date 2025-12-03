import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { locales, defaultLocale } from '@/i18n/config'

const getPostsSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const SITE_URL =
      process.env.NEXT_PUBLIC_SERVER_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      'https://example.com'

    const results = await payload.find({
      collection: 'posts',
      overrideAccess: false,
      draft: false,
      depth: 0,
      limit: 1000,
      pagination: false,
      where: {
        _status: {
          equals: 'published',
        },
      },
      select: {
        slug: true,
        updatedAt: true,
      },
    })

    const dateFallback = new Date().toISOString()

    // Generate sitemap entries for all locales
    const sitemapEntries: any[] = []

    // Helper to generate URL for a locale
    const getLocalizedUrl = (slug: string, locale: string) => {
      if (locale === defaultLocale) {
        return `${SITE_URL}/posts/${slug}`
      }
      return `${SITE_URL}/${locale}/posts/${slug}`
    }

    // Add posts for each locale
    if (results.docs) {
      results.docs
        .filter((post) => Boolean(post?.slug))
        .forEach((post) => {
          locales.forEach((locale) => {
            const isDefault = locale === defaultLocale
            const loc = getLocalizedUrl(post.slug!, locale)

            const alternateLinks: Array<{ hreflang: string; href: string }> = locales.map((altLocale) => ({
              hreflang: altLocale,
              href: getLocalizedUrl(post.slug!, altLocale),
            }))

            // Add x-default for default locale
            if (isDefault) {
              alternateLinks.push({
                hreflang: 'x-default',
                href: getLocalizedUrl(post.slug!, defaultLocale),
              })
            }

            sitemapEntries.push({
              loc,
              lastmod: post.updatedAt || dateFallback,
              alternateRefs: alternateLinks,
            })
          })
        })
    }

    return sitemapEntries
  },
  ['posts-sitemap'],
  {
    tags: ['posts-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getPostsSitemap()

  return getServerSideSitemap(sitemap)
}
