import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: ReactNode;
  tone?: "accent" | "gold" | "neutral";
  className?: string;
}

const tones = {
  accent: "border-accent/30 bg-accent/10 text-accent-400",
  gold: "border-gold/30 bg-gold/10 text-gold",
  neutral: "border-white/15 bg-white/5 text-slate-300",
} as const;

export function Badge({ children, tone = "neutral", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
