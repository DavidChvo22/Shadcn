'use client'

import React from 'react'
import { useTranslations } from 'next-intl'

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
            const handleSelect = (e?: React.MouseEvent) => {
              if (!backgroundUrl) return
              if (e) {
                e.preventDefault()
                e.stopPropagation()
              }
              window.open(backgroundUrl, '_blank', 'noopener,noreferrer')
            }
            const content = (
              <div
                className="relative z-20 flex size-full items-end"
                aria-label={card.title || undefined}
                onClick={backgroundUrl ? handleSelect : undefined}
              >
                <span className="text-2xl font-semibold leading-tight text-white md:text-3xl">
                  {card.title}
                </span>
              </div>
            )

            const elementKey = card.id || `${card.title}-${index}`
            const commonProps = {
              style: backgroundUrl ? { backgroundImage: `url(${backgroundUrl})` } : undefined,
              className:
                "min-h-auto relative w-full overflow-hidden rounded-xl bg-black/40 bg-cover bg-center bg-no-repeat p-5 shadow-xl transition-all duration-300 before:absolute before:left-0 before:top-0 before:z-10 before:block before:size-full before:bg-black/20 before:transition-all before:duration-300 before:content-[''] hover:before:bg-black/10 sm:aspect-square md:aspect-auto md:min-h-[30rem] md:max-w-[30rem]",
            }

            if (card.link) {
              return (
                <div
                  key={elementKey}
                  {...commonProps}
                  onClick={backgroundUrl ? handleSelect : undefined}
                  role={backgroundUrl ? 'button' : undefined}
                  tabIndex={backgroundUrl ? 0 : undefined}
                  onKeyDown={
                    backgroundUrl
                      ? (e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            handleSelect()
                          }
                        }
                      : undefined
                  }
                >
                  {content}
                </div>
              )
            }

            return (
              <div
                key={elementKey}
                {...commonProps}
                onClick={backgroundUrl ? handleSelect : undefined}
                role={backgroundUrl ? 'button' : undefined}
                tabIndex={backgroundUrl ? 0 : undefined}
                onKeyDown={
                  backgroundUrl
                    ? (e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          handleSelect()
                        }
                      }
                    : undefined
                }
              >
                {content}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export { FeatureCardsBlock }
