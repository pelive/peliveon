import Image from 'next/image'
import logoPELive from '/logos/pelive-small.svg';

export function Logo({ className = '' }: { className?: string }) {
  return (
    <Image 
      src={logoPELive}
      alt="PE LIVE"
      className={className}
      width={120}
      height={60}
      unoptimized
    />
  )
}
