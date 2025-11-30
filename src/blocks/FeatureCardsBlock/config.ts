import type { Block } from 'payload'

export const FeatureCardsBlock: Block = {
  slug: 'featureCardsBlock',
  interfaceName: 'FeatureCardsBlock',
  labels: {
    singular: 'Feature Cards Block',
    plural: 'Feature Cards Blocks',
  },
  fields: [
    {
      name: 'cards',
      type: 'array',
      required: true,
      label: 'Cards',
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Title',
        },
        {
          name: 'link',
          type: 'text',
          label: 'Link URL',
        },
        {
          name: 'background',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Background Image',
        },
      ],
    },
  ],
}
