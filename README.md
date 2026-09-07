# Apex Mobile Car Detailing

Production-ready, mobile-first marketing + booking site for **Apex Mobile Car Detailing**
(Greater Sydney, NSW). Built with Next.js 14 App Router, TypeScript (strict), Tailwind CSS
and Lucide React.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
npm run typecheck
npm run lint
```

## Directory structure

```
apex-web/
├─ public/
│  ├─ data/completed-cars/      # drop gallery images here (auto-discovered)
│  └─ images/og.jpg             # 1200×630 OpenGraph image (add your own)
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx             # root layout: fonts, metadata, Navbar/Footer, JSON-LD
│  │  ├─ page.tsx               # HOME — Hero, Pricing, Booking, Gallery, CTA
│  │  ├─ globals.css            # Tailwind layers + base theme
│  │  ├─ book/page.tsx          # /book — full booking form + pricing
│  │  ├─ contact/page.tsx       # /contact
│  │  ├─ our-story/page.tsx     # /our-story
│  │  ├─ blog/page.tsx          # /blog
│  │  ├─ terms/page.tsx         # /terms (+ #privacy)
│  │  ├─ not-found.tsx
│  │  ├─ robots.ts / sitemap.ts
│  │  └─ api/bookings/route.ts  # POST booking enquiry endpoint (validation + honeypot)
│  ├─ components/
│  │  ├─ layout/                # Navbar.tsx, Footer.tsx
│  │  ├─ sections/              # Hero, TrustBar, PricingSection, BookingSection,
│  │  │                         # BookingForm, GallerySection, FinalCTA
│  │  ├─ ui/                    # Button, Badge, SectionHeading
│  │  └─ StructuredData.tsx     # Schema.org AutoDetailing JSON-LD
│  ├─ lib/                      # site.ts (business config), packages.ts, gallery.ts,
│  │                            # blog.ts, utils.ts
│  └─ types/
│     └─ detailing.ts           # Service / Package / Booking interfaces
├─ tailwind.config.ts
└─ next.config.mjs
```

> Component names in the brief (`components/Navbar.tsx`, `components/PricingSection.tsx`,
> `components/GallerySection.tsx`) map to `components/layout/Navbar.tsx`,
> `components/sections/PricingSection.tsx` and `components/sections/GallerySection.tsx`.

## Configuration

All business details (phone, email, hours, service areas, review count, canonical URL)
live in [`src/lib/site.ts`](src/lib/site.ts). Update the phone number and `url` before
deploying — `tel:` links, JSON-LD, `sitemap.xml` and OpenGraph tags all read from there.

Packages, pricing and add-ons: [`src/lib/packages.ts`](src/lib/packages.ts).

## Gallery

Images placed in `public/data/completed-cars/` (`.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`)
are discovered by `src/lib/gallery.ts`, optimised via `next/image`, shown in a responsive
grid with hover-zoom, and captioned from the filename. The home page is statically
generated, so run `npm run build` after adding images (or set
`export const dynamic = "force-dynamic"` in `src/app/page.tsx` for on-demand rendering).

## Booking API

`POST /api/bookings` accepts a `BookingRequest` JSON body, validates it server-side,
rejects spam via a honeypot field, and returns a `BookingResponse` with a reference code.
Wire up email/CRM delivery where marked with `TODO` in
[`src/app/api/bookings/route.ts`](src/app/api/bookings/route.ts).

## Accessibility & SEO

- Semantic HTML5 landmarks, skip link, focus-visible rings, `aria-*` on the mobile drawer,
  `prefers-reduced-motion` handling.
- Per-route `metadata`, canonical URLs, full OpenGraph + Twitter cards, `robots.ts`,
  `sitemap.ts`, and Schema.org `AutoDetailing` structured data targeting Sydney.
