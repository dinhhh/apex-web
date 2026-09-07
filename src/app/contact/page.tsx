import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Call, text or email Apex Mobile Car Detailing. Fully mobile service across Greater Sydney, 7 days a week.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container">
        <SectionHeading
          eyebrow="Contact Us"
          title="Talk to the team"
          description="The fastest way to book is to call or text. We're on the tools most of the day, so leave a message and we'll get straight back to you."
        />

        <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
          <a href={`tel:${site.phone}`} className="surface flex items-start gap-4 p-6 transition-colors hover:border-accent/40">
            <Phone className="h-6 w-6 shrink-0 text-accent-400" aria-hidden />
            <span>
              <span className="block text-sm font-semibold text-white">Call or text</span>
              <span className="mt-1 block text-slate-400">{site.phoneDisplay} (Harry)</span>
              <span className="mt-1 block text-slate-400">{site.phoneDisplay1} ({site.phoneName1})</span>
            </span>
          </a>
          <a href={`mailto:${site.email}`} className="surface flex items-start gap-4 p-6 transition-colors hover:border-accent/40">
            <Mail className="h-6 w-6 shrink-0 text-accent-400" aria-hidden />
            <span>
              <span className="block text-sm font-semibold text-white">Email</span>
              <span className="mt-1 block break-all text-slate-400">{site.email}</span>
            </span>
          </a>
          <div className="surface flex items-start gap-4 p-6">
            <MapPin className="h-6 w-6 shrink-0 text-accent-400" aria-hidden />
            <span>
              <span className="block text-sm font-semibold text-white">Service area</span>
              <span className="mt-1 block text-slate-400">{site.region} — we come to you.</span>
            </span>
          </div>
          <div className="surface flex items-start gap-4 p-6">
            <Clock className="h-6 w-6 shrink-0 text-accent-400" aria-hidden />
            <span>
              <span className="block text-sm font-semibold text-white">Hours</span>
              {site.hours.map((h) => (
                <span key={h.day} className="mt-1 block text-slate-400">
                  {h.day}: {h.time}
                </span>
              ))}
            </span>
          </div>
        </div>

        <div className="mx-auto mt-10 flex max-w-4xl flex-col gap-3 sm:flex-row">
          <Button href="/book" size="lg">Book Online</Button>
          <Button href={`tel:${site.phone}`} variant="secondary" size="lg">
            <Phone className="h-5 w-5" aria-hidden />
            Call {site.phoneDisplay}
          </Button>
        </div>
      </div>
    </section>
  );
}
