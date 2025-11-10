import type { Block } from 'payload'
export const OptionsBlock: Block = {
  slug: 'optionsBlock',
  interfaceName: 'OptionsBlock',
  labels: {
    singular: 'Options Block',
    plural: 'Options Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: false,
      label: 'Title',
    },
    {
      name: 'description',
      type: 'text',
      required: false,
      label: 'Description',
    },
    {
      name: 'checkedItems',
      type: 'array',
      required: true,
      label: 'Checked Items',
      minRows: 1,
      maxRows: 3,
      fields: [{ name: 'item', type: 'text', required: false, label: 'Item' }],
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
