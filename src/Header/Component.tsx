import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Config, Header } from '@/payload-types'

export async function Header() {
  const [headerData, frontPage] = await Promise.all([
    getCachedGlobal('header', 1)() as Promise<Header | null>,
    getCachedGlobal('frontPage', 1)() as Promise<Config['globals']['frontPage'] | null>,
  ])

  return (
    <HeaderClient
      data={headerData}
      ticketUrl={frontPage?.hero?.ticketUrl || 'https://ticketsgent.be/producties/pe-live-in-concert'}
      bookingEmail={frontPage?.contact?.email || 'info@pelive.be'}
    />
  )
}
