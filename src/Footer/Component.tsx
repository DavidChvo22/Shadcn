import React from 'react'

import type { Footer } from '@/payload-types'

import { Footer9 } from '@/Footer/Footer9'
//import { getCachedGlobal } from '@/utilities/getGlobals'

export async function Footer({ locale }: { locale?: string }) {
  //const footer = await getCachedGlobal('footer', 1, locale)()

  return <Footer9 locale={locale} />
}
