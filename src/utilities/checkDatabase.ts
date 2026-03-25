import configPromise from '@payload-config'
import { getPayload } from 'payload'

export async function isDatabaseAvailable(): Promise<boolean> {
  try {
    const payload = await getPayload({ config: configPromise })
    
    // Try a simple database connection check
    await payload.db.drizzle.execute('SELECT 1')
    
    return true
  } catch (error) {
    // If database is not available, return false
    console.log('Database not available during build:', error instanceof Error ? error.message : 'Unknown error')
    return false
  }
}
