import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  locale: 'en_US',
  description:
    'Sing · Feel · Connect — PE LIVE brings Black American-style Gospel from Ghent, Belgium. Electrifying performances, unique dance moves, and soul-stirring music.',
  images: [
    {
      url: `${getServerSideURL()}/pictures/1.jpg`,
      width: 1200,
      height: 630,
      alt: 'PE LIVE in concert',
    },
  ],
  siteName: 'PE LIVE',
  title: 'PE LIVE — Sing · Feel · Connect',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
