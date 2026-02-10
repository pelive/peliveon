"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/components/Container";

export function Hero() {
	return (
		<section
			id="home"
			className="relative w-screen h-screen min-h-[700px] overflow-hidden pt-32">
			<Image
				className="absolute top-1/2 w-full min-h-[700px] -translate-y-1/2 opacity-95 -z-20 object-cover"
				src="/pictures/1.jpg"
				alt=""
				width={2347}
				height={1244}
				unoptimized
			/>
			<Container className="absolute h-screen min-h-[700px] pt-64 lg:pt-96 flex flex-col justify-center items-center text-center">
				<div
					className="flex flex-col items-center justify-center absolute bottom-0 mt-36 mb-16 lg:mt-44 lg:mb-48">
					<p className="font-display text-4xl sm:text-7xl text-slate-100 uppercase">
						In Concert
					</p>
					<h1 className="mt-7 text-3xl sm:text-5xl lg:text-7xl font-bold whitespace-nowrap text-slate-200 px-4 uppercase will-change-transform">
						#<span className="relative bg-red-600">Epiphany Reloaded</span>
					</h1>
					<p className="mt-5 font-display text-lg text-slate-100 uppercase">
						Info & Tickets <span className="relative text-red-600">|| </span>
						<a href="https://ticketsgent.be/producties/pe-live-in-concert"
						   target="_blank" rel="noopener noreferrer">&#x1F517; ticketsgent.be</a>
					</p>
				</div>
			</Container>
		</section>
	);
}
