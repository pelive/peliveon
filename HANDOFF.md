# Session Handoff — PE LIVE Website

> For a local Claude Code session continuing work on this repo. A remote session (Aug 2026) took the site from the Payload template state to the redesigned, optimized production site now on `main`. This file is the state of the world, the conventions to follow, and the open backlog. **You are local: you have Chrome — use it.** The remote session could not reach the live site or run a browser, so visual verification has been manual until now; that's your biggest lever.

## What this project is

PE LIVE (pelive.be) — marketing site for a Black American-style Gospel band in Ghent, Belgium. Goals: sell tickets for the featured concert (ticketsgent.be) and get booking inquiries (contact form → email). Stack: **Next.js 16.3 (App Router, RSC) + Payload CMS 3.88 + Tailwind CSS v4** (CSS-first config) + Vercel (hosting, Postgres/Neon, Blob storage) + Resend (email). npm, not pnpm. TypeScript pinned to **5.9** and ESLint to **9.x** deliberately — TS 7 / ESLint 10 break typescript-eslint and the Next lint plugins; don't "upgrade" those two until the ecosystem catches up.

## What was done (merged PRs #1–#9, all on `main`)

1. **Optimization pass**: full dependency update; security (auth on seed/reset routes, XSS fix); performance (server components, cached event queries, next/image enabled with AVIF/WebP, fonts wired into Tailwind `@theme`); SEO (CMS-driven metadata, canonicals, Event structured data, sitemap fixes); a11y (skip link, `main` landmark, keyboard mobile menu).
2. **Resend fix**: the adapter was misconfigured (`from`/`name` instead of `defaultFromAddress`/`defaultFromName`) — every email failed. Contact flow: form → `POST /api/contact` → `payload.sendEmail` → Resend, to `CONTACT_EMAIL` (fallback info@pelive.be), reply-to = visitor.
3. **Redesign** (Claude Design "Direction A — Stage"): dark theatrical system — ink surfaces, warm paper programme section, red `#dc2626` sole accent — as `@theme` tokens in `src/app/(frontend)/globals.css`. All homepage sections, header (fixed, transparent→solid), footer, contact page, posts pages, search, 404.
4. **Full CMS editability**: every text and image comes from Payload. FrontPage global tabs (Hero incl. fallback group, Who We Are incl. stats + collage, What We Do, Up Next copy, CTA, Facts & Figures, Contact), Footer global (tagline, socials, booking email, ticket URL, credit), Events (incl. `doorsTime`), Header/Footer navItems.
5. **Automatic schema sync**: `prebuild` runs `scripts/sync-schema.ts --optional` — every build (Vercel has `POSTGRES_URL`) pushes schema changes and **verifies** the frontPage/header/footer/events queries; a mismatch fails the build. Skips cleanly with no `POSTGRES_URL` (local build without DB) or `SKIP_SCHEMA_SYNC=1`. Manual: `npm run sync:schema`.
6. **Featured-event gating**: all "Get Tickets" UI (header, hero, footer, featured card) renders only while an upcoming event is marked Featured (`getUpcomingEvents` already excludes past dates), preferring that event's own `ticketUrl`. The hero has two modes: featured (show branding + date/doors/venue rail + tickets) and default (CMS fallback copy under Hero → Fallback, booking CTA only).
7. **Cache poisoning fix** (important convention): `getGlobal` must NOT catch errors — thrown results aren't cached by `unstable_cache`; a caught-and-returned `null` gets cached (5-min TTL now, but still). Callers use `.catch(() => null)`. Never reintroduce a try/catch inside a cached fetch.
8. Nav links normalized (`#anchor` → `/#anchor` so menus work off-homepage); footer News/Search links removed (pages still exist at `/posts`, `/search`); testimonial cards render `performances[].image` with a blurred/stylized default photo fallback; `darkenOnLight` checkbox per partner logo for white artwork on paper surfaces.

## Working conventions

