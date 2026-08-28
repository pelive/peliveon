import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { isDatabaseAvailable } from '@/utilities/checkDatabase'
import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  // Check if database is available during build
  const dbAvailable = await isDatabaseAvailable()
  if (!dbAvailable) {
    console.log('Database not available during build, showing empty posts page')
    return (
      <div className="bg-ink pt-40 pb-24">
        <PageClient />
        <div className="container mb-16">
          <div className="prose dark:prose-invert max-w-none">
            <h1>Posts</h1>
            <p>No posts available at the moment.</p>
          </div>
        </div>
      </div>
    )
  }

  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
  })

  return (
    <div className="bg-ink pt-40 pb-24">
      <PageClient />
      <div className="container mb-16">
        <p className="mb-4 text-[11px] uppercase tracking-[0.28em] text-accent">News</p>
        <h1 className="m-0 font-display text-4xl font-bold leading-none tracking-[-0.03em] text-white sm:text-5xl">
          From the road
        </h1>
      </div>

      <div className="container mb-8">
        <PageRange
          collection="posts"
          currentPage={posts.page}
          limit={12}
          totalDocs={posts.totalDocs}
        />
      </div>

      <CollectionArchive posts={posts.docs} />

      <div className="container">
        {posts.totalPages > 1 && posts.page && (
          <Pagination page={posts.page} totalPages={posts.totalPages} />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'News',
    description: 'News, stories and updates from PE LIVE.',
    alternates: {
      canonical: '/posts',
    },
  }
}
