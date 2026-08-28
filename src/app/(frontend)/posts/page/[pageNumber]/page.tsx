import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { isDatabaseAvailable } from '@/utilities/checkDatabase'
import { notFound } from 'next/navigation'

export const revalidate = 600

type Args = {
  params: Promise<{
    pageNumber: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { pageNumber } = await paramsPromise
  const payload = await getPayload({ config: configPromise })

  const sanitizedPageNumber = Number(pageNumber)

  if (!Number.isInteger(sanitizedPageNumber)) notFound()

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    page: sanitizedPageNumber,
    overrideAccess: false,
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
        {posts?.page && posts?.totalPages > 1 && (
          <Pagination page={posts.page} totalPages={posts.totalPages} />
        )}
      </div>
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { pageNumber } = await paramsPromise
  return {
    title: `News — Page ${pageNumber || ''}`,
    alternates: {
      canonical: `/posts/page/${pageNumber}`,
    },
  }
}

export async function generateStaticParams() {
  // Check if database is available during build
  const dbAvailable = await isDatabaseAvailable()
  if (!dbAvailable) {
    console.log('Database not available during build, returning empty static params for posts pagination')
    return []
  }

  try {
    const payload = await getPayload({ config: configPromise })
    const { totalDocs } = await payload.count({
      collection: 'posts',
      overrideAccess: false,
      where: {
        _status: {
          equals: 'published',
        },
      },
    })

    const totalPages = Math.ceil(totalDocs / 10)

    const pages: { pageNumber: string }[] = []

    for (let i = 1; i <= totalPages; i++) {
      pages.push({ pageNumber: String(i) })
    }

    return pages
  } catch (error) {
    console.error('Error in posts pagination generateStaticParams:', error)
    return []
  }
}
