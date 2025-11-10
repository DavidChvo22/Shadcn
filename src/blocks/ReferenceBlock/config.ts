import type { Block } from 'payload'
export const ReferenceBlock: Block = {
  slug: 'referenceBlock',
  interfaceName: 'ReferenceBlock',
  labels: {
    singular: 'Reference Block',
    plural: 'Reference Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: false,
      label: 'Title',
    },
    {
      name: 'testimonials',
      type: 'array',
      required: true,
      label: 'Testimonials',
      minRows: 1,
      maxRows: 6,
      fields: [
        { name: 'name', type: 'text', required: true, label: 'Name' },
        { name: 'role', type: 'text', required: true, label: 'Role' },
        {
          name: 'avatar',
          type: 'select',
          required: true,
          label: 'Avatar',
          options: [
            { label: 'Male', value: '1' },
            { label: 'Female', value: '2' },
          ],
        },
        { name: 'content', type: 'textarea', required: true, label: 'Content' },
      ],
    },
  ],
}
