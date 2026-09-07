import { Check, Droplets, ShieldCheck, Sun } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ceramicCoating, priceLabel } from "@/lib/packages";

const benefits = [
  {
    icon: ShieldCheck,
    title: "5-year written guarantee",
    body: "A semi-permanent SiO₂ nano-ceramic layer chemically bonds to the clear coat — backed in writing for five years.",
  },
  {
    icon: Droplets,
    title: "Hydrophobic & self-cleaning",
    body: "Water, mud and grime bead up and roll off, so the car stays cleaner for longer and washes take half the time.",
  },
  {
    icon: Sun,
    title: "UV & contaminant defence",
    body: "Guards paint against UV fade, oxidation, bird droppings, tree sap, road salt and light wash marring.",
  },
];

export function CeramicCoatingSection() {
  const pkg = ceramicCoating;

  return (
    <section
      id="ceramic-coating"
      className="scroll-mt-24 border-t border-white/10 bg-ink-900/40 py-20 lg:py-28"
    >
      <div className="container">
        <SectionHeading
          eyebrow="Paint Protection"
          title="Ceramic Coating"
          description="Long-term, professional-grade nano-ceramic protection applied on-site. The final price depends on your car's current paint condition and is confirmed after inspection."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          {/* Left: pitch + benefits */}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="gold">
                <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
                {pkg.guaranteeYears}-Year Guarantee
              </Badge>
              <Badge tone="accent">Applied at your home or office</Badge>
            </div>

            <div className="mt-5 flex items-baseline gap-2">
              <span className="text-4xl font-bold text-white">{priceLabel(pkg)}</span>
              <span className="text-sm text-slate-500">AUD — priced on condition</span>
            </div>
            {pkg.durationHours ? (
              <p className="mt-1 text-xs text-slate-500">
                Approx. {pkg.durationHours[0]}–{pkg.durationHours[1]} hrs on-site
              </p>
            ) : null}

            <p className="mt-6 text-fluid-lead text-slate-400">
              A ceramic coating is a liquid polymer that cures into a hard,
              transparent shell over your paint. Unlike a wax that lasts weeks, a
              professionally applied coating lasts years — locking in a deep,
              glass-like gloss while making the surface far easier to keep clean.
            </p>

            <ul className="mt-8 space-y-5">
              {benefits.map(({ icon: Icon, title, body }) => (
                <li key={title} className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent-400 ring-1 ring-inset ring-accent/30">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">{title}</p>
                    <p className="mt-1 text-sm text-slate-400">{body}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={`/book?package=${pkg.id}`} size="lg">
                Book a Ceramic Coating
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                Ask about your car
              </Button>
            </div>
          </div>

          {/* Right: what's included */}
          <div className="surface h-full p-6 lg:p-8">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
              What&apos;s included
            </h3>
            <ul className="mt-4 space-y-3">
              {pkg.features.map((f) => (
                <li
                  key={f.label}
                  className="flex items-start gap-2.5 text-sm text-slate-300"
                >
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
            <p className="mt-6 border-t border-white/10 pt-4 text-xs text-slate-500">
              Heavily swirled or neglected paint may need additional correction
              before coating — this is assessed on inspection and quoted upfront.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
