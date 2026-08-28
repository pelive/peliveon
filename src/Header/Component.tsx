import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getUpcomingEvents } from '@/utilities/getEvents'
import React from 'react'

import type { Config, Header } from '@/payload-types'

export async function Header() {
  const [headerData, frontPage, upcomingEvents] = await Promise.all([
    getCachedGlobal('header', 1)().catch(() => null) as Promise<Header | null>,
    getCachedGlobal('frontPage', 1)().catch(() => null) as Promise<Config['globals']['frontPage'] | null>,
    getUpcomingEvents(),
  ])

  // Ticket CTAs only exist while there is a featured event that has not
  // passed yet (getUpcomingEvents already excludes past events).
  const featuredEvent = upcomingEvents.find((event) => event.featured === 'featured')
  const ticketUrl = featuredEvent
    ? featuredEvent.ticketUrl || frontPage?.hero?.ticketUrl || null
    : null

  return (
    <HeaderClient
      data={headerData}
      ticketUrl={ticketUrl}
      bookingEmail={frontPage?.contact?.email || 'info@pelive.be'}
    />
  )
}
