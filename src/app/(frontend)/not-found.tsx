import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <div className="bg-ink px-5 pb-32 pt-44 sm:px-10 lg:px-16">
      <div className="mx-auto w-full max-w-[90rem]">
        <p className="mb-5 font-display text-8xl font-extrabold leading-[0.85] text-magenta">404</p>
        <h1 className="mb-3.5 font-display text-3xl font-semibold text-white">Wrong door.</h1>
        <p className="mb-8 max-w-[48ch] text-lg leading-relaxed text-zinc-400">
          This page could not be found — but the next show can.
        </p>
        <div className="flex flex-wrap gap-3.5">
          <Link
            href="/"
            className="inline-flex min-h-[3.25rem] items-center bg-accent px-8 font-display text-[13px] font-semibold uppercase tracking-[0.16em] text-white no-underline transition-colors hover:bg-accent-hover"
          >
            Go home
          </Link>
          <Link
            href="/#upcoming"
            className="inline-flex min-h-[3.25rem] items-center border border-white/30 px-7 font-display text-[13px] font-semibold uppercase tracking-[0.16em] text-white no-underline transition-colors hover:border-magenta"
          >
            See dates
          </Link>
        </div>
      </div>
    </div>
  )
}
