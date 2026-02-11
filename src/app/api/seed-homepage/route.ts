import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST() {
  try {
    const payload = await getPayload({ config })

    // Check if Home page already exists
    const existingPage = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: 'home',
        },
      },
      limit: 1,
    })

    if (existingPage.docs.length > 0) {
      return NextResponse.json({ message: 'Home page already exists' }, { status: 400 })
    }

    // Create the Home page with current homepage content
    const homePage = await payload.create({
      collection: 'pages',
      data: {
        title: 'Home',
        slug: 'home',
        hero: {
          type: 'lowImpact',
          richText: {
            root: {
              type: 'root',
              version: 1,
              direction: 'ltr',
              format: '',
              indent: 0,
              children: [
                {
                  type: 'h1',
                  version: 1,
                  children: [
                    {
                      text: 'In Concert',
                      version: 1
                    }
                  ]
                },
                {
                  type: 'h1',
                  version: 1,
                  children: [
                    {
                      text: '#',
                      version: 1
                    },
                    {
                      text: 'Epiphany Reloaded',
                      bold: true,
                      version: 1
                    }
                  ]
                }
              ]
            }
          }
        },
        layout: [
          {
            blockType: 'whoWeAre',
            title: 'Who We Are',
            content: {
              root: {
                type: 'root',
                version: 1,
                direction: 'ltr',
                format: '',
                indent: 0,
                children: [
                  {
                    type: 'paragraph',
                    version: 1,
                    children: [
                      {
                        text: 'PE Live is a pioneering "Black American"-style Gospel band which is reinventing Gospel music in a modern and dynamic way in Belgium. PE LIVE presents Gospel music with an attitude!',
                        version: 1
                      }
                    ]
                  },
                  {
                    type: 'paragraph',
                    version: 1,
                    children: [
                      {
                        text: 'On top of wide range of voices, unique dance moves, colorful display and a divers repertoire (Praise, Contemporary Rock, Hip-Hop, Reggae, and Afrobeat), band is also known for its energetic and electrifying live performances which always leaves fans wanting more.',
                        version: 1
                      }
                    ]
                  },
                  {
                    type: 'paragraph',
                    version: 1,
                    children: [
                      {
                        text: 'In a notable highlight of our journey, Pe Live received the golden buzzer during Belgium\'s Got Talent, propelling the band to national fame and showcasing our exceptional talent.',
                        version: 1
                      }
                    ]
                  },
                  {
                    type: 'paragraph',
                    version: 1,
                    children: [
                      {
                        text: 'Over the years, these experiences, emotions, and expressions through our performances have been acclaimed as "one of a kind in Belgium" - which is fondly referred to by our fans as "The Gospel of PE LIVE".',
                        version: 1
                      }
                    ]
                  }
                ]
              }
            }
          },
          {
            blockType: 'whatWeDo',
            title: 'What We Do',
            subtitle: 'Discover the diverse and dynamic performances PE LIVE brings to every occasion, from concerts and festivals to corporate events and weddings.',
            services: [
              {
                title: 'Concerts & Festivals',
                description: 'PE LIVE delivers electrifying performances at major concerts and festivals, bringing a unique blend of Gospel music to diverse audiences. From Freedom Festival at Gentse Feesten to Gospel Festival Stad Mortsel, our vibrant energy and captivating stage presence leave lasting impressions. Join us at our next concert or festival for an unforgettable experience!'
              },
              {
                title: 'Corporate & Private Events',
                description: 'Elevate your corporate or private event with the soulful sounds of PE LIVE. Our music adds a dynamic and enchanting atmosphere, perfect for business functions, birthdays, and other special occasions. Let us bring our gospel vibes to your event, ensuring it becomes a memorable celebration. Contact us to make your event extraordinary!'
              },
              {
                title: 'Weddings',
                description: 'Transform your wedding day into a magical celebration with PE LIVE. Our passionate performances and heartfelt gospel music create an unforgettable ambiance for your special day. From intimate ceremonies to grand receptions, we tailor our music to perfectly match the mood and emotions of your wedding. Make your dream wedding come true with PE LIVE!'
              }
            ]
          },
          {
            blockType: 'cta',
            richText: {
              root: {
                type: 'root',
                version: 1,
                direction: 'ltr',
                format: '',
                indent: 0,
                children: [
                  {
                    type: 'h2',
                    version: 1,
                    children: [
                      {
                        text: 'Got An Idea?',
                        version: 1
                      }
                    ]
                  },
                  {
                    type: 'paragraph',
                    version: 1,
                    children: [
                      {
                        text: 'Do you have a unique vision or concept for an event? Let\'s bring it to life together! We thrive on collaboration and creativity. Whether it\'s a community initiative, a special project, or an innovative performance, we are excited to partner with you and co-create something extraordinary. Reach out to us with your idea, and let\'s make magic happen!',
                        version: 1
                      }
                    ]
                  }
                ]
              }
            },
            links: [
              {
                link: {
                  type: 'custom',
                  url: '/contact',
                  label: 'Get in touch',
                  appearance: 'default'
                }
              }
            ]
          },
          {
            blockType: 'content',
            columns: [
              {
                size: 'full',
                richText: {
                  root: {
                    type: 'root',
                    version: 1,
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    children: [
                      {
                        type: 'h2',
                        version: 1,
                        children: [
                          {
                            text: 'Facts & Figures',
                            version: 1
                          }
                        ]
                      },
                      {
                        type: 'paragraph',
                        version: 1,
                        children: [
                          {
                            text: 'PE LIVE has been a trailblazer in the Belgian Gospel music scene, continuously pushing the boundaries with our vibrant performances and diverse repertoire. Our journey has been marked by collaborations with renowned artists and performances on prestigious stages.',
                            version: 1
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            ]
          },
          {
            blockType: 'contact',
            blockName: 'Contact',
            enable: true,
            title: 'Get In Touch',
            subtitle: 'We would be delighted to discuss how we can bring your vision to life. Whether you\'re planning an intimate gathering or a grand celebration, our team is ready to create an unforgettable experience.',
            email: 'info@pelive.be',
            formFields: [
              {
                name: 'firstname',
                label: 'First Name',
                type: 'text',
                required: true
              },
              {
                name: 'lastname',
                label: 'Last Name',
                type: 'text',
                required: true
              },
              {
                name: 'email',
                label: 'Email Address',
                type: 'email',
                required: true
              },
              {
                name: 'number',
                label: 'Phone Number',
                type: 'text',
                required: false
              },
              {
                name: 'message',
                label: 'Your Message',
                type: 'textarea',
                required: true
              }
            ],
            submitButtonText: 'Send Message'
          },
          {
            blockType: 'upNext',
            title: 'Up Next',
            subtitle: "Don't miss out on our upcoming performances and events. Join us as we continue to bring the power of Gospel music to audiences across Belgium!",
            featuredEvent: {
              title: 'PE LIVE IN CONCERT',
              date: 'Coming Soon',
              location: 'NTGent, Ghent',
              description: 'Get ready for an unforgettable night of gospel music like you\'ve never seen before!'
            },
            additionalEvents: [],
            mailingListText: 'Want to stay updated with our latest events?',
            mailingListLinkText: 'Join our mailing list'
          }
        ]
      }
    })

    return NextResponse.json({ 
      message: 'Home page created successfully',
      page: homePage 
    })
  } catch (error) {
    console.error('Error seeding homepage:', error)
    return NextResponse.json(
      { error: 'Failed to seed homepage' },
      { status: 500 }
    )
  }
}
