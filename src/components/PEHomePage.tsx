import type { Config } from '@/payload-types'

import { CallToAction } from '@/components/sections/CallToAction'
import { Contact } from '@/components/sections/Contact'
import { FactsAndFigures } from '@/components/sections/FactsAndFigures'
import { Hero } from '@/components/sections/Hero'
import { UpNext } from '@/components/sections/UpNext'
import { WhatWeDo } from '@/components/sections/WhatWeDo'
import { WhoWeAre } from '@/components/sections/WhoWeAre'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getUpcomingEvents } from '@/utilities/getEvents'

export async function PEHomePage() {
  const [frontPage, footer, upcomingEvents] = await Promise.all([
    getCachedGlobal('frontPage', 1)().catch(() => null) as Promise<Config['globals']['frontPage'] | null>,
    getCachedGlobal('footer', 1)().catch(() => null) as Promise<Config['globals']['footer'] | null>,
    getUpcomingEvents(),
  ])

  if (!frontPage) {
    return <UpNext />
  }

  const featuredEvent = upcomingEvents.find((event) => event.featured === 'featured') || null

  return (
    <>
      <Hero data={frontPage.hero} featuredEvent={featuredEvent} />
      <WhoWeAre data={frontPage.whoWeAre} />
      <WhatWeDo data={frontPage.whatWeDo} />
      <UpNext copy={frontPage.upNext} />
      <CallToAction data={frontPage.callToAction} />
      <FactsAndFigures data={frontPage.factsAndFigures} />
      <Contact data={frontPage.contact} socialLinks={footer?.socialLinks} />
    </>
  )
}
