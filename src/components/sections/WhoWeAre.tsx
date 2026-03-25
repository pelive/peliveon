"use client";

import React from "react";
import Image from "next/image";

import RichText from "@/components/RichText";
import { Container } from "@/components/Container";

type WhoWeAreData = {
  enable?: boolean | null;
  backgroundImage?: {
    url?: string | null;
  } | number | null;
  title: string;
  content: any;
};

export function WhoWeAre({ data }: { data: WhoWeAreData }) {
  if (!data?.enable) return null;

  return (
    <section
      id="about"
      aria-label="Who We Are"
      className="relative w-screen bg-zinc-900 py-32 -z-20"
    >
      {data.backgroundImage && typeof data.backgroundImage === "object" && data.backgroundImage.url && (
        <Image
          className="absolute top-1/2 w-full h-full -translate-y-1/2 opacity-[25%] -z-10 object-cover"
          src={data.backgroundImage.url}
          alt=""
          priority={true}
          width={2347}
          height={1244}
          unoptimized
        />
      )}
      <Container>
        <div className="mx-auto my-auto max-w-2xl md:text-center tracking-tight z-20">
          <h2 className="mb-10 font-display text-3xl sm:text-4xl md:text-5xl text-slate-50">
            {data.title}
          </h2>
          <div className="mt-4 font-bold z-10 text-lg sm:text-xl text-white">
            <RichText data={data.content} enableGutter={false} />
          </div>
        </div>
      </Container>
    </section>
  );
}
