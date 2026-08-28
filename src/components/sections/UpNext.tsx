import Image from "next/image";

import RichText from "@/components/RichText";
import { EventStructuredData } from "@/components/StructuredData";
import { getPastEvents, getUpcomingEvents } from "@/utilities/getEvents";

import type { Event } from "@/payload-types";

type UpNextCopy = {
  eyebrow?: string | null;
  title?: string | null;
  infoLine?: string | null;
  moreTitle?: string | null;
  pastTitle?: string | null;
};

const eventImageUrl = (event: Event): string | null => {
  if (event.image && typeof event.image === "object" && event.image.url) {
    return event.image.url;
  }
  return null;
};

const monthYear = (date: string): string =>
  new Date(date).toLocaleDateString("en-GB", { month: "short", year: "numeric" });

const dayOfMonth = (date: string): string =>
  String(new Date(date).getDate()).padStart(2, "0");

const weekdayTime = (event: Event): string => {
  const weekday = new Date(event.eventDate).toLocaleDateString("en-GB", { weekday: "long" });
  const time =
    event.doorsTime ||
    new Date(event.eventDate).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  return `${weekday} · ${time}`;
};

export async function UpNext({ copy }: { copy?: UpNextCopy | null }) {
  const [upcomingEvents, pastEvents] = await Promise.all([getUpcomingEvents(), getPastEvents()]);

  const featuredEvent = upcomingEvents.find((event) => event.featured === "featured");
  const otherEvents = upcomingEvents.filter((event) => event.featured !== "featured");
  const featuredImage = featuredEvent ? eventImageUrl(featuredEvent) : null;

  return (
    <section
      id="upcoming"
      aria-label="Upcoming Events"
      className="w-full bg-paper py-24 text-paper-ink lg:py-36"
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

      <div className="mx-auto w-full max-w-[90rem] px-5 sm:px-10 lg:px-16">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-8">
          <div>
            <p className="mb-4 text-[11px] uppercase tracking-[0.28em] text-accent-deep">
              {copy?.eyebrow || "The programme"}
            </p>
            <h2 className="font-display text-4xl font-bold leading-[0.98] tracking-[-0.03em] sm:text-5xl lg:text-6xl">
              {copy?.title || "Up next"}
            </h2>
          </div>
          {copy?.infoLine && <p className="m-0 text-base text-paper-muted">{copy.infoLine}</p>}
        </div>

        {/* Featured show: poster + date rail */}
        {featuredEvent && (
          <article className="grid grid-cols-1 border border-black/10 bg-paper-ink text-stone-100 lg:grid-cols-[1.15fr_1fr]">
            <div className="relative min-h-72 overflow-hidden sm:min-h-[32rem]">
              {featuredImage && (
                <Image
                  src={featuredImage}
                  alt={featuredEvent.title}
                  fill
                  sizes="(min-width: 1024px) 50rem, 100vw"
                  className="object-cover object-[50%_28%]"
                  priority
                />
              )}
              <span className="absolute left-0 top-0 bg-accent px-4 py-3 font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-white">
                Featured show
              </span>
            </div>
            <div className="flex flex-col p-7 sm:p-12 lg:p-14">
              <div className="flex items-baseline gap-4 border-b border-white/15 pb-5">
                <span className="font-display text-6xl font-extrabold leading-[0.85] text-accent sm:text-7xl">
                  {dayOfMonth(featuredEvent.eventDate)}
                </span>
                <div>
                  <p className="m-0 font-display text-xl font-semibold uppercase tracking-[0.06em]">
                    {monthYear(featuredEvent.eventDate)}
                  </p>
                  <p className="m-0 mt-1 text-sm uppercase tracking-[0.14em] text-zinc-400">
                    {weekdayTime(featuredEvent)}
                  </p>
                </div>
              </div>
              <h3 className="mb-3 mt-7 font-display text-3xl font-bold uppercase leading-none tracking-[-0.03em] sm:text-4xl lg:text-[2.75rem]">
                {featuredEvent.title}
              </h3>
              <p className="m-0 text-sm uppercase tracking-[0.14em] text-zinc-400">
                {featuredEvent.location}
              </p>
              <div className="mt-4 max-w-[46ch] text-base leading-relaxed text-zinc-300 [&_p]:mb-3 [&_p:last-child]:mb-0">
                {featuredEvent.fullDescription ? (
                  <RichText data={featuredEvent.fullDescription} enableGutter={false} enableProse={false} />
                ) : (
                  <p>{featuredEvent.summary}</p>
                )}
              </div>
              <div className="mt-auto flex flex-wrap gap-3.5 pt-9">
                {featuredEvent.ticketUrl && (
                  <a
                    href={featuredEvent.ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 items-center gap-2.5 bg-accent px-7 font-display text-sm font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-accent-hover"
                    aria-label={`Get tickets for ${featuredEvent.title} (opens in a new tab)`}
                  >
                    Get Tickets <span aria-hidden="true">→</span>
                  </a>
                )}
                <a
                  href="#contact"
                  className="inline-flex min-h-12 items-center border border-white/30 px-6 font-display text-sm font-medium uppercase tracking-[0.14em] text-stone-100 transition-colors hover:border-white"
                >
                  Group booking
                </a>
              </div>
            </div>
          </article>
        )}

        {/* More upcoming: date-led rows */}
        {otherEvents.length > 0 && (
          <>
            <h3 className="mb-0 mt-20 font-display text-[13px] font-semibold uppercase tracking-[0.24em] text-accent-deep">
              {copy?.moreTitle || "More upcoming"}
            </h3>
            <ul className="m-0 mt-6 flex list-none flex-col border-t border-paper-ink/15 p-0">
              {otherEvents.map((event) => {
                const href = event.ticketUrl || "/contact";
                const external = Boolean(event.ticketUrl);
                return (
                  <li key={event.id} className="border-b border-paper-ink/15">
                    <a
                      href={href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="grid grid-cols-1 items-center gap-3 py-7 text-paper-ink no-underline transition-colors hover:bg-paper-ink/5 sm:grid-cols-[10rem_1fr_15rem_9rem] sm:gap-8"
                    >
                      <span className="flex items-baseline gap-2.5">
                        <span className="font-display text-4xl font-bold leading-none">
                          {dayOfMonth(event.eventDate)}
                        </span>
                        <span className="font-display text-sm font-semibold uppercase tracking-[0.14em]">
                          {monthYear(event.eventDate)}
                        </span>
                      </span>
                      <span className="font-display text-xl font-semibold tracking-[-0.01em] sm:text-2xl">
                        {event.title}
                      </span>
                      <span className="text-sm uppercase tracking-[0.12em] text-paper-muted">
                        {event.location}
                      </span>
                      <span className="font-display text-[13px] font-semibold uppercase tracking-[0.16em] text-accent-deep sm:justify-self-end">
                        {external ? "Tickets" : "Book"} <span aria-hidden="true">→</span>
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </>
        )}

        {/* Past performances */}
        {pastEvents.length > 0 && (
          <>
            <h3 className="mb-0 mt-24 font-display text-[13px] font-semibold uppercase tracking-[0.24em] text-accent-deep">
              {copy?.pastTitle || "Past performances"}
            </h3>
            <div className="mt-7 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pastEvents.map((event) => {
                const imageUrl = eventImageUrl(event);
                return (
                  <article
                    key={event.id}
                    className="border border-paper-ink/10 bg-white transition-[border-color,box-shadow] duration-300 hover:border-accent hover:shadow-[0_18px_40px_-24px_rgba(20,16,15,0.45)]"
                  >
                    {imageUrl && (
                      <div className="relative h-52 w-full overflow-hidden">
                        <Image
                          src={imageUrl}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 28rem, 100vw"
                          className="object-cover object-[50%_28%]"
                        />
                      </div>
                    )}
                    <div className="p-7">
                      <p className="mb-2.5 text-xs uppercase tracking-[0.2em] text-accent-deep">
                        {new Date(event.eventDate).getFullYear()} · {event.location}
                      </p>
                      <h4 className="mb-2.5 font-display text-2xl font-semibold tracking-[-0.01em]">
                        {event.title}
                      </h4>
                      <p className="m-0 text-[15px] leading-relaxed text-paper-muted">{event.summary}</p>
                      {event.ticketUrl && (
                        <a
                          href={event.ticketUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-5 inline-block border-b border-accent pb-1 font-display text-xs font-semibold uppercase tracking-[0.18em] text-paper-ink no-underline transition-colors hover:text-accent-deep"
                          aria-label={`Watch ${event.title} (opens in a new tab)`}
                        >
                          Watch <span aria-hidden="true">→</span>
                        </a>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
