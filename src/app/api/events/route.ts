import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function GET() {
  try {
    const payload = await getPayload({ config })
    
    const now = new Date()
    
    const events = await payload.find({
      collection: 'events',
      sort: 'eventDate',
      limit: 50,
      depth: 1,
    })

    const upcomingEvents = events.docs.filter((event) => {
      if (!event.eventDate) return false
      return new Date(event.eventDate as string) >= now
    })

    const featuredEvent = upcomingEvents.find((event) => event.featured === 'featured')
    
    const additionalEvents = upcomingEvents
      .filter((event) => event.featured !== 'featured')
      .slice(0, 5)

    return NextResponse.json({
      featuredEvent,
      upcomingEvents,
      additionalEvents
    })
  } catch (error) {
    console.error('Error fetching events:', error)
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    )
  }
}
