import type { Block } from 'payload'
export const FaqBlock: Block = {
  slug: 'faqBlock',
  interfaceName: 'FaqBlock',
  labels: {
    singular: 'Faq Block',
    plural: 'Faq Blocks',
  },
  fields: [
    {
      name: 'faqs',
      type: 'array',
      label: 'Faqs',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
          label: 'Question',
        },
        {
          name: 'answer',
          type: 'textarea',
          required: true,
          label: 'Answer',
        },
      ],
    },
  ],
}
