import type { Block } from 'payload'
export const FlowBlock: Block = {
  slug: 'postupBlock',
  interfaceName: 'FlowBlock',
  labels: {
    singular: 'Flow Block',
    plural: 'Flow Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: false,
      label: 'Title',
    },
    {
      name: 'steps',
      type: 'array',
      required: true,
      label: 'Steps',
      minRows: 3,
      maxRows: 3,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Step Title',
        },
        {
          name: 'subtitle',
          type: 'text',
          required: true,
          label: 'Step Subtitle',
        },
        {
          name: 'description',
          type: 'text',
          required: true,
          label: 'Step Description',
        },
      ],
    },
  ],
}
