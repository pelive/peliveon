import React from 'react'

interface OrganizationStructuredData {
  name: string
  description: string
  url: string
  logo: string
  contactPoint: {
    telephone?: string
    email: string
    contactType: string
  }
  sameAs?: string[]
}

interface EventStructuredData {
  name: string
  description: string
  startDate: string
  endDate?: string
  location: {
    name: string
    address: string
  }
  performer: {
    name: string
    description: string
  }
}

export function OrganizationStructuredData({ data }: { data: OrganizationStructuredData }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    ...data
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export function EventStructuredData({ data }: { data: EventStructuredData }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    ...data
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
