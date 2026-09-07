import { CalendarCheck, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

export function FinalCTA() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl border border-accent/30 bg-gradient-to-br from-accent-600 via-accent-500 to-cyan-400 p-8 text-ink-950 sm:p-12 lg:p-16">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/20 blur-3xl"
          />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <h2 className="text-fluid-h2 font-bold">
                Book a same-week mobile detail in Sydney
              </h2>
              <p className="mt-3 text-base font-medium text-ink-900/80">
                Tell us your suburb and vehicle — we&apos;ll confirm a time that
                suits you, usually within a few hours.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Button
                href={`tel:${site.phone}`}
                size="lg"
                className="bg-ink-950 text-white hover:bg-ink-900"
              >
                <Phone className="h-5 w-5" aria-hidden />
                Call {site.phoneDisplay}
              </Button>
              <Button
                href="/book"
                size="lg"
                className="border border-ink-950/20 bg-white/90 text-ink-950 hover:bg-white"
              >
                <CalendarCheck className="h-5 w-5" aria-hidden />
                Book Online
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
