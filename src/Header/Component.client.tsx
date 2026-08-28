'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import clsx from 'clsx'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h10" />
    </svg>
  )
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

interface HeaderClientProps {
  data: Header | null
  ticketUrl: string | null
  bookingEmail: string
}

type NavItem = {
  label: string
  url: string
  newTab?: boolean | null
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data: _data, ticketUrl, bookingEmail }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!mobileMenuOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileMenuOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [mobileMenuOpen])

  const defaultNavItems: NavItem[] = [
    { label: 'Home', url: '/#home' },
    { label: 'About', url: '/#about' },
    { label: 'Services', url: '/#works' },
    { label: 'Up Next', url: '/#upcoming' },
    { label: 'Contact', url: '/#contact' },
  ]

  const navItems: NavItem[] = (
    _data?.navItems?.map(({ link }) => ({
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
    })) || defaultNavItems
  ).map((item) => ({
    ...item,
    // Bare #anchor links only work on the homepage - route them through "/"
    // so the menu works from every page.
    url: item.url.startsWith('#') && item.url.length > 1 ? `/${item.url}` : item.url,
  }))

  return (
    <>
      <header
        className={clsx(
          'fixed inset-x-0 top-0 z-40 transition-colors duration-300',
          scrolled || mobileMenuOpen
            ? 'border-b border-white/10 bg-ink/95 backdrop-blur-sm'
            : 'border-b border-transparent bg-transparent',
        )}
      >
        <div className="mx-auto flex h-20 w-full max-w-[90rem] items-center justify-between gap-8 px-5 sm:px-10 lg:px-16">
          <Link href="/" className="flex items-center gap-3" aria-label="PE LIVE — home">
            <Logo loading="eager" priority="high" className="h-9 w-auto sm:h-10" />
            <span className="block h-6 w-px bg-magenta/45" aria-hidden="true" />
            <span className="font-display text-lg font-extrabold leading-none tracking-[-0.02em] text-stone-100">
              PE LIVE
            </span>
            <span className="block h-1.5 w-1.5 bg-magenta" aria-hidden="true" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
            {navItems.map((item) => (
              <a
                key={`${item.label}-${item.url}`}
                href={item.url}
                target={item.newTab ? '_blank' : undefined}
                rel={item.newTab ? 'noopener noreferrer' : undefined}
                className="border-b border-transparent py-1.5 font-display text-xs uppercase tracking-[0.22em] text-zinc-200 transition-colors hover:border-magenta hover:text-white"
              >
                {item.label}
              </a>
            ))}
            {ticketUrl && (
              <a
                href={ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent px-5 py-3 font-display text-xs font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-accent-hover"
              >
                Get Tickets
              </a>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white md:hidden"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="fixed inset-0 z-50 flex flex-col bg-ink md:hidden"
        >
          <div className="flex h-20 items-center justify-between border-b border-white/10 px-5">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3"
              aria-label="PE LIVE — home"
            >
              <Logo loading="eager" priority="high" className="h-9 w-auto" />
              <span className="block h-1.5 w-1.5 bg-magenta" aria-hidden="true" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-white"
              aria-label="Close menu"
            >
              <CloseIcon className="h-6 w-6" />
            </button>
          </div>

          <nav className="flex flex-col px-5 pt-2" aria-label="Main navigation">
            {navItems.map((item) => (
              <a
                key={`mobile-${item.label}-${item.url}`}
                href={item.url}
                target={item.newTab ? '_blank' : undefined}
                rel={item.newTab ? 'noopener noreferrer' : undefined}
                onClick={() => setMobileMenuOpen(false)}
                className="flex min-h-16 items-center border-b border-white/10 font-display text-2xl font-semibold uppercase tracking-[-0.01em] text-stone-100 transition-colors hover:text-magenta"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="mt-auto p-5">
            {ticketUrl && (
              <a
                href={ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex min-h-14 items-center justify-center gap-2.5 bg-accent font-display text-sm font-semibold uppercase tracking-[0.14em] text-white"
              >
                Get Tickets <span aria-hidden="true">→</span>
              </a>
            )}
            <p className="mb-0 mt-5 text-[10px] uppercase tracking-[0.2em] text-zinc-500">Booking</p>
            <a href={`mailto:${bookingEmail}`} className="font-display text-lg text-stone-100">
              {bookingEmail}
            </a>
          </div>
        </div>
      )}
    </>
  )
}
