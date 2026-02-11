'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'

interface HeaderClientProps {
  data: Header | null
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header className="py-10">
      <div className="container relative z-20" {...(theme ? { 'data-theme': theme } : {})}>
        <div className="flex justify-between items-center">
          <Link href="/">
            <Logo loading="eager" priority="high" className="h-10 w-auto" />
          </Link>
          
          {/* Event Info and Ticket Button */}
          <div className="flex items-center gap-x-5 md:gap-x-8">
            <p className="font-display text-lg sm:text-2xl text-slate-100 uppercase">
              <span className="mx-2">SAT, 28 SEP 2024</span>
              <span className="relative text-red-600"> || </span>
              <span className="mx-2">20:00</span>
              <span className="relative text-red-600"> || </span>
              <br className="block lg:hidden" />
              <a href="https://ntgent.be/nl/plan-uw-bezoek/bereikbaarheid"
                 target="_blank" rel="noopener noreferrer">&#x1F517; NTGent</a>
            </p>
            <a 
              href="https://ticketsgent.be/producties/pe-live-in-concert"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              <span>
                <span className="hidden lg:inline">Info &</span> Tickets
              </span>
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
