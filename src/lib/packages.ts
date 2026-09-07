import type { AddOn, DetailingPackage } from "@/types/detailing";

export const packages: DetailingPackage[] = [
  {
    id: "deluxe",
    name: "Deluxe Package",
    tagline: "A thorough interior + exterior reset for regularly maintained cars.",
    price: { kind: "from", amount: 90, currency: "AUD" },
    durationHours: [1, 1.5],
    highlights: [
      "Basic interior vacuum & pet hair removal",
      "pH-neutral snow foam & hand wash",
      "Wheels, tyres & arches detailed",
    ],
    features: [
      { group: "interior", label: "Basic vacuum (seats, carpets, boot)" },
      { group: "interior", label: "Pet hair removal" },
      { group: "interior", label: "Carpet basic cleaning" },
      { group: "interior", label: "Console & glove box detailing" },
      { group: "interior", label: "Streak-free interior window cleaning" },
      { group: "interior", label: "Door panel cleaning" },
      { group: "exterior", label: "Safe pH-neutral snow foam & hand wash" },
      { group: "exterior", label: "Wheels, tyres & wheel arches cleaned" },
      { group: "exterior", label: "Door jambs cleaned" },
      { group: "exterior", label: "Scratch-safe microfiber drying" },
    ],
  },
  {
    id: "luxury",
    name: "Luxury Package",
    tagline: "Everything in Deluxe plus protection, conditioning & sanitisation.",
    price: { kind: "from", amount: 150, currency: "AUD" },
    durationHours: [1.5, 2],
    badge: "Most Popular",
    featured: true,
    highlights: [
      "All Deluxe features included",
      "Leather & plastic conditioning with UV protection",
      "High-gloss protective wax + premium tyre dressing",
    ],
    features: [
      { group: "process", label: "All Deluxe interior & exterior features" },
      { group: "interior", label: "Leather & plastic conditioning (UV protection)" },
      { group: "interior", label: "Car pet stain treatment" },
      { group: "interior", label: "Steam sanitisation of high-touch surfaces" },
      { group: "interior", label: "Dedicated leather clean & care" },
      { group: "exterior", label: "Premium tyre dressing" },
      { group: "exterior", label: "High-gloss protective wax application" },
      { group: "exterior", label: "Wax application" },
    ],
  },
  {
    id: "pre-sale",
    name: "Pre-Sale Detailing",
    tagline: "Showroom-ready presentation to maximise your sale price.",
    price: { kind: "from", amount: 250, currency: "AUD" },
    durationHours: [4, 6],
    badge: "Best Value on Resale",
    highlights: [
      "All Luxury features included",
      "Clay bar paint decontamination",
      "Single-stage machine polish to remove swirls",
    ],
    features: [
      { group: "process", label: "All Luxury interior & exterior features" },
      { group: "interior", label: "Short ozone odour treatment", optional: true },
      { group: "exterior", label: "Clay bar paint decontamination" },
      { group: "exterior", label: "Engine bay detail", optional: true },
      { group: "exterior", label: "Wash bay clean" },
      { group: "exterior", label: "Minor scratch removal" },
      { group: "exterior", label: "Single-stage machine swirl polish" },
    ],
  },
  {
    id: "deep-interior",
    name: "Deep Interior Specialty Clean",
    tagline: "For heavily soiled interiors & fabric upholstery. Add-on or standalone.",
    price: { kind: "custom", note: "Custom pricing — quoted on inspection" },
    highlights: [
      "3-step extraction cleaning system",
      "Headliner / roof lining stain removal",
      "Persistent stain breakdown + optional ozone",
    ],
    features: [
      { group: "process", label: "Step 1 — Shampoo spray pre-treatment" },
      { group: "process", label: "Step 2 — Mechanical agitating brush" },
      { group: "process", label: "Step 3 — Commercial-grade heated steam extraction" },
      { group: "interior", label: "Headliner / roof lining stain removal" },
      { group: "interior", label: "Persistent stain breakdown" },
      { group: "interior", label: "Ozone sanitisation", optional: true },
    ],
  },
  {
    id: "ceramic-coating",
    name: "Ceramic Coating",
    tagline:
      "Long-term nano-ceramic paint protection with a 5-year written guarantee. Final price depends on your car's current condition.",
    price: { kind: "from", amount: 850, currency: "AUD" },
    durationHours: [6, 10],
    guaranteeYears: 5,
    badge: "5-Year Guarantee",
    highlights: [
      "Semi-permanent SiO₂ nano-ceramic coating that chemically bonds to the clear coat",
      "Deep, glass-like gloss with strong hydrophobic (water-beading) self-cleaning behaviour",
      "Guards against UV fade, oxidation, bird droppings, tree sap, road grime and light wash marring",
    ],
    features: [
      { group: "process", label: "Full exterior decontamination wash (snow foam, iron fallout, clay bar)" },
      { group: "process", label: "Paint inspection & measurement; condition assessed for final quote" },
      { group: "process", label: "Single-stage machine polish to remove swirls & correct gloss", optional: true },
      { group: "process", label: "Panel wipe-down to remove all polishing oils" },
      { group: "exterior", label: "Professional-grade SiO₂ ceramic coating applied to all painted panels" },
      { group: "exterior", label: "Coating layered, levelled and IR/heat cured" },
      { group: "exterior", label: "Ceramic coating for wheels & glass", optional: true },
      { group: "exterior", label: "Trim & plastic ceramic-coated for UV protection" },
      { group: "process", label: "5-year written guarantee + aftercare kit and instructions" },
    ],
  },
];

export const addOns: AddOn[] = [
  {
    id: "engine-bay",
    name: "Engine Bay Detail",
    description: "Degrease, agitate and dress the engine bay for a clean, presentable finish.",
    price: { kind: "from", amount: 40, currency: "AUD" },
  },
  {
    id: "ozone",
    name: "Ozone Odour Treatment",
    description: "Short ozone shock treatment to neutralise smoke, pet and mildew odours.",
    price: { kind: "from", amount: 35, currency: "AUD" },
  },
  {
    id: "headliner",
    name: "Headliner Stain Removal",
    description: "Targeted low-moisture cleaning of the roof lining to lift marks and stains.",
    price: { kind: "from", amount: 30, currency: "AUD" },
  },
  {
    id: "pet-hair",
    name: "Heavy Pet Hair Removal",
    description: "Extra time and tooling for vehicles with significant embedded pet hair.",
    price: { kind: "from", amount: 25, currency: "AUD" },
  },
];

/** The four standard detailing tiers shown in the pricing grid. */
export const corePackages: DetailingPackage[] = packages.filter(
  (p) => p.id !== "ceramic-coating",
);

/** Ceramic coating is presented in its own dedicated section. */
export const ceramicCoating: DetailingPackage = packages.find(
  (p) => p.id === "ceramic-coating",
)!;

export function priceLabel(pkg: DetailingPackage): string {
  return pkg.price.kind === "from"
    ? `From $${pkg.price.amount}`
    : "Custom pricing";
}

export function getPackage(id: string): DetailingPackage | undefined {
  return packages.find((p) => p.id === id);
}
