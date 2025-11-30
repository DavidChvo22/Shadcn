import type { Block } from 'payload'

export const CompareBlock: Block = {
  slug: 'compareBlock',
  interfaceName: 'CompareBlock',
  labels: {
    singular: 'Compare Block',
    plural: 'Compare Blocks',
  },
  fields: [
    {
      name: 'leftColumnTitle',
      type: 'text',
      required: true,
      label: 'Left Column Title',
      defaultValue: 'Legacy Features',
    },
    {
      name: 'leftColumnItems',
      type: 'array',
      required: true,
      label: 'Left Column Items',
      minRows: 1,
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          label: 'Text',
        },
      ],
    },
    {
      name: 'rightColumnTitle',
      type: 'text',
      required: true,
      label: 'Right Column Title',
      defaultValue: 'New Features',
    },
    {
      name: 'rightColumnItems',
      type: 'array',
      required: true,
      label: 'Right Column Items',
      minRows: 1,
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          label: 'Text',
        },
      ],
    },
  ],
}

