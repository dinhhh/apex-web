/** Central business configuration. Update phone / URLs here only. */

export const site = {
  name: "Apex Mobile Car Detailing",
  shortName: "Apex Detailing",
  description:
    "Professional on-site car detailing across Greater Sydney. Fully mobile, automotive-grade results at your home or office. 50+ verified 5-star reviews on Google & Airtasker.",
  url: "https://apexcardetailing.au",
  // E.164 for tel: links, plus a display format.
  phone: "+614180117707",
  phoneDisplay: "0480 117 707",
  phoneName: "Harry",
  phone1: "+614180117707",
  phoneDisplay1: "0481 573 929",
  phoneName1: "Dinh",
  email: "apexcardetailing.info@gmail.com",
  region: "Sydney, NSW, Australia",
  hours: [
    { day: "Monday – Friday", time: "9:00 AM – 6:00 PM" },
    { day: "Saturday", time: "7:00 AM – 5:00 PM" },
    { day: "Sunday", time: "By appointment" },
  ],
  serviceAreas: [
    "Sydney CBD",
    "Eastern Suburbs",
    "Inner West",
    "North Shore",
    "Northern Beaches",
    "Hills District",
    "Parramatta & Greater West",
    "Sutherland Shire",
    "Canterbury-Bankstown",
    "Ryde & Macquarie Park",
  ],
  socials: {
    google: "https://maps.google.com/?q=Apex+Mobile+Car+Detailing+Sydney",
    airtasker: "https://www.airtasker.com",
    instagram: "https://www.instagram.com",
  },
  reviews: {
    count: 50,
    rating: 5,
    label: "50+ 5-Star Reviews on Google & Airtasker",
  },
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/book", label: "Book" },
  { href: "/contact", label: "Contact Us" },
  { href: "/our-story", label: "Our Story" },
  { href: "/blog", label: "Blogs" },
  { href: "/terms", label: "Terms & Conditions" },
] as const;
