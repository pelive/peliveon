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
                  { type: 'text', text: 'Get tickets here', version: 1 }
                ],
                direction: 'ltr',
                fields: { linkType: 'custom', newTab: true, url: 'https://ticketsgent.be/producties/pe-live-in-concert' },
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
  layout: [
    {
      blockType: 'whoWeAre',
      title: 'Who We Are',
      backgroundImage: null, // Optional background image
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'PE Live is the pioneering "Black American"-style Gospel band which is reinventing Gospel music in a modern and dynamic way in Belgium. PE LIVE presents Gospel music with an attitude! On top of the wide range of voices, unique dance moves, colorful display and a divers repertoire (Praise, Contemporary Rock, Hip-Hop, Reggae, and Afrobeat), the band is also known for its energetic and electrifying live performances which always leaves fans wanting more. In a notable highlight of our journey, PE Live received the golden buzzer during Belgium\'s Got Talent, propelling the band to national fame and showcasing our exceptional talent. Over the years, these experiences, emotions, and expressions through our performances have been acclaimed as "one of a kind in Belgium" - which is fondly referred to by our fans as "The Gospel of PE LIVE".'
                }
              ],
              version: 1
            }
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        }
      }
    },
    {
      blockType: 'whatWeDo',
      title: 'What We Do',
      subtitle: 'From electrifying concerts to intimate celebrations, PE LIVE brings the power and passion of Gospel music to every occasion.',
      services: [
        {
          title: 'Concerts & Festivals',
          description: 'PE LIVE delivers electrifying performances at major concerts and festivals, bringing a unique blend of Gospel music to diverse audiences. From the Freedom Festival at Gentse Feesten to the Gospel Festival Stad Mortsel, our vibrant energy and captivating stage presence leave lasting impressions. Join us at our next concert or festival for an unforgettable experience!',
          image: null
        },
        {
          title: 'Corporate & Private Events',
          description: 'Elevate your corporate or private event with the soulful sounds of PE LIVE. Our music adds a dynamic and enchanting atmosphere, perfect for business functions, birthdays, and other special occasions. Let us bring our gospel vibes to your event, ensuring it becomes a memorable celebration. Contact us to make your event extraordinary!',
          image: null
        },
        {
          title: 'Weddings',
          description: 'Transform your wedding day into a magical celebration with PE LIVE. Our passionate performances and heartfelt gospel music create an unforgettable ambiance for your special day. From intimate ceremonies to grand receptions, we tailor our music to perfectly match the mood and emotions of your wedding. Make your dream wedding come true with PE LIVE!',
          image: null
        }
      ]
    },
    {
      blockType: 'cta',
      richText: {
        root: {
          type: 'root',
          children: [
            {
              type: 'heading',
              children: [
                { type: 'text', text: 'Got An Idea?', version: 1 }
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              tag: 'h2',
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Do you have a unique vision or concept for an event? Let\'s bring it to life together! We thrive on collaboration and creativity. Whether it\'s a community initiative, a special project, or an innovative performance, we are excited to partner with you and co-create something extraordinary. Reach out to us with your idea, and let\'s make magic happen!',
                  version: 1,
                }
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
            }
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        }
      },
      links: [
        {
          link: {
            type: 'custom',
            url: '#contact',
            newTab: false,
            label: 'Get in touch',
            appearance: 'default'
          }
        }
      ]
    },
    {
      blockType: 'upNext',
      title: 'Up Next',
      subtitle: "Don't miss out on our upcoming performances and events. Join us as we continue to bring the power of Gospel music to audiences across Belgium!",
      featuredEvent: {
        title: 'Epiphany Reloaded',
        date: 'March 15, 2024',
        location: 'NTGent, Ghent',
        description: 'Our annual concert featuring special guests and new arrangements.',
        ticketUrl: 'https://ticketsgent.be/producties/pe-live-in-concert'
      },
      additionalEvents: [
        {
          title: 'Gospel Workshop',
          date: 'April 20, 2024',
          location: 'De Centrale, Ghent',
          description: 'Join us for an interactive workshop on Gospel music and performance.',
          ticketUrl: '#contact'
        },
        {
          title: 'Summer Festival Tour',
          date: 'July 10, 2024',
          location: 'Various Locations',
          description: 'Catching summer vibes at festivals across Belgium.',
          ticketUrl: '#contact'
        }
      ],
      mailingListText: 'Want to stay updated with our latest events?',
      mailingListLinkText: 'Join our mailing list'
    },
    {
      blockType: 'contact',
      title: 'Get In Touch',
      subtitle: 'Ready to bring the power and passion of PE LIVE to your event? We\'d love to hear from you!',
      email: 'info@pelive.be',
      formFields: [
        {
          name: 'name',
          label: 'Name',
          type: 'text',
          required: true
        },
        {
          name: 'email',
          label: 'Email',
          type: 'email',
          required: true
        },
        {
          name: 'message',
          label: 'Message',
          type: 'textarea',
          required: true
        }
      ],
      submitButtonText: 'Send Message'
    }
  ],
  meta: {
    description: 'PE LIVE is a pioneering Gospel band reinventing Gospel music in Belgium. Known for energetic performances and unique blend of Praise, Contemporary Rock, Hip-Hop, Reggae, and Afrobeat.',
    title: 'PE LIVE - Gospel Band Belgium',
  },
  title: 'Home',
}
