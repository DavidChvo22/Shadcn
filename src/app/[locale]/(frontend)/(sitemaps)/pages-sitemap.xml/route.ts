import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { locales, defaultLocale } from '@/i18n/config'

const getPagesSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const SITE_URL =
      process.env.NEXT_PUBLIC_SERVER_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      'https://example.com'

    const results = await payload.find({
      collection: 'pages',
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
      const path = slug === 'home' ? '' : slug
      if (locale === defaultLocale) {
        return `${SITE_URL}${path ? `/${path}` : ''}`
      }
      return `${SITE_URL}/${locale}${path ? `/${path}` : ''}`
    }

    // Add default pages (search, posts) for each locale
    const defaultPages = ['search', 'posts']
    defaultPages.forEach((pagePath) => {
      locales.forEach((locale) => {
        const isDefault = locale === defaultLocale
        const loc = isDefault ? `${SITE_URL}/${pagePath}` : `${SITE_URL}/${locale}/${pagePath}`

        const alternateLinks: Array<{ hreflang: string; href: string }> = locales.map((altLocale) => ({
          hreflang: altLocale,
          href: altLocale === defaultLocale
            ? `${SITE_URL}/${pagePath}`
            : `${SITE_URL}/${altLocale}/${pagePath}`,
        }))

        // Add x-default for default locale
        if (isDefault) {
          alternateLinks.push({
            hreflang: 'x-default',
            href: `${SITE_URL}/${pagePath}`,
          })
        }

        sitemapEntries.push({
          loc,
          lastmod: dateFallback,
          alternateRefs: alternateLinks,
        })
      })
    })

    // Add dynamic pages for each locale
    if (results.docs) {
      results.docs
        .filter((page) => Boolean(page?.slug))
        .forEach((page) => {
          locales.forEach((locale) => {
            const isDefault = locale === defaultLocale
            const loc = getLocalizedUrl(page.slug!, locale)

            const alternateLinks: Array<{ hreflang: string; href: string }> = locales.map((altLocale) => ({
              hreflang: altLocale,
              href: getLocalizedUrl(page.slug!, altLocale),
            }))

            // Add x-default for default locale
            if (isDefault) {
              alternateLinks.push({
                hreflang: 'x-default',
                href: getLocalizedUrl(page.slug!, defaultLocale),
              })
            }

            sitemapEntries.push({
              loc,
              lastmod: page.updatedAt || dateFallback,
              alternateRefs: alternateLinks,
            })
          })
        })
    }

    return sitemapEntries
  },
  ['pages-sitemap'],
  {
    tags: ['pages-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getPagesSitemap()

  return getServerSideSitemap(sitemap)
}
