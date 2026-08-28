import React from "react";
import Image from "next/image";

import type { Event } from "@/payload-types";

type HeroLogo = {
	name: string;
	logo?: {
		url?: string | null;
	} | number | null;
	id?: string | null;
};

type HeroData = {
	eyebrow: string;
	titlePrefix: string;
	titleHighlight: string;
	ticketLabel: string;
	ticketUrl: string;
	secondaryCtaLabel?: string | null;
	fallback?: {
		eyebrow?: string | null;
		titlePrefix?: string | null;
		titleHighlight?: string | null;
		subtitle?: string | null;
	} | null;
	backgroundImage?: {
		url?: string | null;
	} | number | null;
	partnerLogos?: HeroLogo[] | null;
};

const formatEventDate = (date: string): string =>
	new Date(date).toLocaleDateString("en-GB", {
		weekday: "short",
		day: "numeric",
		month: "short",
		year: "numeric",
	});

const formatEventTime = (date: string): string =>
	new Date(date).toLocaleTimeString("en-GB", {
		hour: "2-digit",
		minute: "2-digit",
	});

function titleLines(prefixRaw: string, highlightRaw: string): [string, string | null] {
	const prefix = (prefixRaw || "").trim();
	const highlight = (highlightRaw || "").trim();

	if (prefix && prefix !== "#") return [prefix, highlight || null];

	// No usable first line — break the highlight across two lines instead.
	const space = highlight.indexOf(" ");
	if (space > 0) return [highlight.slice(0, space), highlight.slice(space + 1)];
	return [highlight, null];
}

export function Hero({ data, featuredEvent }: { data: HeroData; featuredEvent?: Event | null }) {
	if (!data) return null;

	// Featured-event mode: show branding, date rail and ticket CTAs.
	// Default mode (no upcoming featured event): band fallback, booking CTA only.
	const isFeatured = Boolean(featuredEvent);
	const fallback = data.fallback;
	const eyebrow = isFeatured ? data.eyebrow : fallback?.eyebrow || data.eyebrow;
	const [lineOne, lineTwo] = isFeatured
		? titleLines(data.titlePrefix, data.titleHighlight)
		: titleLines(
				fallback?.titlePrefix || data.titlePrefix,
				fallback?.titleHighlight || data.titleHighlight,
			);
	const backgroundUrl =
		data.backgroundImage && typeof data.backgroundImage === "object"
			? data.backgroundImage.url
			: null;
	const logos = (data.partnerLogos || []).filter(
		(company) => company.logo && typeof company.logo === "object" && company.logo.url,
	);

	return (
		<>
			<section id="home" className="relative flex min-h-screen w-full flex-col justify-end overflow-hidden bg-ink">
				{backgroundUrl && (
					<div className="absolute inset-0 overflow-hidden">
						<Image
							className="h-full w-full object-cover object-[50%_35%] animate-kenburns"
							src={backgroundUrl}
							alt=""
							priority
							fill
							sizes="100vw"
						/>
					</div>
				)}
				<div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/40 to-ink" aria-hidden="true" />

				<div className="relative mx-auto w-full max-w-[90rem] px-5 pb-16 pt-40 sm:px-10 lg:px-16 lg:pb-20">
					<p className="mb-4 flex items-center gap-3.5 font-display text-xs font-medium uppercase tracking-[0.34em] text-stone-100">
						<span className="block h-px w-11 bg-accent" aria-hidden="true" />
						{eyebrow}
					</p>
					<h1 className="font-display text-6xl font-extrabold uppercase leading-[0.88] tracking-[-0.035em] text-white sm:text-8xl lg:text-[8.25rem]">
						{lineOne}
						{lineTwo && (
							<>
								<br />
								<span className="text-accent">{lineTwo}</span>
							</>
						)}
					</h1>
					{!isFeatured && fallback?.subtitle && (
						<p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-zinc-300">
							{fallback.subtitle}
						</p>
					)}

					<div className="mt-8 flex flex-wrap items-end justify-between gap-8 lg:mt-11">
						{featuredEvent && (
							<dl className="flex w-full flex-col border-y border-white/15 sm:w-auto sm:flex-row sm:items-stretch">
								<div className="flex items-baseline justify-between gap-4 border-b border-white/15 py-3 sm:block sm:min-w-36 sm:border-b-0 sm:border-r sm:py-4 sm:pr-7">
									<dt className="text-[11px] uppercase tracking-[0.2em] text-zinc-400">Date</dt>
									<dd className="m-0 font-display text-base font-semibold text-white sm:mt-1.5 sm:text-xl">
										{formatEventDate(featuredEvent.eventDate)}
									</dd>
								</div>
								<div className="flex items-baseline justify-between gap-4 border-b border-white/15 py-3 sm:block sm:border-b-0 sm:border-r sm:px-7 sm:py-4">
									<dt className="text-[11px] uppercase tracking-[0.2em] text-zinc-400">
										{featuredEvent.doorsTime ? "Doors / Show" : "Show"}
									</dt>
									<dd className="m-0 font-display text-base font-semibold text-white sm:mt-1.5 sm:text-xl">
										{featuredEvent.doorsTime || formatEventTime(featuredEvent.eventDate)}
									</dd>
								</div>
								<div className="flex items-baseline justify-between gap-4 py-3 sm:block sm:py-4 sm:pl-7">
									<dt className="text-[11px] uppercase tracking-[0.2em] text-zinc-400">Venue</dt>
									<dd className="m-0 font-display text-base font-semibold text-white sm:mt-1.5 sm:text-xl">
										{featuredEvent.location}
									</dd>
								</div>
							</dl>
						)}

						<div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
							{featuredEvent && (
								<a
									href={featuredEvent.ticketUrl || data.ticketUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex min-h-[3.25rem] items-center justify-center gap-3 bg-accent px-8 font-display text-sm font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
								>
									{data.ticketLabel}
									<span aria-hidden="true" className="text-lg leading-none">→</span>
								</a>
							)}
							<a
								href="#contact"
								className={
									isFeatured
										? "inline-flex min-h-[3.25rem] items-center justify-center border border-white/35 px-7 font-display text-sm font-medium uppercase tracking-[0.14em] text-stone-100 transition-colors hover:border-white hover:bg-white/5"
										: "inline-flex min-h-[3.25rem] items-center justify-center gap-3 bg-accent px-8 font-display text-sm font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
								}
							>
								{data.secondaryCtaLabel || "Book the band"}
								{!isFeatured && <span aria-hidden="true" className="text-lg leading-none">→</span>}
							</a>
						</div>
					</div>
				</div>
			</section>

			{logos.length > 0 && (
				<div className="overflow-hidden border-y border-white/10 bg-paper">
					<div className="mx-auto flex max-w-[90rem] items-center gap-6 px-5 py-6 sm:gap-10 sm:px-10 lg:px-16">
						<p className="m-0 flex-none text-[11px] uppercase tracking-[0.2em] text-paper-muted">
							Stages &amp; partners
						</p>
						<div className="flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
							<div className="flex w-max items-center gap-16 animate-marquee">
								{[false, true].map((duplicate) => (
									<ul
										key={duplicate ? "duplicate" : "original"}
										aria-hidden={duplicate || undefined}
										className="m-0 flex list-none items-center gap-16 p-0"
									>
										{logos.map((company) => (
											<li key={company.id || company.name} className="flex flex-none">
												<Image
													src={(company.logo as { url?: string | null }).url as string}
													alt={duplicate ? "" : company.name}
													width={120}
													height={40}
													className="h-8 w-auto opacity-85"
													unoptimized
												/>
											</li>
										))}
									</ul>
								))}
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
