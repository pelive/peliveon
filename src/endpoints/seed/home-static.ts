import type { RequiredDataFromCollectionSlug } from 'payload'

// Used for pre-seeded content so that homepage is not empty
export const homeStatic: RequiredDataFromCollectionSlug<'pages'> = {
  slug: 'home',
  _status: 'published',
  hero: {
    type: 'lowImpact',
    richText: {
      root: {
        type: 'root',
        children: [
          {
            type: 'heading',
            children: [
              {
                type: 'text',
                text: 'In Concert',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            tag: 'h1',
            version: 1,
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'PE Live is a pioneering Gospel band reinventing Gospel music in Belgium. ',
                version: 1,
              },
              {
                type: 'link',
                children: [
                  {
                    type: 'text',
                    text: 'Get tickets here',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                fields: {
                  linkType: 'custom',
                  newTab: true,
                  url: 'https://ticketsgent.be/producties/pe-live-in-concert',
                },
                format: '',
                indent: 0,
                version: 2,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            textFormat: 0,
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    },
  },
  layout: [],
  meta: {
    description: 'PE LIVE is a pioneering Gospel band reinventing Gospel music in Belgium. Known for energetic performances and unique blend of Praise, Contemporary Rock, Hip-Hop, Reggae, and Afrobeat.',
    title: 'PE LIVE - Gospel Band Belgium',
  },
  title: 'Home',
}
