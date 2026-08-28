import Image from "next/image";
import React from "react";

type MediaValue = {
  url?: string | null;
} | number | null;

type FactsData = {
  enable?: boolean | null;
  eyebrow?: string | null;
  title: string;
  description: string;
  backgroundImage?: MediaValue;
  brandsTitle: string;
  brandLogos?: {
    name: string;
    logo: MediaValue;
    darkenOnLight?: boolean | null;
    id?: string | null;
  }[] | null;
  artistsTitle: string;
  artists?: {
    name: string;
    id?: string | null;
  }[] | null;
  performancesTitle: string;
  performances?: {
    column: number;
    content: string;
    name: string;
    year: string;
    image?: MediaValue;
    links?: {
      name: string;
      url: string;
      id?: string | null;
    }[] | null;
    id?: string | null;
  }[] | null;
};

const mediaUrl = (value?: MediaValue): string | null =>
  value && typeof value === "object" && value.url ? value.url : null;

export function FactsAndFigures({ data }: { data: FactsData }) {
  if (!data?.enable) return null;

  const logos = (data.brandLogos || []).filter((company) => mediaUrl(company.logo));
  const artists = data.artists || [];
  const testimonials = data.performances || [];

  return (
    <section
      id="facts"
      aria-label="Facts & Figures"
      className="w-full border-t border-white/10 bg-ink-2 py-24 lg:py-36"
    >
      <div className="mx-auto w-full max-w-[90rem] px-5 sm:px-10 lg:px-16">
        <div className="mb-16 max-w-[60ch] lg:mb-20">
          <p className="mb-5 text-[11px] uppercase tracking-[0.28em] text-accent">
            {data.eyebrow || "Facts & figures"}
          </p>
          <h2 className="mb-5 font-display text-4xl font-bold leading-none tracking-[-0.03em] text-white sm:text-5xl">
            {data.title}
          </h2>
          <p className="m-0 text-lg leading-relaxed text-zinc-400">{data.description}</p>
        </div>

        {/* Partner logo wall — light chips on the dark grid */}
        {logos.length > 0 && (
          <ul
            aria-label={data.brandsTitle}
            className="m-0 grid list-none grid-cols-2 border-l border-t border-white/10 p-0 sm:grid-cols-3 lg:grid-cols-4"
          >
            {logos.map((company) => (
              <li
                key={company.id || company.name}
                className="flex h-28 items-center justify-center border-b border-r border-white/10 p-5 sm:h-30"
              >
                <span className="flex h-full w-full items-center justify-center bg-paper px-4">
                  <Image
                    src={mediaUrl(company.logo) as string}
                    alt={company.name}
                    width={150}
                    height={54}
                    className={`h-auto max-h-12 w-auto max-w-36 ${company.darkenOnLight ? "brightness-0" : ""}`}
                    unoptimized
                  />
                </span>
              </li>
            ))}
          </ul>
        )}

        {/* Shared the stage with */}
        {artists.length > 0 && (
          <div className="mt-16 grid grid-cols-1 items-start gap-8 lg:mt-20 lg:grid-cols-[19rem_1fr] lg:gap-16">
            <p className="m-0 text-[13px] uppercase tracking-[0.2em] text-zinc-500">
              {data.artistsTitle}
            </p>
            <p className="m-0 flex flex-wrap items-baseline gap-x-4 gap-y-3 font-display text-xl font-light text-zinc-200 sm:text-2xl">
              {artists.map((artist, index) => (
                <React.Fragment key={artist.id || artist.name}>
                  {index > 0 && <span className="text-accent" aria-hidden="true">·</span>}
                  <span>{artist.name}</span>
                </React.Fragment>
              ))}
            </p>
          </div>
        )}

        {/* Testimonials */}
        {testimonials.length > 0 && (
          <div className="mt-16 lg:mt-20">
            <h3 className="sr-only">{data.performancesTitle}</h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <figure
                  key={testimonial.id || `${testimonial.name}-${testimonial.year}`}
                  className="m-0 flex flex-col border border-white/10 bg-ink-3"
                >
                  {mediaUrl(testimonial.image) && (
                    <div className="relative h-50 w-full overflow-hidden">
                      <Image
                        src={mediaUrl(testimonial.image) as string}
                        alt={`${testimonial.name}, ${testimonial.year}`}
                        fill
                        sizes="(min-width: 1024px) 28rem, 100vw"
                        className="object-cover object-[50%_28%]"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col gap-6 p-9 pt-8">
                  <blockquote className="m-0 font-display text-xl font-light leading-snug text-stone-100 sm:text-[1.375rem]">
                    &ldquo;{testimonial.content}&rdquo;
                  </blockquote>
                  <figcaption className="mt-auto border-t border-white/10 pt-5 text-[13px] uppercase tracking-[0.16em] text-zinc-400">
                    {testimonial.name} · {testimonial.year}
                    {testimonial.links && testimonial.links.length > 0 && (
                      <span className="mt-2 flex flex-wrap gap-x-4 normal-case tracking-normal">
                        {testimonial.links.map((link) => (
                          <a
                            key={link.id || link.name}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-accent no-underline hover:underline"
                          >
                            {link.name}
                          </a>
                        ))}
                      </span>
                    )}
                  </figcaption>
                  </div>
                </figure>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
