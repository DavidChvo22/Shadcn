import React from 'react'

import type { Page } from '@/payload-types'

import { HighImpactHero } from '@/heros/HighImpact'
import { LowImpactHero } from '@/heros/LowImpact'
import { MediumImpactHero } from '@/heros/MediumImpact'
import { CustomHero } from '@/heros/CustomHero'
import { Hero223 } from '@/heros/Hero223'
import { Hero243 } from '@/heros/Hero243'
import { Hero34 } from '@/heros/Hero34'

const heroes = {
  highImpact: HighImpactHero,
  lowImpact: LowImpactHero,
  mediumImpact: MediumImpactHero,
  customHero: CustomHero,
  hero223: Hero223,
  hero243: Hero243,
  hero34: Hero34,
}

export const RenderHero: React.FC<Page['hero'] & { locale?: string }> = (props) => {
  const { type } = props || {}

  if (!type || type === 'none') return null

  const HeroToRender = heroes[type]

  if (!HeroToRender) return null

  return <HeroToRender {...props} />
}
