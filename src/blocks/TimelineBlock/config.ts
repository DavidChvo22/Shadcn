import type { Block } from 'payload'

export const TimelineBlock: Block = {
  slug: 'timelineBlock',
  interfaceName: 'TimelineBlock',
  labels: {
    singular: 'Timeline Block',
    plural: 'Timeline Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
      admin: {
        description: 'Main title text (e.g., "Unlock for your existing workflows")',
      },
    },
    {
      name: 'highlightedText',
      type: 'text',
      label: 'Highlighted Text',
      admin: {
        description: 'Text to highlight in the title (e.g., "AI")',
      },
    },
    {
      name: 'titleBeforeHighlight',
      type: 'text',
      label: 'Text Before Highlight',
      admin: {
        description: 'Text before highlighted text (e.g., "Unlock")',
      },
    },
    {
      name: 'description',
      type: 'textarea',
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
          name: 'icon',
          type: 'select',
          required: true,
          label: 'Icon',
          options: [
            { label: 'Cloud', value: 'cloud' },
            { label: 'XCircle', value: 'xcircle' },
            { label: 'Users', value: 'users' },
            { label: 'Sparkles', value: 'sparkles' },
            { label: 'Zap', value: 'zap' },
            { label: 'Check', value: 'check' },
            { label: 'Star', value: 'star' },
            { label: 'Heart', value: 'heart' },
            { label: 'Settings', value: 'settings' },
            { label: 'Rocket', value: 'rocket' },
          ],
          defaultValue: 'cloud',
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
      ],
    },
  ],
}

