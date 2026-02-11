import { Metadata } from 'next'
import { Contact } from '@/components/sections/Contact'
import { Container } from '@/components/Container'

export const metadata: Metadata = {
  title: 'Contact - PE LIVE',
  description: 'Get in touch with PE LIVE gospel music band for bookings and inquiries.',
}

export default function ContactPage() {
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
      <Contact />
    </main>
  )
}
