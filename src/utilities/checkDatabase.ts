import configPromise from '@payload-config'
import { getPayload } from 'payload'

export async function isDatabaseAvailable(): Promise<boolean> {
  try {
    const payload = await getPayload({ config: configPromise })
    
    // Try a simple query to check if database is accessible
    await payload.find({
      collection: 'pages',
      limit: 1,
      pagination: false,
      overrideAccess: false,
    })
    
    return true
  } catch (error) {
    // If database is not available, return false
    console.log('Database not available during build:', error instanceof Error ? error.message : 'Unknown error')
    return false
  }
}
