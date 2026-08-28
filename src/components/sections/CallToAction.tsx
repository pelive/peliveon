import Image from 'next/image'

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

  const backgroundUrl =
    data.backgroundImage && typeof data.backgroundImage === 'object'
      ? data.backgroundImage.url
      : null

  return (
    <section id="get-in-contact" className="relative w-full overflow-hidden bg-ink">
      {backgroundUrl && (
        <Image
          src={backgroundUrl}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[50%_30%] opacity-35"
        />
      )}
      <div
        className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/70 to-ink/50"
        aria-hidden="true"
      />
      <div className="relative mx-auto grid w-full max-w-[90rem] grid-cols-1 items-center gap-10 px-5 py-24 sm:px-10 lg:grid-cols-[1fr_auto] lg:gap-16 lg:px-16 lg:py-32">
        <div>
          <h2 className="mb-4 font-display text-4xl font-bold leading-none tracking-[-0.03em] text-white sm:text-5xl">
            {data.title}
          </h2>
          <p className="m-0 max-w-[58ch] text-lg leading-relaxed text-zinc-300">
            {data.description}
          </p>
        </div>
        <a
          href={data.buttonLink}
          className="inline-flex min-h-[3.5rem] items-center justify-center gap-3 self-start bg-accent px-9 font-display text-sm font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-accent-hover lg:self-center"
        >
          {data.buttonText} <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  )
}
