"use client";

import Image from "next/image";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import clsx from "clsx";

type Service = {
  title: string;
  description: string;
  image?: {
    url?: string | null;
  } | number | null;
  id?: string | null;
};

type WhatWeDoData = {
  enable?: boolean | null;
  eyebrow?: string | null;
  title: string;
  subtitle?: string | null;
  services?: Service[] | null;
};

const serviceImage = (service: Service): string | null =>
  service.image && typeof service.image === "object" && service.image.url
    ? service.image.url
    : null;

export function WhatWeDo({ data }: { data: WhatWeDoData }) {
  const services = data?.services || [];

  if (!data?.enable || services.length === 0) return null;

  return (
    <section
      id="works"
      aria-label="What We Do"
      className="w-full border-t border-white/10 bg-ink-2 py-24 lg:py-36"
    >
      <div className="mx-auto w-full max-w-[90rem] px-5 sm:px-10 lg:px-16">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-10 lg:mb-16">
          <div>
            <p className="mb-5 text-[11px] uppercase tracking-[0.28em] text-magenta">
              {data.eyebrow || "What we do"}
            </p>
            <h2 className="font-display text-4xl font-bold leading-[0.98] tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl">
              {data.title}
            </h2>
          </div>
          {data.subtitle && (
            <p className="m-0 max-w-[46ch] text-lg leading-relaxed text-zinc-400">{data.subtitle}</p>
          )}
        </div>

        <TabGroup as="div" className="grid grid-cols-1 border-t border-white/10 lg:grid-cols-[22.5rem_1fr]">
          <TabList className="flex overflow-x-auto border-b border-white/10 lg:flex-col lg:overflow-visible lg:border-b-0 lg:border-r">
            {services.map((service, index) => (
              <Tab
                key={service.id || service.title}
                className={clsx(
                  "flex-none cursor-pointer border-b-2 border-transparent px-5 py-5 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-magenta",
                  "lg:border-b lg:border-l-2 lg:border-b-white/10 lg:px-8 lg:py-7",
                  "data-selected:border-magenta data-selected:bg-white/5 lg:data-selected:border-l-magenta lg:data-selected:border-b-white/10",
                  "text-zinc-400 data-selected:text-white hover:text-white",
                )}
              >
                <span className="mb-2 block text-[11px] uppercase tracking-[0.2em] opacity-60">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="block font-display text-lg font-semibold tracking-[-0.01em] sm:text-2xl">
                  {service.title}
                </span>
              </Tab>
            ))}
          </TabList>

          <TabPanels className="relative">
            {services.map((service) => {
              const imageUrl = serviceImage(service);
              return (
                <TabPanel key={service.id || service.title} unmount={false}>
                  {imageUrl && (
                    <div className="relative h-64 w-full overflow-hidden sm:h-96">
                      <Image
                        src={imageUrl}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 60rem, 100vw"
                        className="object-cover object-[50%_30%]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-2/70 to-transparent" aria-hidden="true" />
                    </div>
                  )}
                  <div className="px-0 py-9 lg:px-12">
                    <p className="mb-6 max-w-[70ch] text-lg leading-relaxed text-zinc-300">
                      {service.description}
                    </p>
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2.5 border-b border-magenta pb-1.5 font-display text-[13px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:text-magenta"
                    >
                      Request this set <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </TabPanel>
              );
            })}
          </TabPanels>
        </TabGroup>
      </div>
    </section>
  );
}
