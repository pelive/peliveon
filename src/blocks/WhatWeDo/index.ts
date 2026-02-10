import type { Block } from 'payload'

export const WhatWeDo: Block = {
  slug: 'whatWeDo',
  interfaceName: 'WhatWeDo',
  fields: [
    {
      name: 'enable',
      type: 'checkbox',
      defaultValue: true,
      label: 'Enable Section',
    },
    {
      name: 'title',
      type: 'text',
      defaultValue: 'What We Do',
      label: 'Section Title',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Subtitle',
      defaultValue: 'From electrifying concerts to intimate celebrations, PE LIVE brings the power and passion of Gospel music to every occasion.',
    },
    {
      name: 'services',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Service Title',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Service Description',
        },
        {
          name: 'image',
          type: 'relationship',
          relationTo: 'media',
          required: false,
          label: 'Service Image',
        },
      ],
      label: 'Services',
      minRows: 3,
      maxRows: 3,
    },
  ],
}
