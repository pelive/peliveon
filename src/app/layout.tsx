import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PE LIVE - Gospel Music Band',
  description: 'PE LIVE is a pioneering Gospel band bringing Black American-style Gospel music to Belgium. Experience electrifying performances, unique dance moves, and soul-stirring music.',
  keywords: ['PE LIVE', 'Gospel music', 'Belgium', 'Black American Gospel', 'concerts', 'events', 'band', 'music', 'performances'],
  authors: [{ name: 'PE LIVE' }],
  creator: 'PE LIVE',
  publisher: 'PE LIVE',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://pelive.be'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://pelive.be',
    title: 'PE LIVE - Gospel Music Band',
    description: 'PE LIVE is a pioneering Gospel band bringing Black American-style Gospel music to Belgium. Experience electrifying performances, unique dance moves, and soul-stirring music.',
    siteName: 'PE LIVE',
    images: [
      {
        url: '/pictures/1.jpg',
        width: 1200,
        height: 630,
        alt: 'PE LIVE Gospel Band Performance',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PE LIVE - Gospel Music Band',
    description: 'PE LIVE is a pioneering Gospel band bringing Black American-style Gospel music to Belgium.',
    images: ['/pictures/1.jpg'],
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
  verification: {
    google: 'verification-token',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
