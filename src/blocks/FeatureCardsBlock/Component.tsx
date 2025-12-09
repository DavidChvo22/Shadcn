'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

import type { FeatureCardsBlock as FeatureCardsBlockProps, Media } from '@/payload-types'

const resolveBackground = (background: FeatureCardsBlockProps['cards'][number]['background']) => {
  if (!background) return undefined
  if (typeof background === 'string') return background
  const media = background as Media
  return (
    media.url ||
    media?.sizes?.large?.url ||
    media?.sizes?.medium?.url ||
    media?.sizes?.small?.url ||
    media?.sizes?.thumbnail?.url ||
    undefined
  )
}

const FeatureCardsBlock: React.FC<FeatureCardsBlockProps> = ({ cards }) => {
  const t = useTranslations('FeatureCardsBlock')

  if (!cards || cards.length === 0) {
    return null
  }

  const isExternalLink = (url: string) => {
    return url.startsWith('http://') || url.startsWith('https://') || url.startsWith('//')
  }

  return (
    <section className="py-32">
      <div className="container">
        <div className="mb-24 text-center">
          <p className="text-muted-foreground text-sm uppercase tracking-widest">
            {t('subheading')}
          </p>
          <h2 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">{t('heading')}</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, index) => {
            const backgroundUrl = resolveBackground(card.background)
            const content = (
              <div
                className="relative z-20 flex size-full items-end pointer-events-none"
                aria-label={card.title || undefined}
              >
                <span className="text-2xl font-semibold leading-tight text-white md:text-3xl">
                  {card.title}
                </span>
              </div>
            )

            const elementKey = card.id || `${card.title}-${index}`
            const commonProps = {
              style: backgroundUrl ? { backgroundImage: `url(${backgroundUrl})` } : undefined,
              className: `min-h-auto relative w-full overflow-hidden rounded-xl bg-black/60 bg-cover bg-center bg-no-repeat p-5 shadow-xl transition-all duration-300 before:absolute before:left-0 before:top-0 before:z-10 before:block before:size-full before:bg-black/50 before:transition-all before:duration-300 before:content-[''] hover:before:bg-black/40 sm:aspect-square md:aspect-auto md:min-h-[30rem] md:max-w-[30rem] ${
                card.link ? 'cursor-pointer' : ''
              }`,
            }

            // If no link, render as div
            if (!card.link) {
              return (
                <div key={elementKey} {...commonProps}>
                  {content}
                </div>
              )
            }

            // External links - use anchor tag
            if (isExternalLink(card.link)) {
              return (
                <a
                  key={elementKey}
                  href={card.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  {...commonProps}
                >
                  {content}
                </a>
              )
            }

            // Internal links - use Next.js Link
            return (
              <Link key={elementKey} href={card.link} {...commonProps}>
                {content}
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export { FeatureCardsBlock }
