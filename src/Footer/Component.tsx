import Link from 'next/link'
import React from 'react'

import type { Footer as FooterType } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { getCachedGlobal } from '@/utilities/getGlobals'

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
  const footer = (await getCachedGlobal('footer', 1)()) as FooterType | null

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

  const socials = footer?.socialLinks && footer.socialLinks.length > 0 ? footer.socialLinks : defaultSocials
  const tagline =
    footer?.tagline || 'Black American-style Gospel from Ghent, Belgium. Gospel music with an attitude.'
  const bookingEmail = footer?.bookingEmail || 'info@pelive.be'
  const ticketUrl = footer?.ticketUrl || 'https://ticketsgent.be/producties/pe-live-in-concert'
  const creditLabel = footer?.creditLabel || 'Pilarres'
  const creditUrl = footer?.creditUrl || 'https://pilarres.com'

  return (
    <footer className="border-t border-white/10 bg-ink-2 pb-9 pt-16 text-stone-100 lg:pt-18">
      <div className="mx-auto w-full max-w-[90rem] px-5 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-12 border-b border-white/10 pb-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <Logo className="h-10 w-auto" />
              <span className="block h-1.5 w-1.5 bg-accent" aria-hidden="true" />
            </div>
            <p className="m-0 max-w-[34ch] text-[15px] leading-relaxed text-zinc-400">{tagline}</p>
          </div>

          <div>
            <p className="mb-4 text-[11px] uppercase tracking-[0.22em] text-zinc-500">Explore</p>
            <nav className="flex flex-col gap-3 text-[15px]" aria-label="Footer navigation">
              {navItems.map((item) => (
                <a
                  key={`${item.label}-${item.url}`}
                  href={item.url}
                  target={item.newTab ? '_blank' : undefined}
                  rel={item.newTab ? 'noopener noreferrer' : undefined}
                  className="text-zinc-200 no-underline transition-colors hover:text-accent"
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
                  className="text-zinc-200 no-underline transition-colors hover:text-accent"
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
              className="font-display text-xl font-medium text-stone-100 no-underline transition-colors hover:text-accent"
            >
              {bookingEmail}
            </a>
            <div>
              <a
                href={ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2.5 border border-white/30 px-5 py-3.5 font-display text-xs font-semibold uppercase tracking-[0.16em] text-white no-underline transition-colors hover:border-accent hover:bg-accent/10"
              >
                Get Tickets <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-7 text-[13px] text-zinc-500">
          <p className="m-0">
            Copyright © {new Date().getFullYear()} PE LIVE. All rights reserved. Website by{' '}
            <a
              href={creditUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-accent text-zinc-400 no-underline transition-colors hover:text-white"
            >
              {creditLabel}
            </a>
            .
          </p>
          <p className="m-0 flex gap-5">
            <Link href="/posts" className="text-zinc-500 no-underline transition-colors hover:text-zinc-200">
              News
            </Link>
            <Link href="/search" className="text-zinc-500 no-underline transition-colors hover:text-zinc-200">
              Search
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
