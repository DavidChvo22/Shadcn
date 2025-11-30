const SITE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  'https://example.com'

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: false, // Using custom robots.txt route instead
  exclude: [
    '/admin',
    '/admin/*',
    '/api',
    '/api/*',
    '*/posts-sitemap.xml',
    '*/pages-sitemap.xml',
    '/sitemap.xml',
    '/robots.txt',
  ],
}
