import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'

export const FrontPageComponents: CollectionConfig = {
  slug: 'front-page-components',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'componentType', 'order', 'enabled'],
    group: 'Front Page',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Internal title for this component instance',
      },
    },
    {
      name: 'componentType',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Hero Section',
          value: 'hero',
        },
        {
          label: 'Who We Are',
          value: 'whoWeAre',
        },
        {
          label: 'What We Do',
          value: 'whatWeDo',
        },
        {
          label: 'Up Next Events',
          value: 'upNext',
        },
        {
          label: 'Past Performances',
          value: 'pastPerformances',
        },
        {
          label: 'Contact',
          value: 'contact',
        },
        {
          label: 'Call to Action',
          value: 'callToAction',
        },
        {
          label: 'Content Section',
          value: 'content',
        },
        {
          label: 'Media Gallery',
          value: 'media',
        },
      ],
      admin: {
        description: 'Type of component to display',
      },
    },
    {
      name: 'enabled',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Enable/disable this component',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Order in which this component appears on the page',
        step: 1,
      },
    },
    // Hero specific fields
    {
      name: 'heroContent',
      type: 'group',
      fields: [
        {
          name: 'headline',
          type: 'text',
          required: true,
          defaultValue: 'PE LIVE',
        },
        {
          name: 'subheadline',
          type: 'text',
          defaultValue: 'Gospel Music with an Attitude',
        },
        {
          name: 'backgroundImage',
          type: 'relationship',
          relationTo: 'media',
        },
        {
          name: 'ctaText',
          type: 'text',
          defaultValue: 'Experience the Power',
        },
        {
          name: 'ctaLink',
          type: 'text',
          defaultValue: '#upcoming',
        },
      ],
      admin: {
        condition: (data) => data.componentType === 'hero',
      },
    },
    // Who We Are specific fields
    {
      name: 'whoWeAreContent',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Who We Are',
        },
        {
          name: 'content',
          type: 'richText',
          required: true,
        },
        {
          name: 'backgroundImage',
          type: 'relationship',
          relationTo: 'media',
        },
      ],
      admin: {
        condition: (data) => data.componentType === 'whoWeAre',
      },
    },
    // What We Do specific fields
    {
      name: 'whatWeDoContent',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'What We Do',
        },
        {
          name: 'content',
          type: 'richText',
          required: true,
        },
        {
          name: 'services',
          type: 'array',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
            },
            {
              name: 'icon',
              type: 'text',
              admin: {
                description: 'Icon name or emoji',
              },
            },
          ],
        },
      ],
      admin: {
        condition: (data) => data.componentType === 'whatWeDo',
      },
    },
    // Call to Action specific fields
    {
      name: 'ctaContent',
      type: 'group',
      fields: [
        {
          name: 'headline',
          type: 'text',
          required: true,
        },
        {
          name: 'subheadline',
          type: 'textarea',
        },
        {
          name: 'buttonText',
          type: 'text',
          defaultValue: 'Get in Touch',
        },
        {
          name: 'buttonLink',
          type: 'text',
          required: true,
        },
        {
          name: 'backgroundColor',
          type: 'select',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Dark', value: 'dark' },
          ],
          defaultValue: 'primary',
        },
      ],
      admin: {
        condition: (data) => data.componentType === 'callToAction',
      },
    },
    // Content specific fields
    {
      name: 'contentSection',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'content',
          type: 'richText',
          required: true,
        },
        {
          name: 'alignment',
          type: 'select',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Center', value: 'center' },
            { label: 'Right', value: 'right' },
          ],
          defaultValue: 'left',
        },
      ],
      admin: {
        condition: (data) => data.componentType === 'content',
      },
    },
    // Media specific fields
    {
      name: 'mediaContent',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'media',
          type: 'array',
          fields: [
            {
              name: 'media',
              type: 'relationship',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'caption',
              type: 'text',
            },
          ],
        },
        {
          name: 'layout',
          type: 'select',
          options: [
            { label: 'Grid', value: 'grid' },
            { label: 'Carousel', value: 'carousel' },
            { label: 'Masonry', value: 'masonry' },
          ],
          defaultValue: 'grid',
        },
      ],
      admin: {
        condition: (data) => data.componentType === 'media',
      },
    },
  ],
  timestamps: true,
}
