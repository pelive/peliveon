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

type NavItem = {
  label: string
  url: string
  newTab?: boolean | null
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data: _data }) => {
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

  const defaultNavItems: NavItem[] = [
    { label: 'Home', url: '#home' },
    { label: 'About', url: '#about' },
    { label: 'Services', url: '#services' },
    { label: 'Up Next', url: '#upcoming' },
    { label: 'Contact', url: '#contact' },
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
    <header className="py-10">
      <div className="container relative z-20" {...(theme ? { 'data-theme': theme } : {})}>
        <div className="flex items-center justify-between gap-8">
          <Link href="/">
            <Logo loading="eager" priority="high" className="h-10 w-auto" />
          </Link>

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

          <a
            href="#contact"
            className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-gray-100 md:hidden"
          >
            Contact
          </a>
        </div>
      </div>
    </header>
  )
}
