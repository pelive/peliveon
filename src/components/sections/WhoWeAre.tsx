"use client";

import React from "react";
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
      <div className="container mx-auto px-4">
        <div className="mx-auto my-auto max-w-2xl md:text-center tracking-tight z-20">
          <h2 className="mb-10 font-display text-3xl sm:text-4xl md:text-5xl text-slate-50">
            Who We Are
          </h2>
          <p className="mt-4 font-bold z-10 text-lg sm:text-xl text-white">
            PE Live is the pioneering &quot;Black American&quot;-style Gospel band which is reinventing Gospel
            music in a modern and dynamic way in Belgium. PE LIVE presents Gospel music with an attitude!
            <br/><br/>
            On top of the wide range of voices, unique dance moves, colorful display and a divers
            repertoire (Praise, Contemporary Rock, Hip-Hop, Reggae, and Afrobeat), the band is also
            known for its energetic and electrifying live performances which always leaves fans wanting
            more.
            <br/><br/>
            In a notable highlight of our journey, PE Live received the golden buzzer during Belgium&apos;s
            Got Talent, propelling the band to national fame and showcasing our exceptional talent.
            <br/><br/>
            Over the years, these experiences, emotions, and expressions through our performances have been
            acclaimed as &quot;one of a kind in Belgium&quot; - which is fondly referred to by our fans
            as &quot;The Gospel of PE LIVE&quot;.
          </p>
        </div>
      </div>
    </section>
  );
}
