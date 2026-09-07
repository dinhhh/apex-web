import { Suspense } from "react";
import { CalendarClock, MapPinned, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BookingForm } from "@/components/sections/BookingForm";

const assurances = [
  { icon: CalendarClock, title: "Fast confirmation", body: "We reply with a firm time, usually within a few hours." },
  { icon: MapPinned, title: "We come to you", body: "Home, office or apartment car park anywhere in Sydney." },
  { icon: ShieldCheck, title: "No obligation", body: "Your request is an enquiry — nothing is charged until the job is booked." },
];

export function BookingSection() {
  return (
    <section id="book" className="scroll-mt-24 py-20 lg:py-28">
      <div className="container">
        <SectionHeading
          eyebrow="Book / Quick Enquiry"
          title="Request your mobile detail"
          description="Fill in the details below and we'll confirm your on-site appointment. It takes about a minute."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <ul className="space-y-4">
            {assurances.map(({ icon: Icon, title, body }) => (
              <li key={title} className="surface flex gap-4 p-5">
                <Icon className="h-6 w-6 shrink-0 text-accent-400" aria-hidden />
                <div>
                  <p className="text-sm font-semibold text-white">{title}</p>
                  <p className="mt-1 text-sm text-slate-400">{body}</p>
                </div>
              </li>
            ))}
          </ul>

          <Suspense fallback={<div className="surface h-96 animate-pulse" />}>
            <BookingForm />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
