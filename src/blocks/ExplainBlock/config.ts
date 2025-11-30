import type { Block } from 'payload'

export const ExplainBlock: Block = {
  slug: 'explainBlock',
  interfaceName: 'ExplainBlock',
  labels: {
    singular: 'Explain Block',
    plural: 'Explain Blocks',
  },
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Badge',
      admin: {
        description: 'Small uppercase text above the title',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
    },
    {
      name: 'description',
      type: 'text',
      label: 'Description',
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      label: 'Items',
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Title',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Description',
        },
      ],
    },
  ],
}
