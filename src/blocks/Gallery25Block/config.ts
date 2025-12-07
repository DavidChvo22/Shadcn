import type { Block } from 'payload'

const galleryImageFields = [
  {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
    required: true,
    label: 'Image',
  },
  {
    name: 'width',
    type: 'select',
    required: true,
    label: 'Width',
    defaultValue: '20vh',
    options: [
      { label: '20vh', value: '20vh' },
      { label: '30vh', value: '30vh' },
    ],
  },
  {
    name: 'alt',
    type: 'text',
    label: 'Alt Text',
  },
] satisfies Block['fields']

export const Gallery25Block: Block = {
  slug: 'gallery25Block',
  interfaceName: 'Gallery25Block',
  labels: {
    singular: 'Gallery 25 Block',
    plural: 'Gallery 25 Blocks',
  },
  fields: [
    {
      name: 'row1',
      type: 'array',
      label: 'Row 1 Images',
      minRows: 1,
      maxRows: 3,
      fields: galleryImageFields,
    },
    {
      name: 'row2',
      type: 'array',
      label: 'Row 2 Images',
      minRows: 1,
      maxRows: 3,
      fields: galleryImageFields,
    },
    {
      name: 'row3',
      type: 'array',
      label: 'Row 3 Images',
      minRows: 1,
      maxRows: 3,
      fields: galleryImageFields,
    },
    {
      name: 'row4',
      type: 'array',
      label: 'Row 4 Images',
      minRows: 1,
      maxRows: 3,
      fields: galleryImageFields,
    },
  ],
}

