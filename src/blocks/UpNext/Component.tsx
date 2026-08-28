'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'

import type { UpNext as UpNextType } from '@/payload-types'

interface Event {
  id: string
  title: string
  eventDate: string
  location: string
  summary: string
  fullDescription?: any
  featured: string
  image?: any
  ticketUrl?: string
}

export const UpNextBlock: React.FC<{ block: UpNextType }> = ({ block }) => {
  const { title, subtitle, maxEvents, showFeatured, fallbackContent } = block
  const [featuredEvent, setFeaturedEvent] = useState<Event | null>(null)
  const [additionalEvents, setAdditionalEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events')
        const data = await response.json()
        setFeaturedEvent(data.featuredEvent || null)
        setAdditionalEvents((data.additionalEvents || []).slice(0, maxEvents || 3))
      } catch (error) {
        console.error('Error fetching events:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [maxEvents])

  if (loading) {
    return (
      <section id="upcoming" aria-label="Upcoming Events" className="relative w-full bg-slate-50 py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tight text-slate-900">
              {title}
            </h2>
            <p className="mt-4 text-lg tracking-tight text-slate-700">
              {subtitle}
            </p>
            <div className="mt-16 text-center text-slate-500">Loading events...</div>
          </div>
        </div>
      </section>
    )
  }

  if (!loading && !featuredEvent && additionalEvents.length === 0) {
    return (
      <section id="upcoming" aria-label="Upcoming Events" className="relative w-full bg-slate-50 py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tight text-slate-900">
              {title}
            </h2>
            <p className="mt-4 text-lg tracking-tight text-slate-700">
              {subtitle}
            </p>
            <div className="mt-16 text-center">
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                {fallbackContent?.title || 'No Upcoming Events'}
              </h3>
              <p className="text-slate-600">
                {fallbackContent?.message || 'Check back soon for upcoming performances and events!'}
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="upcoming" aria-label="Upcoming Events" className="relative w-full bg-slate-50 py-32">
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
        {showFeatured && featuredEvent && (
          <div className="mt-16 mb-12">
            <div className="relative min-h-[28rem] overflow-hidden rounded-3xl shadow-2xl">
              {featuredEvent.image && typeof featuredEvent.image === 'object' && featuredEvent.image.url ? (
                <>
                  <div className="absolute inset-0">
                    <Image
                      className="h-full w-full object-cover"
                      src={featuredEvent.image.url}
                      alt={featuredEvent.title || 'Featured Event'}
                      fill
                      sizes="100vw"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/35" />
                </>
              ) : (
                <div className="absolute inset-0 bg-slate-900" />
              )}

              <div className="relative z-10 flex min-h-[28rem] items-end">
                <div className="w-full p-8 lg:p-12">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
                      {new Date(featuredEvent.eventDate).toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </span>
                    <span className="text-sm text-white/80">
                      {featuredEvent.location}
                    </span>
                  </div>
                  
                  <h3 className="mb-4 font-display text-2xl text-white lg:text-4xl">
                    {featuredEvent.title}
                  </h3>
                  
                  <p className="mb-6 max-w-2xl text-base text-white/85 lg:text-lg">
                    {featuredEvent.summary}
                  </p>
                  
                  {featuredEvent.ticketUrl && (
                    <a
                      href={featuredEvent.ticketUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-base font-semibold text-slate-950 shadow-sm transition-colors duration-200 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
                    {new Date(event.eventDate).toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </span>
                </div>
                
                <h3 className="font-display text-xl text-slate-900 mb-2">
                  {event.title}
                </h3>
                
                <p className="text-slate-600 mb-4">
                  {event.location}
                </p>
                
                <p className="text-sm text-slate-700 mb-6">
                  {event.summary}
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

              </div>
    </section>
  )
}
