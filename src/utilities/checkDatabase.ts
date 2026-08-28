import configPromise from '@payload-config'
import { getPayload } from 'payload'

let availabilityPromise: Promise<boolean> | null = null

async function probeDatabase(): Promise<boolean> {
  try {
    const payload = await getPayload({ config: configPromise })

    // Try a simple database connection check
    await payload.db.drizzle.execute('SELECT 1')

    return true
  } catch (error) {
    console.log(
      'Database not available:',
      error instanceof Error ? error.message : 'Unknown error',
    )
    return false
  }
}

/**
 * Memoized per server instance: the guard exists so builds without a database
 * succeed, so there is no need to pay a `SELECT 1` round-trip on every request.
 * A failed probe is retried on the next call.
 */
export async function isDatabaseAvailable(): Promise<boolean> {
  if (!availabilityPromise) {
    availabilityPromise = probeDatabase().then((available) => {
      if (!available) availabilityPromise = null
      return available
    })
  }

  return availabilityPromise
}
