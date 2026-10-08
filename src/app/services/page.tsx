import type { Metadata } from "next";
import { PricingSection } from "@/components/sections/PricingSection";
import { CeramicCoatingSection } from "@/components/sections/CeramicCoatingSection";
import { CutPolishSection } from "@/components/sections/CutPolishSection";

export const metadata: Metadata = {
  title: "Services & Pricing",
  description:
    "Mobile car detailing packages across Greater Sydney — Deluxe, Luxury, Pre-Sale, Deep Interior Clean, Ceramic Coating and Cut & Polish. Transparent from-pricing and full feature checklists.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PricingSection />
      <CutPolishSection />
      <CeramicCoatingSection />
    </>
  );
}
