import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'tagline',
      type: 'textarea',
      defaultValue: 'Black American-style Gospel from Ghent, Belgium.',
    },
    {
      name: 'bookingEmail',
      type: 'text',
      defaultValue: 'info@pelive.be',
    },
    {
      name: 'ticketUrl',
      type: 'text',
      defaultValue: 'https://ticketsgent.be/producties/pe-live-in-concert',
    },
    {
      name: 'socialLinks',
      type: 'array',
      maxRows: 6,
      admin: {
        description: 'Social profiles shown in the footer and contact section',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'creditLabel',
      type: 'text',
      defaultValue: 'Pilarres',
      admin: {
        description: '"Website by …" credit in the footer bottom bar',
      },
    },
    {
      name: 'creditUrl',
      type: 'text',
      defaultValue: 'https://pilarres.com',
    },
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
