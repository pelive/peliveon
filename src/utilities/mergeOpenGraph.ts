import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  locale: 'en_US',
  description:
    'PE LIVE is a pioneering Gospel band bringing Black American-style Gospel music to Belgium. Experience electrifying performances, unique dance moves, and soul-stirring music.',
  images: [
    {
      url: `${getServerSideURL()}/pictures/1.jpg`,
      width: 1200,
      height: 630,
      alt: 'PE LIVE Gospel Band Performance',
    },
  ],
  siteName: 'PE LIVE',
  title: 'PE LIVE - Gospel Music Band',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
