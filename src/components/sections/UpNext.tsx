"use client";

import Image from "next/image";
import { Container } from "@/components/Container";
import { Logo } from "@/components/Logo/Logo";

export function UpNext() {
  const upcomingEvents = [
    {
      title: "Epiphany Reloaded",
      date: "March 15, 2024",
      location: "NTGent, Ghent",
      description: "Our annual concert featuring special guests and new arrangements.",
      featured: true,
      image: "/pictures/6.jpg",
      fullDescription: `**GOSPEL MUSIC WITH ATTITUDE**

An authentic live Gospel music experience suitable for all ages, races, ethnicities, and beliefs. Although this genre of music is still maturing within the Belgian music industry, we see tremendous growth and admiration from diverse fans and many music lovers seeking a unique experience. Over the years, PE LIVE's vision and activities have served this goal.

**EPIPHANY (RELOADED)**

The "Gospel Music Experience" bursts with joy, inspiration, motivation, and positivity - something we've experienced during various performances: Belgium's Got Talent (2021), the MIA Awards (2022), Gentse Feesten (2022), Epiphany (2023), and in some cases, to give hope and a "voice" to people in need ("The Voices" - Ukraine 12-12 in 2022). After years of growth and refinement, we felt the need to return to our roots (Ghent) to create the same experience for our audience – thus, #EPIPHANY was born.

Last year's show was a huge success, so much so that we exceeded the capacity of 'De Centrale'. Due to popular demand, we are presenting a "RELOAD" of EPIPHANY this year for a larger audience here at NTGent. EPIPHANY (RELOADED) adopts a typical concert setting. It's an evening where the band, singers, and a "dramatic" conductor take you on a journey - a live "American-style" Gospel performance with a highly diverse repertoire perfectly mixed with modern dance and a surprise element for the audience, ensuring there's something for everyone!

If you've seen PE LIVE's EPIPHANY, you'll surely want to come back for more, and if you haven't, this is something you definitely don't want to miss!`
    },
    {
      title: "Gospel Workshop",
      date: "April 20, 2024", 
      location: "De Centrale, Ghent",
      description: "Join us for an interactive workshop on Gospel music and performance.",
    },
    {
      title: "Summer Festival Tour",
      date: "July-August 2024",
      location: "Various Locations",
      description: "Catching the summer vibes at festivals across Belgium.",
    },
  ];

  const featuredEvent = upcomingEvents.find(event => event.featured);

  return (
    <section
      id="upcoming"
      aria-label="Upcoming Events"
      className="relative overflow-hidden bg-slate-50 py-20 sm:py-32"
    >
      {/* Background elements */}
      <Image
        className="absolute left-1/2 top-0 max-w-none -translate-y-1/4 translate-x-[-30%] -z-20"
        src="/background-faqs.jpg"
        alt=""
        width={1558}
        height={946}
        unoptimized
      />
      <div className="absolute bottom-0 left-0 translate-x-[-10%] opacity-5 z-10">
        <Logo className="h-[100vh]"/>
      </div>

      <Container className="relative z-20">
        {/* Featured Event Section */}
        {featuredEvent && featuredEvent.image && (
          <div className="lg:mx-0 md:mx-auto md:text-center mb-16">
            <div className="w-full" style={{ height: "calc(900px / 2)", maxHeight: "45vh" }}>
              <Image
                src={featuredEvent.image}
                alt="PE LIVE IN CONCERT"
                className="object-cover w-full h-full"
                width={1620}
                height={1080}
                priority
              />
            </div>
            <h2 className="mt-28 font-display text-xl text-slate-900">
              Up Next: PE LIVE IN CONCERT
            </h2>
            <p className="mt-4 text-3xl tracking-tight text-slate-700 sm:text-4xl uppercase">
              # {featuredEvent.title} - {" "}
              <a href="https://ticketsgent.be/producties/pe-live-in-concert"
                 target="_blank" className="text-red-700">&#x1F517; Get Your Tickets</a>
            </p>
            <div className="mt-16 max-w-2xl lg:mx-auto lg:max-w-none lg:grid lg:grid-cols-1 lg:gap-8">
              <div 
                className="text-lg text-slate-700"
                dangerouslySetInnerHTML={{ 
                  __html: featuredEvent.fullDescription
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\n/g, '<br/>')
                }}
              />
            </div>
          </div>
        )}

        {/* Other Events Section */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tight text-slate-900">
            More Upcoming Events
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            Don&apos;t miss out on our other upcoming performances and events. Join us as we continue to bring the power of Gospel music to audiences across Belgium!
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {upcomingEvents.filter(event => !event.featured).map((event, index) => (
            <div
              key={index}
              className="relative rounded-2xl bg-white p-8 shadow-xl ring-1 ring-slate-900/10 transition-all duration-300 hover:shadow-2xl hover:scale-105"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-800">
                  {event.date}
                </span>
              </div>
              
              <h3 className="font-display text-xl text-slate-900 mb-2">
                {event.title}
              </h3>
              
              <p className="text-slate-600 mb-4">
                {event.location}
              </p>
              
              <p className="text-sm text-slate-700">
                {event.description}
              </p>
              
              <div className="mt-6">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 transition-colors duration-200"
                >
                  Book Tickets
                </a>
              </div>
            </div>
          ))}
        </div>

        
        {/* Past Performances Section */}
        <div className="mt-32">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tight text-slate-900">
              Past Performances
            </h2>
            <p className="mt-4 text-lg tracking-tight text-slate-700">
              Relive some of our most memorable performances and moments from previous shows.
            </p>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            <div className="relative rounded-2xl bg-white p-8 shadow-xl ring-1 ring-slate-900/10 transition-all duration-300 hover:shadow-2xl hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                  2022
                </span>
              </div>
              
              <h3 className="font-display text-xl text-slate-900 mb-2">
                The Voices
              </h3>
              
              <p className="text-slate-600 mb-4">
                Ukraine 12-12 Charity Event
              </p>
              
              <p className="text-sm text-slate-700 mb-4">
                A powerful performance to give hope and a voice to people in need during difficult times.
              </p>
              
              <div className="mt-6">
                <a
                  href="https://youtube.com/watch?v=XMDtZC779_4&ab_channel=MuziekbijVRT1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors duration-200"
                >
                  Watch Performance
                </a>
              </div>
            </div>

            <div className="relative rounded-2xl bg-white p-8 shadow-xl ring-1 ring-slate-900/10 transition-all duration-300 hover:shadow-2xl hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                  2021
                </span>
              </div>
              
              <h3 className="font-display text-xl text-slate-900 mb-2">
                Gospel Positivos Dance
              </h3>
              
              <p className="text-slate-600 mb-4">
                Belgium's Got Talent
              </p>
              
              <p className="text-sm text-slate-700 mb-4">
                The electrifying dance performance that earned us the golden buzzer and national recognition.
              </p>
              
              <div className="mt-6">
                <a
                  href="https://vtm.be/deze-gospel-positivos-krijgen-iedereen-aan-het-dansen~vff8d5e31-d881-4f66-97ee-2cd81c00e794"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors duration-200"
                >
                  Watch Performance
                </a>
              </div>
            </div>

            <div className="relative rounded-2xl bg-white p-8 shadow-xl ring-1 ring-slate-900/10 transition-all duration-300 hover:shadow-2xl hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                  2021
                </span>
              </div>
              
              <h3 className="font-display text-xl text-slate-900 mb-2">
                Gospel with Attitude
              </h3>
              
              <p className="text-slate-600 mb-4">
                Belgium's Got Talent
              </p>
              
              <p className="text-sm text-slate-700 mb-4">
                Showcasing our unique style and energy that captivated the nation and launched our journey.
              </p>
              
              <div className="mt-6">
                <a
                  href="https://vtm.be/kippenvel-pe-live-brengt-gospel-met-attitude~vef1f3ec0-74f6-4c9d-8722-a4109b6d35f2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors duration-200"
                >
                  Watch Performance
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
