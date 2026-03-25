"use client";

import Image from 'next/image'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'

type CallToActionData = {
  enable?: boolean | null
  title: string
  description: string
  buttonText: string
  buttonLink: string
  backgroundImage?: {
    url?: string | null
  } | number | null
}

export function CallToAction({ data }: { data: CallToActionData }) {
  if (!data?.enable) return null

  return (
    <section
      id="get-in-contact"
      className="relative overflow-hidden bg-zinc-900 py-32"
    >
      {data.backgroundImage && typeof data.backgroundImage === 'object' && data.backgroundImage.url && (
        <Image
          className="absolute top-1/2 w-full h-screen -translate-y-1/2 opacity-[45%] object-cover"
          src={data.backgroundImage.url}
          alt=""
          priority={true}
          width={2347}
          height={1244}
          unoptimized
        />
      )}
      <Container className="relative">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tight text-slate-50">
            {data.title}
          </h2>
          <p className="mt-4 font-bold tracking-tight text-lg sm:text-xl text-white">
            {data.description}
          </p>
          <Button href={data.buttonLink} color="white" className="mt-10">
            {data.buttonText}
          </Button>
        </div>
      </Container>
    </section>
  )
}
