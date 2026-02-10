'use client'

import React from 'react'
import Image from 'next/image'
import RichText from '@/components/RichText'

import type { WhoWeAre as WhoWeAreType } from '@/payload-types'

export const WhoWeAreBlock: React.FC<{ block: WhoWeAreType }> = ({ block }) => {
  const { backgroundImage, title, content } = block || {}

  return (
    <section
      id="about"
      aria-label="Who We Are"
      className="relative w-screen bg-zinc-900 py-32 -z-20"
    >
      {backgroundImage && typeof backgroundImage === 'object' && backgroundImage.url && (
        <Image
          className="absolute top-1/2 w-full h-full -translate-y-1/2 opacity-[25%] -z-10 object-cover"
          src={backgroundImage.url}
          alt=""
          width={2347}
          height={1244}
          unoptimized
        />
      )}
      <div className="container mx-auto px-4">
        <div className="mx-auto my-auto max-w-2xl md:text-center tracking-tight z-20">
          <h2 className="mb-10 font-display text-3xl sm:text-4xl md:text-5xl text-slate-50">
            {title}
          </h2>
          <div className="mt-4 font-bold z-10 text-lg sm:text-xl text-white">
            <RichText data={content} enableGutter={false} />
          </div>
        </div>
      </div>
    </section>
  )
}
