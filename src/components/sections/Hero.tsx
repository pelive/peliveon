"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/components/Container";

export function Hero() {
	return (
		<section
			id="home"
			className="relative w-screen h-screen min-h-[700px] overflow-hidden">
			<Image
				className="absolute top-1/2 w-full min-h-[700px] -translate-y-1/2 opacity-95 -z-20 object-cover"
				src="/pictures/1.jpg"
				alt="PE Live concert performance with dramatic lighting and engaged audience"
				priority={true}
				width={2347}
				height={1244}
				unoptimized
			/>
			<Container className="absolute inset-0 flex items-center justify-center">
				<div
					className="flex flex-col items-center justify-center text-center">
					<p className="font-display text-4xl sm:text-7xl text-slate-100 uppercase">
						In Concert
					</p>
					<h1 className="mt-7 text-3xl sm:text-5xl lg:text-7xl font-bold whitespace-nowrap text-slate-200 px-4 uppercase will-change-transform">
						#<span className="relative bg-red-600">Epiphany Reloaded</span>
					</h1>
					<p className="mt-5 font-display text-lg text-slate-100 uppercase">
						Info & Tickets <span className="relative text-red-600">|| </span>
						<a href="https://ticketsgent.be/producties/pe-live-in-concert"
						   target="_blank">&#x1F517; ticketsgent.be</a>
					</p>
					<ul
						role="list"
						className="mt-8 flex flex-row items-center justify-center gap-y-0 gap-x-8 xl:gap-x-12"
					>
						{[
							[
								{ name: "PE Live", logo: "/logos/pelive-small.svg" },
								{ name: "Stad Gent", logo: "/logos/gent-colorful.svg" },
								{ name: "NTGent", logo: "/logos/ntgent.svg" },
							],
						].map((group, groupIndex) => (
							<li key={groupIndex}>
								<ul
									role="list"
									className="flex flex-row items-center sm:gap-x-12"
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
			</Container>
		</section>
	);
}
