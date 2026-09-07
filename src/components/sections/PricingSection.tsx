import Link from "next/link";
import { Check, Plus, ShieldCheck, Sparkle } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { addOns, corePackages, priceLabel } from "@/lib/packages";
import type { DetailingPackage, PackageFeature } from "@/types/detailing";
import { cn } from "@/lib/utils";

const groupLabels: Record<PackageFeature["group"], string> = {
  interior: "Interior",
  exterior: "Exterior",
  process: "Included",
};

function FeatureList({ features }: { features: PackageFeature[] }) {
  const groups: PackageFeature["group"][] = ["process", "interior", "exterior"];
  return (
    <div className="space-y-4">
      {groups.map((group) => {
        const items = features.filter((f) => f.group === group);
        if (items.length === 0) return null;
        return (
          <div key={group}>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {groupLabels[group]}
            </p>
            <ul className="mt-2 space-y-2">
              {items.map((f) => (
                <li key={f.label} className="flex items-start gap-2.5 text-sm text-slate-300">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-400" aria-hidden />
                  <span>
                    {f.label}
                    {f.optional ? (
                      <span className="ml-1.5 text-xs text-slate-500">(optional)</span>
                    ) : null}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

function PackageCard({ pkg }: { pkg: DetailingPackage }) {
  return (
    <article
      className={cn(
        "surface relative flex h-full flex-col p-6 transition-transform duration-300 hover:-translate-y-1",
        pkg.featured && "border-accent/40 shadow-glow",
      )}
    >
      {pkg.badge ? (
        <div className="absolute -top-3 left-6">
          <Badge tone={pkg.featured ? "accent" : "gold"}>
            {pkg.featured ? <Sparkle className="h-3.5 w-3.5" aria-hidden /> : null}
            {pkg.badge}
          </Badge>
        </div>
      ) : null}

      <header className="border-b border-white/10 pb-5">
        <h3 className="text-lg font-bold text-white">{pkg.name}</h3>
        <p className="mt-1.5 text-sm text-slate-400">{pkg.tagline}</p>
        <div className="mt-4 flex items-baseline gap-1.5">
          <span className="text-3xl font-bold text-white">{priceLabel(pkg)}</span>
          {pkg.price.kind === "from" ? (
            <span className="text-sm text-slate-500">AUD</span>
          ) : null}
        </div>
        {pkg.durationHours ? (
          <p className="mt-1 text-xs text-slate-500">
            Approx. {pkg.durationHours[0]}–{pkg.durationHours[1]} hrs on-site
          </p>
        ) : null}
        {pkg.guaranteeYears ? (
          <p className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-2.5 py-1 text-xs font-semibold text-gold">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
            {pkg.guaranteeYears}-year written guarantee
          </p>
        ) : null}
      </header>

      <div className="flex-1 py-5">
        <FeatureList features={pkg.features} />
      </div>

      <Button
        href={`/book?package=${pkg.id}`}
        variant={pkg.featured ? "primary" : "secondary"}
        size="lg"
        className="w-full"
      >
        {pkg.price.kind === "custom" ? "Request a Quote" : `Book ${pkg.name.split(" ")[0]}`}
      </Button>
    </article>
  );
}

export function PricingSection() {
  return (
    <section id="packages" className="scroll-mt-24 py-20 lg:py-28">
      <div className="container">
        <SectionHeading
          eyebrow="Service Packages"
          title="Transparent pricing, automotive-grade results"
          description="Every package is performed on-site with professional equipment. Pricing starts from the figures below and is confirmed on vehicle size and condition."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {corePackages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>

        <div className="surface mt-10 p-6 lg:p-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">Popular add-ons</h3>
              <p className="mt-1 text-sm text-slate-400">
                Attach any of these to a package when you book.
              </p>
            </div>
            <Link
              href="/book"
              className="text-sm font-semibold text-accent-400 hover:text-accent"
            >
              Build your booking &rarr;
            </Link>
          </div>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {addOns.map((addOn) => (
              <li
                key={addOn.id}
                className="rounded-xl border border-white/10 bg-ink-800/60 p-4"
              >
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  <Plus className="h-4 w-4 text-accent-400" aria-hidden />
                  {addOn.name}
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">
                  {addOn.description}
                </p>
                <p className="mt-3 text-sm font-semibold text-accent-400">
                  {addOn.price.kind === "from"
                    ? `From $${addOn.price.amount}`
                    : addOn.price.note}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
