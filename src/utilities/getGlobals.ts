import type { Config } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

type Global = keyof Config['globals']

async function getGlobal(slug: Global, depth = 0) {
  // No try/catch here on purpose: if this throws, unstable_cache does NOT
  // store the result. Catching and returning null used to poison the cache —
  // the null was stored without expiry and survived deployments, leaving the
  // site on its fallback rendering long after the underlying error was fixed.
  const payload = await getPayload({ config: configPromise })

  return payload.findGlobal({
    slug,
    depth,
  })
}

/**
 * Returns an unstable_cache function mapped with the cache tag for the slug.
 *
 * Successful results are cached for 5 minutes (and invalidated immediately by
 * the global's revalidate hook on save); failures are never cached. Callers
 * that can render without the global should append `.catch(() => null)`.
 */
export const getCachedGlobal = (slug: Global, depth = 0) =>
  unstable_cache(async () => getGlobal(slug, depth), [slug, String(depth)], {
    tags: [`global_${slug}`],
    revalidate: 300,
  })
