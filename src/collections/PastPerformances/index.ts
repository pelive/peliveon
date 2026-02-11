import type { CollectionConfig } from 'payload'

export const PastPerformances: CollectionConfig = {
  slug: 'past-performances',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'year', 'event', 'videoUrl'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'year',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g., "2021", "2022"',
      },
    },
    {
      name: 'event',
      type: 'text',
      required: true,
      admin: {
        description: 'Event name or venue',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'videoUrl',
      type: 'text',
      admin: {
        description: 'YouTube or video URL for the performance',
      },
    },
    {
      name: 'image',
      type: 'relationship',
      relationTo: 'media',
      admin: {
        description: 'Optional image for the performance',
      },
    },
  ],
  timestamps: true,
}
