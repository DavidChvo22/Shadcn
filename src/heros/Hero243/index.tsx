'use client'

import { TrendingUp, Users, Zap } from 'lucide-react'
import { useTranslations } from 'next-intl'
import React from 'react'

import { ContainerTextFlip } from '@/components/aceternity/container-text-flip'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import { SCROLL_TARGET_STORAGE_KEY } from '@/components/ScrollToAnchor'

const Hero243 = () => {
  const t = useTranslations('Hero243')
  const flipWords = (t.raw('flipWords') as string[]) ?? []

  const handleConfiguratorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = '/sk#konfigurator-2'
    e.preventDefault()

    try {
      const targetUrl = new URL(href, window.location.origin)
      const currentUrl = new URL(window.location.href)
      const normalize = (path: string) => path.replace(/\/+$/, '') || '/'
      const decodeHash = (hash: string) => {
        if (!hash) return ''
        try {
          return decodeURIComponent(hash)
        } catch {
          return hash
        }
      }
      const rawHash = targetUrl.hash.replace('#', '')
      const hash = decodeHash(rawHash)

      if (normalize(targetUrl.pathname) === normalize(currentUrl.pathname)) {
        if (hash) {
          document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
        return
      }

      if (hash) {
        window.sessionStorage.setItem(SCROLL_TARGET_STORAGE_KEY, hash)
      }
      window.location.assign(`${targetUrl.pathname}${targetUrl.search}`)
    } catch {
      window.location.href = href
    }
  }

  return (
    <section className="h-full w-screen overflow-hidden pb-32">
      <div className="container">
        <div className="relative flex w-full max-w-5xl flex-col justify-start px-5 py-12 md:items-center md:justify-center lg:mx-auto">
          <p className="text-muted-foreground flex items-center gap-3 text-sm" data-aos="fade-down">
            <span className="inline-block size-2 rounded bg-green-500" />
            {t('badge')}
          </p>
          <div
            className="mb-7 mt-3 w-full max-w-xl text-center text-5xl font-semibold tracking-tighter md:mb-10 md:text-6xl lg:mb-0 lg:text-7xl"
            data-aos="fade-up"
          >
            <h1 className="relative z-10">{t('heading')}</h1>
            <ContainerTextFlip
              unstyled
              className="inline-block text-4xl font-semibold tracking-tighter bg-primary text-primary-foreground shadow-lg shadow-primary/40 md:text-5xl lg:text-7xl"
              words={flipWords}
            />
          </div>
        </div>
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-center py-20">
          <div
            className="w-full max-w-2xl space-y-5 md:text-center"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <p className="text-muted-foreground px-5 lg:text-lg">{t('description')}</p>
            <Button
              asChild
              variant="default"
              className="mx-5 h-10 hover:scale-105 transition-all duration-200 "
            >
              <Link href="/sk#konfigurator-2" onClick={handleConfiguratorClick}>
                {t('cta')}
              </Link>
            </Button>
          </div>
        </div>
        <ul className="md:h-34 mx-auto grid h-44 w-full max-w-5xl grid-cols-1 md:grid-cols-2 lg:h-24 lg:grid-cols-3">
          <li className="flex h-full items-center justify-between gap-10 px-5 md:gap-3 lg:justify-center">
            <div className="bg-muted flex size-12 items-center justify-center rounded-lg">
              <Zap className="text-muted-foreground size-6" />
            </div>
            <p className="text-muted-foreground text-lg">{t('stats.fastDelivery')}</p>
          </li>
          <li className="flex h-full items-center justify-between gap-10 px-5 md:gap-3 lg:justify-center">
            <div className="bg-muted flex size-12 items-center justify-center rounded-lg">
              <Users className="text-muted-foreground size-6" />
            </div>
            <p className="text-muted-foreground text-lg">{t('stats.team')}</p>
          </li>
          <li className="col-span-1 flex h-full items-center justify-between gap-10 px-5 md:col-span-2 md:justify-center md:gap-3 lg:col-span-1">
            <div className="bg-muted flex size-12 items-center justify-center rounded-lg">
              <TrendingUp className="text-muted-foreground size-6" />
            </div>
            <p className="text-muted-foreground text-lg">{t('stats.noFees')}</p>
          </li>
        </ul>
      </div>
    </section>
  )
}

export { Hero243 }
