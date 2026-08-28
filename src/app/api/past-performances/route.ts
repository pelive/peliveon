import { NextResponse } from 'next/server'

import { getPastEvents } from '@/utilities/getEvents'

export async function GET() {
  try {
    const pastEvents = await getPastEvents()

    return NextResponse.json(
      { pastEvents },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600',
        },
      },
    )
  } catch (error) {
    console.error('Error fetching past performances:', error)
    return NextResponse.json({ error: 'Failed to fetch past performances' }, { status: 500 })
  }
}
