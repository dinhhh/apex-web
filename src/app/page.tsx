import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { PricingSection } from "@/components/sections/PricingSection";
import { CeramicCoatingSection } from "@/components/sections/CeramicCoatingSection";
import { BookingSection } from "@/components/sections/BookingSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mobile Car Detailing Across Greater Sydney",
  description: site.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <PricingSection />
      <CeramicCoatingSection />
      <BookingSection />
      <GallerySection />
      <FinalCTA />
    </>
  );
}
