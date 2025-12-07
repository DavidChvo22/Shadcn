'use client'

import React from 'react'

import type { Gallery26Block as Gallery26BlockProps, Media } from '@/payload-types'

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


const Gallery26Block: React.FC<Gallery26BlockProps> = ({ images }) => {
  if (!images || images.length === 0) {
    return null
  }

  return (
    <section className="py-32">
      <div className="container relative">
        <div className="grid grid-cols-5 gap-4">
          {images.map((imageItem, index) => {
            const imageSrc = getMediaUrl(imageItem.image)
            const altText = getAltText(imageItem.image, imageItem.alt)
            const colSpan = (imageItem as any).colSpan || '2'
            const height = (imageItem as any).height || 'h-82'

            if (!imageSrc) return null

            // Map colSpan to Tailwind classes
            const colSpanClass =
              colSpan === '2'
                ? 'col-span-2'
                : colSpan === '3'
                  ? 'col-span-3'
                  : colSpan === '5'
                    ? 'col-span-5'
                    : 'col-span-2'

            return (
              <div
                key={imageItem.id || index}
                className={`${height} ${colSpanClass} rounded-[2.5rem] overflow-hidden`}
              >
                <img
                  width={200}
                  height={200}
                  className="size-full rounded-[2.5rem] object-cover"
                  src={imageSrc}
                  alt={altText}
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export { Gallery26Block }

