import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Footer } from '@/payload-types'

import { Footer9 } from '@/components/footer9'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []

  return <Footer9 />
}
