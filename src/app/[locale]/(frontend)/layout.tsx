import type { Metadata } from 'next'

import React from 'react'

import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { getServerSideURL } from '@/utilities/getURL'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { locales, defaultLocale, type Locale } from '@/i18n/config'

import './globals.css'

type RootLayoutProps = {
  children: React.ReactNode
  params: Promise<{
    locale: Locale
  }>
}

export default async function FrontendLayout({ children, params: paramsPromise }: RootLayoutProps) {
  const { locale } = await paramsPromise

  return (
    <>
      <Header locale={locale} />
      {children}
      <Footer locale={locale} />
    </>
  )
}

export async function generateMetadata({ params: paramsPromise }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await paramsPromise
  const serverUrl = getServerSideURL()

  // Generate canonical URL for home page
  const canonicalUrl = locale === defaultLocale ? serverUrl : `${serverUrl}/${locale}`

  // Generate alternate language URLs
  const alternateLanguages: Record<string, string> = {}
  locales.forEach((loc) => {
    if (loc === defaultLocale) {
      alternateLanguages[loc] = serverUrl
      alternateLanguages['x-default'] = serverUrl
    } else {
      alternateLanguages[loc] = `${serverUrl}/${loc}`
    }
  })

  return {
    metadataBase: new URL(serverUrl),
    alternates: {
      canonical: canonicalUrl,
      languages: alternateLanguages,
    },
    openGraph: mergeOpenGraph(),
    twitter: {
      card: 'summary_large_image',
      creator: '@payloadcms',
    },
  }
}
