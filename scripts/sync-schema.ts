/**
 * One-shot schema sync against the database in POSTGRES_URL.
 *
 * Payload's vercel-postgres adapter pushes schema changes on connect whenever
 * NODE_ENV !== 'production' (dev push). This script forces that path once and
 * exits, so new optional fields become columns without running the dev server.
 *
 * Usage: POSTGRES_URL=postgres://... npm run sync:schema
 * (or put POSTGRES_URL and PAYLOAD_SECRET in .env first)
 */
import { config as dotenvConfig } from 'dotenv'

dotenvConfig()

;(process.env as Record<string, string>).NODE_ENV = 'development'
process.env.PAYLOAD_SECRET = process.env.PAYLOAD_SECRET || 'schema-sync-only-secret'

async function run() {
  if (!process.env.POSTGRES_URL) {
    console.error('POSTGRES_URL is not set — aborting.')
    process.exit(1)
  }

  const { getPayload } = await import('payload')
  const { default: config } = await import('../src/payload.config')

  const payload = await getPayload({ config })

  // Confirm the connection (push happens during connect above).
  await payload.db.drizzle.execute('SELECT 1')
  console.log('Schema sync complete — database is up to date with the Payload config.')
  process.exit(0)
}

run().catch((error) => {
  console.error('Schema sync failed:', error)
  process.exit(1)
})
