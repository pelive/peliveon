import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function GET(request: NextRequest) {
  try {
    const payload = await getPayload({ config })
    
    const performances = await payload.find({
      collection: 'past-performances',
      sort: '-year',
      limit: 10,
    })

    return NextResponse.json(performances)
  } catch (error) {
    console.error('Error fetching past performances:', error)
    return NextResponse.json(
      { error: 'Failed to fetch past performances' },
      { status: 500 }
    )
  }
}
