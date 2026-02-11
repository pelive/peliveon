import type { CollectionConfig } from 'payload'

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'location', 'featured'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'date',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g., "March 15, 2024" or "July-August 2024"',
      },
    },
    {
      name: 'location',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Check if this is the featured event (shown prominently at the top)',
      },
    },
    {
      name: 'image',
      type: 'relationship',
      relationTo: 'media',
      admin: {
        description: 'Image for featured events (required for featured events)',
      },
    },
    {
      name: 'fullDescription',
      type: 'textarea',
      admin: {
        description: 'Detailed description for featured events (supports markdown)',
      },
    },
    {
      name: 'ticketUrl',
      type: 'text',
      admin: {
        description: 'URL for ticket purchases',
      },
    },
  ],
  timestamps: true,
}
