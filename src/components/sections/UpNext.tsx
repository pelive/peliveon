"use client";

export function UpNext() {
  const upcomingEvents = [
    {
      title: "Epiphany Reloaded",
      date: "March 15, 2024",
      location: "NTGent, Ghent",
      description: "Our annual concert featuring special guests and new arrangements.",
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

  return (
    <section
      id="upcoming"
      aria-label="Upcoming Events"
      className="relative w-screen bg-slate-50 py-32"
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tight text-slate-900">
            Up Next
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            Don&apos;t miss out on our upcoming performances and events. Join us as we continue to bring the power of Gospel music to audiences across Belgium!
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {upcomingEvents.map((event, index) => (
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

        <div className="mt-16 text-center">
          <p className="text-lg text-slate-700">
            Want to stay updated with our latest events?{' '}
            <a
              href="#contact"
              className="font-semibold text-red-600 hover:text-red-500"
            >
              Join our mailing list
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
