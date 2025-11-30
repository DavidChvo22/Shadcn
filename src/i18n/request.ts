import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'

import { defaultLocale, locales, type Locale } from './config'

export default getRequestConfig(async ({ locale }) => {
  const localeFromParams = locale as Locale | undefined

  if (localeFromParams && !locales.includes(localeFromParams)) {
    notFound()
  }

  const resolvedLocale = localeFromParams ?? defaultLocale

  return {
    locale: resolvedLocale,
    messages: (await import(`../messages/${resolvedLocale}.json`)).default,
  }
})
