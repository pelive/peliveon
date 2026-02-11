"use client";

import Image from "next/image";
import { Container } from "@/components/Container";
import { Logo } from "@/components/Logo/Logo";
import { useState, useEffect } from "react";

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  featured?: boolean;
  image?: {
    url: string;
  };
  fullDescription?: string;
  ticketUrl?: string;
}

interface PastPerformance {
  id: string;
  title: string;
  year: string;
  event: string;
  description: string;
  videoUrl?: string;
  image?: {
    url: string;
  };
}

export function UpNext() {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [pastPerformances, setPastPerformances] = useState<PastPerformance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch upcoming events
        const eventsResponse = await fetch('/api/events');
        if (eventsResponse.ok) {
          const eventsData = await eventsResponse.json();
          setUpcomingEvents(eventsData.docs || []);
        }

        // Fetch past performances
        const pastResponse = await fetch('/api/past-performances');
        if (pastResponse.ok) {
          const pastData = await pastResponse.json();
          setPastPerformances(pastData.docs || []);
        }
      } catch (error) {
        console.error('Error fetching event data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const featuredEvent = upcomingEvents.find(event => event.featured);

  if (loading) {
    return (
      <section className="relative overflow-hidden bg-slate-50 py-20 sm:py-32">
        <Container className="relative z-20">
          <div className="text-center">
            <p>Loading events...</p>
          </div>
        </Container>
      </section>
    );
  }

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
        {featuredEvent && (
          <div className="lg:mx-0 md:mx-auto md:text-center mb-16">
            {featuredEvent.image && (
              <div className="w-full" style={{ height: "calc(900px / 2)", maxHeight: "45vh" }}>
                <Image
                  src={featuredEvent.image.url}
                  alt="PE LIVE IN CONCERT"
                  className="object-cover w-full h-full"
                  width={1620}
                  height={1080}
                  priority
                />
              </div>
            )}
            <h2 className={`${featuredEvent.image ? 'mt-28' : 'mt-8'} font-display text-xl text-slate-900`}>
              Up Next: PE LIVE IN CONCERT
            </h2>
            <p className="mt-4 text-3xl tracking-tight text-slate-700 sm:text-4xl uppercase">
              # {featuredEvent.title} - {" "}
              {featuredEvent.ticketUrl ? (
                <a href={featuredEvent.ticketUrl}
                   target="_blank" className="text-red-700">&#x1F517; Get Your Tickets</a>
              ) : (
                <a href="https://ticketsgent.be/producties/pe-live-in-concert"
                   target="_blank" className="text-red-700">&#x1F517; Get Your Tickets</a>
              )}
            </p>
            <div className="mt-16 max-w-2xl lg:mx-auto lg:max-w-none lg:grid lg:grid-cols-1 lg:gap-8">
              <div 
                className="text-lg text-slate-700"
                dangerouslySetInnerHTML={{ 
                  __html: (featuredEvent.fullDescription || featuredEvent.description)
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
          {upcomingEvents.filter(event => !event.featured).map((event) => (
            <div
              key={event.id}
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
            {pastPerformances.map((performance) => (
              <div key={performance.id} className="relative rounded-2xl bg-white p-8 shadow-xl ring-1 ring-slate-900/10 transition-all duration-300 hover:shadow-2xl hover:scale-105">
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                    {performance.year}
                  </span>
                </div>
                
                <h3 className="font-display text-xl text-slate-900 mb-2">
                  {performance.title}
                </h3>
                
                <p className="text-slate-600 mb-4">
                  {performance.event}
                </p>
                
                <p className="text-sm text-slate-700 mb-4">
                  {performance.description}
                </p>
                
                {performance.videoUrl && (
                  <div className="mt-6">
                    <a
                      href={performance.videoUrl}
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
      </Container>
    </section>
  );
}
