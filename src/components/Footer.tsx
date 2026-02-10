import Link from 'next/link'
import {Container} from '@/components/Container'

export function Footer() {
	return (
		<footer className="bg-slate-50">
			<Container>
				<div
					className="flex flex-col items-center border-t border-slate-400/10 py-10 sm:flex-row-reverse sm:justify-between">
					<div className="flex gap-x-6">
						<Link href="https://instagram.com/peliveon" target="_blank" className="group"
						      aria-label="PE LIVE on Instagram">
							Instagram
						</Link>
						<Link href="https://facebook.com/peliveon" target="_blank" className="group"
						      aria-label="PE LIVE on Facebook">
							Facebook
						</Link>
						<Link href="https://tiktok.com/@peliveon" target="_blank" className="group"
						      aria-label="PE LIVE on TikTok">
							TikTok
						</Link>
						<Link href="https://youtube.com/@pelive" target="_blank" className="group"
						      aria-label="PE LIVE on YouTube">
							YouTube
						</Link>
					</div>
					<div className="mt-6 text-sm text-slate-500 sm:mt-0">
						Copyright &copy; {new Date().getFullYear()} PE LIVE. All rights
						reserved.
					</div>
				</div>
			</Container>
		</footer>
	)
}
