"use client";

import React from "react";
import Image from "next/image";

import { Container } from "@/components/Container";

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
	backgroundImage?: {
		url?: string | null;
	} | number | null;
	partnerLogos?: HeroLogo[] | null;
};

export function Hero({ data }: { data: HeroData }) {
	if (!data) return null;

	return (
		<section
			id="home"
			className="relative w-screen h-screen min-h-[700px] overflow-hidden">
			{data.backgroundImage && typeof data.backgroundImage === "object" && data.backgroundImage.url && (
				<Image
					className="absolute top-1/2 w-full min-h-[700px] -translate-y-1/2 opacity-95 -z-20 object-cover"
					src={data.backgroundImage.url}
					alt=""
					priority={true}
					width={2347}
					height={1244}
					unoptimized
				/>
			)}
			<Container className="absolute inset-0 flex items-center justify-center">
				<div className="flex flex-col items-center justify-center text-center">
					<p className="font-display text-4xl sm:text-7xl text-slate-100 uppercase">
						{data.eyebrow}
					</p>
					<h1 className="mt-7 text-3xl sm:text-5xl lg:text-7xl font-bold whitespace-nowrap text-slate-200 px-4 uppercase will-change-transform">
						{data.titlePrefix}
						<span className="relative bg-red-600">{data.titleHighlight}</span>
					</h1>
					<p className="mt-5 font-display text-lg text-slate-100 uppercase">
						{data.ticketLabel} <span className="relative text-red-600">|| </span>
						<a href={data.ticketUrl} target="_blank" rel="noopener noreferrer">
							&#x1F517; ticketsgent.be
						</a>
					</p>
					{data.partnerLogos && data.partnerLogos.length > 0 && (
						<ul
							role="list"
							className="mt-8 flex flex-row items-center justify-center gap-y-0 gap-x-8 xl:gap-x-12"
						>
							<li>
								<ul
									role="list"
									className="flex flex-row items-center sm:gap-x-12"
								>
									{data.partnerLogos.map((company) => (
										<li key={company.id || company.name} className="flex">
											{company.logo && typeof company.logo === "object" && company.logo.url && (
												<Image src={company.logo.url} alt={company.name} width={120} height={60} unoptimized />
											)}
										</li>
									))}
								</ul>
							</li>
						</ul>
					)}
				</div>
			</Container>
		</section>
	);
}
