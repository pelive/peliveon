import type { Config } from 'src/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'
import { isDatabaseAvailable } from './checkDatabase'

type Global = keyof Config['globals']

async function getGlobal(slug: Global, depth = 0) {
  // Check if database is available
  const dbAvailable = await isDatabaseAvailable()
  if (!dbAvailable) {
    console.log(`Database not available during build, returning null for global: ${slug}`)
    return null
  }

  const payload = await getPayload({ config: configPromise })

  const global = await payload.findGlobal({
    slug,
    depth,
  })

  return global
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug
 */
export const getCachedGlobal = (slug: Global, depth = 0) =>
  unstable_cache(async () => getGlobal(slug, depth), [slug], {
    tags: [`global_${slug}`],
  })
