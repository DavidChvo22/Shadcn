import { NextResponse } from 'next/server'

export async function GET() {
  const SITE_URL =
    process.env.NEXT_PUBLIC_SERVER_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : 'https://example.com')

  const robotsTxt = `# *
User-agent: *
Allow: /

# Disallow admin and API routes
Disallow: /admin
Disallow: /api

# Sitemap
Sitemap: ${SITE_URL}/sitemap.xml
`

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}

