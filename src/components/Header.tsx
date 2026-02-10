"use client";

import Link from "next/link";
import clsx from "clsx";
import { Container } from "@/components/Container";

export function Header() {
	return (
		<header className="py-10">
			<Container>
				<nav className="relative z-50 flex justify-between">
					<div className="flex items-center md:gap-x-12">
						<Link href="#" aria-label="Home">
							PE LIVE Logo
						</Link>
					</div>
					<div className="flex items-center gap-x-5 md:gap-x-8">
						<p className="font-display text-lg sm:text-2xl text-slate-100 uppercase">
							Sat, 28 Sep 2024
							<span className="relative text-red-600"> || </span>
							20:00
							<span className="relative text-red-600"> || </span>
							<a href="https://ntgent.be/nl/plan-uw-bezoek/bereikbaarheid"
							   target="_blank" rel="noopener noreferrer">&#x1F517; NTGent</a>
						</p>
					</div>
				</nav>
			</Container>
		</header>
	);
}
