'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'

import type { PastPerformances as PastPerformancesType } from '@/payload-types'

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

export const PastPerformancesBlock: React.FC<{ block: PastPerformancesType }> = ({ block }) => {
  const { enable, title, subtitle, maxEvents, showGallery, groupByYear, fallbackContent } = block || {}
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        console.log('Fetching past events from /api/past-performances...')
        const response = await fetch('/api/past-performances')
        console.log('Response status:', response.status)
        const data = await response.json()
        console.log('Past performances API response:', data)
        setEvents(data.pastEvents || [])
        console.log('Set past events to:', data.pastEvents || [])
      } catch (error) {
        console.error('Error fetching past events:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  if (!enable) return null

  if (loading) {
    return (
      <section className="relative w-screen bg-zinc-900 py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 font-display text-3xl sm:text-4xl md:text-5xl text-slate-50">
              {title}
            </h2>
            {subtitle && (
              <p className="mb-16 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto">
                {subtitle}
              </p>
            )}
            <div className="text-center text-slate-400">
              <p className="text-lg">Loading past performances...</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (!loading && events.length === 0) {
    return (
      <section className="relative w-screen bg-zinc-900 py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 font-display text-3xl sm:text-4xl md:text-5xl text-slate-50">
              {title}
            </h2>
            {subtitle && (
              <p className="mb-16 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto">
                {subtitle}
              </p>
            )}
            <div className="text-center text-slate-400">
              <p className="text-lg">No past performances yet</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative w-screen bg-zinc-900 py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 font-display text-3xl sm:text-4xl md:text-5xl text-slate-50">
            {title}
          </h2>
          {subtitle && (
            <p className="mb-16 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
          
          <div className="grid gap-8 lg:grid-cols-3">
            {events.slice(0, maxEvents || 6).map((event, index) => (
              <div
                key={index}
                className="relative rounded-2xl bg-zinc-800 p-8 shadow-xl ring-1 ring-zinc-700 transition-all duration-300 hover:shadow-2xl hover:scale-105"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center rounded-full bg-zinc-700 px-3 py-1 text-sm font-medium text-zinc-200">
                    {new Date(event.eventDate).getFullYear()}
                  </span>
                </div>
                
                <h3 className="font-display text-xl text-slate-50 mb-2">
                  {event.title}
                </h3>
                
                <p className="text-zinc-300 mb-2 text-sm">
                  {event.location}
                </p>
                
                <p className="text-zinc-400 mb-6 text-sm">
                  {event.summary}
                </p>
                
                {event.ticketUrl && (
                  <a
                    href={event.ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors duration-200"
                  >
                    Watch Performance
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
