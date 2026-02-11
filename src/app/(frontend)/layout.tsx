import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { Inter, Lexend, Noto_Serif_Georgian } from 'next/font/google'
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

const georgia = Noto_Serif_Georgian({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-georgia',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html className={cn('h-full scroll-smooth antialiased', inter.variable, lexend.variable, georgia.variable)} lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <OrganizationStructuredData 
          data={{
            name: "PE Live",
            description: "PE Live is a pioneering Black American-style Gospel band reinventing Gospel music in Belgium",
            url: getServerSideURL(),
            logo: `${getServerSideURL()}/logos/pelive-small.svg`,
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
      <body className="flex h-full flex-col bg-black bg-cover bg-center bg-fixed">
        <ErrorBoundary>
          <Providers>
            <AdminBar
              adminBarProps={{
                preview: isEnabled,
              }}
            />

            <Header />
            <ErrorBoundary>
              {children}
            </ErrorBoundary>
            <Footer />
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
