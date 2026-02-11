'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'

export const HeaderNav: React.FC<{ data: HeaderType | null; mobile?: boolean }> = ({ data, mobile = false }) => {
  const navItems = data?.navItems || []

  if (mobile) {
    return (
      <nav className="flex flex-col gap-4">
        {navItems.map(({ link }, i) => {
          const href = link.url || '#'
          return (
            <a 
              key={i} 
              href={href}
              className="text-slate-900 hover:text-red-600 transition-colors block py-2"
              {...(link.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {link.label}
            </a>
          )
        })}
      </nav>
    )
  }

  return (
    <nav className="flex gap-3 items-center">
      {navItems.map(({ link }, i) => {
        return <CMSLink key={i} {...link} appearance="link" />
      })}
    </nav>
  )
}
