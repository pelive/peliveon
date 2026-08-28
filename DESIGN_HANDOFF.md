# Design Improvement Brief — PE LIVE Website

> Handoff prompt for Claude Design. Paste everything below this line into Claude Design (or give it this file) together with access to this repository.

---

## The task

Redesign and visually elevate the marketing website of **PE LIVE** (pelive.be) — a pioneering Black American-style Gospel band based in Ghent, Belgium. The site promotes concerts, sells the band to event bookers, and archives past performances. The current site is functional but visually generic; it should feel like a premium live-music brand: energetic, soulful, and theatrical, while staying fast and accessible.

## Audience and goals

1. **Concertgoers** — find the next show and buy tickets (primary CTA links to ticketsgent.be).
2. **Event bookers / venues** — assess the band's credibility (past performances, partner logos: NTGent, VRT één, VTM, Samsung, UGent, Stad Gent…) and get in touch via the contact form.
3. **Fans** — follow socials (Instagram, Facebook, TikTok, YouTube — all under @peliveon).

Design should push visitors toward two conversions: **"Get Tickets"** and **"Book us / Contact"**.

## Tech and content constraints

- **Stack**: Next.js 16 (App Router, React Server Components), Tailwind CSS v4 (CSS-first config in `src/app/(frontend)/globals.css` with `@theme`), Payload CMS 3 (all copy/images are CMS-driven — design components must accept variable-length text and optional images, never assume fixed copy).
- **Fonts** already loaded via `next/font`: Inter (`--font-sans`), Lexend (`--font-display`), Noto Serif Georgian (`--font-serif`). You may swap these, but keep to `next/font` and update the `@theme` block.
- **Images** go through `next/image` (optimizer enabled; partner logos are SVGs). Any new hero/section imagery must keep `priority`/`sizes` semantics intact.
- **Do not** reintroduce client components for purely presentational sections — Hero, WhoWeAre, CallToAction, FactsAndFigures, UpNext are server components; WhatWeDo (tabs) and Contact (form) are client.
- **Accessibility is non-negotiable**: keep/extend the existing skip link, single `<main id="main-content">` landmark in `src/app/(frontend)/layout.tsx`, focus-visible styles, `aria-expanded` mobile menu, and WCAG AA contrast (several current sections layer white text over photos at 25–45% opacity — verify contrast when restyling).
- Keep the section anchor IDs used by the nav: `#home`, `#about` (WhoWeAre), `#works` (WhatWeDo), `#upcoming` (UpNext), `#contact`.

## Current page structure (homepage, top to bottom)

All in `src/components/sections/`, composed by `src/components/PEHomePage.tsx`:

1. **Hero** — full-viewport background photo, eyebrow ("In Concert"), title with red highlight span, ticket link, row of partner logos. Currently plain centered text; weakest-link typography.
2. **WhoWeAre** (`#about`) — dark section, rich text over a 25%-opacity photo.
3. **WhatWeDo** (`#works`) — Headless UI tab group of services (concerts, workshops, …) with per-tab background image.
4. **CallToAction** — dark section, single button.
5. **FactsAndFigures** (`#facts`) — light section: partner logo wall, artist name list (serif), testimonial/performance cards in 3 columns.
6. **Contact** (`#contact`) — dark form card (posts to `/api/contact`), direct email fallback.
7. **UpNext** (`#upcoming`) — light section: featured event with image + rich text, "More Upcoming Events" cards, "Past Performances" cards. Server-rendered from the `events` collection.

Also: `/contact` page, `/posts` blog index + post pages (uses `prose` typography), `/search`, 404 page. Header is fixed-ish with desktop nav + custom mobile overlay menu; footer has socials + copyright.

## Known design problems to solve (in priority order)

1. **No coherent visual identity** — the sections alternate dark/light with unrelated palettes (slate, zinc, red, blue accents). Define one design system: palette (the brand red `#dc2626`-ish is the only recurring accent), typography scale, spacing rhythm, card/button styles — express it as Tailwind `@theme` tokens.
2. **Hero lacks impact** — for a live-music act the hero should carry motion/energy (photography treatment, scale contrast in type, a clear ticket CTA button rather than a text link with a 🔗 emoji). Remove emoji-as-icon patterns throughout (🔗 appears in Hero and UpNext).
3. **Event cards are generic white cards** — UpNext is the money section; upcoming events deserve poster-like treatment (date prominence, venue, ticket CTA). `hover:scale-105` on cards feels dated; prefer subtle elevation/color transitions and respect `prefers-reduced-motion`.
4. **Section transitions are abrupt** — dark/light slabs with no rhythm. Consider a consistent dark theatrical base with light "program" sections, or ordered light→dark narrative.
5. **Testimonial cards (FactsAndFigures)** mix a giant quote SVG, tiny images with odd crops, and blue link text that clashes with the brand red.
6. **Forms** — the Contact form is serviceable but visually heavy (12-unit padding, glassmorphism card); align it with the final design system, keep all existing a11y attributes and states (error, success, sending).
7. **Header/footer** — the header floats transparently over the hero only by accident of absolute positioning; design a deliberate sticky/transparent-to-solid behavior. Footer is bare; add nav echo + social + booking email.
8. **Blog/posts pages** inherit Payload template styling — bring them into the brand (prose theme colors, post hero treatment).

## What NOT to change

- Information architecture, URLs, section anchor IDs, CMS field shapes (design must render from existing Payload data).
- The SEO/metadata layer, structured data, sitemap and caching just implemented.
- The contact API contract (`POST /api/contact` with the form's field names).

## Deliverable

Redesigned section components + updated `@theme` design tokens in `globals.css`, applied consistently across homepage sections, header/footer, contact page, and posts pages. Validate with `npx tsc --noEmit`, `npm run lint`, and `npm run build` before finishing.
