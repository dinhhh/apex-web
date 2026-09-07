export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  readMinutes: number;
  tag: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "how-often-should-you-detail-your-car-in-sydney",
    title: "How often should you detail your car in Sydney?",
    excerpt:
      "Coastal salt air, tree sap and harsh UV all shorten the life of your paint and interior. Here's a realistic maintenance schedule for Sydney conditions.",
    date: "2026-08-18",
    readMinutes: 5,
    tag: "Maintenance",
  },
  {
    slug: "pre-sale-detailing-what-adds-resale-value",
    title: "Pre-sale detailing: what actually adds resale value",
    excerpt:
      "Not every detailing step moves the needle on sale price. We break down where the money is best spent before you list your car.",
    date: "2026-07-30",
    readMinutes: 6,
    tag: "Pre-Sale",
  },
  {
    slug: "interior-steam-cleaning-vs-shampoo",
    title: "Interior steam cleaning vs shampoo extraction",
    excerpt:
      "Both have their place. Here's how we decide which method (or combination) a heavily soiled interior needs.",
    date: "2026-07-12",
    readMinutes: 4,
    tag: "Interior",
  },
];
