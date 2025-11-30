import { getServerSideSitemapIndex } from 'next-sitemap'

export async function GET() {
  const SITE_URL =
    process.env.NEXT_PUBLIC_SERVER_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : 'https://example.com')

  return getServerSideSitemapIndex([
    `${SITE_URL}/sk/pages-sitemap.xml`,
    `${SITE_URL}/sk/posts-sitemap.xml`,
  ])
}

