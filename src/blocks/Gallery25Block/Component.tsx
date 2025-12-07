'use client'

import { motion } from 'framer-motion'
import React from 'react'

import type { Gallery25Block as Gallery25BlockProps, Media } from '@/payload-types'

type RowType = Gallery25BlockProps['row1']

const getMediaUrl = (image: string | Media | null | undefined) => {
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

const getAltText = (image: string | Media | null | undefined, alt?: string | null) => {
  if (alt) return alt
  if (typeof image === 'object' && image !== null) {
    const media = image as Media
    return media.alt || 'Gallery Image'
  }
  return 'Gallery Image'
}

const getFocalPoint = (image: string | Media | null | undefined): string | undefined => {
  if (!image || typeof image !== 'object') return undefined
  const media = image as Media
  // Payload CMS stores focal point as focalX and focalY (numbers 0-100)
  if (typeof media.focalX === 'number' && typeof media.focalY === 'number') {
    return `${media.focalX}% ${media.focalY}%`
  }
  return undefined
}

const Gallery25Block: React.FC<Gallery25BlockProps> = ({ row1, row2, row3, row4 }) => {
  // Combine all rows into a single array
  const allImages: Array<{
    image: string | Media | null | undefined
    alt?: string | null
    id?: string | null
  }> = []

  if (row1) allImages.push(...row1)
  if (row2) allImages.push(...row2)
  if (row3) allImages.push(...row3)
  if (row4) allImages.push(...row4)

  const hasContent = allImages.length > 0

  if (!hasContent) {
    return null
  }

  return (
    <section className="py-32">
      <div className="container relative">
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4">
          {allImages.map((imageItem, index) => {
            const imageSrc = getMediaUrl(imageItem.image)
            const altText = getAltText(imageItem.image, imageItem.alt)
            const focalPoint = getFocalPoint(imageItem.image)

            // Create diversity using index-based aspect ratios
            const aspectRatios = [
              'aspect-[3/4]', // Tall
              'aspect-[4/5]', // Slightly tall
              'aspect-square', // Square
              'aspect-[5/4]', // Slightly wide
              'aspect-[3/2]', // Wide
            ]
            const aspectClass = aspectRatios[index % aspectRatios.length]

            return (
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.9,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                key={imageItem.id || index}
                className="break-inside-avoid mb-4"
              >
                <div
                  className={`w-full ${aspectClass} overflow-hidden rounded-2xl ${imageSrc ? 'bg-muted' : 'bg-transparent'}`}
                >
                  {imageSrc && (
                    <img
                      className="w-full h-full rounded-2xl object-contain object-top"
                      src={imageSrc}
                      alt={altText}
                      style={focalPoint ? { objectPosition: focalPoint } : undefined}
                    />
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export { Gallery25Block }
