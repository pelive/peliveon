import { getPayload } from 'payload'
import config from '@payload-config'
import { headers } from 'next/headers'
import path from 'path'
import type { Payload } from 'payload'

export const maxDuration = 60 // This function can run for a maximum of 60 seconds

export async function seedFrontPage(payload: Payload) {
  const root = process.cwd()

  const lexicalParagraphs = (paragraphs: string[]) =>
    ({
    root: {
      type: 'root',
      version: 1,
      direction: 'ltr',
      format: '',
      indent: 0,
      children: paragraphs.map((text) => ({
        type: 'paragraph',
        version: 1,
        direction: 'ltr',
        format: '',
        indent: 0,
        children: [
          {
            mode: 'normal',
            text,
            type: 'text',
            version: 1,
          },
        ],
      })),
    },
  }) as any

  const uploadMedia = async (relativePath: string, alt: string) => {
    const filename = path.basename(relativePath)
    const existing = await payload.find({
      collection: 'media',
      where: {
        filename: {
          equals: filename,
        },
      },
      limit: 1,
      pagination: false,
    })

    if (existing.docs[0]) {
      return existing.docs[0].id
    }

    const created = await payload.create({
      collection: 'media',
      data: {
        alt,
      },
      filePath: path.join(root, 'public', relativePath),
    })

    return created.id
  }

  const media = {
    heroBackground: await uploadMedia('pictures/1.jpg', 'PE Live concert performance with dramatic lighting and engaged audience'),
    heroLogoPeLive: await uploadMedia('logos/pelive-small.svg', 'PE Live logo'),
    heroLogoGent: await uploadMedia('logos/gent-colorful.svg', 'Stad Gent logo'),
    heroLogoNtgent: await uploadMedia('logos/ntgent.svg', 'NTGent logo'),
    whoWeAreBackground: await uploadMedia('pictures/10.jpg', 'PE Live gospel choir performance with unified group presentation'),
    whatWeDoConcerts: await uploadMedia('pictures/14.jpg', 'PE Live concerts and festivals performance'),
    whatWeDoCorporate: await uploadMedia('pictures/2.jpg', 'PE Live corporate and private event performance'),
    whatWeDoWeddings: await uploadMedia('pictures/3.jpg', 'PE Live wedding performance'),
    callToActionBackground: await uploadMedia('pictures/19.jpg', 'PE Live stage performance with colorful lighting'),
    factsBackground: await uploadMedia('background-faqs.jpg', 'PE Live facts and figures background'),
    logoBgt: await uploadMedia('logos/got-talent.svg', "Belgium's Got Talent logo"),
    logoMias: await uploadMedia('logos/mias.svg', "De MIA's logo"),
    logoVtm: await uploadMedia('logos/vtm.svg', 'VTM logo'),
    logoEen: await uploadMedia('logos/een.svg', 'EEN logo'),
    logoPlayNostalgie: await uploadMedia('logos/play-nostalgie.svg', 'Play Nostalgie logo'),
    logoSamsung: await uploadMedia('logos/samsung.svg', 'Samsung logo'),
    logoUGent: await uploadMedia('logos/ugent.svg', 'UGent logo'),
    logoStadGent: await uploadMedia('logos/gent.svg', 'Stad Gent logo'),
    logoDeCentrale: await uploadMedia('logos/de-centrale.svg', 'De Centrale logo'),
    performanceBgt: await uploadMedia('avatars/bgt.png', "Belgium's Got Talent performance image"),
    performanceParkpop: await uploadMedia('avatars/parkpop.png', 'Parkpop performance image'),
    performanceMia: await uploadMedia('avatars/mia.png', 'MIA Awards performance image'),
    performanceEpiphany: await uploadMedia('avatars/epiphany.png', 'Epiphany performance image'),
    performanceGentseFeesten: await uploadMedia('avatars/gentsefeesten.jpg', 'Gentse Feesten performance image'),
    performanceHeartbeat: await uploadMedia('avatars/heartbeat.png', 'Heartbeat Sessions performance image'),
    contactBackground: await uploadMedia('pictures/10.jpg', 'Contact section background image'),
  }

  const frontPage = await payload.updateGlobal({
    slug: 'frontPage',
    data: {
      hero: {
        eyebrow: 'In Concert',
        titlePrefix: '#',
        titleHighlight: 'Epiphany Reloaded',
        ticketLabel: 'Info & Tickets',
        ticketUrl: 'https://ticketsgent.be/producties/pe-live-in-concert',
        backgroundImage: media.heroBackground,
        partnerLogos: [
          { name: 'PE Live', logo: media.heroLogoPeLive },
          { name: 'Stad Gent', logo: media.heroLogoGent },
          { name: 'NTGent', logo: media.heroLogoNtgent },
        ],
      },
      whoWeAre: {
        enable: true,
        backgroundImage: media.whoWeAreBackground,
        title: 'Who We Are',
        content: lexicalParagraphs([
          'PE Live is the pioneering "Black American"-style Gospel band which is reinventing Gospel music in a modern and dynamic way in Belgium. PE LIVE presents Gospel music with an attitude!',
          'On top of the wide range of voices, unique dance moves, colorful display and a divers repertoire (Praise, Contemporary Rock, Hip-Hop, Reggae, and Afrobeat), the band is also known for its energetic and electrifying live performances which always leaves fans wanting more.',
          "In a notable highlight of our journey, PE Live received the golden buzzer during Belgium's Got Talent, propelling the band to national fame and showcasing our exceptional talent.",
          'Over the years, these experiences, emotions, and expressions through our performances have been acclaimed as "one of a kind in Belgium" - which is fondly referred to by our fans as "The Gospel of PE LIVE".',
        ]),
      },
      whatWeDo: {
        enable: true,
        title: 'What We Do',
        subtitle:
          'Discover the diverse and dynamic performances PE LIVE brings to every occasion, from concerts and festivals to corporate events and weddings.',
        services: [
          {
            title: 'Concerts & Festivals',
            description:
              'PE LIVE delivers electrifying performances at major concerts and festivals, bringing a unique blend of Gospel music to diverse audiences. From the Freedom Festival at Gentse Feesten to the Gospel Festival Stad Mortsel, our vibrant energy and captivating stage presence leave lasting impressions. Join us at our next concert or festival for an unforgettable experience!',
            image: media.whatWeDoConcerts,
          },
          {
            title: 'Corporate & Private Events',
            description:
              'Elevate your corporate or private event with the soulful sounds of PE LIVE. Our music adds a dynamic and enchanting atmosphere, perfect for business functions, birthdays, and other special occasions. Let us bring our gospel vibes to your event, ensuring it becomes a memorable celebration. Contact us to make your event extraordinary!',
            image: media.whatWeDoCorporate,
          },
          {
            title: 'Weddings',
            description:
              'Transform your wedding day into a magical celebration with PE LIVE. Our passionate performances and heartfelt gospel music create an unforgettable ambiance for your special day. From intimate ceremonies to grand receptions, we tailor our music to perfectly match the mood and emotions of your wedding. Make your dream wedding come true with PE LIVE!',
            image: media.whatWeDoWeddings,
          },
        ],
      },
      callToAction: {
        enable: true,
        title: 'Got An Idea?',
        description:
          "Do you have a unique vision or concept for an event? Let's bring it to life together! We thrive on collaboration and creativity. Whether it's a community initiative, a special project, or an innovative performance, we are excited to partner with you and co-create something extraordinary. Reach out to us with your idea, and let's make magic happen!",
        buttonText: 'Get in touch',
        buttonLink: '#contact',
        backgroundImage: media.callToActionBackground,
      },
      factsAndFigures: {
        enable: true,
        title: 'Facts & Figures',
        description:
          'PE LIVE has been a trailblazer in the Belgian Gospel music scene, continuously pushing the boundaries with our vibrant performances and diverse repertoire. Our journey has been marked by collaborations with renowned artists and performances on prestigious stages.',
        backgroundImage: media.factsBackground,
        brandsTitle: "Brands we've worked with",
        brandLogos: [
          { name: "Belgium's Got Talent", logo: media.logoBgt },
          { name: "De MIA's", logo: media.logoMias },
          { name: 'VTM', logo: media.logoVtm },
          { name: 'EEN', logo: media.logoEen },
          { name: 'Play Nostalgie', logo: media.logoPlayNostalgie },
          { name: 'Samsung', logo: media.logoSamsung },
          { name: 'UGent', logo: media.logoUGent },
          { name: 'Stad Gent', logo: media.logoStadGent },
          { name: 'De Centrale', logo: media.logoDeCentrale },
        ],
        artistsTitle: "Artists we've worked with",
        artists: [
          { name: 'Bart Peeters' },
          { name: 'Paul Michiels' },
          { name: 'Jasper Steverlinck' },
          { name: 'Laura Tesoro' },
          { name: 'Grace (The Voice)' },
          { name: 'Mentissa (The Voice)' },
          { name: 'Jeremie (The Voice)' },
        ],
        performancesTitle: "Stages we've performed on",
        performances: [
          {
            column: 1,
            content:
              "PE LIVE made history by bringing Gospel music to the Belgian commercial scene for the first time on Belgium's Got Talent. Their electrifying performance earned them the Golden Buzzer from Bart Peeters and won the admiration of many.",
            name: "BGT (Belgium's Got Talent)",
            year: '2021',
            image: media.performanceBgt,
            links: [
              { name: 'Dance Performance', url: 'https://vtm.be/deze-gospel-positivos-krijgen-iedereen-aan-het-dansen~vff8d5e31-d881-4f66-97ee-2cd81c00e794' },
              { name: 'Gospel with Attitude', url: 'https://vtm.be/kippenvel-pe-live-brengt-gospel-met-attitude~vef1f3ec0-74f6-4c9d-8722-a4109b6d35f2' },
            ],
          },
          {
            column: 1,
            content:
              'At Parkpop, PE LIVE brought incredible energy to the stage, captivating the younger generation. They have performed at this festival for two consecutive years, setting the stage on fire and connecting with the students of Ghent University.',
            name: 'Parkpop',
            year: '2023/24',
            image: media.performanceParkpop,
            links: [{ name: 'Parkpop Performance', url: 'https://youtube.com/watch?v=3naMnpuMTiQ&ab_channel=PELive' }],
          },
          {
            column: 1,
            content:
              'At the Vlaamse Kermis, PE LIVE delivered an intimate performance filled with warmth and energy, sharing the joy and good news of the Gospel with the audience. The night was a beautiful blend of excitement and connection with the fans.',
            name: 'Vlaamse Kermis',
            year: '2022',
          },
          {
            column: 2,
            content:
              'They had a beautiful and incredible moment at the MIA Awards, performing live on stage with Bart Peeters for his new single "Winter Dip". This performance was a highlight of the Belgian awards show.',
            name: 'MIA Awards',
            year: '2022',
            image: media.performanceMia,
            links: [{ name: 'MIA Awards Performance', url: 'https://youtube.com/watch?v=Rsw9DpKWIvI&ab_channel=MuziekbijVRT1' }],
          },
          {
            column: 2,
            content:
              "Epiphany is PE LIVE's annual concert, a night of art, craft, music, and dance. The first edition after a three-year break was held at De Centrale, where they filled the venue to capacity. This year, the event will move to NTGent, promising an even grander experience.",
            name: 'Epiphany',
            year: '2023',
            image: media.performanceEpiphany,
            links: [
              { name: 'Epiphany Performance 1', url: 'https://youtube.com/watch?v=ekKXeRidzAk&ab_channel=PELive' },
              { name: 'Epiphany Performance 2', url: 'https://youtube.com/watch?v=GFB7vgClXrc&ab_channel=PELive' },
              { name: 'Epiphany Performance 3', url: 'https://youtube.com/watch?v=UqlrmHWoHaM&ab_channel=PELive' },
            ],
          },
          {
            column: 2,
            content:
              "The Candlelight Session is PE LIVE's yearly collaboration with major brands like Samsung and Play Nostalgie. This event, held in December, creates a warm Christmas atmosphere with Gospel music, leaving the audience with heartwarming memories.",
            name: 'Candlelight Session',
            year: '2023',
          },
          {
            column: 3,
            content:
              'PE LIVE set the stage on fire at the Gentse Feesten, transitioning from street performances to the main stage at Korenmarkt. They are still the reigning champions of the street performance "Straatmuzikant" competition, as the competition has not been held again.',
            name: 'Gentse Feesten',
            year: '2019, 2022',
            image: media.performanceGentseFeesten,
          },
          {
            column: 3,
            content:
              "The Heartbeat Sessions were born out of a request from the City of Ghent during COVID-19, recognizing PE LIVE's contribution to uplifting spirits. This collaboration with De Centrale was a significant moment for the group, offering inspiration to the people of Ghent.",
            name: 'Heartbeat Sessions',
            year: '2021',
            image: media.performanceHeartbeat,
            links: [{ name: 'Heartbeat Session #6', url: 'https://youtube.com/watch?v=tyFmIItCZyg' }],
          },
          {
            column: 3,
            content:
              'At Patershol Feesten, PE LIVE connected with the older generation, showcasing how their music resonates with all ages. This festival, aimed at an older audience, was a significant moment for the group as they uplifted spirits with their performance.',
            name: 'Patershol Feesten',
            year: '2019',
          },
        ],
      },
      contact: {
        enable: true,
        title: 'Get in Touch',
        subtitle:
          "We would be delighted to discuss how we can bring your vision to life. Whether you're planning an intimate gathering or a grand celebration, our team is ready to create an unforgettable experience.",
        email: 'info@pelive.be',
        backgroundImage: media.contactBackground,
        formFields: [
          { name: 'firstname', label: 'First Name', type: 'text', required: true },
          { name: 'lastname', label: 'Last Name', type: 'text', required: true },
          { name: 'email', label: 'Email Address', type: 'email', required: true },
          { name: 'number', label: 'Phone Number', type: 'text', required: false },
          { name: 'message', label: 'Your Message', type: 'textarea', required: true },
        ],
        submitButtonText: 'Send Message',
      },
    },
  })

  // Seed some events
  const now = new Date()
  const futureDate1 = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
  const futureDate2 = new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000) // 60 days from now
  const pastDate1 = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000) // 90 days ago
  const pastDate2 = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000) // 180 days ago

  // Check if events already exist
  const existingEvents = await payload.find({
    collection: 'events',
    limit: 1,
    pagination: false,
  })

  if (existingEvents.docs.length === 0) {
    // Create upcoming events
    await payload.create({
      collection: 'events',
      data: {
        title: 'Epiphany Reloaded',
        eventDate: futureDate1.toISOString(),
        location: 'NTGent, Ghent',
        summary: 'Our annual concert celebrating art, craft, music, and dance. Join us for an unforgettable evening of Gospel music.',
        fullDescription: lexicalParagraphs([
          'Epiphany Reloaded is PE LIVE\'s signature annual concert, bringing together the best of art, craft, music, and dance in one spectacular evening.',
          'After the success of our previous editions, we\'re taking it to the next level at NTGent with enhanced production, special guest performances, and an experience you won\'t forget.',
        ]),
        featured: 'featured',
        image: media.performanceEpiphany,
        ticketUrl: 'https://ticketsgent.be/producties/pe-live-in-concert',
      },
    })

    await payload.create({
      collection: 'events',
      data: {
        title: 'Summer Gospel Festival',
        eventDate: futureDate2.toISOString(),
        location: 'Korenmarkt, Ghent',
        summary: 'Join us for an outdoor Gospel celebration during the Gentse Feesten.',
        fullDescription: lexicalParagraphs([
          'PE LIVE returns to the Gentse Feesten with a powerful outdoor performance at Korenmarkt.',
          'Experience the energy of live Gospel music in the heart of Ghent\'s biggest summer festival.',
        ]),
        featured: 'none',
        image: media.performanceGentseFeesten,
      },
    })

    // Create past events
    await payload.create({
      collection: 'events',
      data: {
        title: 'Candlelight Session 2023',
        eventDate: pastDate1.toISOString(),
        location: 'De Centrale, Ghent',
        summary: 'An intimate evening of Gospel music in collaboration with Samsung and Play Nostalgie.',
        fullDescription: lexicalParagraphs([
          'The Candlelight Session brought warmth and joy to the holiday season with an intimate Gospel performance.',
          'Thank you to everyone who joined us for this special evening of music and celebration.',
        ]),
        featured: 'none',
        image: media.performanceHeartbeat,
      },
    })

    await payload.create({
      collection: 'events',
      data: {
        title: 'Parkpop Festival',
        eventDate: pastDate2.toISOString(),
        location: 'UGent Campus, Ghent',
        summary: 'PE LIVE brought incredible energy to Parkpop, connecting with students and music lovers.',
        fullDescription: lexicalParagraphs([
          'Our performance at Parkpop was an unforgettable experience, bringing Gospel music to the younger generation.',
          'The energy was electric as we shared our music with thousands of festival-goers.',
        ]),
        featured: 'none',
        image: media.performanceParkpop,
      },
    })
  }

  return {
    message: 'Front page and events seeded successfully.',
    frontPageId: frontPage.id,
  }
}

export async function POST(): Promise<Response> {
  const payload = await getPayload({ config })
  const requestHeaders = await headers()

  const { user } = await payload.auth({ headers: requestHeaders })

  if (!user) {
    return new Response('Action forbidden.', { status: 403 })
  }

  const result = await seedFrontPage(payload)

  return Response.json(result)
}
