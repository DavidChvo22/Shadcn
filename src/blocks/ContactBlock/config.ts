import type { Block } from 'payload'
export const ContactBlock: Block = {
  slug: 'contactBlock',
  interfaceName: 'ContactBlock',
  labels: {
    singular: 'Contact Block',
    plural: 'Contact Blocks',
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
      required: true,
      label: 'Description',
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      label: 'Phone',
    },
    {
      name: 'email',
      type: 'text',
      required: true,
      label: 'Email',
    },
    {
      name: 'web',
      type: 'text',
      required: true,
      label: 'Web',
    },
  ],
}
