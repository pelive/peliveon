import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

import type { Event } from '@/payload-types'

async function queryUpcomingEvents(): Promise<Event[]> {
  try {
    const payload = await getPayload({ config: configPromise })

    const events = await payload.find({
      collection: 'events',
      sort: 'eventDate',
      limit: 50,
      depth: 1,
      where: {
        eventDate: {
          greater_than_equal: new Date().toISOString(),
        },
      },
    })

    return events.docs
  } catch (error) {
    console.error('Error fetching upcoming events:', error)
    return []
  }
}

async function queryPastEvents(): Promise<Event[]> {
  try {
    const payload = await getPayload({ config: configPromise })

    const events = await payload.find({
      collection: 'events',
      sort: '-eventDate',
      limit: 50,
      depth: 1,
      where: {
        eventDate: {
          less_than: new Date().toISOString(),
        },
      },
    })

    return events.docs
  } catch (error) {
    console.error('Error fetching past events:', error)
    return []
  }
}

export const getUpcomingEvents = unstable_cache(queryUpcomingEvents, ['upcoming-events'], {
  tags: ['events'],
  revalidate: 300,
})

export const getPastEvents = unstable_cache(queryPastEvents, ['past-events'], {
  tags: ['events'],
  revalidate: 300,
})
