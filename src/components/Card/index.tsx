'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'

export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title'>

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { cardRef, linkRef } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, meta, title } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`

  return (
    <article
      className={cn(
        'overflow-hidden border border-white/10 bg-ink-3 transition-colors duration-300 hover:cursor-pointer hover:border-magenta',
        className,
      )}
      ref={cardRef}
    >
      {metaImage && typeof metaImage !== 'string' && (
        <div className="relative w-full">
          <Media resource={metaImage} size="33vw" />
        </div>
      )}
      <div className="p-6 sm:p-7">
        {showCategories && hasCategories && (
          <p className="mb-2.5 text-[11px] uppercase tracking-[0.2em] text-magenta">
            {categories?.map((category, index) => {
              if (typeof category === 'object') {
                const categoryTitle = category.title || 'Untitled category'
                const isLast = index === categories.length - 1

                return (
                  <Fragment key={index}>
                    {categoryTitle}
                    {!isLast && <Fragment>, &nbsp;</Fragment>}
                  </Fragment>
                )
              }

              return null
            })}
          </p>
        )}
        {titleToUse && (
          <h3 className="mb-2.5 font-display text-xl font-semibold leading-snug text-white sm:text-[1.375rem]">
            <Link className="no-underline" href={href} ref={linkRef}>
              {titleToUse}
            </Link>
          </h3>
        )}
        {description && (
          <p className="m-0 text-[15px] leading-relaxed text-zinc-400">{sanitizedDescription}</p>
        )}
      </div>
    </article>
  )
}
