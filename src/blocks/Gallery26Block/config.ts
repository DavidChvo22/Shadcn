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
    name: 'colSpan',
    type: 'select',
    required: true,
    label: 'Column Span',
    defaultValue: '2',
    options: [
      { label: '2 columns', value: '2' },
      { label: '3 columns', value: '3' },
      { label: '5 columns (full width)', value: '5' },
    ],
  },
  {
    name: 'alt',
    type: 'text',
    label: 'Alt Text',
  },
] satisfies Block['fields']

export const Gallery26Block: Block = {
  slug: 'gallery26Block',
  interfaceName: 'Gallery26Block',
  labels: {
    singular: 'Gallery 26 Block',
    plural: 'Gallery 26 Blocks',
  },
  fields: [
    {
      name: 'images',
      type: 'array',
      label: 'Images',
      minRows: 1,
      fields: galleryImageFields,
    },
  ],
}


