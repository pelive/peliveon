import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '../../../payload.config'

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayload({ config })

    // Clear existing past performances
    await payload.delete({
      collection: 'past-performances',
      where: {}, // Delete all
    })

    // Seed current past performances data
    const performances = [
      {
        title: 'The Voices',
        year: '2022',
        event: 'Ukraine 12-12 Charity Event',
        description: 'A powerful performance to give hope and a voice to people in need during difficult times.',
        videoUrl: 'https://youtube.com/watch?v=XMDtZC779_4&ab_channel=MuziekbijVRT1',
      },
      {
        title: 'Gospel Positivos Dance',
        year: '2021',
        event: 'Belgium\'s Got Talent',
        description: 'The electrifying dance performance that earned us the golden buzzer and national recognition.',
        videoUrl: 'https://vtm.be/deze-gospel-positivos-krijgen-iedereen-aan-het-dansen~vff8d5e31-d881-4f66-97ee-2cd81c00e794',
      },
      {
        title: 'Gospel with Attitude',
        year: '2021',
        event: 'Belgium\'s Got Talent',
        description: 'Showcasing our unique style and energy that captivated the nation and launched our journey.',
        videoUrl: 'https://vtm.be/kippenvel-pe-live-brengt-gospel-met-attitude~vef1f3ec0-74f6-4c9d-8722-a4109b6d35f2',
      },
    ]

    // Create past performances
    const createdPerformances = []
    for (const perfData of performances) {
      const created = await payload.create({
        collection: 'past-performances',
        data: perfData,
      })
      createdPerformances.push(created)
    }

    return NextResponse.json({
      success: true,
      message: `Created ${createdPerformances.length} past performances`,
      performances: createdPerformances,
    })
  } catch (error) {
    console.error('Error seeding past performances:', error)
    return NextResponse.json(
      { error: 'Failed to seed past performances' },
      { status: 500 }
    )
  }
}
