import type { Block, Field } from 'payload'

const blockFields: Field[] = [
  {
    name: 'blockName',
    type: 'select',
    required: true,
    label: 'Block Name',
    options: [
      {
        label: 'CTABlock',
        value: 'CTABlock',
      },
      {
        label: 'FlowBlock',
        value: 'FlowBlock',
      },
      {
        label: 'FaqBlock',
        value: 'FaqBlock',
      },
      {
        label: 'ReferenceBlock',
        value: 'ReferenceBlock',
      },
      {
        label: 'OptionsBlock',
        value: 'OptionsBlock',
      },
      {
        label: 'ContactBlock',
        value: 'ContactBlock',
      },
    ],
  },
  {
    name: 'default',
    type: 'checkbox',
    defaultValue: false,
    label: 'Default',
  },
  {
    name: 'price',
    type: 'number',
    defaultValue: 0,
    label: 'Price',
    admin: {
      step: 1,
    },
  },
]

const pageFields: Field[] = [
  {
    name: 'name',
    type: 'text',
    required: true,
    label: 'Page Name',
  },
  {
    name: 'default',
    type: 'checkbox',
    defaultValue: false,
    label: 'Default',
  },
  {
    name: 'price',
    type: 'number',
    defaultValue: 0,
    label: 'Price',
    admin: {
      step: 1,
    },
  },
  {
    name: 'blocks',
    type: 'array',
    label: 'Blocks',
    admin: {
      initCollapsed: true,
    },
    fields: blockFields,
  },
]

const subcategoryFields: Field[] = [
  {
    name: 'name',
    type: 'text',
    required: true,
    label: 'Subcategory Name',
  },
  {
    name: 'description',
    type: 'text',
    label: 'Description',
  },
  {
    name: 'pages',
    type: 'array',
    label: 'Pages',
    admin: {
      initCollapsed: true,
    },
    fields: pageFields,
  },
]

const categoryFields: Field[] = [
  {
    name: 'name',
    type: 'text',
    required: true,
    label: 'Category Name',
  },
  {
    name: 'subcategories',
    type: 'array',
    label: 'Subcategories',
    admin: {
      initCollapsed: true,
    },
    fields: subcategoryFields,
  },
]

export const ConfiguratorBlock: Block = {
  slug: 'configuratorBlock',
  interfaceName: 'ConfiguratorBlock',
  labels: {
    singular: 'Configurator Block',
    plural: 'Configurator Blocks',
  },
  fields: [
    {
      name: 'categories',
      type: 'array',
      label: 'Categories',
      admin: {
        initCollapsed: false,
      },
      fields: categoryFields,
    },
  ],
}
