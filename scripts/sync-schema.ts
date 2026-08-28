/**
 * Schema sync against the database in POSTGRES_URL.
 *
 * Payload's vercel-postgres adapter pushes schema changes on connect whenever
 * NODE_ENV !== 'production' (dev push). This script forces that path once and
 * exits, so new optional fields become columns without running the dev server.
 * Purely additive changes apply non-interactively; a change that could lose
 * data is never applied automatically (Payload cancels it in CI).
 *
 * Runs automatically before every build via the `prebuild` script with
 * `--optional`: when POSTGRES_URL is unset (local build without a database)
 * or SKIP_SCHEMA_SYNC=1, it skips instead of failing. Run it directly with
 * `npm run sync:schema` to require a database.
 */
import { config as dotenvConfig } from 'dotenv'

dotenvConfig()

const optional = process.argv.includes('--optional')

;(process.env as Record<string, string>).NODE_ENV = 'development'
process.env.PAYLOAD_SECRET = process.env.PAYLOAD_SECRET || 'schema-sync-only-secret'

async function run() {
  if (optional && process.env.SKIP_SCHEMA_SYNC === '1') {
    console.log('SKIP_SCHEMA_SYNC=1 — skipping schema sync.')
    process.exit(0)
  }

  if (!process.env.POSTGRES_URL) {
    if (optional) {
      console.log('POSTGRES_URL is not set — skipping schema sync.')
      process.exit(0)
    }
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
