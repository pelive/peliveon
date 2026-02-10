'use client'

import Image from 'next/image'

import type { UpNext as UpNextType } from '@/payload-types'

export const UpNextBlock: React.FC<{ block: UpNextType }> = ({ block }) => {
  const { title, subtitle, featuredEvent, additionalEvents, mailingListText, mailingListLinkText } = block

  return (
    <section id="upcoming" aria-label="Upcoming Events" className="relative w-screen bg-slate-50 py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tight text-slate-900">
            {title}
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            {subtitle}
          </p>
        </div>

        {/* Featured Event */}
        {featuredEvent && (
          <div className="mt-16 mb-12">
            <div className="relative rounded-3xl bg-white shadow-2xl overflow-hidden">
              <div className="lg:grid lg:grid-cols-2 lg:gap-0">
                {/* Event Image */}
                {featuredEvent.image && typeof featuredEvent.image === 'object' && featuredEvent.image.url && (
                  <div className="relative h-64 lg:h-full">
                    <Image
                      className="w-full h-full object-cover"
                      src={featuredEvent.image.url}
                      alt={featuredEvent.title || 'Featured Event'}
                      width={800}
                      height={600}
                      unoptimized
                    />
                  </div>
                )}
                
                {/* Event Details */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-800">
                      {featuredEvent.date}
                    </span>
                    <span className="text-sm text-slate-500">
                      {featuredEvent.location}
                    </span>
                  </div>
                  
                  <h3 className="font-display text-2xl lg:text-3xl text-slate-900 mb-4">
                    {featuredEvent.title}
                  </h3>
                  
                  <p className="text-slate-600 mb-6 text-lg">
                    {featuredEvent.description}
                  </p>
                  
                  {featuredEvent.ticketUrl && (
                    <a
                      href={featuredEvent.ticketUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-lg bg-red-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 transition-colors duration-200"
                    >
                      Book Tickets
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Additional Events */}
        {additionalEvents && additionalEvents.length > 0 && (
          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {additionalEvents.map((event, index) => (
              <div
                key={index}
                className="relative rounded-2xl bg-white p-8 shadow-xl ring-1 ring-slate-900/10 transition-all duration-300 hover:shadow-2xl hover:scale-105"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-800">
                    {event.date}
                  </span>
                </div>
                
                <h3 className="font-display text-xl text-slate-900 mb-2">
                  {event.title}
                </h3>
                
                <p className="text-slate-600 mb-4">
                  {event.location}
                </p>
                
                <p className="text-sm text-slate-700 mb-6">
                  {event.description}
                </p>
                
                {event.ticketUrl && (
                  <a
                    href={event.ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 transition-colors duration-200"
                  >
                    Book Tickets
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Mailing List */}
        <div className="mt-16 text-center">
          <p className="text-lg text-slate-700">
            {mailingListText}{' '}
            <a
              href="#contact"
              className="font-semibold text-red-600 hover:text-red-500"
            >
              {mailingListLinkText}
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
