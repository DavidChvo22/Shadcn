import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath } from 'next/cache'

import type { Media } from '../../../payload-types'

// Revalidate all pages when media is updated
// This ensures that pages using the media will show the updated image
export const revalidateMedia: CollectionAfterChangeHook<Media> = async ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    // Find all pages that use this media
    const pages = await payload.find({
      collection: 'pages',
      limit: 1000,
      pagination: false,
      where: {
        or: [
          {
            'hero.media': {
              equals: doc.id,
            },
          },
          {
            'layout.media': {
              equals: doc.id,
            },
          },
        ],
      },
    })

    // Revalidate all pages that use this media
    for (const page of pages.docs || []) {
      if (page._status === 'published') {
        const path = page.slug === 'home' ? '/' : `/${page.slug}`
        payload.logger.info(`Revalidating page "${page.slug}" due to media change`)
        revalidatePath(path)
      }
    }

    payload.logger.info(`Revalidated ${pages.docs?.length || 0} pages after media update`)
  }

  return doc
}

export const revalidateMediaDelete: CollectionAfterDeleteHook<Media> = async ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate && doc) {
    // Find all pages that use this media
    const pages = await payload.find({
      collection: 'pages',
      limit: 1000,
      pagination: false,
      where: {
        or: [
          {
            'hero.media': {
              equals: doc.id,
            },
          },
          {
            'layout.media': {
              equals: doc.id,
            },
          },
        ],
      },
    })

    // Revalidate all pages that use this media
    for (const page of pages.docs || []) {
      if (page._status === 'published') {
        const path = page.slug === 'home' ? '/' : `/${page.slug}`
        payload.logger.info(`Revalidating page "${page.slug}" due to media deletion`)
        revalidatePath(path)
      }
    }

    payload.logger.info(`Revalidated ${pages.docs?.length || 0} pages after media deletion`)
  }

  return doc
}

