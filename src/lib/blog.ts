import { site } from "@/lib/site";

export interface BlogSection {
  /** Rendered as an <h2> inside the article. */
  heading: string;
  /** Body paragraphs for the section. */
  paragraphs?: string[];
  /** Optional unordered list rendered after the paragraphs. */
  bullets?: string[];
}

export interface BlogFaq {
  question: string;
  answer: string;
}

export interface BlogPost {
  slug: string;
  /** Card + in-page <h1>. */
  title: string;
  /** <title> tag — front-loaded with the primary keyword, ~60 chars. */
  metaTitle: string;
  /** Meta description — ~155 chars, includes primary keyword + a hook. */
  metaDescription: string;
  /** Card teaser. */
  excerpt: string;
  /** Target keywords for this article. */
  keywords: string[];
  /** ISO publish date. */
  date: string;
  /** ISO last-updated date. */
  updated: string;
  readMinutes: number;
  tag: string;
  author: string;
  /** Lead paragraphs shown above the first heading. */
  intro: string[];
  /** Scannable summary box near the top of the article. */
  keyTakeaways: string[];
  sections: BlogSection[];
  /** Rendered as an FAQ block + FAQPage structured data. */
  faqs: BlogFaq[];
  /** Slugs of related posts shown at the foot of the article. */
  related: string[];
}

const AUTHOR = `The ${site.name} Team`;

