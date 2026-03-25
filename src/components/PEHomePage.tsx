import type { Config } from '@/payload-types'

import { CallToAction } from '@/components/sections/CallToAction'
import { Contact } from '@/components/sections/Contact'
import { FactsAndFigures } from '@/components/sections/FactsAndFigures'
import { Hero } from '@/components/sections/Hero'
import { UpNext } from '@/components/sections/UpNext'
import { WhatWeDo } from '@/components/sections/WhatWeDo'
import { WhoWeAre } from '@/components/sections/WhoWeAre'
import { getCachedGlobal } from '@/utilities/getGlobals'

export async function PEHomePage() {
  const frontPage = (await getCachedGlobal('frontPage', 1)()) as Config['globals']['frontPage'] | null

  if (!frontPage) {
    return (
      <main>
        <UpNext />
      </main>
    )
  }

  return (
    <main>
      <Hero data={frontPage.hero} />
      <WhoWeAre data={frontPage.whoWeAre} />
      <WhatWeDo data={frontPage.whatWeDo} />
      <CallToAction data={frontPage.callToAction} />
      <FactsAndFigures data={frontPage.factsAndFigures} />
      <Contact data={frontPage.contact} />
      <UpNext />
    </main>
  )
}
