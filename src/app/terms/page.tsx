import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms and conditions and privacy policy for Apex Mobile Car Detailing services across Greater Sydney.",
  alternates: { canonical: "/terms" },
};

const sections = [
  {
    id: "bookings",
    heading: "1. Bookings & quotes",
    body: [
      "All prices shown are starting prices in Australian dollars (AUD) and are confirmed based on the size, condition and accessibility of the vehicle.",
      "A booking is only confirmed once we have replied to you with a specific date and time. Submitting the online form is an enquiry, not a guaranteed appointment.",
    ],
  },
  {
    id: "site-requirements",
    heading: "2. On-site requirements",
    body: [
      "As a mobile service we require safe, legal access to the vehicle and enough surrounding space to work. Where possible, access to a power outlet and water is appreciated but not essential — our vans carry both.",
      "We reserve the right to reschedule if the work location is unsafe, or if severe weather prevents a quality result.",
    ],
  },
  {
    id: "cancellations",
    heading: "3. Cancellations & rescheduling",
    body: [
      "Please give at least 24 hours' notice to cancel or reschedule. Late cancellations or no-access call-outs may incur a fee to cover travel and reserved time.",
    ],
  },
  {
    id: "results",
    heading: "4. Results & pre-existing conditions",
    body: [
      "Detailing improves the condition of a vehicle but cannot guarantee removal of every stain, odour, scratch or defect, particularly where damage is permanent or pre-existing.",
      "Any pre-existing damage identified before work begins will be noted with you. Optional treatments such as ozone or machine polishing are performed at the customer's request.",
    ],
  },
  {
    id: "complaints",
    heading: "5. Complaints & re-work window",
    body: [
      "Any complaint about the quality of the service must be raised with us within 1 days (24 hours) of the service being completed, so that we have a fair opportunity to inspect the vehicle and, where appropriate, return to re-do the affected work.",
      "Requests made after this 1-day window will not be accepted, and Apex Mobile Car Detailing accepts no responsibility or liability for the condition of the vehicle once this period has passed, as we cannot verify the cause of any issue after that time (for example, subsequent use, weather, parking conditions or third-party work).",
      "To lodge a complaint within the window, contact us by phone and email with your booking reference and photos of the concern.",
    ],
  },
  {
    id: "liability",
    heading: "6. Liability",
    body: [
      "Apex Mobile Car Detailing holds public liability insurance. Our liability is limited to the value of the services provided. We are not liable for pre-existing faults or damage revealed (not caused) by cleaning.",
    ],
  },
  {
    id: "payment",
    heading: "7. Payment",
    body: [
      "Payment is due on completion unless otherwise agreed in writing. We accept cash, card and bank transfer.",
    ],
  },
  {
    id: "privacy",
    heading: "8. Privacy policy",
    body: [
      "We collect only the information needed to provide a quote and complete your booking (name, contact details, vehicle and location). We do not sell your data or share it with third parties except where required to deliver the service or by law.",
      `To request access to or deletion of your information, contact us at ${site.email}.`,
    ],
  },
];

export default function TermsPage() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container">
        <SectionHeading
          align="left"
          eyebrow="Legal"
          title="Terms & Conditions"
          description="These terms apply to all detailing services provided by Apex Mobile Car Detailing across Greater Sydney, NSW."
        />

        <p className="mt-6 text-sm text-slate-500">Last updated: 7 September 2026</p>

        <div className="mt-10 max-w-3xl space-y-10">
          {sections.map((section) => (
            <article key={section.id} id={section.id} className="scroll-mt-24">
              <h2 className="text-lg font-bold text-white">{section.heading}</h2>
              {section.body.map((paragraph, i) => (
                <p key={i} className="mt-3 text-sm leading-relaxed text-slate-400">
                  {paragraph}
                </p>
              ))}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
