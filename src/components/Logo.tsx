import Image from 'next/image'

export function Logo({ className = '' }: { className?: string }) {
  return (
    <Image 
      src="/logos/pelive-small.svg"
      alt="PE LIVE"
      className={className}
      width={120}
      height={60}
      unoptimized
    />
  )
}
