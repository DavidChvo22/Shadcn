import type { Block } from 'payload'

export const StepsGrid: Block = {
  slug: 'stepsGrid',
  interfaceName: 'StepsGrid',
  labels: {
    singular: 'Steps Grid',
    plural: 'Steps Grids',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle',
    },
    {
      name: 'variant',
      type: 'select',
      options: [
        { label: 'Blue background', value: 'blue' },
        { label: 'White background', value: 'white' },
      ],
      defaultValue: 'blue',
      label: 'Variant',
    },
    {
      name: 'steps',
      type: 'array',
      required: true,
      label: 'Steps',
      minRows: 1,
      fields: [
        {
          name: 'number',
          type: 'number',
          label: 'Number',
          admin: {
            step: 1,
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
          type: 'textarea',
          label: 'Description',
        },
      ],
    },
  ],
}
