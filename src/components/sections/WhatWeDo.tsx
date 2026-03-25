"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import clsx from "clsx";

import { Container } from "@/components/Container";

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
  title: string;
  subtitle?: string | null;
  services?: Service[] | null;
};

export function WhatWeDo({ data }: { data: WhatWeDoData }) {
  if (!data?.enable || !data.services || data.services.length === 0) return null;

  const services = data.services;

  const [tabOrientation, setTabOrientation] = useState<"horizontal" | "vertical">("horizontal");
  const [backgroundImage, setBackgroundImage] = useState<string | null>(
    services[0]?.image && typeof services[0].image === "object" ? services[0].image.url || null : null,
  );

  useEffect(() => {
    const lgMediaQuery = window.matchMedia("(min-width: 1024px)");

    function onMediaQueryChange({ matches }: { matches: boolean }) {
      setTabOrientation(matches ? "vertical" : "horizontal");
    }

    onMediaQueryChange(lgMediaQuery);
    lgMediaQuery.addEventListener("change", onMediaQueryChange);

    return () => {
      lgMediaQuery.removeEventListener("change", onMediaQueryChange);
    };
  }, []);

  return (
    <section
      id="services"
      aria-label="What We Do"
      className="relative overflow-hidden pb-28 pt-20 sm:py-32"
    >
      {backgroundImage && (
        <Image
          className="absolute top-0 left-0 w-full h-full object-cover opacity-15 -z-10"
          src={backgroundImage}
          alt=""
          width={800}
          height={600}
          priority
        />
      )}
      <Container className="relative">
        <div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl md:text-5xl">
            {data.title}
          </h2>
          <p className="mt-6 text-lg tracking-tight text-white">
            {data.subtitle}
          </p>
        </div>
        <TabGroup
          className="z-10 grid grid-cols-1 items-center gap-y-2 pt-10 lg:pt-0 mt-16 md:mt-20 sm:gap-y-6"
          vertical={tabOrientation === "vertical"}
          onChange={(index) => {
            const image = services[index]?.image;
            setBackgroundImage(image && typeof image === "object" ? image.url || null : null);
          }}
        >
          {({ selectedIndex }) => (
            <>
              <div className="-mx-4 flex overflow-x-auto pb-4 sm:mx-0 sm:overflow-visible sm:pb-0 lg:col-span-5">
                <TabList className="z-10 relative flex gap-x-3 gap-y-1 mx-auto px-4 items-center">
                  {services.map((feature, featureIndex) => (
                    <div
                      key={feature.id || feature.title}
                      className={clsx(
                        "group relative items-center rounded-full px-4 py-1",
                        selectedIndex === featureIndex ? "bg-white ring-1 ring-inset" : "hover:bg-white/10",
                      )}
                    >
                      <h3>
                        <Tab
                          className={clsx(
                            "font-display text-sm lg:text-lg ui-not-focus-visible:outline-none",
                            selectedIndex === featureIndex ? "text-blue-600" : "text-blue-100 hover:text-white",
                          )}
                        >
                          <span className="absolute inset-0 rounded-full text-center" />
                          {feature.title}
                        </Tab>
                      </h3>
                    </div>
                  ))}
                </TabList>
              </div>
              <TabPanels>
                {services.map((feature) => (
                  <TabPanel key={feature.id || feature.title} unmount={false}>
                    <div className="relative">
                      <div className="absolute -inset-x-4 bottom-[-2.25rem] top-[-5.95rem] bg-black/70 ring-1 ring-inset ring-white/10 sm:inset-x-0 sm:rounded-t-xl" />
                      <p className="relative mx-auto max-w-4xl text-lg lg:text-xl text-white sm:text-center">
                        {feature.description}
                      </p>
                    </div>
                    <div className="mt-[2.2rem] w-auto overflow-hidden rounded-b-xl bg-slate-50 shadow-sm shadow-blue-950/25">
                      {feature.image && typeof feature.image === "object" && feature.image.url && (
                        <Image
                          className="w-full"
                          src={feature.image.url}
                          alt=""
                          width={800}
                          height={600}
                          priority
                          sizes="(min-width: 1024px) 67.8125rem, (min-width: 640px) 100vw, 45rem"
                        />
                      )}
                    </div>
                  </TabPanel>
                ))}
              </TabPanels>
            </>
          )}
        </TabGroup>
      </Container>
    </section>
  );
}
