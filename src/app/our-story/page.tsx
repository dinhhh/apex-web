import type { Metadata } from "next";
import { Award, Handshake, Sparkles, Users } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "How Apex Mobile Car Detailing became a trusted contract partner to Sydney's top detailers, with 50+ verified 5-star reviews.",
  alternates: { canonical: "/our-story" },
};

const milestones = [
  {
    icon: Sparkles,
    title: "Built on the tools",
    body: "Apex started as a one-van operation detailing cars on weekends. Every process we use today was refined on real customer vehicles, not in a showroom.",
  },
  {
    icon: Handshake,
    title: "A trusted contract partner",
    body: "Established Sydney detailers now sub-contract overflow and mobile work to us because the finish matches their own standards.",
  },
  {
    icon: Award,
    title: "50+ verified 5-star reviews",
    body: "Across Google Maps and Airtasker, our customers consistently highlight punctuality, communication and a genuinely thorough result.",
  },
  {
    icon: Users,
    title: "Still fully mobile",
    body: "We never opened a shopfront on purpose. Coming to you — with water, power and professional gear on board — is the whole point.",
  },
];

export default function OurStoryPage() {
  return (
    <>
      <section className="py-16 lg:py-24">
        <div className="container">
          <SectionHeading
            eyebrow="Our Story"
            title="Automotive-grade detailing, brought to your driveway"
            description="Apex Mobile Car Detailing is a Sydney-based, fully mobile detailing business. We bring the equipment, the products and the standards of a professional detailing bay to wherever your car is parked."
          />

          <div className="mx-auto mt-14 grid max-w-4xl gap-6 sm:grid-cols-2">
            {milestones.map(({ icon: Icon, title, body }) => (
              <article key={title} className="surface p-6">
                <Icon className="h-6 w-6 text-accent-400" aria-hidden />
                <h2 className="mt-4 text-base font-bold text-white">{title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{body}</p>
              </article>
            ))}
          </div>

          <div className="mx-auto mt-12 max-w-3xl space-y-4 text-fluid-lead text-slate-400">
            <p>
              Our value proposition is simple: professional on-site detailing, done
              to a contract-grade standard, with the convenience of never having to
              leave home. We use pH-neutral, paint-safe chemistry, dedicated wash
              media and commercial extraction equipment.
            </p>
            <p>
              Whether you need a regular maintenance detail, a full pre-sale
              presentation or a deep interior rescue, you deal with the same people
              from the first call to the final wipe-down.
            </p>
          </div>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
