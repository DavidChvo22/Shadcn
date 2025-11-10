import type { Block } from 'payload'
export const HeaderBlock: Block = {
  slug: 'headerBlock',
  interfaceName: 'HeaderBlock',
  labels: {
    singular: 'Header Block',
    plural: 'Header Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
    },
    {
      name: 'description',
      type: 'text',
      required: false,
      label: 'Description',
    },
    {
      name: 'buttonText',
      type: 'text',
      required: true,
      label: 'Button Text',
    },
    {
      name: 'buttonLink',
      type: 'text',
      required: true,
      label: 'Button Link',
    },
  ],
}
