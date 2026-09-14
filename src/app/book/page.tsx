import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
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
    <section className="py-16 lg:py-24">
      <div className="container">
        <SectionHeading
          eyebrow="Book"
          title="Book your mobile car detail"
          description="Tell us about your vehicle and where you are in Sydney. We'll confirm a time that suits you — usually within a few hours."
        />
        <p className="mt-4 text-center text-sm text-slate-500">
          Not sure which package to pick?{" "}
          <Link href="/services" className="font-semibold text-accent-400 hover:text-accent">
            Compare services &amp; pricing
          </Link>
        </p>

        <div className="mx-auto mt-12 max-w-3xl">
          <Suspense fallback={<div className="surface h-96 animate-pulse" />}>
            <BookingForm />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
