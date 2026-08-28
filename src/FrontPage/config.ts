import type { GlobalConfig } from 'payload'

import { revalidateFrontPage } from './hooks/revalidateFrontPage'
import { defaultLexical } from '@/fields/defaultLexical'

export const FrontPage: GlobalConfig = {
  slug: 'frontPage',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Front Page',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            {
              name: 'hero',
              type: 'group',
              fields: [
                {
                  name: 'eyebrow',
                  type: 'text',
                  required: true,
                  defaultValue: 'PE LIVE · In Concert, Ghent',
                },
                {
                  name: 'tagline',
                  type: 'text',
                  defaultValue: 'Sing · Feel · Connect',
                  admin: {
                    description: 'Brand tagline shown under the hero title and in the footer',
                  },
                },
                {
                  name: 'titlePrefix',
                  type: 'text',
                  required: true,
                  defaultValue: '#',
                },
                {
                  name: 'titleHighlight',
                  type: 'text',
                  required: true,
                  defaultValue: 'Epiphany Reloaded',
                },
                {
                  name: 'ticketLabel',
                  type: 'text',
                  required: true,
                  defaultValue: 'Info & Tickets',
                },
                {
                  name: 'ticketUrl',
                  type: 'text',
                  required: true,
                  defaultValue: 'https://ticketsgent.be/producties/pe-live-in-concert',
                },
                {
                  name: 'secondaryCtaLabel',
                  type: 'text',
                  defaultValue: 'Book the band',
                  admin: {
                    description: 'Label of the outlined button next to Get Tickets (links to the contact section)',
                  },
                },
                {
                  name: 'fallback',
                  type: 'group',
                  admin: {
                    description:
                      'Default hero shown when there is no upcoming featured event (no dates, no ticket buttons)',
                  },
                  fields: [
                    {
                      name: 'eyebrow',
                      type: 'text',
                      defaultValue: 'Gospel · Ghent, Belgium',
                    },
                    {
                      name: 'titlePrefix',
                      type: 'text',
                      defaultValue: 'Gospel music',
                    },
                    {
                      name: 'titleHighlight',
                      type: 'text',
                      defaultValue: 'with an attitude.',
                    },
                    {
                      name: 'subtitle',
                      type: 'textarea',
                      defaultValue:
                        'Black American-style Gospel from Ghent — twenty-plus voices, a live band, and a room that never stays seated.',
                    },
                  ],
                },
                {
                  name: 'backgroundImage',
                  type: 'relationship',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'partnerLogos',
                  type: 'array',
                  fields: [
                    {
                      name: 'name',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'logo',
                      type: 'relationship',
                      relationTo: 'media',
                      required: true,
                    },
                    {
                      name: 'darkenOnLight',
                      type: 'checkbox',
                      defaultValue: false,
                      admin: {
                        description:
                          'Enable for white/light logo artwork so it stays visible on light backgrounds',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Who We Are',
          fields: [
            {
              name: 'whoWeAre',
              type: 'group',
              fields: [
                {
                  name: 'enable',
                  type: 'checkbox',
                  defaultValue: true,
                },
                {
                  name: 'eyebrow',
                  type: 'text',
                  defaultValue: 'Who we are',
                },
                {
                  name: 'backgroundImage',
                  type: 'relationship',
                  relationTo: 'media',
                },
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  defaultValue: 'Who We Are',
                },
                {
                  name: 'content',
                  type: 'richText',
                  editor: defaultLexical,
                  required: true,
                },
                {
                  name: 'stats',
                  type: 'array',
                  maxRows: 4,
                  admin: {
                    description: 'Headline numbers shown under the text, e.g. "10+ / Years on stage"',
                  },
                  fields: [
                    {
                      name: 'value',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'label',
                      type: 'text',
                      required: true,
                    },
                  ],
                },
                {
                  name: 'images',
                  type: 'array',
                  maxRows: 3,
                  admin: {
                    description: 'Photo collage next to the text (first image is the large one)',
                  },
                  fields: [
                    {
                      name: 'image',
                      type: 'relationship',
                      relationTo: 'media',
                      required: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'What We Do',
          fields: [
            {
              name: 'whatWeDo',
              type: 'group',
              fields: [
                {
                  name: 'enable',
                  type: 'checkbox',
                  defaultValue: true,
                },
                {
                  name: 'eyebrow',
                  type: 'text',
                  defaultValue: 'What we do',
                },
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  defaultValue: 'What We Do',
                },
                {
                  name: 'subtitle',
                  type: 'textarea',
                  defaultValue: 'Discover the diverse and dynamic performances PE LIVE brings to every occasion, from concerts and festivals to corporate events and weddings.',
                },
                {
                  name: 'services',
                  type: 'array',
                  minRows: 3,
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
                      name: 'image',
                      type: 'relationship',
                      relationTo: 'media',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Call To Action',
          fields: [
            {
              name: 'callToAction',
              type: 'group',
              fields: [
                {
                  name: 'enable',
                  type: 'checkbox',
                  defaultValue: true,
                },
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  defaultValue: 'Got An Idea?',
                },
                {
                  name: 'description',
                  type: 'textarea',
                  required: true,
                },
                {
                  name: 'buttonText',
                  type: 'text',
                  required: true,
                  defaultValue: 'Get in touch',
                },
                {
                  name: 'buttonLink',
                  type: 'text',
                  required: true,
                  defaultValue: '#contact',
                },
                {
                  name: 'backgroundImage',
                  type: 'relationship',
                  relationTo: 'media',
                },
              ],
            },
          ],
        },
        {
          label: 'Facts & Figures',
          fields: [
            {
              name: 'factsAndFigures',
              type: 'group',
              fields: [
                {
                  name: 'enable',
                  type: 'checkbox',
                  defaultValue: true,
                },
                {
                  name: 'eyebrow',
                  type: 'text',
                  defaultValue: 'Facts & figures',
                },
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  defaultValue: 'Facts & Figures',
                },
                {
                  name: 'description',
                  type: 'textarea',
                  required: true,
                },
                {
                  name: 'backgroundImage',
                  type: 'relationship',
                  relationTo: 'media',
                },
                {
                  name: 'brandsTitle',
                  type: 'text',
                  required: true,
                  defaultValue: "Brands we've worked with",
                },
                {
                  name: 'brandLogos',
                  type: 'array',
                  fields: [
                    {
                      name: 'name',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'logo',
                      type: 'relationship',
                      relationTo: 'media',
                      required: true,
                    },
                    {
                      name: 'darkenOnLight',
                      type: 'checkbox',
                      defaultValue: false,
                      admin: {
                        description:
                          'Enable for white/light logo artwork so it stays visible on light backgrounds',
                      },
                    },
                  ],
                },
                {
                  name: 'artistsTitle',
                  type: 'text',
                  required: true,
                  defaultValue: "Artists we've worked with",
                },
                {
                  name: 'artists',
                  type: 'array',
                  fields: [
                    {
                      name: 'name',
                      type: 'text',
                      required: true,
                    },
                  ],
                },
                {
                  name: 'performancesTitle',
                  type: 'text',
                  required: true,
                  defaultValue: "Stages we've performed on",
                },
                {
                  name: 'performances',
                  type: 'array',
                  fields: [
                    {
                      name: 'column',
                      type: 'number',
                      required: true,
                      defaultValue: 1,
                    },
                    {
                      name: 'content',
                      type: 'textarea',
                      required: true,
                    },
                    {
                      name: 'name',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'year',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'image',
                      type: 'relationship',
                      relationTo: 'media',
                    },
                    {
                      name: 'links',
                      type: 'array',
                      fields: [
                        {
                          name: 'name',
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
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Up Next',
          fields: [
            {
              name: 'upNext',
              type: 'group',
              fields: [
                {
                  name: 'eyebrow',
                  type: 'text',
                  defaultValue: 'The programme',
                },
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: 'Up next',
                },
                {
                  name: 'infoLine',
                  type: 'text',
                  defaultValue: 'Tickets via ticketsgent.be · booking info@pelive.be',
                  admin: {
                    description: 'Short line shown next to the section title',
                  },
                },
                {
                  name: 'moreTitle',
                  type: 'text',
                  defaultValue: 'More upcoming',
                },
                {
                  name: 'pastTitle',
                  type: 'text',
                  defaultValue: 'Past performances',
                },
              ],
            },
          ],
        },
        {
          label: 'Contact',
          fields: [
            {
              name: 'contact',
              type: 'group',
              fields: [
                {
                  name: 'enable',
                  type: 'checkbox',
                  defaultValue: true,
                },
                {
                  name: 'eyebrow',
                  type: 'text',
                  defaultValue: 'Book us',
                },
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  defaultValue: 'Get In Touch',
                },
                {
                  name: 'subtitle',
                  type: 'textarea',
                },
                {
                  name: 'backgroundImage',
                  type: 'relationship',
                  relationTo: 'media',
                },
                {
                  name: 'email',
                  type: 'text',
                  required: true,
                  defaultValue: 'info@pelive.be',
                },
                {
                  name: 'formFields',
                  type: 'array',
                  fields: [
                    {
                      name: 'name',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'label',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'type',
                      type: 'select',
                      options: [
                        { value: 'text', label: 'Text Input' },
                        { value: 'email', label: 'Email Input' },
                        { value: 'textarea', label: 'Text Area' },
                      ],
                      defaultValue: 'text',
                    },
                    {
                      name: 'required',
                      type: 'checkbox',
                      defaultValue: true,
                    },
                  ],
                },
                {
                  name: 'submitButtonText',
                  type: 'text',
                  defaultValue: 'Send Message',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateFrontPage],
  },
}
