import type { CollectionConfig } from 'payload'

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'eventDate', 'location', 'featured'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'eventDate',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        description: 'The actual date of the event',
      },
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Brief summary for listings and previews',
      },
    },
    {
      name: 'fullDescription',
      type: 'richText',
      required: true,
      admin: {
        description: 'Complete event details and information',
      },
    },
    {
      name: 'location',
      type: 'text',
      required: true,
    },
    {
      name: 'doorsTime',
      type: 'text',
      admin: {
        description: 'Optional doors/show times shown on the featured event, e.g. "19:30 / 20:00"',
      },
    },
    {
      name: 'featured',
      type: 'radio',
      options: [
        {
          label: 'Not Featured',
          value: 'none',
        },
        {
          label: 'Featured Event',
          value: 'featured',
        },
      ],
      defaultValue: 'none',
      admin: {
        description: 'Only one event can be featured at a time',
      },
    },
    {
      name: 'image',
      type: 'relationship',
      relationTo: 'media',
      admin: {
        description: 'Event image (recommended for featured events)',
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
  hooks: {
    beforeChange: [
      async ({ data, operation, req }) => {
        // If this event is being set as featured, unset all other featured events
        if (data.featured === 'featured' && operation === 'update' && data.id) {
          await req.payload.update({
            collection: 'events',
            where: {
              and: [
                { featured: { equals: 'featured' } },
                { id: { not_equals: data.id } },
              ],
            },
            data: { featured: 'none' },
            overrideAccess: true,
            req,
          })
        }
        return data
      },
    ],
  },
}
