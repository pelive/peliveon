"use client";

import React from "react";
import Image from "next/image";
import { WhoWeAre } from "./sections/WhoWeAre";
import { WhatWeDo } from "./sections/WhatWeDo";
import { CallToAction } from "./sections/CallToAction";
import { FactsAndFigures } from "./sections/FactsAndFigures";
import { Contact } from "./sections/Contact";
import { UpNext } from "./sections/UpNext";

const logos = {
  peLive: "/logos/pelive-small.svg",
  gent: "/logos/gent-colorful.svg",
  ntgent: "/logos/ntgent.svg",
};

export function PEHero() {
  return (
    <section
      id="home"
      className="relative w-screen h-screen min-h-[700px] overflow-hidden pt-32">
      <Image
        className="absolute top-1/2 w-full min-h-[700px] -translate-y-1/2 opacity-95 -z-20 object-cover"
        src="/pictures/1.jpg"
        alt=""
        width={2347}
        height={1244}
        unoptimized
      />
      <div className="absolute h-screen min-h-[700px] pt-64 lg:pt-96 flex flex-col justify-center items-center text-center w-full">
        <div
          className="flex flex-col items-center justify-center absolute bottom-0 mt-36 mb-16 lg:mt-44 lg:mb-48">
          <p className="font-display text-4xl sm:text-7xl text-slate-100 uppercase">
            In Concert
          </p>
          <h1 className="mt-7 text-3xl sm:text-5xl lg:text-7xl font-bold whitespace-nowrap text-slate-200 px-4 uppercase will-change-transform">
            #<span className="relative bg-red-600">Epiphany Reloaded</span>
          </h1>
          <p className="mt-5 font-display text-lg text-slate-100 uppercase">
            Info & Tickets <span className="relative text-red-600">|| </span>
            <a href="https://ticketsgent.be/producties/pe-live-in-concert"
               target="_blank" rel="noopener noreferrer">&#x1F517; ticketsgent.be</a>
          </p>
          <ul
            role="list"
            className="mt-8 flex flex-row items-center justify-center gap-y-0 gap-x-8 xl:gap-x-12"
          >
            {[
              [
                { name: "PE Live", logo: logos.peLive },
                { name: "Stad Gent", logo: logos.gent },
                { name: "NTGent", logo: logos.ntgent },
              ],
            ].map((group, groupIndex) => (
              <li key={groupIndex}>
                <ul
                  role="list"
                  className="flex flex-row items-center sm:gap-x-12"
                >
                  {group.map((company) => (
                    <li key={company.name} className="flex">
                      <Image src={company.logo} alt={company.name} width={120} height={60} unoptimized/>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function PEHomePage() {
  return (
    <>
      <PEHero />
      <main>
        <WhoWeAre />
        <WhatWeDo />
        <CallToAction />
        <FactsAndFigures />
        <Contact />
        <UpNext />
      </main>
    </>
  );
}
