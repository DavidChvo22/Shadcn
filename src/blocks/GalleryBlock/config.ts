import type { Block } from 'payload'

const galleryItemFields = [
  {
    name: 'title',
    type: 'text',
    required: true,
    label: 'Card title',
  },
  {
    name: 'description',
    type: 'textarea',
    label: 'Description',
  },
  {
    name: 'label',
    type: 'text',
    label: 'Badge label',
  },
  {
    name: 'href',
    type: 'text',
    label: 'Link URL',
  },
  {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
    label: 'Image',
    required: true,
  },
] satisfies Block['fields']

export const GalleryBlock: Block = {
  slug: 'galleryBlock',
  interfaceName: 'GalleryBlock',
  labels: {
    singular: 'Gallery Block',
    plural: 'Gallery Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Section Title',
      defaultValue: 'Case Studies',
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      label: 'Cards',
      fields: galleryItemFields,
    },
  ],
}

