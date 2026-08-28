import Image from "next/image";
import React from "react";

type MediaValue = {
  url?: string | null;
} | number | null;

type FactsData = {
  enable?: boolean | null;
  title: string;
  description: string;
  backgroundImage?: MediaValue;
  brandsTitle: string;
  brandLogos?: {
    name: string;
    logo: MediaValue;
    id?: string | null;
  }[] | null;
  artistsTitle: string;
  artists?: {
    name: string;
    id?: string | null;
  }[] | null;
  performancesTitle: string;
  performances?: {
    column: number;
    content: string;
    name: string;
    year: string;
    image?: MediaValue;
    links?: {
      name: string;
      url: string;
      id?: string | null;
    }[] | null;
    id?: string | null;
  }[] | null;
};

function QuoteIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg aria-hidden="true" width={105} height={78} {...props}>
      <path
        d="M25.086 77.292c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622C1.054 58.534 0 53.411 0 47.686c0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C28.325 3.917 33.599 1.507 39.324 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Zm54.24 0c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622-2.11-4.52-3.164-9.643-3.164-15.368 0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C82.565 3.917 87.839 1.507 93.564 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Z"/>
    </svg>
  )
}

export function FactsAndFigures({ data }: { data: FactsData }) {
  if (!data?.enable) return null

  const performanceColumns = [1, 2, 3].map((column) =>
    (data.performances || []).filter((performance) => performance.column === column),
  )

  return (
    <section
      id="facts"
      aria-label="Facts & Figures"
      className="relative overflow-hidden bg-slate-50 py-20 sm:py-32"
    >
      {data.backgroundImage && typeof data.backgroundImage === "object" && data.backgroundImage.url && (
        <Image
          className="absolute left-1/2 top-0 max-w-none -translate-y-1/4 translate-x-[-30%]"
          src={data.backgroundImage.url}
          alt=""
          width={1558}
          height={946}
        />
      )}
      <div className="container mx-auto px-4 relative">
        <div className="mx-auto max-w-2xl md:text-center">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            {data.title}
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            {data.description}
          </p>
        </div>
        <div className="mt-20 lg:mt-32 text-center">
          <p className="font-display text-xl text-slate-900">
            {data.brandsTitle}
          </p>
          <ul
            role="list"
            className="mt-16 flex items-center justify-center gap-x-8 sm:flex-col sm:gap-x-0 sm:gap-y-10 xl:flex-row xl:gap-x-12 xl:gap-y-0"
          >
            {[0, 1, 2].map((groupIndex) => (
              <li key={groupIndex}>
                <ul
                  role="list"
                  className="flex flex-col items-center gap-y-8 sm:flex-row sm:gap-x-12 sm:gap-y-0"
                >
                  {(data.brandLogos || []).slice(groupIndex * 3, groupIndex * 3 + 3).map((company) => (
                    <li key={company.id || company.name} className="flex">
                      {company.logo && typeof company.logo === "object" && company.logo.url && (
                        <Image src={company.logo.url} alt={company.name} width={120} height={60} unoptimized/>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-20 lg:mt-32 text-center">
          <p className="font-display text-xl text-slate-900">
            {data.artistsTitle}
          </p>
          <div
            className="mt-16 font-serif text-2xl text-slate-900 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-12">
            {(data.artists || []).map((artist) => (
              <span key={artist.id || artist.name}>{artist.name}</span>
            ))}
          </div>
        </div>
        <div className="mt-20 lg:mt-32 text-center">
          <p className="font-display text-xl text-slate-900">
            {data.performancesTitle}
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mt-20 lg:max-w-none lg:grid-cols-3"
        >
          {performanceColumns.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="flex flex-col gap-y-6 sm:gap-y-8">
                {column.map((performance) => (
                  <li key={performance.id || `${performance.name}-${performance.year}`}>
                    <figure
                      className="relative rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10">
                      <QuoteIcon className="absolute left-6 top-6 fill-slate-100 opacity-15"/>
                      <blockquote className="relative">
                        <p className="text-lg tracking-tight text-slate-900">
                          {performance.content}
                        </p>
                      </blockquote>
                      <figcaption
                        className="relative mt-6 flex items-center justify-between border-t border-slate-100 pt-6">
                        <div>
                          <div className="font-display text-base text-slate-900">
                            {performance.name}
                          </div>
                          <div className="mt-1 text-sm text-slate-500">
                            {performance.year}
                          </div>
                          {performance.links &&
                            performance.links.length > 0 && (
                              <div className="mt-1 text-sm text-blue-500">
                                {performance.links.map((link) => (
                                  <div key={link.id || `${performance.name}-${link.name}`}>
                                    <a href={link.url} target="_blank"
                                       rel="noopener noreferrer">{link.name}</a>
                                  </div>
                                ))}
                              </div>
                            )}
                        </div>
                      </figcaption>
                      {performance.image && typeof performance.image === "object" && performance.image.url && (
                        <div className="mt-5 overflow-hidden rounded-xl bg-slate-50">
                          <Image
                            className="h-40 w-full object-cover"
                            src={performance.image.url}
                            alt={performance.name}
                            width={640}
                            height={320}
                            sizes="(min-width: 1024px) 24rem, (min-width: 640px) 42rem, 100vw"
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