export const blogPosts: BlogPost[] = [
  {
    slug: "how-often-should-you-detail-your-car-in-sydney",
    title: "How Often Should You Detail Your Car in Sydney?",
    metaTitle: "How Often Should You Detail Your Car in Sydney? (2026 Guide)",
    metaDescription:
      "A realistic car detailing schedule for Sydney conditions — how coastal salt air, UV, tree sap and pollen affect your paint, and how often to book a mobile detail.",
    excerpt:
      "Coastal salt air, tree sap and harsh UV all shorten the life of your paint and interior. Here's a realistic maintenance schedule for Sydney conditions.",
    keywords: [
      "how often should you detail your car",
      "car detailing frequency Sydney",
      "mobile car detailing Sydney",
      "car detailing schedule",
      "how often to detail car Australia",
    ],
    date: "2026-08-18",
    updated: "2026-09-01",
    readMinutes: 7,
    tag: "Maintenance",
    author: AUTHOR,
    intro: [
      "“How often should I detail my car?” is the question we're asked most by Sydney drivers, and the honest answer is: it depends on where you park, how far you drive, and what the local environment throws at your paint.",
      "A car garaged in the Inner West and driven on weekends has very different needs to a ute parked under a fig tree in the Eastern Suburbs or a family SUV that lives near the beach at Cronulla. This guide breaks down a practical detailing schedule for real Sydney conditions — what to do weekly, what to book seasonally, and the environmental factors that quietly age your car between washes.",
    ],
    keyTakeaways: [
      "Most Sydney cars benefit from a full professional detail every 3–4 months, plus light maintenance washing in between.",
      "Cars parked outside near the coast or under trees should move to an 8–10 week cycle.",
      "Bird droppings, tree sap and industrial fallout need to be removed within days — not at your next wash — to avoid permanent etching.",
      "A protective coating (wax, sealant or ceramic) is what makes a longer interval safe; without it, contamination bonds directly to bare paint.",
    ],
    sections: [
      {
        heading: "The short answer: a full detail every 3–4 months",
        paragraphs: [
          "For a typical Sydney vehicle — driven daily, parked partly undercover, in reasonable condition — a full interior and exterior detail every three to four months keeps the paint protected and the cabin healthy. That's roughly three to four professional details a year.",
          "Between those appointments, a fortnightly maintenance wash (a proper two-bucket or pH-neutral foam wash, not a drive-through) removes the day-to-day grime before it has a chance to bond. The professional detail then resets everything: decontaminating the paint, topping up protection, and deep-cleaning the areas a quick wash never reaches.",
        ],
      },
      {
        heading: "Why Sydney is hard on cars",
        paragraphs: [
          "Sydney's climate and tree cover create a specific set of paint and interior stressors. Understanding them tells you how far you can safely stretch the interval for your car.",
        ],
        bullets: [
          "Coastal salt air: suburbs from Manly to Cronulla carry airborne salt that accelerates corrosion on unprotected metal and dulls paint. Cars within a few kilometres of the water need more frequent decontamination.",
          "Intense UV: Australian sun fades paint, cracks unprotected dashboards and hardens rubber trim faster than in most of the world. UV protection on interior plastics and a fresh coat of wax or sealant outside are not optional here.",
          "Tree sap and fig fruit: mature fig, jacaranda and eucalyptus trees across the Inner West and Eastern Suburbs drop sap and fruit that etches clear coat within days in warm weather.",
          "Bird droppings: acidic and fast-acting, especially in summer — left for a week on a hot panel, they leave a permanent outline even after polishing.",
          "Pollen and bushfire ash: spring pollen and summer smoke haze settle into paint and cabin air filters, and are a common trigger for hay-fever sufferers who spend time in the car.",
          "Industrial fallout: cars parked near rail corridors, flight paths or major roads pick up iron particles that rust into the clear coat and make paint feel gritty.",
        ],
      },
      {
        heading: "A detailing schedule based on how you park",
        paragraphs: [
          "Where your car sits for 20+ hours a day matters more than how you drive it. Match your situation to the closest profile below.",
        ],
        bullets: [
          "Garaged, low kilometres: full detail every 4–6 months. Maintenance wash monthly. A yearly wax or sealant is usually enough.",
          "Carport or driveway, suburban street: full detail every 3–4 months. Fortnightly wash. Sealant refreshed twice a year.",
          "Parked on the street near trees or the coast: full detail every 8–10 weeks. Weekly rinse or wash. Consider a ceramic coating to make this interval sustainable.",
          "Work vehicle / rideshare / high kilometres: exterior maintenance fortnightly, full interior detail every 6–8 weeks, full exterior decontamination quarterly.",
          "Weekend or classic car: detail before and after storage, and every 3 months while in use — moisture and dust still accumulate even when the car isn't driven.",
        ],
      },
      {
        heading: "Seasonal jobs worth booking",
        paragraphs: [
          "Some tasks line up naturally with Sydney's seasons rather than a fixed month count.",
        ],
        bullets: [
          "Spring: paint decontamination and a fresh coat of protection before the UV peak; cabin filter replacement and an interior sanitise ahead of pollen season.",
          "Summer: more frequent washing to stay ahead of sap, salt and bird droppings; check that interior UV protection is holding up.",
          "Autumn: a thorough leaf and debris clear-out of door channels, sunroof drains and the plenum under the windscreen to prevent blocked drains and musty smells.",
          "Winter: interior focus — carpets and mats trap more moisture and mud, and shorter days mean less natural drying, which is how cabins start to smell.",
        ],
      },
      {
        heading: "What a professional detail does that a wash can't",
        paragraphs: [
          "A maintenance wash keeps a well-protected car looking tidy. A professional detail is what maintains the protection and reaches the 20% of the car that causes 80% of long-term problems: door jambs, seat rails, boot seals, headliner, air vents, wheel barrels and the lower quarter panels where salt and grime collect.",
          "It also includes decontamination — clay bar or chemical treatment to pull bonded iron, sap and overspray out of the clear coat — which is the step that actually determines how long your next coat of protection lasts.",
        ],
      },
      {
        heading: "How a mobile detail fits your schedule",
        paragraphs: [
          "The main reason people fall behind on detailing is logistics: dropping a car at a shop and arranging a lift back is a half-day commitment. A mobile service removes that friction — we come to your home or workplace anywhere in Greater Sydney, so a quarterly detail becomes something that happens while you work rather than something you keep postponing.",
          "If you're not sure where your car sits on the schedule above, book a Luxury detail and we'll assess the paint and interior condition on the day and recommend a realistic interval for your situation.",
        ],
      },
    ],
    faqs: [
      {
        question: "How often should you detail your car in Sydney?",
        answer:
          "Most Sydney cars need a full professional detail every 3–4 months, with a maintenance wash every 1–2 weeks in between. Cars parked outside near the coast or under trees should move to an 8–10 week detailing cycle.",
      },
      {
        question: "Is it bad to not wash your car for months?",
        answer:
          "Yes. Contaminants like bird droppings, tree sap, salt and industrial fallout bond to the clear coat and etch or stain it permanently. Regular washing removes them before they cause damage, and a protective coating buys you more time between washes.",
      },
      {
        question: "How often should I wax or ceramic coat my car?",
        answer:
          "A carnauba wax lasts around 6–8 weeks, a synthetic sealant around 4–6 months, and a professional ceramic coating several years. In Sydney's UV and coastal conditions, the shorter end of those ranges is realistic.",
      },
      {
        question: "Does a mobile detailer do as good a job as a shop?",
        answer:
          "Yes — a professional mobile setup carries the same polishers, extractors, steam and chemicals as a fixed studio, with the added convenience of detailing your car at your home or office.",
      },
    ],
    related: [
      "pre-sale-detailing-what-adds-resale-value",
      "interior-steam-cleaning-vs-shampoo",
    ],
  },
  {
    slug: "pre-sale-detailing-what-adds-resale-value",
    title: "Pre-Sale Car Detailing: What Actually Adds Resale Value",
    metaTitle: "Pre-Sale Car Detailing: What Adds Resale Value (Sydney)",
    metaDescription:
      "Not every detailing step raises your sale price. A Sydney detailer breaks down where pre-sale detailing money is best spent to sell your car faster and for more.",
    excerpt:
      "Not every detailing step moves the needle on sale price. We break down where the money is best spent before you list your car.",
    keywords: [
      "pre-sale car detailing",
      "car detailing before selling",
      "increase car resale value",
      "pre-sale detailing Sydney",
      "how to sell my car for more",
    ],
    date: "2026-07-30",
    updated: "2026-08-28",
    readMinutes: 8,
    tag: "Pre-Sale",
    author: AUTHOR,
    intro: [
      "A clean car sells faster and for more — that part isn't controversial. What's less obvious is that some detailing steps deliver a strong return before a sale while others cost real money and barely register with buyers.",
      "After preparing hundreds of vehicles for private sale, dealer trade-in and auction across Sydney, we've got a clear picture of what buyers actually respond to. Here's where to spend your pre-sale detailing budget, and where not to bother.",
    ],
    keyTakeaways: [
      "First impressions are decided in the first 30 seconds: a straight, glossy exterior and a clean, odour-free cabin do most of the work.",
      "Removing smells (smoke, pets, damp) has one of the highest returns of any pre-sale job — a bad smell ends inspections instantly.",
      "Light paint correction to remove swirls and haze lifts perceived value more than its cost; full multi-stage correction usually doesn't pay back before a sale.",
      "Photos sell the car online before anyone sees it — detail first, photograph in good light, then list.",
    ],
    sections: [
      {
        heading: "Why buyers pay more for a detailed car",
        paragraphs: [
          "Private buyers can't assess an engine or gearbox with confidence, so they judge condition by proxy: paint, interior, wheels, engine bay and smell. A car that presents as cared-for signals that the mechanical side was probably looked after too, which reduces the buyer's perceived risk — and that's what they're paying a premium to avoid.",
          "This is why a $250–$450 pre-sale detail routinely returns many times its cost on a $15,000–$40,000 car, and often makes the difference between a quick sale and a listing that goes stale.",
        ],
      },
      {
        heading: "High return: spend here first",
        bullets: [
          "Odour removal: smoke, pet, food and damp smells are deal-breakers. Steam, extraction, a cabin filter change and an ozone treatment reset the cabin. Nothing else you do matters if the car smells.",
          "Full interior deep clean: shampooed and extracted carpets and seats, cleaned and conditioned plastics, spotless glass, detailed vents and console. Buyers sit in the car and make up their mind there.",
          "Exterior wash, decontamination and single-stage polish: removing swirl marks, water spots and oxidation restores gloss and depth. This is the single biggest visual lift for the money.",
          "Wheels, tyres and arches: clean barrels, dressed tyres and clean arches make a car look mechanically tidy and well-maintained.",
          "Engine bay detail: a clean (not wet-look drenched) engine bay reassures buyers there are no leaks being hidden and signals a fastidious owner.",
          "Headlight restoration: cloudy, yellowed headlights make a car look older and tired, and they're cheap to polish clear.",
        ],
      },
      {
        heading: "Low return: usually skip before a sale",
        bullets: [
          "Multi-stage machine paint correction: expensive and time-consuming; buyers rarely pay extra for flawless paint versus simply clean, glossy paint.",
          "Ceramic coating: a genuine long-term benefit for a car you're keeping, but most buyers won't pay a premium that covers its cost, and any remaining warranty rarely transfers cleanly.",
          "Paint protection film: same logic — great for an owner, poor economics as a pre-sale spend.",
          "Cosmetic mechanical tidy-ups beyond a clean engine bay: replacing worn badges or trim can be worth it; painting the calipers or dressing every hose is effort buyers don't reward.",
        ],
      },
      {
        heading: "Fix vs disclose: small imperfections",
        paragraphs: [
          "Detailing makes flaws more visible, not less — which is a good thing. A clean panel shows a car park ding clearly, and it's better that both you and the buyer see it than for it to surface during a test drive and undermine trust.",
          "Worth fixing before listing: bumper scuffs, kerbed alloys, small stone chips on the bonnet, a cracked or heavily hazed windscreen, and any warning light. These are cheap relative to the price haircut a buyer applies when they spot them. Larger dents and panel damage are usually better disclosed and priced in than hidden.",
        ],
      },
      {
        heading: "The photos are the real product",
        paragraphs: [
          "On Carsales, Marketplace and Gumtree, your listing photos do the selling before anyone contacts you. A detailed car photographed well gets more enquiries, better offers and less haggling.",
          "Detail the car first. Then shoot it in soft light — early morning or late afternoon, or open shade at midday — against a plain background, with clean glass and dressed tyres. Include the boot, engine bay, wheels, tyre tread, service book and any extras. Clean, honest, well-lit photos out-perform a dirty car with a low price.",
        ],
      },
      {
        heading: "A sensible pre-sale plan",
        paragraphs: [
          "For most private sellers in Sydney, the sweet spot is a pre-sale detail that covers: exterior wash and decontamination, a single-stage polish, wheels and arches, engine bay, a full interior deep clean and extraction, odour treatment, glass and headlight restoration. That package addresses everything buyers actually judge, without paying for correction work that won't come back to you.",
          "Book it for a day or two before your photo session and first inspections, so the car is at its peak when it matters. We can come to you anywhere in Greater Sydney and have the car ready to list the same day.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does detailing a car before selling it increase the value?",
        answer:
          "Yes. A professional pre-sale detail typically returns several times its cost by increasing buyer confidence, generating more enquiries and reducing haggling. The largest gains come from odour removal, a full interior deep clean and restoring exterior gloss.",
      },
      {
        question: "Should I get paint correction before selling my car?",
        answer:
          "A light single-stage polish to remove swirls and haze is worth it. Full multi-stage paint correction is usually not — buyers pay for paint that looks clean and glossy, not for a flawless finish, so the extra cost rarely comes back.",
      },
      {
        question: "Is it worth ceramic coating a car before selling?",
        answer:
          "Generally no. Ceramic coating is a strong investment for a car you're keeping, but most buyers won't pay a premium that covers its cost, and warranties rarely transfer. Spend the budget on a deep clean and single-stage polish instead.",
      },
      {
        question: "How much does pre-sale car detailing cost in Sydney?",
        answer:
          "A comprehensive pre-sale detail in Sydney typically starts from around $250 and varies with the size and condition of the vehicle. It covers exterior decontamination and polish, wheels, engine bay, a full interior deep clean and odour treatment.",
      },
    ],
    related: [
      "how-often-should-you-detail-your-car-in-sydney",
      "interior-steam-cleaning-vs-shampoo",
    ],
  },
  {
    slug: "interior-steam-cleaning-vs-shampoo",
    title: "Interior Steam Cleaning vs Shampoo Extraction",
    metaTitle: "Car Interior Steam Cleaning vs Shampoo Extraction Explained",
    metaDescription:
      "Steam cleaning or shampoo extraction for your car interior? A Sydney detailer explains how each method works, what it's best for, and when to combine both.",
    excerpt:
      "Both have their place. Here's how we decide which method (or combination) a heavily soiled interior needs.",
    keywords: [
      "car interior steam cleaning",
      "shampoo extraction car",
      "steam cleaning vs shampoo",
      "deep interior car clean Sydney",
      "car upholstery cleaning",
    ],
    date: "2026-07-12",
    updated: "2026-08-20",
    readMinutes: 7,
    tag: "Interior",
    author: AUTHOR,
    intro: [
      "Steam cleaning and shampoo (hot water) extraction are the two workhorses of interior detailing, and detailers often have strong opinions about which is “better.” In practice, they solve different problems, and the best result on a heavily soiled interior almost always uses both.",
      "Here's how each method actually works, what it's genuinely good at, where it falls short, and how we decide which to reach for on a given car.",
    ],
    keyTakeaways: [
      "Steam uses heat and very little moisture — ideal for sanitising, lifting grease and cleaning tight areas without soaking the car.",
      "Shampoo extraction flushes dissolved dirt out of carpet and cloth with hot water and suction — the only way to truly rinse deep soiling and stains.",
      "Over-wetting is the main risk with extraction; it causes long dry times, wicking stains and musty smells if not managed properly.",
      "A deep interior clean typically pre-treats, agitates, steams the detailed areas and extracts the large soft surfaces — not one method or the other.",
    ],
    sections: [
      {
        heading: "How steam cleaning works",
        paragraphs: [
          "A detailing steamer heats water to produce low-moisture vapour at 120–160°C. That heat softens and emulsifies grease, sugar, body oils and grime, while the low water content means surfaces dry in minutes rather than hours.",
          "Steam is excellent for sanitising — the temperature kills most bacteria, dust mites and mould on contact — and for reaching places a machine can't: seat stitching, seat rails, vents, switchgear, cup holders, seat-belt webbing and the gaps around the console.",
        ],
        bullets: [
          "Best for: sanitising, disinfecting and deodorising; grease and grime on hard surfaces; edges, seams, vents and tight trim; light spot-cleaning of upholstery; leather seams (used carefully and briefly).",
          "Limitations: it loosens soiling but doesn't remove it — you still need to wipe or extract it away; it's slow over large areas; excessive dwell time can damage delicate trim, adhesives or leather.",
        ],
      },
      {
        heading: "How shampoo (hot water) extraction works",
        paragraphs: [
          "An extractor sprays a heated cleaning solution into carpet or cloth under pressure, then immediately vacuums the dirty solution back out. The liquid is the vehicle: it dissolves and suspends soiling deep in the fibres and the foam backing, and the suction pulls that dirt out of the car entirely.",
          "This is the only method that genuinely rinses a carpet. For ingrained mud, drink spills, food, pet accidents, salt and general built-up grime in floor carpets and cloth seats, extraction is what actually gets it clean rather than just moving it around.",
        ],
        bullets: [
          "Best for: heavily soiled carpets and floor mats; cloth seat cleaning; drink, food and biological spills; salt and mud; removing previously over-applied cleaning product.",
          "Limitations: adds moisture, so drying and airflow must be managed; poor technique causes wicking (stains rising back as it dries) and musty odours; not suitable for leather, and awkward on vertical or tight areas.",
        ],
      },
      {
        heading: "The over-wetting problem",
        paragraphs: [
          "Most bad interior-cleaning outcomes — the ones that smell musty a week later or where a stain reappears — come from too much water and not enough recovery. Water gets into the foam layer under the carpet and the seat foam, then evaporates slowly, carrying dissolved soiling back to the surface and feeding mould.",
          "Managing this is a technique issue: pre-vacuum thoroughly, pre-treat and agitate so chemistry does the work instead of water volume, make dry-suction passes, and finish with forced airflow and heat. Done properly, a fully extracted interior in Sydney is dry within a few hours; done poorly it's a problem for weeks.",
        ],
      },
      {
        heading: "How we choose on a real car",
        paragraphs: [
          "We assess the interior by surface and by how deep the soiling goes, then match the method:",
        ],
        bullets: [
          "Lightly soiled, well-maintained interior: vacuum, steam the detail areas, wipe down, condition. No extraction needed.",
          "Moderate soiling, some stains: pre-treat and agitate the carpets and seats, steam the console, vents and seams, then spot-extract the affected areas only.",
          "Heavy soiling, odour, biological contamination: full pre-treatment, mechanical agitation with a brush, steam for sanitising and edges, then full hot-water extraction of all carpets and cloth seats, followed by managed drying and often an ozone treatment.",
          "Leather interior: steam and dedicated leather cleaner with light agitation, then condition — never extraction.",
        ],
      },
      {
        heading: "The takeaway",
        paragraphs: [
          "Steam versus shampoo is the wrong framing. Steam is a precision tool for sanitising and detail work with minimal moisture; extraction is the heavy-lifting tool for genuinely rinsing soft surfaces. A proper deep interior clean uses each where it's strongest.",
          "If your car has a smell you can't shift, visible carpet or seat staining, or it's been through a rough patch with kids, pets or tradie use, that's a job for a full deep interior clean — pre-treatment, agitation, steam and commercial-grade heated extraction together. We can do it at your home or office anywhere in Greater Sydney.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is steam cleaning or shampooing better for a car interior?",
        answer:
          "Neither is universally better — they do different jobs. Steam is best for sanitising, deodorising and cleaning tight detail areas with very little moisture. Shampoo (hot water) extraction is best for genuinely rinsing deep soiling and stains out of carpets and cloth seats. A thorough deep clean uses both.",
      },
      {
        question: "Does car interior steam cleaning remove stains?",
        answer:
          "Steam lifts and loosens many stains, especially grease and sugar-based marks, but it doesn't remove the soiling from the car — you still need to wipe or extract it away. Set-in stains in carpet and cloth usually need pre-treatment plus hot water extraction.",
      },
      {
        question: "How long does a car interior take to dry after shampooing?",
        answer:
          "With proper technique — thorough pre-vacuuming, controlled moisture, dry-suction passes and forced airflow — a car interior in Sydney is typically touch-dry within a few hours and fully dry within a day. Over-wetting can extend this to several days and cause musty odours.",
      },
      {
        question: "Can you steam clean leather car seats?",
        answer:
          "Yes, carefully. Brief steam with a dedicated leather cleaner and light agitation is safe and effective, followed by a conditioner. Leather should never be shampoo-extracted, as saturating it can cause cracking and shrinkage.",
      },
    ],
    related: [
      "how-often-should-you-detail-your-car-in-sydney",
      "pre-sale-detailing-what-adds-resale-value",
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
