import React from "react";
import Image from "next/image";

import RichText from "@/components/RichText";

type MediaValue = {
  url?: string | null;
} | number | null;

type WhoWeAreData = {
  enable?: boolean | null;
  eyebrow?: string | null;
  backgroundImage?: MediaValue;
  title: string;
  content: any;
  stats?: {
    value: string;
    label: string;
    id?: string | null;
  }[] | null;
  images?: {
    image: MediaValue;
    id?: string | null;
  }[] | null;
};

const mediaUrl = (value?: MediaValue): string | null =>
  value && typeof value === "object" && value.url ? value.url : null;

export function WhoWeAre({ data }: { data: WhoWeAreData }) {
  if (!data?.enable) return null;

  const collage = (data.images || [])
    .map((item) => mediaUrl(item.image))
    .filter((url): url is string => Boolean(url));

  // Fall back to the legacy background image as a single collage photo.
  if (collage.length === 0) {
    const fallback = mediaUrl(data.backgroundImage);
    if (fallback) collage.push(fallback);
  }

  const stats = data.stats || [];

  return (
    <section id="about" aria-label="Who We Are" className="w-full bg-ink py-24 lg:py-36">
      <div className="mx-auto grid w-full max-w-[90rem] grid-cols-1 items-start gap-16 px-5 sm:px-10 lg:grid-cols-2 lg:gap-24 lg:px-16">
        <div>
          <p className="mb-5 text-[11px] uppercase tracking-[0.28em] text-accent">
            {data.eyebrow || "Who we are"}
          </p>
          <h2 className="mb-8 font-display text-4xl font-bold leading-[0.98] tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl">
            {data.title}
          </h2>
          <div className="max-w-[56ch] text-lg leading-relaxed text-zinc-300 [&_p]:mb-5 [&_p:last-child]:mb-0 [&_strong]:text-white">
            <RichText data={data.content} enableGutter={false} enableProse={false} />
          </div>

          {stats.length > 0 && (
            <dl className="mt-12 flex flex-wrap border-t border-white/10">
              {stats.map((stat, index) => (
                <div
                  key={stat.id || stat.label}
                  className={`pt-6 ${index === 0 ? "pr-10" : "px-10 first:pl-0"} ${index === stats.length - 1 ? "pr-0" : ""}`}
                >
                  <dd className="m-0 font-display text-4xl font-bold text-accent">{stat.value}</dd>
                  <dt className="mt-1.5 text-xs uppercase tracking-[0.16em] text-zinc-400">{stat.label}</dt>
                </div>
              ))}
            </dl>
          )}
        </div>

        {collage.length > 0 && (
          <div className="grid grid-cols-2 gap-4">
            {collage.slice(0, 3).map((url, index) => (
              <div
                key={url + index}
                className={`relative overflow-hidden ${index === 0 ? "col-span-2 h-72 sm:h-[26rem]" : "h-44 sm:h-60"}`}
              >
                <Image
                  src={url}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 45rem, 100vw"
                  className={`object-cover ${index === 0 ? "" : "object-[50%_28%]"}`}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
