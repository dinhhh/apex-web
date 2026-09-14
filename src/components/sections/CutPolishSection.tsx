import { Check, Magnet, Sparkles, Wand2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cutAndPolish, priceLabel } from "@/lib/packages";

const benefits = [
  {
    icon: Magnet,
    title: "Iron buster decontamination",
    body: "A chemical iron-fallout remover dissolves embedded brake dust and rail fallout that a wash — or clay alone — can't shift.",
  },
  {
    icon: Sparkles,
    title: "Clay bar treatment",
    body: "Physically lifts bonded tar, sap and overspray left behind after decontamination, leaving glass-smooth paint.",
  },
  {
    icon: Wand2,
    title: "2-step machine correction",
    body: "A compound cut removes swirls, oxidation and light scratches, then a finishing polish maximises gloss and clarity.",
  },
];

export function CutPolishSection() {
  const pkg = cutAndPolish;

  return (
    <section
      id="cut-polish"
      className="scroll-mt-24 border-t border-white/10 py-20 lg:py-28"
    >
      <div className="container">
        <SectionHeading
          eyebrow="Paint Correction"
          title="Cut & Polish"
          description="Machine paint correction that strips back years of swirls, oxidation and light scratches. Final price depends on your paint's current condition and is confirmed after inspection."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          {/* Left: pitch + benefits */}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="gold">{pkg.badge}</Badge>
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
              Cut &amp; Polish is a dedicated paint-correction service for cars
              whose finish has dulled with age — swirl marks from washing,
              light scratches, water spots and oxidation. We decontaminate the
              paint down to bare clear coat, then machine-correct it in two
              stages to bring back genuine depth and gloss.
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
                Book Cut &amp; Polish
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
              Heavily oxidised or neglected paint may need extra correction
              passes — this is assessed on inspection and quoted upfront. Pair
              with Ceramic Coating to protect the freshly corrected finish.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