- Branch: `claude/website-optimization-design-irc0sg` → PR to `main` → wait for the Vercel preview status to succeed → merge. Production auto-deploys from `main` and runs the schema sync. Merge only with the user's standing approval pattern — confirm if unsure.
- Validate before every push: `npx tsc --noEmit` · `npm run lint` (0 errors; 7 pre-existing `any` warnings are known) · `npm run build` (prints "POSTGRES_URL is not set — skipping schema sync" locally — expected).
- After changing any Payload config: `npm run generate:types`. New columns apply automatically on deploy; locally, `npm run dev` (Payload dev push) or `npm run sync:schema` with a DB.
- Local env: `cp .env.example .env`; the site builds and runs without a DB (graceful fallbacks) but renders real content only with `POSTGRES_URL`. Email needs `RESEND_API_KEY`, `FROM_EMAIL` (Resend-verified domain), `CONTACT_EMAIL`. Production env vars live in Vercel — already configured.

## Use Chrome for verification (you can, we couldn't)

For anything visual, drive Chrome (Playwright or your browser tooling) rather than trusting the build:

- Run `npm run dev` (with the production `POSTGRES_URL` in `.env` if the user provides it, for real content) and screenshot each homepage section at desktop (1440) and mobile (390) — hero, partner marquee, About, services tabs, programme (featured card + rows + past cards), CTA, facts (logo wall/artists/testimonials), contact form, footer.
- Verify **both hero modes**: with the featured event set, and with it toggled off (all ticket UI must disappear site-wide).
- Exercise the mobile menu (open/close, Escape, links), the services tabs, anchor navigation from `/posts` back to home sections, and the contact form's error + success states.
- Check the live site (pelive.be / the Vercel URL) the same way after merges — the remote session's egress was blocked, so live checks were never automated.
- Watch for: horizontal overflow, contrast on image-overlay text, `prefers-reduced-motion` (kenburns/marquee must stop), broken CMS images.

## Open backlog (known, not yet done — confirm priorities with the user)

1. **`src/blocks/*` are stale**: `blocks/UpNext`, `blocks/WhoWeAre`, `blocks/WhatWeDo`, `blocks/Contact`, `blocks/PastPerformances` still carry the OLD light design and client-side fetching. They render only on CMS layout-builder pages (any page except home). Restyle to the design system — ideally by reusing `src/components/sections/*`.
2. **`src/heros/*`** (HighImpact/MediumImpact/LowImpact, for CMS pages) not restyled to the dark system (PostHero is done).
3. Button duplication: `src/components/Button.tsx` (used by CallToAction) vs `src/components/ui/button.tsx` (shadcn) — consolidate.
4. Mobile menu has Escape + aria but no focus trap; Headless UI `Dialog` is available if the user wants it tightened.
5. Dates render `en-GB`; consider a CMS locale choice (site audience is Flemish).
6. 7 `@typescript-eslint/no-explicit-any` warnings; 5 moderate npm audit findings (transitive in Payload's `drizzle-kit`, build-time only, no upstream fix).
7. `next.config.js` `cacheLife` profiles are inert (code uses `unstable_cache`); either adopt `'use cache'` or drop the config block.
8. End-to-end email test with a real Resend send was never run — worth doing once locally.
9. `public/logos/got-talent.svg` and `gent-colorful.svg` exist but aren't in the CMS Media library; upload if the user wants them in partner lists.

## Key file map

- Sections: `src/components/sections/{Hero,WhoWeAre,WhatWeDo,UpNext,CallToAction,FactsAndFigures,Contact}.tsx` — composed by `src/components/PEHomePage.tsx`; WhatWeDo + Contact are the only client components.
- Chrome: `src/Header/Component{,.client}.tsx`, `src/Footer/Component.tsx`, layout + tokens in `src/app/(frontend)/{layout.tsx,globals.css}`.
- Data: `src/utilities/{getGlobals,getEvents,checkDatabase}.ts` (read the comments — the caching rules are load-bearing), `src/app/api/contact/route.ts`, `scripts/sync-schema.ts`.
- CMS config: `src/FrontPage/config.ts`, `src/Footer/config.ts`, `src/Header/config.ts`, `src/collections/Events/index.ts`, `src/payload.config.ts` (email adapter).
