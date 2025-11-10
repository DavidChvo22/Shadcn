import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Header } from '@/payload-types'
import { Navbar2 } from '@/components/navbar2'

export async function Header() {
  const headerData: Header = await getCachedGlobal('header', 1)()

  return <Navbar2 />
}
