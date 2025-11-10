import { Block } from 'payload'

export const CTABlock: Block = {
  slug: 'ctaBlock',
  interfaceName: 'CTABlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
    },
    {
      name: 'description',
      type: 'text',
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
      required: true,
      label: 'Button Link',
    },
  ],
}
