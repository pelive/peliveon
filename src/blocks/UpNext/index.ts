import type { Block } from 'payload'

export const UpNext: Block = {
  slug: 'upNext',
  interfaceName: 'UpNext',
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
      defaultValue: 'Up Next',
      label: 'Section Title',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Subtitle',
      defaultValue: "Don't miss out on our upcoming performances and events. Join us as we continue to bring the power of Gospel music to audiences across Belgium!",
    },
    {
      name: 'featuredEvent',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Featured Event Title',
        },
        {
          name: 'date',
          type: 'text',
          required: true,
          label: 'Event Date',
        },
        {
          name: 'location',
          type: 'text',
          required: true,
          label: 'Event Location',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Event Description',
        },
        {
          name: 'image',
          type: 'relationship',
          relationTo: 'media',
          required: false,
          label: 'Event Image',
        },
        {
          name: 'ticketUrl',
          type: 'text',
          label: 'Ticket URL',
        },
      ],
      label: 'Featured Event',
    },
    {
      name: 'additionalEvents',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Event Title',
        },
        {
          name: 'date',
          type: 'text',
          required: true,
          label: 'Event Date',
        },
        {
          name: 'location',
          type: 'text',
          required: true,
          label: 'Event Location',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Event Description',
        },
        {
          name: 'ticketUrl',
          type: 'text',
          label: 'Ticket URL',
        },
      ],
      label: 'Additional Events',
    },
    {
      name: 'mailingListText',
      type: 'text',
      defaultValue: 'Want to stay updated with our latest events?',
      label: 'Mailing List Text',
    },
    {
      name: 'mailingListLinkText',
      type: 'text',
      defaultValue: 'Join our mailing list',
      label: 'Mailing List Link Text',
    },
  ],
}
