import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  CollectionBeforeChangeHook,
} from 'payload'

import { revalidatePath } from 'next/cache'

import type { Media } from '../../../payload-types'

// Note: Focal point is used via CSS object-position in components
// Image sizes regeneration after focal point change is a known issue in Payload CMS
// See: https://github.com/payloadcms/payload/issues/12234
// The focal point values (focalX, focalY) are used directly in CSS, so imageSizes regeneration
// is not critical for the visual display

// Revalidate all pages when media is updated
// This ensures that pages using the media will show the updated image
export const revalidateMedia: CollectionAfterChangeHook<Media> = async ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    // Check if focal point changed
    const focalPointChanged =
      previousDoc &&
      (previousDoc.focalX !== doc.focalX || previousDoc.focalY !== doc.focalY)

    if (focalPointChanged) {
      payload.logger.info(
        `Focal point changed for media ${doc.id}, image sizes should be regenerated`,
      )
    }

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



