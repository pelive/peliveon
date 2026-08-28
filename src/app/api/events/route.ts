import { NextResponse } from 'next/server'

import { getUpcomingEvents } from '@/utilities/getEvents'

export async function GET() {
  try {
    const upcomingEvents = await getUpcomingEvents()

    const featuredEvent = upcomingEvents.find((event) => event.featured === 'featured')

    const additionalEvents = upcomingEvents
      .filter((event) => event.featured !== 'featured')
      .slice(0, 5)

    return NextResponse.json(
      {
        featuredEvent,
        upcomingEvents,
        additionalEvents,
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600',
        },
      },
    )
  } catch (error) {
    console.error('Error fetching events:', error)
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 })
  }
}
