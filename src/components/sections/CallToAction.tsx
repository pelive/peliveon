"use client";

import Image from 'next/image'

export function CallToAction() {
  return (
    <section
      id="get-in-contact"
      className="relative overflow-hidden bg-zinc-900 py-32"
    >
      <Image
        className="absolute top-1/2 w-full h-screen -translate-y-1/2 opacity-[45%] object-cover"
        src="/pictures/19.jpg"
        alt=""
        width={2347}
        height={1244}
        unoptimized
      />
      <div className="container mx-auto px-4 relative">
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
          <a 
            href="#contact" 
            className="mt-10 inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-base font-semibold text-slate-900 shadow-lg hover:bg-slate-100 transition-colors duration-200"
          >
            Get in touch
          </a>
        </div>
      </div>
    </section>
  )
}
