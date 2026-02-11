import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST() {
  try {
    const payload = await getPayload({ config })

    // Find and delete existing Home page
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
      await payload.delete({
        collection: 'pages',
        id: existingPage.docs[0].id,
      })
    }

    return NextResponse.json({ 
      message: 'Home page reset successfully' 
    })
  } catch (error) {
    console.error('Error resetting homepage:', error)
    return NextResponse.json(
      { error: 'Failed to reset homepage' },
      { status: 500 }
    )
  }
}
