import type { Block } from 'payload'

export const PastPerformances: Block = {
  slug: 'pastPerformances',
  interfaceName: 'PastPerformances',
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
      defaultValue: 'Past Performances',
      label: 'Section Title',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Subtitle',
      defaultValue: 'Relive the magic of our previous performances. Explore our journey through the power of Gospel music across Belgium.',
    },
    {
      name: 'maxEvents',
      type: 'number',
      defaultValue: 6,
      admin: {
        description: 'Maximum number of past events to display',
        step: 1,
      },
    },
    {
      name: 'showGallery',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Display events in a gallery format with images',
      },
    },
    {
      name: 'groupByYear',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Group performances by year',
      },
    },
    {
      name: 'fallbackContent',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Fallback Title',
          defaultValue: 'No Past Performances Yet',
        },
        {
          name: 'message',
          type: 'textarea',
          label: 'Fallback Message',
          defaultValue: 'We\'re just getting started! Check back soon to see our amazing performances.',
        },
      ],
      admin: {
        description: 'Content to display when no past events are available',
      },
    },
  ],
}
