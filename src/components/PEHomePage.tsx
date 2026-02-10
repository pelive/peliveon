import { CallToAction } from '@/components/sections/CallToAction'
import { UpNext } from '@/components/sections/UpNext'
import { Hero } from '@/components/sections/Hero'
import { Contact } from '@/components/sections/Contact'
import { WhatWeDo } from '@/components/sections/WhatWeDo'
import { WhoWeAre } from '@/components/sections/WhoWeAre'
import { FactsAndFigures } from '@/components/sections/FactsAndFigures'

export function PEHomePage() {
  return (
    <main>
      <Hero/>
      <WhoWeAre/>
      <WhatWeDo/>
      <CallToAction/>
      <FactsAndFigures/>
      <Contact/>
      <UpNext/>
    </main>
  )
}
