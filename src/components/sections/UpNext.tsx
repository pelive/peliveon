import Image from "next/image";

import { Container } from "@/components/Container";
import { Logo } from "@/components/Logo/Logo";
import RichText from "@/components/RichText";
import { EventStructuredData } from "@/components/StructuredData";
import { getPastEvents, getUpcomingEvents } from "@/utilities/getEvents";

import type { Event } from "@/payload-types";

const eventImageUrl = (event: Event): string | null => {
  if (event.image && typeof event.image === "object" && event.image.url) {
    return event.image.url;
  }
  return null;
};

const formatEventDate = (date: string): string =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export async function UpNext() {
  const [upcomingEvents, pastEvents] = await Promise.all([getUpcomingEvents(), getPastEvents()]);

  const featuredEvent = upcomingEvents.find((event) => event.featured === "featured");
  const otherEvents = upcomingEvents.filter((event) => event.featured !== "featured");
  const featuredImage = featuredEvent ? eventImageUrl(featuredEvent) : null;

  return (
    <section
      id="upcoming"
      aria-label="Upcoming Events"
      className="relative overflow-hidden bg-slate-50 py-20 sm:py-32"
    >
      {upcomingEvents.map((event) => (
        <EventStructuredData
          key={event.id}
          data={{
            name: event.title,
            description: event.summary,
            startDate: event.eventDate,
            location: {
              name: event.location,
              address: event.location,
            },
            performer: {
              name: "PE Live",
              description: "Black American-style Gospel band from Belgium",
            },
          }}
        />
      ))}

      {/* Background elements */}
      <Image
        className="absolute left-1/2 top-0 max-w-none -translate-y-1/4 translate-x-[-30%] -z-20"
        src="/background-faqs.jpg"
        alt=""
        width={1558}
        height={946}
      />
      <div className="absolute bottom-0 left-0 translate-x-[-10%] opacity-5 z-10">
        <Logo className="h-[100vh]"/>
      </div>

      <Container className="relative z-20">
        {/* Featured Event Section */}
        {featuredEvent && (
          <div className="lg:mx-0 md:mx-auto md:text-center mb-16">
            {featuredImage && (
              <div className="w-full" style={{ height: "calc(900px / 2)", maxHeight: "45vh" }}>
                <Image
                  src={featuredImage}
                  alt={featuredEvent.title}
                  className="object-cover w-full h-full"
                  width={1620}
                  height={1080}
                  sizes="(min-width: 86rem) 86rem, 100vw"
                  priority
                />
              </div>
            )}
            <h2 className={`${featuredImage ? 'mt-28' : 'mt-8'} font-display text-xl text-slate-900`}>
              Up Next: PE LIVE IN CONCERT
            </h2>
            <p className="mt-4 text-3xl tracking-tight text-slate-700 sm:text-4xl uppercase">
              # {featuredEvent.title} - {" "}
              <a
                href={featuredEvent.ticketUrl || "https://ticketsgent.be/producties/pe-live-in-concert"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-700"
                aria-label={`Get your tickets for ${featuredEvent.title} (opens in a new tab)`}
              >&#x1F517; Get Your Tickets</a>
            </p>
            <div className="mt-16 max-w-2xl lg:mx-auto lg:max-w-none lg:grid lg:grid-cols-1 lg:gap-8">
              <div className="text-lg text-slate-700 [&_p]:mb-4 [&_p:last-child]:mb-0">
                {featuredEvent.fullDescription ? (
                  <RichText data={featuredEvent.fullDescription} enableGutter={false} enableProse={false} />
                ) : (
                  <p>{featuredEvent.summary}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Other Events Section */}
        {otherEvents.length > 0 && (
          <>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tight text-slate-900">
                More Upcoming Events
              </h2>
              <p className="mt-4 text-lg tracking-tight text-slate-700">
                Don&apos;t miss out on our other upcoming performances and events. Join us as we continue to bring the power of Gospel music to audiences across Belgium!
              </p>
            </div>

            <div className={`mt-16 grid gap-8 ${otherEvents.length === 1 ? 'lg:grid-cols-1 max-w-2xl mx-auto' : 'lg:grid-cols-2'}`}>
              {otherEvents.map((event) => (
                <div
                  key={event.id}
                  className="relative rounded-2xl bg-white p-8 shadow-xl ring-1 ring-slate-900/10 transition-all duration-300 hover:shadow-2xl hover:scale-105"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-800">
                      {formatEventDate(event.eventDate)}
                    </span>
                  </div>

                  <h3 className="font-display text-xl text-slate-900 mb-2">
                    {event.title}
                  </h3>

                  <p className="text-slate-600 mb-4">
                    {event.location}
                  </p>

                  <p className="text-sm text-slate-700">
                    {event.summary}
                  </p>

                  <div className="mt-6">
                    <a
                      href={event.ticketUrl || "/contact"}
                      target={event.ticketUrl ? "_blank" : undefined}
                      rel={event.ticketUrl ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center justify-center rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 transition-colors duration-200"
                    >
                      Book Tickets
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Past Performances Section */}
        {pastEvents.length > 0 && (
          <div className="mt-32">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tight text-slate-900">
                Past Performances
              </h2>
              <p className="mt-4 text-lg tracking-tight text-slate-700">
                Relive some of our most memorable performances and moments from previous shows.
              </p>
            </div>

            <div className={`mt-16 grid gap-8 ${pastEvents.length === 1 ? 'lg:grid-cols-1 max-w-2xl mx-auto' : pastEvents.length === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-3'}`}>
              {pastEvents.map((event) => (
                <div key={event.id} className="relative rounded-2xl bg-white p-8 shadow-xl ring-1 ring-slate-900/10 transition-all duration-300 hover:shadow-2xl hover:scale-105">
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                      {new Date(event.eventDate).getFullYear()}
                    </span>
                  </div>

                  <h3 className="font-display text-xl text-slate-900 mb-2">
                    {event.title}
                  </h3>

                  <p className="text-slate-600 mb-4">
                    {event.location}
                  </p>

                  <p className="text-sm text-slate-700 mb-4">
                    {event.summary}
                  </p>

                  {event.ticketUrl && (
                    <div className="mt-6">
                      <a
                        href={event.ticketUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors duration-200"
                      >
                        Watch Performance
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
