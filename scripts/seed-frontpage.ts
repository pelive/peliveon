import { getPayload } from 'payload'
import config from '../src/payload.config'
import { seedFrontPage } from '../src/app/(frontend)/next/seed/route'
import { config as dotenvConfig } from 'dotenv'

dotenvConfig()

async function main() {
  console.log('Initializing Payload...')
  const payload = await getPayload({ config })
  
  console.log('Seeding frontPage global...')
  const result = await seedFrontPage(payload)
  
  console.log('\n✓ Seed completed successfully!')
  console.log(JSON.stringify(result, null, 2))
  
  process.exit(0)
}

main().catch((error) => {
  console.error('Seed failed:', error)
  process.exit(1)
})
