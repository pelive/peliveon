"use client";

import Image from "next/image";
import React from "react";

const images = {
  bgt: "/avatars/bgt.png",
  parkpop: "/avatars/parkpop.png",
  mia: "/avatars/mia.png",
  heartbeat: "/avatars/heartbeat.png",
  epiphany: "/avatars/epiphany.png",
  gentsteFeesten: "/avatars/gentsefeesten.jpg",
};

const logos = {
  belgiumsGotTalent: "/logos/got-talent.svg",
  deMias: "/logos/mias.svg",
  vtm: "/logos/vtm.svg",
  een: "/logos/een.svg",
  playNostalgie: "/logos/play-nostalgie.svg",
  samsung: "/logos/samsung.svg",
  ugent: "/logos/ugent.svg",
  stadGent: "/logos/gent.svg",
  deCentrale: "/logos/de-centrale.svg",
};

const backgroundImage = "/background-faqs.jpg";

interface Performance {
  name: string;
  year: string;
  links?: { name: string; url: string }[];
  image?: string;
}

const performances: { content: string; performance: Performance }[][] = [
  [
    {
      content:
        'PE LIVE made history by bringing Gospel music to the Belgian commercial scene for the first time on Belgium\'s Got Talent. Their electrifying performance earned them the Golden Buzzer from Bart Peeters and won the admiration of many.',
      performance: {
        name: 'BGT (Belgium\'s Got Talent)',
        year: '2021',
        links: [
          {
            name: 'Dance Performance',
            url: 'https://vtm.be/deze-gospel-positivos-krijgen-iedereen-aan-het-dansen~vff8d5e31-d881-4f66-97ee-2cd81c00e794'
          },
          {
            name: 'Gospel with Attitude',
            url: 'https://vtm.be/kippenvel-pe-live-brengt-gospel-met-attitude~vef1f3ec0-74f6-4c9d-8722-a4109b6d35f2'
          },
        ],
        image: images.bgt,
      },
    },
    {
      content:
        'At Parkpop, PE LIVE brought incredible energy to the stage, captivating the younger generation. They have performed at this festival for two consecutive years, setting the stage on fire and connecting with the students of Ghent University.',
      performance: {
        name: 'Parkpop',
        year: '2023/24',
        links: [
          {name: 'Parkpop Performance', url: 'https://youtube.com/watch?v=3naMnpuMTiQ&ab_channel=PELive'},
        ],
        image: images.parkpop,
      },
    },
    {
      content:
        'At the Vlaamse Kermis, PE LIVE delivered an intimate performance filled with warmth and energy, sharing the joy and good news of the Gospel with the audience. The night was a beautiful blend of excitement and connection with the fans.',
      performance: {
        name: 'Vlaamse Kermis',
        year: '2022',
      },
    },
  ],
  [
    {
      content:
        'They had a beautiful and incredible moment at the MIA Awards, performing live on stage with Bart Peeters for his new single "Winter Dip". This performance was a highlight of the Belgian awards show.',
      performance: {
        name: 'MIA Awards',
        year: '2022',
        links: [
          {
            name: 'MIA Awards Performance',
            url: 'https://youtube.com/watch?v=Rsw9DpKWIvI&ab_channel=MuziekbijVRT1'
          },
        ],
        image: images.mia,
      },
    },
    {
      content:
        'Epiphany is PE LIVE\'s annual concert, a night of art, craft, music, and dance. The first edition after a three-year break was held at De Centrale, where they filled the venue to capacity. This year, the event will move to NTGent, promising an even grander experience.',
      performance: {
        name: 'Epiphany',
        year: '2023',
        links: [
          {name: 'Epiphany Performance 1', url: 'https://youtube.com/watch?v=ekKXeRidzAk&ab_channel=PELive'},
          {name: 'Epiphany Performance 2', url: 'https://youtube.com/watch?v=GFB7vgClXrc&ab_channel=PELive'},
          {name: 'Epiphany Performance 3', url: 'https://youtube.com/watch?v=UqlrmHWoHaM&ab_channel=PELive'},
        ],
        image: images.epiphany,
      },
    },
    {
      content:
        'The Candlelight Session is PE LIVE\'s yearly collaboration with major brands like Samsung and Play Nostalgie. This event, held in December, creates a warm Christmas atmosphere with Gospel music, leaving the audience with heartwarming memories.',
      performance: {
        name: 'Candlelight Session',
        year: '2023',
      },
    },
  ],
  [
    {
      content:
        'PE LIVE set the stage on fire at the Gentse Feesten, transitioning from street performances to the main stage at Korenmarkt. They are still the reigning champions of the street performance "Straatmuzikant" competition, as the competition has not been held again.',
      performance: {
        name: 'Gentse Feesten',
        year: '2019, 2022',
        image: images.gentsteFeesten,
      },
    },
    {
      content:
        'The Heartbeat Sessions were born out of a request from the City of Ghent during COVID-19, recognizing PE LIVE\'s contribution to uplifting spirits. This collaboration with De Centrale was a significant moment for the group, offering inspiration to the people of Ghent.',
      performance: {
        name: 'Heartbeat Sessions',
        year: '2021',
        links: [
          {name: 'Heartbeat Session #6', url: 'https://youtube.com/watch?v=tyFmIItCZyg'},
        ],
        image: images.heartbeat,
      },
    },
    {
      content:
        'At Patershol Feesten, PE LIVE connected with the older generation, showcasing how their music resonates with all ages. This festival, aimed at an older audience, was a significant moment for the group as they uplifted spirits with their performance.',
      performance: {
        name: 'Patershol Feesten',
        year: '2019',
      },
    },
  ],
]

function QuoteIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg aria-hidden="true" width={105} height={78} {...props}>
      <path
        d="M25.086 77.292c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622C1.054 58.534 0 53.411 0 47.686c0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C28.325 3.917 33.599 1.507 39.324 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Zm54.24 0c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622-2.11-4.52-3.164-9.643-3.164-15.368 0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C82.565 3.917 87.839 1.507 93.564 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Z"/>
    </svg>
  )
}

export function FactsAndFigures() {
  return (
    <section
      id="facts"
      aria-label="Facts & Figures"
      className="relative overflow-hidden bg-slate-50 py-20 sm:py-32"
    >
      <Image
        className="absolute left-1/2 top-0 max-w-none -translate-y-1/4 translate-x-[-30%]"
        src={backgroundImage}
        alt=""
        width={1558}
        height={946}
        unoptimized
      />
      <div className="container mx-auto px-4 relative">
        <div className="mx-auto max-w-2xl md:text-center">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            Facts & Figures
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            PE LIVE has been a trailblazer in the Belgian Gospel music scene, continuously pushing the
            boundaries with our vibrant performances and diverse repertoire. Our journey has been marked by
            collaborations with renowned artists and performances on prestigious stages.
          </p>
        </div>
        <div className="mt-20 lg:mt-32 text-center">
          <p className="font-display text-xl text-slate-900">
            Brands we&apos;ve worked with
          </p>
          <ul
            role="list"
            className="mt-16 flex items-center justify-center gap-x-8 sm:flex-col sm:gap-x-0 sm:gap-y-10 xl:flex-row xl:gap-x-12 xl:gap-y-0"
          >
            {[
              [
                {name: 'Belgium\'s Got Talent', logo: logos.belgiumsGotTalent},
                {name: 'De MIA\'s', logo: logos.deMias},
                {name: 'VTM', logo: logos.vtm},
              ],
              [
                {name: 'EEN', logo: logos.een},
                {name: 'Play Nostalgie', logo: logos.playNostalgie},
                {name: 'Samsung', logo: logos.samsung},
              ],
              [
                {name: 'UGent', logo: logos.ugent},
                {name: 'Stad Gent', logo: logos.stadGent},
                {name: 'De Centrale', logo: logos.deCentrale},
              ],
            ].map((group, groupIndex) => (
              <li key={groupIndex}>
                <ul
                  role="list"
                  className="flex flex-col items-center gap-y-8 sm:flex-row sm:gap-x-12 sm:gap-y-0"
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
        <div className="mt-20 lg:mt-32 text-center">
          <p className="font-display text-xl text-slate-900">
            Artists we&apos;ve worked with
          </p>
          <div
            className="mt-16 font-serif text-2xl text-slate-900 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-12">
            <span>Bart Peeters</span>
            <span>Paul Michiels</span>
            <span>Jasper Steverlinck</span>
            <span>Laura Tesoro</span>
            <span>Grace (The Voice)</span>
            <span>Mentissa (The Voice)</span>
            <span>Jeremie (The Voice)</span>
          </div>
        </div>
        <div className="mt-20 lg:mt-32 text-center">
          <p className="font-display text-xl text-slate-900">
            Stages we&apos;ve performed on
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mt-20 lg:max-w-none lg:grid-cols-3"
        >
          {performances.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="flex flex-col gap-y-6 sm:gap-y-8">
                {column.map((performances, performanceIndex) => (
                  <li key={performanceIndex}>
                    <figure
                      className="relative rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10">
                      <QuoteIcon className="absolute left-6 top-6 fill-slate-100 opacity-15"/>
                      <blockquote className="relative">
                        <p className="text-lg tracking-tight text-slate-900">
                          {performances.content}
                        </p>
                      </blockquote>
                      <figcaption
                        className="relative mt-6 flex items-center justify-between border-t border-slate-100 pt-6">
                        <div>
                          <div className="font-display text-base text-slate-900">
                            {performances.performance.name}
                          </div>
                          <div className="mt-1 text-sm text-slate-500">
                            {performances.performance.year}
                          </div>
                          {performances.performance.links &&
                            performances.performance.links.length > 0 && (
                              <div className="mt-1 text-sm text-blue-500">
                                {performances.performance.links.map((link, index) => (
                                  <div key={index}>
                                    <a href={link.url} target="_blank"
                                       rel="noopener noreferrer">{link.name}</a>
                                  </div>
                                ))}
                              </div>
                            )}
                        </div>
                      </figcaption>
                      {performances.performance.image && (
                        <div className="mt-5 overflow-hidden rounded-xl bg-slate-50">
                          <Image
                            className="h-40 w-full object-cover"
                            src={performances.performance.image}
                            alt={performances.performance.name}
                            width={56}
                            height={56}
                          />
                        </div>
                      )}
                    </figure>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
