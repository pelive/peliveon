import type { Metadata, Viewport } from 'next'

import { cn } from '@/utilities/ui'
import { Inter, Lexend, Michroma } from 'next/font/google'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { OrganizationStructuredData } from '@/components/StructuredData'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const lexend = Lexend({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lexend',
})

const michroma = Michroma({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-michroma',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html className={cn('h-full scroll-smooth antialiased', inter.variable, lexend.variable, michroma.variable)} lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <link rel="dns-prefetch" href="//ticketsgent.be" />
        <link rel="dns-prefetch" href="//ntgent.be" />
        <OrganizationStructuredData
          data={{
            name: "PE Live",
            description: "PE Live is a pioneering Black American-style Gospel band reinventing Gospel music in Belgium",
            url: getServerSideURL(),
            logo: `${getServerSideURL()}/logos/pelive-flat.svg`,
            contactPoint: {
              email: "info@pelive.be",
              contactType: "customer service"
            },
            sameAs: [
              "https://ticketsgent.be/producties/pe-live-in-concert"
            ]
          }}
        />
      </head>
      <body className="flex h-full flex-col bg-ink font-sans text-stone-100">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-black"
        >
          Skip to main content
        </a>
        <ErrorBoundary>
          <Providers>
            <AdminBar
              adminBarProps={{
                preview: isEnabled,
              }}
            />

            <Header />
            <ErrorBoundary>
              <main id="main-content" className="flex-1">
                {children}
              </main>
            </ErrorBoundary>
            <Footer />
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  )
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  title: {
    template: '%s | PE LIVE',
    default: 'PE LIVE - Gospel Music Band',
  },
  description:
    'PE LIVE is a pioneering Gospel band bringing Black American-style Gospel music to Belgium. Experience electrifying performances, unique dance moves, and soul-stirring music.',
  keywords: ['PE LIVE', 'Gospel music', 'Belgium', 'Black American Gospel', 'concerts', 'events', 'band', 'music', 'performances'],
  authors: [{ name: 'PE LIVE' }],
  creator: 'PE LIVE',
  publisher: 'PE LIVE',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}
