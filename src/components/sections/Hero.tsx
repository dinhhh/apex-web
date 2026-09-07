import { CalendarCheck, MapPin, Phone, ShieldCheck, Star } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Ambient background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(56,189,248,0.14),transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"
      />

      <div className="container flex flex-col items-center gap-8 py-20 text-center lg:py-28">
        <div className="flex flex-wrap items-center justify-center gap-2 animate-fade-up">
          <Badge tone="gold">
            <Star className="h-3.5 w-3.5 fill-current" aria-hidden />
            {site.reviews.label}
          </Badge>
          <Badge tone="accent">
            <MapPin className="h-3.5 w-3.5" aria-hidden />
            Fully mobile across Greater Sydney
          </Badge>
        </div>

        <h1
          className="max-w-4xl text-fluid-h1 font-bold text-white animate-fade-up"
          style={{ animationDelay: "60ms" }}
        >
          Showroom-grade car detailing that{" "}
          <span className="bg-gradient-to-r from-accent-400 to-cyan-200 bg-clip-text text-transparent">
            comes to your driveway
          </span>
        </h1>

        <p
          className="max-w-2xl text-fluid-lead text-slate-400 animate-fade-up"
          style={{ animationDelay: "120ms" }}
        >
          We detail your car on-site anywhere in Sydney — home, office or
          apartment car park. Professional equipment, pH-neutral products and the
          same standards trusted by top Sydney detailers.
        </p>

        <div
          className="flex flex-col gap-3 sm:flex-row animate-fade-up"
          style={{ animationDelay: "180ms" }}
        >
          <Button href="/book" size="lg">
            <CalendarCheck className="h-5 w-5" aria-hidden />
            Book a Detail
          </Button>
          <Button href={`tel:${site.phone}`} variant="secondary" size="lg">
            <Phone className="h-5 w-5" aria-hidden />
            Call Now — {site.phoneDisplay}
          </Button>
        </div>

        <dl
          className="mt-6 grid w-full max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4 animate-fade-up"
          style={{ animationDelay: "240ms" }}
        >
          {[
            { icon: Star, label: "4.9 average rating", sub: "Google & Airtasker" },
            { icon: ShieldCheck, label: "Fully insured", sub: "Public liability" },
            { icon: MapPin, label: "We come to you", sub: "All Sydney suburbs" },
            { icon: CalendarCheck, label: "Same-week slots", sub: "7 days a week" },
          ].map(({ icon: Icon, label, sub }) => (
            <div
              key={label}
              className="surface flex flex-col items-center gap-1 px-3 py-4 text-center"
            >
              <Icon className="h-5 w-5 text-accent-400" aria-hidden />
              <dt className="text-sm font-semibold text-white">{label}</dt>
              <dd className="text-xs text-slate-500">{sub}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
