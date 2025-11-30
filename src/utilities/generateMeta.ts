import type { Metadata } from 'next'

import type { Media, Page, Post, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'
import { locales, defaultLocale, type Locale } from '@/i18n/config'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/website-template-OG.webp'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | null
  locale?: Locale
  pathname?: string
}): Promise<Metadata> => {
  const { doc, locale = defaultLocale, pathname = '/' } = args

  const serverUrl = getServerSideURL()
  const ogImage = getImageURL(doc?.meta?.image)

  const title = doc?.meta?.title
    ? doc?.meta?.title + ' | Payload Website Template'
    : 'Payload Website Template'

  // Generate canonical URL
  const canonicalPath = pathname.startsWith('/') ? pathname : `/${pathname}`
  const canonicalUrl = `${serverUrl}${canonicalPath}`

  // Generate alternate language URLs
  const alternateLanguages: Record<string, string> = {}

  locales.forEach((loc) => {
    if (loc === defaultLocale) {
      // Default locale without prefix
      alternateLanguages[loc] = `${serverUrl}${canonicalPath.replace(`/${defaultLocale}`, '')}`
      alternateLanguages['x-default'] = `${serverUrl}${canonicalPath.replace(`/${defaultLocale}`, '')}`
    } else {
      // Other locales with prefix
      const localePrefix = `/${loc}`
      const pathWithoutLocale = canonicalPath.replace(`/${defaultLocale}`, '').replace(localePrefix, '')
      alternateLanguages[loc] = `${serverUrl}${localePrefix}${pathWithoutLocale}`
    }
  })

  return {
    description: doc?.meta?.description,
    alternates: {
      canonical: canonicalUrl,
      languages: alternateLanguages,
    },
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: canonicalUrl,
    }),
    title,
  }
}
