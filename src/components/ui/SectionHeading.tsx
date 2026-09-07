import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-400">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-3 text-fluid-h2 font-bold text-white">{title}</h2>
      {description ? (
        <p className="mt-4 text-fluid-lead text-slate-400">{description}</p>
      ) : null}
    </div>
  );
}
