"use client";

import React from "react";
import { Container } from "@/components/Container";
import Image from "next/image";

export function WhoWeAre() {
  return (
    <section
      id="about"
      aria-label="Who We Are"
      className="relative w-screen bg-zinc-900 py-32 -z-20"
    >
      <Image
        className="absolute top-1/2 w-full h-full -translate-y-1/2 opacity-[25%] -z-10 object-cover"
        src="/pictures/10.jpg"
        alt=""
        width={2347}
        height={1244}
        unoptimized
      />
      <Container>
        <div className="mx-auto my-auto max-w-2xl md:text-center tracking-tight z-20">
          <h2 className="mb-10 font-display text-3xl sm:text-4xl md:text-5xl text-slate-50">
            Who We Are
          </h2>
          <p className="mt-4 font-bold z-10 text-lg sm:text-xl text-white">
            PE Live is a pioneering &#34;Black American&#34;-style Gospel band which is reinventing Gospel
            music in a modern and dynamic way in Belgium. PE LIVE presents Gospel music with an attitude!
            <br/><br/>
            On top of wide range of voices, unique dance moves, colorful display and a divers
            repertoire &#40;Praise, Contemporary Rock, Hip-Hop, Reggae, and Afrobeat&#41;, the band is also
            known for its energetic and electrifying live performances which always leaves fans wanting
            more.
            <br/><br/>
            In a notable highlight of our journey, PE Live received the golden buzzer during Belgium&#39;s
            Got
            Talent, propelling the band to national fame and showcasing our exceptional talent.
            <br/><br/>
            Over the years, these experiences, emotions, and expressions through our performances have been
            acclaimed as &#34;one of a kind in Belgium&#34; - which is fondly referred to by our fans
            as &#34;The Gospel of PE LIVE&#34;.
          </p>
        </div>
      </Container>
    </section>
  );
}
