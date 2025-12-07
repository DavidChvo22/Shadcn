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
  const getGridColumns = (images: RowType | undefined) => {
    if (!images || images.length === 0) return '1fr'
    if (images.length === 1) return '1fr'
    if (images.length === 2) return '1fr 1fr'
    if (images.length === 3) {
      // Use widths from CMS, normalize to sum to 100%
      const widths = images.map((item) => {
        const width = (item as any).width || '20vh'
        // Extract numeric value from vh
        const match = width.match(/(\d+\.?\d*)/)
        return match ? parseFloat(match[1]) : 20
      })
      const total = widths.reduce((sum, w) => sum + w, 0)
      return widths.map((w) => `${(w / total) * 100}%`).join(' ')
    }
    return '1fr 1fr 1fr'
  }

  const renderRow = (images: RowType | undefined, initialX: number, key: string) => {
    if (!images || images.length === 0) return null

    return (
      <>
        {images.map((imageItem, index) => {
          const imageSrc = getMediaUrl(imageItem.image)
          const altText = getAltText(imageItem.image, imageItem.alt)
          const focalPoint = getFocalPoint(imageItem.image)

          if (!imageSrc) return null

          return (
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
                x: initialX,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
                x: 0,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              key={imageItem.id || index}
              className="bg-muted w-full overflow-hidden rounded-2xl"
              style={{ height: '20rem' }}
            >
              <img
                className={`h-full w-full rounded-2xl aspect-square md:aspect-auto ${
                  (imageItem as any).width === '20vh'
                    ? 'object-fill md:object-cover'
                    : 'object-fill md:object-cover'
                }`}
                src={imageSrc}
                alt={altText}
                style={focalPoint ? { objectPosition: focalPoint } : undefined}
              />
            </motion.div>
          )
        })}
      </>
    )
  }

  const hasContent = row1?.length || row2?.length || row3?.length || row4?.length

  if (!hasContent) {
    return null
  }

  return (
    <section className="py-32">
      <div className="container relative">
        <div className="grid gap-4">
          {/* Row 1 */}
          {row1 && row1.length > 0 && row1.length <= 3 && (
            <div className="grid gap-4" style={{ gridTemplateColumns: getGridColumns(row1) }}>
              {renderRow(row1, 50, 'row1')}
            </div>
          )}

          {/* Row 2 */}
          {row2 && row2.length > 0 && row2.length <= 3 && (
            <div className="grid gap-4" style={{ gridTemplateColumns: getGridColumns(row2) }}>
              {renderRow(row2, -50, 'row2')}
            </div>
          )}

          {/* Row 3 */}
          {row3 && row3.length > 0 && row3.length <= 3 && (
            <div className="grid gap-4" style={{ gridTemplateColumns: getGridColumns(row3) }}>
              {renderRow(row3, 50, 'row3')}
            </div>
          )}

          {/* Row 4 */}
          {row4 && row4.length > 0 && row4.length <= 3 && (
            <div className="grid gap-4" style={{ gridTemplateColumns: getGridColumns(row4) }}>
              {renderRow(row4, -50, 'row4')}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export { Gallery25Block }
