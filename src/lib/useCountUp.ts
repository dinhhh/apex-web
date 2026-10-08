"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animates a number from 0 up to `target` once the returned ref scrolls
 * into view, easing out over `durationMs`. Respects prefers-reduced-motion
 * (jumps straight to the final value) and only ever runs once per element.
 */
export function useCountUp<T extends HTMLElement>(
  target: number,
  durationMs = 1400,
) {
  const ref = useRef<T | null>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) {
      setValue(target);
      return;
    }

    let frame: number;
    let started = false;

    const animate = (start: number) => {
      const step = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / durationMs, 1);
        // ease-out-cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(target * eased));
        if (progress < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !started) {
          started = true;
          animate(performance.now());
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [target, durationMs]);

  return { ref, value };
}
