import Link from 'next/link'

import {Container} from '@/components/Container'
import {FaFacebook, FaInstagram, FaTiktok, FaYoutube} from 'react-icons/fa'

export function Footer() {
	return (
		<footer className="bg-slate-50">
			<Container>
				<div
					className="flex flex-col items-center border-t border-slate-400/10 py-10">
					<div className="flex gap-x-6 mb-4">
						<Link href="https://instagram.com/peliveon" target="_blank" className="group"
						      aria-label="PE LIVE on Instagram">
							<FaInstagram className="h-6 w-6 fill-slate-500 group-hover:fill-slate-700"/>
						</Link>
						<Link href="https://facebook.com/peliveon" target="_blank" className="group"
						      aria-label="PE LIVE on Facebook">
							<FaFacebook className="h-6 w-6 fill-slate-500 group-hover:fill-slate-700"/>
						</Link>
						<Link href="https://tiktok.com/@peliveon" target="_blank" className="group"
						      aria-label="PE LIVE on TikTok">
							<FaTiktok className="h-6 w-6 fill-slate-500 group-hover:fill-slate-700"/>
						</Link>
						<Link href="https://youtube.com/@pelive" target="_blank" className="group"
						      aria-label="PE LIVE on YouTube">
							<FaYoutube className="h-6 w-6 fill-slate-500 group-hover:fill-slate-700"/>
						</Link>
					</div>
					<div className="text-sm text-slate-500">
						Copyright &copy; {new Date().getFullYear()} PE LIVE. All rights
						reserved. Designed by {" "}
						Covalliant
						{/*<Link href="https://covalliant.com" target="_blank">
							Covalliant
						</Link>*/}
						. {' '}Or reach out directly at:{' '}
						<a href="mailto:info@pelive.be" className="text-red-400 hover:text-red-300">
							info@pelive.be
						</a>
					</div>
				</div>
			</Container>
		</footer>
	)
}
