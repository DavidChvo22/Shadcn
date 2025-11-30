'use client'

import React, { useEffect, useState } from 'react'

import type { CarouselApi } from '@/components/ui/carousel'
import type { GalleryBlock as GalleryBlockProps, Media } from '@/payload-types'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'

const getMediaUrl = (image: GalleryBlockProps['items'][number]['image']) => {
  if (!image) return undefined
  if (typeof image === 'string') return image
  if (typeof image === 'object') {
    const media = image as Media
    return (
      media.url ||
      media?.sizes?.large?.url ||
      media?.sizes?.medium?.url ||
      media?.sizes?.small?.url ||
      media?.sizes?.thumbnail?.url ||
      undefined
    )
  }
  return undefined
}

const GalleryBlock: React.FC<GalleryBlockProps> = ({ title, items }) => {
  const t = useTranslations('GalleryBlock')
  const [carouselApi, setCarouselApi] = useState<CarouselApi>()
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  useEffect(() => {
    if (!carouselApi) {
      return
    }
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev())
      setCanScrollNext(carouselApi.canScrollNext())
    }
    updateSelection()
    carouselApi.on('select', updateSelection)
    return () => {
      carouselApi.off('select', updateSelection)
    }
  }, [carouselApi])

  if (!items || items.length === 0) {
    return null
  }

  return (
    <section className="py-32">
      <div className="container">
        <div className="mb-8 flex items-end justify-between md:mb-14 lg:mb-16">
          <h2 className="text-3xl font-medium tracking-tight md:text-4xl lg:text-5xl">
            {title || 'Gallery'}
          </h2>
          <div className="shrink-0 gap-2 md:flex">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => {
                carouselApi?.scrollPrev()
              }}
              disabled={!canScrollPrev}
              className="disabled:pointer-events-auto"
            >
              <ArrowLeft className="size-5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => {
                carouselApi?.scrollNext()
              }}
              disabled={!canScrollNext}
              className="disabled:pointer-events-auto"
            >
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            breakpoints: {
              '(max-width: 768px)': {
                dragFree: true,
              },
            },
          }}
        >
          <CarouselContent className="ml-[20px] mr-[20px] 2xl:ml-[calc(50vw-700px+20px)] 2xl:mr-[calc(50vw-700px+20px)]">
            {items.map((item) => {
              const imageSrc = getMediaUrl(item.image)
              return (
                <CarouselItem
                  key={item.id || item.title}
                  className="max-w-[320px] pl-[20px] lg:max-w-[360px]"
                >
                  <div
                    className="bg-primary text-primary-foreground group flex cursor-pointer flex-col justify-between rounded-xl p-6"
                    onClick={() => {
                      if (imageSrc) {
                        window.open(imageSrc, '_blank', 'noopener,noreferrer')
                      } else if (item.href) {
                        window.open(item.href, '_blank', 'noopener,noreferrer')
                      }
                    }}
                  >
                    <div>
                      <div className="aspect-3/2 flex overflow-clip rounded-xl">
                        <div className="flex-1">
                          <div className="relative h-full w-full origin-bottom transition duration-300 group-hover:scale-105">
                            {imageSrc ? (
                              <img
                                src={imageSrc}
                                alt={item.title || ''}
                                className="h-full w-full object-cover object-center"
                              />
                            ) : (
                              <div className="h-full w-full bg-primary-foreground/20" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    {item.label && (
                      <div className="mt-6">
                        <Badge className="bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30">
                          {item.label}
                        </Badge>
                      </div>
                    )}
                    {item.title && (
                      <div className="mb-2 line-clamp-3 break-words pt-4 text-lg font-medium md:mb-3 md:pt-4 md:text-xl lg:pt-4 lg:text-2xl">
                        {item.title}
                      </div>
                    )}
                    {item.description && (
                      <div className="text-primary-foreground/80 mb-8 line-clamp-2 text-sm md:mb-12 md:text-base lg:mb-9">
                        {item.description}
                      </div>
                    )}
                    <div className="flex items-center text-sm">
                      {t('preview')}
                      <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </CarouselItem>
              )
            })}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  )
}

export { GalleryBlock }
