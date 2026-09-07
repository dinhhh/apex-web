import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="container flex min-h-[60vh] flex-col items-center justify-center gap-6 py-24 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-400">
        404
      </p>
      <h1 className="text-fluid-h2 font-bold text-white">
        This page took a detour
      </h1>
      <p className="max-w-md text-slate-400">
        The page you&apos;re after doesn&apos;t exist. Let&apos;s get you back on the road.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button href="/" size="lg">Back to home</Button>
        <Button href="/book" variant="secondary" size="lg">Book a detail</Button>
      </div>
    </section>
  );
}
