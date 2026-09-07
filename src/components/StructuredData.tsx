import { packages, priceLabel } from "@/lib/packages";
import { site } from "@/lib/site";

/**
 * Schema.org AutoDetailing structured data targeting Sydney, Australia.
 * Rendered once in the root layout.
 */
export function StructuredData() {
  const json = {
    "@context": "https://schema.org",
    "@type": "AutoDetailing",
    "@id": `${site.url}/#business`,
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    priceRange: "$$",
    image: `${site.url}/images/og.jpg`,
    currenciesAccepted: "AUD",
    paymentAccepted: "Cash, Card, Bank Transfer",
    address: {
      "@type": "PostalAddress",
      addressRegion: "NSW",
      addressCountry: "AU",
      addressLocality: "Sydney",
    },
    areaServed: site.serviceAreas.map((name) => ({
      "@type": "City",
      name,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Greater Sydney, NSW, Australia",
      },
    })),
    geo: {
      "@type": "GeoCoordinates",
      latitude: -33.8688,
      longitude: 151.2093,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "07:00",
        closes: "17:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.reviews.rating,
      reviewCount: site.reviews.count,
      bestRating: 5,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Mobile Car Detailing Packages",
      itemListElement: packages.map((pkg) => ({
        "@type": "Offer",
        name: pkg.name,
        description: pkg.tagline,
        ...(pkg.price.kind === "from"
          ? {
              price: pkg.price.amount,
              priceCurrency: "AUD",
              priceSpecification: {
                "@type": "PriceSpecification",
                price: pkg.price.amount,
                priceCurrency: "AUD",
                valueAddedTaxIncluded: true,
                description: priceLabel(pkg),
              },
            }
          : { description: "Custom pricing — quoted on inspection" }),
        itemOffered: {
          "@type": "Service",
          name: pkg.name,
          serviceType: "Mobile car detailing",
          areaServed: "Greater Sydney, NSW, Australia",
        },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      // Structured data is static and trusted — safe to inline.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
