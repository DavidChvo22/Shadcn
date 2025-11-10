import type { Block } from 'payload'
export const ExampleBlock: Block = {
  slug: 'exampleBlock',
  interfaceName: 'ExampleBlock',
  labels: {
    singular: 'Example Block',
    plural: 'Example Blocks',
  },
  fields: [
    {
      name: 'exampleText',
      type: 'text',
      required: true,
      label: 'Example Text',
      admin: {
        description: 'Enter some example text to display in this block',
      },
    },
  ],
}
