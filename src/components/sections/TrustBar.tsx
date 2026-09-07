import { BadgeCheck, Handshake, Leaf, Timer } from "lucide-react";

const points = [
  { icon: Handshake, text: "Contract partner to top Sydney detailers" },
  { icon: BadgeCheck, text: "50+ verified 5-star reviews" },
  { icon: Leaf, text: "pH-neutral, paint-safe products" },
  { icon: Timer, text: "On-site, no need to drop off" },
];

export function TrustBar() {
  return (
    <section aria-label="Why choose Apex" className="border-y border-white/10 bg-ink-900/60">
      <div className="container grid grid-cols-1 gap-4 py-6 sm:grid-cols-2 lg:grid-cols-4">
        {points.map(({ icon: Icon, text }) => (
          <div key={text} className="flex items-center gap-3 text-sm text-slate-300">
            <Icon className="h-5 w-5 shrink-0 text-accent-400" aria-hidden />
            <span>{text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
