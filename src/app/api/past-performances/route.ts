import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function GET() {
  try {
    const payload = await getPayload({ config })
    
    const now = new Date()
    
    // Get all events and sort by date (most recent first)
    const events = await payload.find({
      collection: 'events',
      sort: '-eventDate',
      limit: 50,
    })

    // Filter for past events (dates that have already passed)
    const pastEvents = events.docs.filter(event => {
      const eventDate = new Date(event.eventDate as string)
      return eventDate < now
    })

    return NextResponse.json({
      pastEvents
    })
  } catch (error) {
    console.error('Error fetching past performances:', error)
    return NextResponse.json(
      { error: 'Failed to fetch past performances' },
      { status: 500 }
    )
  }
}
