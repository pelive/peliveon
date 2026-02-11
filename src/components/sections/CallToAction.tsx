"use client";

import Image from 'next/image'

import {Button} from '@/components/Button'
import {Container} from '@/components/Container'

export function CallToAction() {
  return (
    <section
      id="get-in-contact"
      className="relative overflow-hidden bg-zinc-900 py-32"
    >
      <Image
        className="absolute top-1/2 w-full h-screen -translate-y-1/2 opacity-[45%] object-cover"
        src="/pictures/19.jpg"
        alt="PE Live band performing on stage with colorful lighting"
        priority={true}
        width={2347}
        height={1244}
        unoptimized
      />
      <Container className="relative">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tight text-slate-50">
            Got An Idea?
          </h2>
          <p className="mt-4 font-bold tracking-tight text-lg sm:text-xl text-white">
            Do you have a unique vision or concept for an event? Let&apos;s bring it to life together! We
            thrive on collaboration and creativity. Whether it&apos;s a community initiative, a special
            project, or an innovative performance, we are excited to partner with you and co-create
            something extraordinary. Reach out to us with your idea, and let&apos;s make magic happen!
          </p>
          <Button href="/contact" color="white" className="mt-10">
            Get in touch
          </Button>
        </div>
      </Container>
    </section>
  )
}
