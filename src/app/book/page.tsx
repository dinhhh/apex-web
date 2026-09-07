import type { Metadata } from "next";
import { Suspense } from "react";
import { PricingSection } from "@/components/sections/PricingSection";
import { CeramicCoatingSection } from "@/components/sections/CeramicCoatingSection";
import { BookingForm } from "@/components/sections/BookingForm";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Book a Mobile Detail",
  description:
    "Request an on-site car detailing appointment anywhere in Greater Sydney. Choose your package, add-ons, suburb and preferred time.",
  alternates: { canonical: "/book" },
};

export default function BookPage() {
  return (
    <>
      <section className="border-b border-white/10 py-16 lg:py-20">
        <div className="container">
          <SectionHeading
            eyebrow="Book"
            title="Book your mobile car detail"
            description="Tell us about your vehicle and where you are in Sydney. We'll confirm a time that suits you — usually within a few hours."
          />
          <div className="mx-auto mt-12 max-w-3xl">
            <Suspense fallback={<div className="surface h-96 animate-pulse" />}>
              <BookingForm />
            </Suspense>
          </div>
        </div>
      </section>
      <PricingSection />
      <CeramicCoatingSection />
    </>
  );
}
