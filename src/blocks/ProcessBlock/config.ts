import type { Block } from 'payload'

export const ProcessBlock: Block = {
  slug: 'processBlock',
  interfaceName: 'ProcessBlock',
  labels: {
    singular: 'Process Block',
    plural: 'Process Blocks',
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
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'buttonText',
      type: 'text',
      label: 'Button Text',
    },
    {
      name: 'buttonLink',
      type: 'text',
      label: 'Button Link',
    },
    {
      name: 'steps',
      type: 'array',
      required: true,
      label: 'Steps',
      minRows: 1,
      fields: [
        {
          name: 'step',
          type: 'text',
          label: 'Step Number',
          admin: {
            description: 'Step number (e.g., "01", "02")',
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
          required: true,
          label: 'Description',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Image',
        },
      ],
    },
  ],
}
