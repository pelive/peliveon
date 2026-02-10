'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import clsx from 'clsx'

import type { WhatWeDo as WhatWeDoType } from '@/payload-types'

export const WhatWeDoBlock: React.FC<{ block: WhatWeDoType }> = ({ block }) => {
  const [tabOrientation, setTabOrientation] = useState<'horizontal' | 'vertical'>('horizontal')
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null)

  useEffect(() => {
    const lgMediaQuery = window.matchMedia('(min-width: 1024px)')
    
    function onMediaQueryChange({ matches }: { matches: boolean }) {
      setTabOrientation(matches ? 'vertical' : 'horizontal')
    }
    
    onMediaQueryChange({ matches: lgMediaQuery.matches })
    lgMediaQuery.addEventListener('change', onMediaQueryChange)
    return () => {
      lgMediaQuery.removeEventListener('change', onMediaQueryChange)
    }
  }, [])

  const { title, subtitle, services } = block

  if (!services || services.length === 0) return null

  return (
    <section id="services" aria-label="What We Do" className="relative w-screen bg-white py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tight text-slate-900">
            {title}
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            {subtitle}
          </p>
        </div>
        
        <div className="mt-16">
          <div className={clsx(
            'mx-auto grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-0',
            tabOrientation === 'vertical' ? '' : ''
          )}>
            {services.map((service, serviceIndex) => (
              <div
                key={serviceIndex}
                className={clsx(
                  'relative group',
                  tabOrientation === 'vertical' ? '' : 'flex flex-col'
                )}
                onMouseEnter={() => {
                  if (service.image && typeof service.image === 'object' && service.image.url) {
                    setBackgroundImage(service.image.url)
                  }
                }}
              >
                <div className="relative p-8 bg-white rounded-2xl shadow-xl ring-1 ring-slate-900/10 transition-all duration-300 group-hover:shadow-2xl">
                  <h3 className="font-display text-xl text-slate-900">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {backgroundImage && typeof backgroundImage === 'string' && (
            <div className="mt-12 relative h-96 rounded-2xl overflow-hidden lg:mt-0 lg:h-full lg:absolute lg:inset-0">
              <Image
                className="h-full w-full object-cover transition-all duration-500"
                src={backgroundImage}
                alt=""
                width={2347}
                height={1244}
                unoptimized
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
