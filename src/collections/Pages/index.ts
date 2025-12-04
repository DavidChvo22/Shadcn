import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { Archive } from '../../blocks/ArchiveBlock/config'
import { CallToAction } from '../../blocks/CallToAction/config'
import { Content } from '../../blocks/Content/config'
import { FormBlock } from '../../blocks/Form/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { hero } from '@/heros/config'
import { slugField } from 'payload'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'
import { ExampleBlock } from '../../blocks/ExampleBlock/config'
import { HeaderBlock } from '../../blocks/Header/config'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { FlowBlock } from '@/blocks/FlowBlock/config'
import { FaqBlock } from '@/blocks/FaqBlock/config'
import { ContactBlock } from '@/blocks/ContactBlock/config'
import { OptionsBlock } from '@/blocks/OptionsBlock/config'
import { CTABlock } from '@/blocks/CTABlock/config'
import { ReferenceBlock } from '@/blocks/ReferenceBlock/config'
import { ConfiguratorBlock } from '@/blocks/ConfiguratorBlock/config'
import { StepsGrid } from '@/blocks/StepsGrid/config'
import { ExplainBlock } from '@/blocks/ExplainBlock/config'
import { CompareBlock } from '@/blocks/CompareBlock/config'
import { TimelineBlock } from '@/blocks/TimelineBlock/config'
import { GalleryBlock } from '@/blocks/GalleryBlock/config'
import { FeatureCardsBlock } from '@/blocks/FeatureCardsBlock/config'
import { ProcessBlock } from '@/blocks/ProcessBlock/config'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'pages',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'pages',
        req,
      }),
    useAsTitle: ((data: any) => {
      if (typeof data?.title === 'string') {
        return data.title
      }
      if (data?.title && typeof data.title === 'object') {
        return data.title.sk || data.title.en || data.title[Object.keys(data.title)[0]] || 'Untitled'
      }
      return data?.slug || 'Untitled'
    }) as any,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [hero],
          label: 'Hero',
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [
                CallToAction,
                Content,
                MediaBlock,
                Archive,
                FormBlock,
                ExampleBlock,
                HeaderBlock,
                FlowBlock,
                FaqBlock,
                ContactBlock,
                OptionsBlock,
                CTABlock,
                ReferenceBlock,
                ConfiguratorBlock,
                StepsGrid,
                ExplainBlock,
                CompareBlock,
                TimelineBlock,
                GalleryBlock,
                FeatureCardsBlock,
                ProcessBlock,
              ],
              required: true,
              localized: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: 'Content',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
