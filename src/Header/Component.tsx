import React from 'react'

import { Navbar2 } from '@/Header/Navbar2'
//import { getCachedGlobal } from '@/utilities/getGlobals'

export async function Header({ locale }: { locale?: string }) {
  //const header = await getCachedGlobal('header', 1, locale)()

  // Navbar2 is a client component that uses useTranslations hook
  // It gets locale from NextIntlClientProvider context
  return <Navbar2 />
}
