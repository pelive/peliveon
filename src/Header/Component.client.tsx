'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

interface HeaderClientProps {
  data: Header | null
}

type NavItem = {
  label: string
  url: string
  newTab?: boolean | null
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data: _data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
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

  const navItems: NavItem[] =
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

  return (
    <>
      <header className="py-10">
        <div className="container relative z-20" {...(theme ? { 'data-theme': theme } : {})}>
          <div className="flex items-center justify-between gap-8">
            <Link href="/">
              <Logo loading="eager" priority="high" className="h-10 w-auto" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-6 md:flex">
              {navItems.map((item) => (
                <a
                  key={`${item.label}-${item.url}`}
                  href={item.url}
                  target={item.newTab ? '_blank' : undefined}
                  rel={item.newTab ? 'noopener noreferrer' : undefined}
                  className="font-display text-sm uppercase tracking-[0.2em] text-slate-100 transition-colors hover:text-red-400"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white p-2"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? (
                <CloseIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Navigation menu" className="fixed inset-0 z-50 bg-zinc-950 md:hidden">
          <div className="container py-10">
            <div className="flex items-center justify-between mb-8">
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                <Logo loading="eager" priority="high" className="h-10 w-auto" />
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-white p-2"
                aria-label="Close menu"
              >
                <CloseIcon className="h-6 w-6" />
              </button>
            </div>
            
            <nav className="flex flex-col gap-6">
              {navItems.map((item) => (
                <a
                  key={`mobile-${item.label}-${item.url}`}
                  href={item.url}
                  target={item.newTab ? '_blank' : undefined}
                  rel={item.newTab ? 'noopener noreferrer' : undefined}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-display text-2xl uppercase tracking-[0.2em] text-slate-100 transition-colors hover:text-red-400 py-3 border-b border-slate-800"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
