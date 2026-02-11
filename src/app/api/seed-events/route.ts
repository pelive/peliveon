import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '../../../payload.config'

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayload({ config })

    // Clear existing events
    await payload.delete({
      collection: 'events',
      where: {}, // Delete all
    })

    // Seed current events data
    const events = [
      {
        title: 'Epiphany Reloaded',
        date: 'September 28, 2024',
        location: 'NTGent, Ghent',
        description: 'Our annual concert featuring special guests and new arrangements.',
        featured: true,
        fullDescription: `**GOSPEL MUSIC WITH ATTITUDE**

An authentic live Gospel music experience suitable for all ages, races, ethnicities, and beliefs. Although this genre of music is still maturing within the Belgian music industry, we see tremendous growth and admiration from diverse fans and many music lovers seeking a unique experience. Over the years, PE LIVE's vision and activities have served this goal.

**EPIPHANY (RELOADED)**

The "Gospel Music Experience" bursts with joy, inspiration, motivation, and positivity - something we've experienced during various performances: Belgium's Got Talent (2021), the MIA Awards (2022), Gentse Feesten (2022), Epiphany (2023), and in some cases, to give hope and a "voice" to people in need ("The Voices" - Ukraine 12-12 in 2022). After years of growth and refinement, we felt the need to return to our roots (Ghent) to create the same experience for our audience – thus, #EPIPHANY was born.

Last year's show was a huge success, so much so that we exceeded the capacity of 'De Centrale'. Due to popular demand, we are presenting a "RELOAD" of EPIPHANY this year for a larger audience here at NTGent. EPIPHANY (RELOADED) adopts a typical concert setting. It's an evening where the band, singers, and a "dramatic" conductor take you on a journey - a live "American-style" Gospel performance with a highly diverse repertoire perfectly mixed with modern dance and a surprise element for the audience, ensuring there's something for everyone!

If you've seen PE LIVE's EPIPHANY, you'll surely want to come back for more, and if you haven't, this is something you definitely don't want to miss!`,
        ticketUrl: 'https://ticketsgent.be/producties/pe-live-in-concert',
      },
      {
        title: 'Gospel Workshop',
        date: 'April 20, 2024',
        location: 'De Centrale, Ghent',
        description: 'Join us for an interactive workshop on Gospel music and performance.',
        featured: false,
      },
      {
        title: 'Summer Festival Tour',
        date: 'July-August 2024',
        location: 'Various Locations',
        description: 'Catching the summer vibes at festivals across Belgium.',
        featured: false,
      },
    ]

    // Create events
    const createdEvents = []
    for (const eventData of events) {
      const created = await payload.create({
        collection: 'events',
        data: eventData,
      })
      createdEvents.push(created)
    }

    return NextResponse.json({
      success: true,
      message: `Created ${createdEvents.length} events`,
      events: createdEvents,
    })
  } catch (error) {
    console.error('Error seeding events:', error)
    return NextResponse.json(
      { error: 'Failed to seed events' },
      { status: 500 }
    )
  }
}
