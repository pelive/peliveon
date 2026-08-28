import { Metadata } from 'next'
import Image from 'next/image'

import type { Config } from '@/payload-types'
import { Contact } from '@/components/sections/Contact'
import { getCachedGlobal } from '@/utilities/getGlobals'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with PE LIVE gospel music band for bookings and inquiries.',
  alternates: {
    canonical: '/contact',
  },
}

export default async function ContactPage() {
  const [frontPage, footer] = await Promise.all([
    getCachedGlobal('frontPage', 1)().catch(() => null) as Promise<Config['globals']['frontPage'] | null>,
    getCachedGlobal('footer', 1)().catch(() => null) as Promise<Config['globals']['footer'] | null>,
  ])
  const contactData = frontPage?.contact
  const bannerImage =
    contactData?.backgroundImage && typeof contactData.backgroundImage === 'object'
      ? contactData.backgroundImage.url
      : null

  return (
    <div className="bg-ink">
      <div className="relative flex h-80 flex-col justify-end overflow-hidden pt-20">
        {bannerImage && (
          <Image
            src={bannerImage}
            alt=""
            fill
            sizes="100vw"
            priority
            className="object-cover object-[50%_30%] opacity-45"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 to-ink" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-[90rem] px-5 pb-10 sm:px-10 lg:px-16">
          <p className="mb-3.5 text-[11px] uppercase tracking-[0.28em] text-accent">Contact</p>
          <h1 className="m-0 font-display text-4xl font-bold leading-[0.95] tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl">
            Bring PE LIVE to your stage.
          </h1>
        </div>
      </div>
      {contactData ? <Contact data={contactData} socialLinks={footer?.socialLinks} /> : null}
    </div>
  )
}
