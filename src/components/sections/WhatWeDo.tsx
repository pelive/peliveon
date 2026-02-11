"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import clsx from "clsx";

import { Container } from "@/components/Container";

const features = [
	{
		title: "Concerts & Festivals",
		description:
			"PE LIVE delivers electrifying performances at major concerts and festivals, bringing a unique blend of Gospel music to diverse audiences. " +
			"From the Freedom Festival at Gentse Feesten to the Gospel Festival Stad Mortsel, our vibrant energy and captivating stage presence leave lasting impressions. " +
			"Join us at our next concert or festival for an unforgettable experience!",
		image: "/pictures/14.jpg",
	},
	{
		title: "Corporate & Private Events",
		description:
			"Elevate your corporate or private event with the soulful sounds of PE LIVE. " +
			"Our music adds a dynamic and enchanting atmosphere, perfect for business functions, birthdays, and other special occasions. " +
			"Let us bring our gospel vibes to your event, ensuring it becomes a memorable celebration. Contact us to make your event extraordinary!",
		image: "/pictures/2.jpg",
	},
	{
		title: "Weddings",
		description:
			"Transform your wedding day into a magical celebration with PE LIVE. " +
			"Our passionate performances and heartfelt gospel music create an unforgettable ambiance for your special day. " +
			"From intimate ceremonies to grand receptions, we tailor our music to perfectly match the mood and emotions of your wedding. " +
			"Make your dream wedding come true with PE LIVE!",
		image: "/pictures/3.jpg",
	},
];

export function WhatWeDo() {
	let [tabOrientation, setTabOrientation] = useState<"horizontal" | "vertical">("horizontal");
	let [backgroundImage, setBackgroundImage] = useState(features[0].image);
	
	useEffect(() => {
		let lgMediaQuery = window.matchMedia("(min-width: 1024px)");
		
		function onMediaQueryChange({ matches }: { matches: boolean }) {
			setTabOrientation(matches ? "vertical" : "horizontal");
		}
		
		onMediaQueryChange(lgMediaQuery);
		lgMediaQuery.addEventListener("change", onMediaQueryChange);
		
		return () => {
			lgMediaQuery.removeEventListener("change", onMediaQueryChange);
		};
	}, []);
	
	return (
		<section
			id="works"
			aria-label="What We Do"
			className="relative overflow-hidden pb-28 pt-20 sm:py-32"
		>
			<Image
				className="absolute top-0 left-0 w-full h-full object-cover opacity-15 -z-10"
				src={backgroundImage}
				alt=""
				width={800}
				height={600}
				priority
			/>
			<Container className="relative">
				<div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
					<h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl md:text-5xl">
						What We Do
					</h2>
					<p className="mt-6 text-lg tracking-tight text-white">
						Discover the diverse and dynamic performances PE LIVE brings to every occasion, from concerts
						and festivals to corporate events and weddings.
					</p>
				</div>
				<TabGroup
					className="z-10 grid grid-cols-1 items-center gap-y-2 pt-10 lg:pt-0 mt-16 md:mt-20 sm:gap-y-6"
					vertical={tabOrientation === "vertical"}
					onChange={(index) => setBackgroundImage(features[index].image)}
				>
					{({ selectedIndex }) => (
						<>
							<div
								className="-mx-4 flex overflow-x-auto pb-4 sm:mx-0 sm:overflow-visible sm:pb-0 lg:col-span-5">
								<TabList
									className="z-10 relative flex gap-x-3 gap-y-1 mx-auto px-4 items-center">
									{features.map((feature, featureIndex) => (
										<div
											key={feature.title}
											className={clsx(
												"group relative items-center rounded-full px-4 py-1",
												selectedIndex === featureIndex
													? "bg-white ring-1 ring-inset"
													: "hover:bg-white/10",
											)}
										>
											<h3>
												<Tab
													className={clsx(
														"font-display text-sm lg:text-lg ui-not-focus-visible:outline-none",
														selectedIndex === featureIndex
															? "text-blue-600"
															: "text-blue-100 hover:text-white",
													)}
												>
													<span
														className="absolute inset-0 rounded-full text-center"/>
													{feature.title}
												</Tab>
											</h3>
										</div>
									))}
								</TabList>
							</div>
							<TabPanels>
								{features.map((feature) => (
									<TabPanel key={feature.title} unmount={false}>
										<div className="relative">
											<div
												className="absolute -inset-x-4 bottom-[-2.25rem] top-[-5.95rem] bg-black/70 ring-1 ring-inset ring-white/10 sm:inset-x-0 sm:rounded-t-xl"/>
											<p className="relative mx-auto max-w-4xl text-lg lg:text-xl text-white sm:text-center">
												{feature.description}
											</p>
										</div>
										<div
											className="mt-[2.2rem] w-auto overflow-hidden rounded-b-xl bg-slate-50 shadow-sm shadow-blue-950/25">
											<Image
												className="w-full"
												src={feature.image}
												alt=""
												width={800}
												height={600}
												priority
												sizes="(min-width: 1024px) 67.8125rem, (min-width: 640px) 100vw, 45rem"
											/>
										</div>
									</TabPanel>
								))}
							</TabPanels>
						</>
					)}
				</TabGroup>
			</Container>
		</section>
	);
}
