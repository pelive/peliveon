import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import { PEHomePage } from '@/components/PEHomePage'
import { RenderHero } from '@/heros/RenderHero'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import PageClient from './page.client'
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { isDatabaseAvailable } from '@/utilities/checkDatabase'
import { LivePreviewListener } from '@/components/LivePreviewListener'

type Args = {
  params: Promise<{
    slug?: string
  }>
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  // Check if database is available
  const dbAvailable = await isDatabaseAvailable()
  if (!dbAvailable) {
    console.log(`Database not available during build, returning null for page slug: ${slug}`)
    return null
  }

  try {
    const { isEnabled: draft } = await draftMode()
    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
      collection: 'pages',
      draft,
      limit: 1,
      pagination: false,
      overrideAccess: false,
      where: {
        and: [
          {
            slug: {
              equals: slug,
            },
          },
          {
            _status: {
              equals: 'published',
            },
          },
        ],
      },
    })

    return result.docs?.[0] || null
  } catch (error) {
    console.error('Error fetching page:', error)
    return null
  }
})

export async function generateStaticParams() {
  // Check if database is available during build
  const dbAvailable = await isDatabaseAvailable()
  if (!dbAvailable) {
    console.log('Database not available during build, returning empty static params')
    return []
  }

  try {
    const payload = await getPayload({ config: configPromise })
    const pages = await payload.find({
      collection: 'pages',
      draft: false,
      limit: 1000,
      overrideAccess: false,
      pagination: false,
      select: {
        slug: true,
      },
      where: {
        _status: {
          equals: 'published',
        },
      },
    })

    const params = pages.docs
      ?.filter((doc) => {
        return doc.slug !== 'home'
      })
      .map(({ slug }) => {
        return { slug }
      })

    return params || []
  } catch (error) {
    console.error('Error in generateStaticParams:', error)
    return []
  }
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = 'home' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const url = '/' + decodedSlug

  // Try to get admin-edited page first
  let page: RequiredDataFromCollectionSlug<'pages'> | null = null
  
  if (slug === 'home') {
    page = await queryPageBySlug({ slug: decodedSlug })
  }

  // If no admin content exists, show static homepage
  if (slug === 'home' && (!page || !page.layout || page.layout.length === 0)) {
    return (
      <article>
        <PageClient />
        <PayloadRedirects disableNotFound url={url} />
        <PEHomePage />
      </article>
    )
  }

  // Force static content for homepage to match old repo
  if (slug === 'home') {
    return (
      <article>
        <PageClient />
        <PayloadRedirects disableNotFound url={url} />
        <PEHomePage />
      </article>
    )
  }

  // If admin content exists, use it
  if (page) {
    return (
      <article className="pt-16 pb-24">
        <PageClient />
        <PayloadRedirects disableNotFound url={url} />
        {draft && <LivePreviewListener />}
        
        {/* Show admin-edited hero if exists, otherwise use static hero */}
        {page.hero && page.hero.type !== 'none' ? (
          <RenderHero {...page.hero} />
        ) : (
          <PEHomePage />
        )}
        
        {/* Show admin-edited blocks if they exist */}
        {page.layout && page.layout.length > 0 && (
          <RenderBlocks blocks={page.layout} />
        )}
      </article>
    )
  }

  // For other pages without content
  return notFound()
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = 'home' } = await paramsPromise
  
  if (slug === 'home') {
    return {
      title: {
        template: '%s - PE LIVE',
        default: 'PE LIVE - Gospel Music Band',
      },
      description: 'Gospel music like you\'ve never seen before.',
    }
  }

  return {
    title: 'PE LIVE',
    description: 'Gospel music like you\'ve never seen before.',
  }
}
