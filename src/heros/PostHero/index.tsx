import { formatDateTime } from '@/utilities/formatDateTime'
import React from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import { formatAuthors } from '@/utilities/formatAuthors'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { categories, heroImage, populatedAuthors, publishedAt, title } = post

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''

  return (
    <div className="relative flex min-h-[28rem] items-end overflow-hidden bg-ink pt-20 lg:min-h-[34rem]">
      {heroImage && typeof heroImage !== 'string' && (
        <Media fill priority imgClassName="object-cover object-[50%_28%]" resource={heroImage} />
      )}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/35 via-ink/20 to-ink"
        aria-hidden="true"
      />

      <div className="container relative z-10 pb-10">
        <div className="mx-auto max-w-3xl">
          {categories && categories.length > 0 && (
            <p className="mb-3.5 text-[11px] uppercase tracking-[0.28em] text-accent">
              {categories.map((category, index) => {
                if (typeof category === 'object' && category !== null) {
                  const titleToUse = category.title || 'Untitled category'
                  const isLast = index === categories.length - 1

                  return (
                    <React.Fragment key={index}>
                      {titleToUse}
                      {!isLast && <React.Fragment>, &nbsp;</React.Fragment>}
                    </React.Fragment>
                  )
                }
                return null
              })}
            </p>
          )}

          <h1 className="mb-5 font-display text-3xl font-bold leading-none tracking-[-0.03em] text-white sm:text-4xl lg:text-5xl">
            {title}
          </h1>

          <div className="flex flex-col gap-4 md:flex-row md:gap-12">
            {hasAuthors && (
              <div>
                <p className="mb-1 text-[11px] uppercase tracking-[0.2em] text-zinc-500">Author</p>
                <p className="m-0 text-[15px] text-zinc-200">{formatAuthors(populatedAuthors)}</p>
              </div>
            )}
            {publishedAt && (
              <div>
                <p className="mb-1 text-[11px] uppercase tracking-[0.2em] text-zinc-500">Published</p>
                <time dateTime={publishedAt} className="text-[15px] text-zinc-200">
                  {formatDateTime(publishedAt)}
                </time>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
