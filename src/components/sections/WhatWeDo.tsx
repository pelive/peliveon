"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import clsx from "clsx";

const images = {
  concerts: "/pictures/14.jpg",
  corporate: "/pictures/2.jpg",
  weddings: "/pictures/3.jpg",
};

const features = [
  {
    title: "Concerts & Festivals",
    description:
      "PE LIVE delivers electrifying performances at major concerts and festivals, bringing a unique blend of Gospel music to diverse audiences. " +
      "From the Freedom Festival at Gentse Feesten to the Gospel Festival Stad Mortsel, our vibrant energy and captivating stage presence leave lasting impressions. " +
      "Join us at our next concert or festival for an unforgettable experience!",
    image: images.concerts,
  },
  {
    title: "Corporate & Private Events",
    description:
      "Elevate your corporate or private event with the soulful sounds of PE LIVE. " +
      "Our music adds a dynamic and enchanting atmosphere, perfect for business functions, birthdays, and other special occasions. " +
      "Let us bring our gospel vibes to your event, ensuring it becomes a memorable celebration. Contact us to make your event extraordinary!",
    image: images.corporate,
  },
  {
    title: "Weddings",
    description:
      "Transform your wedding day into a magical celebration with PE LIVE. " +
      "Our passionate performances and heartfelt gospel music create an unforgettable ambiance for your special day. " +
      "From intimate ceremonies to grand receptions, we tailor our music to perfectly match the mood and emotions of your wedding. " +
      "Make your dream wedding come true with PE LIVE!",
    image: images.weddings,
  },
];

export function WhatWeDo() {
  const [tabOrientation, setTabOrientation] = useState<"horizontal" | "vertical">("horizontal");
  const [backgroundImage, setBackgroundImage] = useState(features[0].image);
  
  useEffect(() => {
    const lgMediaQuery = window.matchMedia("(min-width: 1024px)");
    
    function onMediaQueryChange({ matches }: { matches: boolean }) {
      setTabOrientation(matches ? "vertical" : "horizontal");
    }
    
    onMediaQueryChange({ matches: lgMediaQuery.matches });
    lgMediaQuery.addEventListener("change", onMediaQueryChange);
    return () => {
      lgMediaQuery.removeEventListener("change", onMediaQueryChange);
    };
  }, []);

  return (
    <section id="services" aria-label="What We Do" className="relative w-screen bg-white py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tight text-slate-900">
            What We Do
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            From electrifying concerts to intimate celebrations, PE LIVE brings the power and passion of Gospel music to every occasion.
          </p>
        </div>
        
        <div className="mt-16">
          <div className={clsx(
            "mx-auto grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-0",
            tabOrientation === "vertical" ? "" : ""
          )}>
            {features.map((feature, _featureIndex) => (
              <div
                key={feature.title}
                className={clsx(
                  "relative group",
                  tabOrientation === "vertical" ? "" : "flex flex-col"
                )}
                onMouseEnter={() => setBackgroundImage(feature.image)}
              >
                <div className="relative p-8 bg-white rounded-2xl shadow-xl ring-1 ring-slate-900/10 transition-all duration-300 group-hover:shadow-2xl">
                  <h3 className="font-display text-xl text-slate-900">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 relative h-96 rounded-2xl overflow-hidden lg:mt-0 lg:h-full lg:absolute lg:inset-0">
            <Image
              className="h-full w-full object-cover transition-all duration-500"
              src={backgroundImage}
              alt=""
              width={2347}
              height={1244}
              unoptimized
            />
          </div>
        </div>
      </div>
    </section>
  );
}
