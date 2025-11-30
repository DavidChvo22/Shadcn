import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
        {
          label: 'Custom',
          value: 'customHero',
        },
        {
          label: 'Hero 223',
          value: 'hero223',
        },
        {
          label: 'Hero 243',
          value: 'hero243',
        },
        {
          label: 'Hero 34',
          value: 'hero34',
        },
      ],
      required: true,
    },
    {
      name: 'title',
      type: 'richText',
      label: 'Title',
      localized: true,
      admin: {
        condition: (_, { type } = {}) => type === 'customHero',
      },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      localized: true,
      admin: {
        condition: (_, { type } = {}) => type === 'customHero',
      },
      required: false,
    },
    {
      name: 'buttonText',
      type: 'text',
      label: 'Button Text',
      localized: true,
      admin: {
        condition: (_, { type } = {}) => type === 'customHero',
      },
    },
    {
      name: 'buttonLink',
      type: 'text',
      label: 'Button Link',
      localized: true,
      admin: {
        condition: (_, { type } = {}) => type === 'customHero',
      },
    },

    {
      name: 'richText',
      type: 'richText',
      label: 'Rich Text',
      localized: true,
      admin: {
        condition: (_, { type } = {}) => ['lowImpact', 'highImpact', 'mediumImpact'].includes(type),
      },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'media',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact', 'hero223', 'hero34'].includes(type),
      },
      relationTo: 'media',
      required: true,
    },
    {
      name: 'badge',
      type: 'text',
      label: 'Badge',
      localized: true,
      admin: {
        condition: (_, { type } = {}) => type === 'hero34',
      },
    },
    {
      name: 'hero34Title',
      type: 'text',
      label: 'Title',
      localized: true,
      admin: {
        condition: (_, { type } = {}) => type === 'hero34',
      },
    },
    {
      name: 'hero34Description',
      type: 'textarea',
      label: 'Description',
      localized: true,
      admin: {
        condition: (_, { type } = {}) => type === 'hero34',
      },
    },
    {
      name: 'primaryButtonText',
      type: 'text',
      label: 'Primary Button Text',
      localized: true,
      admin: {
        condition: (_, { type } = {}) => type === 'hero34',
      },
    },
    {
      name: 'primaryButtonLink',
      type: 'text',
      label: 'Primary Button Link',
      localized: true,
      admin: {
        condition: (_, { type } = {}) => type === 'hero34',
      },
    },
    {
      name: 'secondaryButtonText',
      type: 'text',
      label: 'Secondary Button Text',
      localized: true,
      admin: {
        condition: (_, { type } = {}) => type === 'hero34',
      },
    },
    {
      name: 'secondaryButtonLink',
      type: 'text',
      label: 'Secondary Button Link',
      localized: true,
      admin: {
        condition: (_, { type } = {}) => type === 'hero34',
      },
    },
  ],
  label: false,
}
