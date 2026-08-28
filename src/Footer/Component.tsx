import React from 'react'

import type { Config, Footer as FooterType } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getUpcomingEvents } from '@/utilities/getEvents'

type NavItem = {
  label: string
  url: string
  newTab?: boolean | null
}

const defaultNavItems: NavItem[] = [
  { label: 'Home', url: '/#home' },
  { label: 'About', url: '/#about' },
  { label: 'Services', url: '/#works' },
  { label: 'Up Next', url: '/#upcoming' },
]

const defaultSocials = [
  { label: 'Instagram', url: 'https://instagram.com/peliveon' },
  { label: 'Facebook', url: 'https://facebook.com/peliveon' },
  { label: 'TikTok', url: 'https://tiktok.com/@peliveon' },
  { label: 'YouTube', url: 'https://youtube.com/@pelive' },
]

export async function Footer() {
  const [footer, frontPage, upcomingEvents] = await Promise.all([
    getCachedGlobal('footer', 1)().catch(() => null) as Promise<FooterType | null>,
    getCachedGlobal('frontPage', 1)().catch(() => null) as Promise<Config['globals']['frontPage'] | null>,
    getUpcomingEvents(),
  ])

  const tagline2 = frontPage?.hero?.tagline ?? 'Sing · Feel · Connect'

  // Ticket CTA only exists while there is a featured event that has not
  // passed yet (getUpcomingEvents already excludes past events).
  const featuredEvent = upcomingEvents.find((event) => event.featured === 'featured')

  const navItems: NavItem[] =
    footer?.navItems && footer.navItems.length > 0
      ? footer.navItems.map(({ link }) => ({
          label: link.label,
          url:
            link.type === 'custom'
              ? link.url || '#'
              : link.reference?.relationTo === 'pages' &&
                  typeof link.reference.value === 'object' &&
                  link.reference.value?.slug
                ? `/${link.reference.value.slug}`
                : '#',
          newTab: link.newTab,
        }))
      : defaultNavItems
  const normalizedNavItems = navItems.map((item) => ({
    ...item,
    // Bare #anchor links only work on the homepage - route them through "/".
    url: item.url.startsWith('#') && item.url.length > 1 ? `/${item.url}` : item.url,
  }))

  const socials = footer?.socialLinks && footer.socialLinks.length > 0 ? footer.socialLinks : defaultSocials
  const tagline =
    footer?.tagline || 'Black American-style Gospel from Ghent, Belgium. Gospel music with an attitude.'
  const bookingEmail = footer?.bookingEmail || 'info@pelive.be'
  const ticketUrl = featuredEvent ? featuredEvent.ticketUrl || footer?.ticketUrl || null : null
  const creditLabel = footer?.creditLabel || 'Pilarres'
  const creditUrl = footer?.creditUrl || 'https://pilarres.com'

  return (
    <footer className="border-t border-white/10 bg-ink-2 pb-9 pt-16 text-stone-100 lg:pt-18">
      <div className="mx-auto w-full max-w-[90rem] px-5 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-12 border-b border-white/10 pb-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <Logo className="h-10 w-auto" />
              <span className="block h-6 w-px bg-magenta/45" aria-hidden="true" />
              <span className="font-display text-lg font-extrabold leading-none tracking-[-0.02em] text-stone-100">
                PE LIVE
              </span>
              <span className="block h-1.5 w-1.5 bg-magenta" aria-hidden="true" />
            </div>
            <p className="mb-4 font-tagline text-[10px] uppercase tracking-[0.3em] text-blush">{tagline2}</p>
            <p className="m-0 max-w-[34ch] text-[15px] leading-relaxed text-zinc-400">{tagline}</p>
          </div>

          <div>
            <p className="mb-4 text-[11px] uppercase tracking-[0.22em] text-zinc-500">Explore</p>
            <nav className="flex flex-col gap-3 text-[15px]" aria-label="Footer navigation">
              {normalizedNavItems.map((item) => (
                <a
                  key={`${item.label}-${item.url}`}
                  href={item.url}
                  target={item.newTab ? '_blank' : undefined}
                  rel={item.newTab ? 'noopener noreferrer' : undefined}
                  className="text-zinc-200 no-underline transition-colors hover:text-magenta"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <p className="mb-4 text-[11px] uppercase tracking-[0.22em] text-zinc-500">Follow</p>
            <nav className="flex flex-col gap-3 text-[15px]" aria-label="Social media">
              {socials.map((social) => (
                <a
                  key={('id' in social && typeof social.id === 'string' && social.id) || social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-200 no-underline transition-colors hover:text-magenta"
                >
                  {social.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <p className="mb-4 text-[11px] uppercase tracking-[0.22em] text-zinc-500">Booking</p>
            <a
              href={`mailto:${bookingEmail}`}
              className="font-display text-xl font-medium text-stone-100 no-underline transition-colors hover:text-magenta"
            >
              {bookingEmail}
            </a>
            {ticketUrl && (
              <div>
                <a
                  href={ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2.5 border border-white/30 px-5 py-3.5 font-display text-xs font-semibold uppercase tracking-[0.16em] text-white no-underline transition-colors hover:border-magenta hover:bg-magenta/10"
                >
                  Get Tickets <span aria-hidden="true">→</span>
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-7 text-[13px] text-zinc-500">
          <p className="m-0">
            Copyright © {new Date().getFullYear()} PE LIVE. All rights reserved. Website by{' '}
            <a
              href={creditUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-magenta text-zinc-400 no-underline transition-colors hover:text-white"
            >
              {creditLabel}
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  )
}
