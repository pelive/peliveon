import { Metadata } from 'next'

import type { Config } from '@/payload-types'
import { Contact } from '@/components/sections/Contact'
import { Container } from '@/components/Container'
import { getCachedGlobal } from '@/utilities/getGlobals'

export const metadata: Metadata = {
  title: 'Contact - PE LIVE',
  description: 'Get in touch with PE LIVE gospel music band for bookings and inquiries.',
}

export default async function ContactPage() {
  const frontPage = (await getCachedGlobal('frontPage', 1)()) as Config['globals']['frontPage'] | null
  const contactData = frontPage?.contact

  return (
    <main className="min-h-screen">
      <Container className="py-16">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-tight text-slate-900 mb-6">
              Contact PE LIVE
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Ready to bring the power and passion of PE LIVE to your event? We'd love to hear from you!
            </p>
          </div>
        </div>
      </Container>
      {contactData ? <Contact data={contactData} /> : null}
    </main>
  )
}
