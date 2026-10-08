"use client";

import { Star, Users } from "lucide-react";
import { useCountUp } from "@/lib/useCountUp";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

interface Stat {
  icon: typeof Users;
  value: number;
  suffix: string;
  label: string;
  sub: string;
  barClassName: string;
}

const stats: Stat[] = [
  {
    icon: Users,
    value: site.stats.customersServed,
    suffix: "+",
    label: "Customers served",
    sub: "Across Greater Sydney",
    barClassName: "bg-accent",
  },
  {
    icon: Star,
    value: site.stats.googleFiveStarReviews,
    suffix: "",
    label: "5-star reviews on Google Maps",
    sub: "Verified customer ratings",
    barClassName: "bg-emerald-500",
  },
  {
    icon: Star,
    value: site.stats.airtaskerFiveStarReviews,
    suffix: "",
    label: "5-star reviews on Airtasker",
    sub: "Verified customer ratings",
    barClassName: "bg-emerald-500",
  },
];

function StatCard({ icon: Icon, value, suffix, label, sub, barClassName }: Stat) {
  // Count-up finishes at 1.4s; the bar fill is given a slightly longer
  // transition so it visibly "catches up" to the number, loading-bar style.
  const { ref, value: animated } = useCountUp<HTMLDivElement>(value, 1400);
  const progress = value === 0 ? 0 : Math.min((animated / value) * 100, 100);

  return (
    <div ref={ref} className="surface p-6 text-center sm:p-8">
      <Icon className="mx-auto h-6 w-6 text-accent-400" aria-hidden />
      <p className="mt-3 text-4xl font-bold text-white sm:text-5xl" aria-hidden>
        {animated}
        {suffix}
      </p>
      <p className="sr-only" role="status">
        {value}
        {suffix} {label}
      </p>
      <p className="mt-2 text-sm font-semibold text-white">{label}</p>
      <p className="mt-1 text-xs text-slate-500">{sub}</p>

      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className={cn(
            "h-full rounded-full transition-[width] duration-200 ease-out",
            barClassName,
          )}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

export function StatsSection() {
  return (
    <section aria-label="Our track record" className="border-y border-white/10 bg-ink-900/40 py-16 lg:py-20">
      <div className="container">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
