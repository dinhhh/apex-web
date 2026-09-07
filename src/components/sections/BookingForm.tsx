"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Loader2, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { addOns, packages } from "@/lib/packages";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import type { BookingRequest, BookingResponse, PackageId } from "@/types/detailing";

const FIELD =
  "w-full rounded-xl border border-white/15 bg-ink-800/70 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/40";
const LABEL = "block text-xs font-semibold uppercase tracking-wider text-slate-400";

const currentYear = new Date().getFullYear();

function isValidPackage(value: string | null): value is PackageId {
  return packages.some((p) => p.id === value);
}

export function BookingForm({ compact = false }: { compact?: boolean }) {
  const params = useSearchParams();
  const preselected = params.get("package");
  const defaultPackage: PackageId = isValidPackage(preselected)
    ? preselected
    : "luxury";

  const [pkg, setPkg] = useState<PackageId>(defaultPackage);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [response, setResponse] = useState<BookingResponse | null>(null);

  const minDate = useMemo(() => new Date().toISOString().split("T")[0], []);

  function toggleAddOn(id: string) {
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id],
    );
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const payload: BookingRequest = {
      vehicle: {
        make: String(data.get("make") ?? "").trim(),
        model: String(data.get("model") ?? "").trim(),
        year: String(data.get("year") ?? "").trim(),
      },
      packageId: pkg,
      addOnIds: selectedAddOns,
      suburb: String(data.get("suburb") ?? "").trim(),
      preferredDate: String(data.get("preferredDate") ?? ""),
      preferredTime: String(data.get("preferredTime") ?? ""),
      customer: {
        name: String(data.get("name") ?? "").trim(),
        phone: String(data.get("phone") ?? "").trim(),
        email: String(data.get("email") ?? "").trim() || undefined,
      },
      notes: String(data.get("notes") ?? "").trim() || undefined,
      company: String(data.get("company") ?? ""),
    };

    setStatus("submitting");
    setResponse(null);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body: BookingResponse = await res.json();
      setResponse(body);
      if (res.ok && body.ok) {
        setStatus("success");
        form.reset();
        setSelectedAddOns([]);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
      setResponse({
        ok: false,
        message:
          "We couldn't send your request. Please call us and we'll book you in.",
      });
    }
  }

  if (status === "success" && response?.ok) {
    return (
      <div className="surface flex flex-col items-center gap-4 p-8 text-center">
        <CheckCircle2 className="h-12 w-12 text-accent-400" aria-hidden />
        <h3 className="text-xl font-bold text-white">Request received</h3>
        <p className="max-w-md text-sm text-slate-400">{response.message}</p>
        {response.reference ? (
          <p className="text-xs text-slate-500">
            Reference: <span className="font-mono text-slate-300">{response.reference}</span>
          </p>
        ) : null}
        <Button href={`tel:${site.phone}`} variant="secondary">
          <Phone className="h-4 w-4" aria-hidden />
          Call to confirm sooner
        </Button>
      </div>
    );
  }

  const fieldError = (name: string) => response?.errors?.[name];

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={cn("surface p-6 sm:p-8", compact && "p-5 sm:p-6")}
    >
      {/* Honeypot */}
      <div className="hidden" aria-hidden>
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <fieldset className="space-y-4">
        <legend className="text-sm font-bold text-white">1. Your vehicle</legend>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="make" className={LABEL}>Make</label>
            <input id="make" name="make" required autoComplete="off" placeholder="Toyota" className={cn(FIELD, "mt-1.5")} />
          </div>
          <div>
            <label htmlFor="model" className={LABEL}>Model</label>
            <input id="model" name="model" required autoComplete="off" placeholder="Kluger" className={cn(FIELD, "mt-1.5")} />
          </div>
          <div>
            <label htmlFor="year" className={LABEL}>Year</label>
            <input
              id="year"
              name="year"
              inputMode="numeric"
              pattern="[0-9]{4}"
              minLength={4}
              maxLength={4}
              required
              placeholder={String(currentYear)}
              className={cn(FIELD, "mt-1.5")}
            />
          </div>
        </div>
        {fieldError("vehicle") ? (
          <p className="text-xs text-red-400">{fieldError("vehicle")}</p>
        ) : null}
      </fieldset>

      <fieldset className="mt-8 space-y-4">
        <legend className="text-sm font-bold text-white">2. Package &amp; add-ons</legend>
        <div>
          <label htmlFor="package" className={LABEL}>Package</label>
          <select
            id="package"
            name="package"
            value={pkg}
            onChange={(e) => setPkg(e.target.value as PackageId)}
            className={cn(FIELD, "mt-1.5")}
          >
            {packages.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} — {p.price.kind === "from" ? `from $${p.price.amount}` : "custom pricing"}
              </option>
            ))}
          </select>
        </div>
        <fieldset>
          <legend className={LABEL}>Optional add-ons</legend>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {addOns.map((addOn) => {
              const checked = selectedAddOns.includes(addOn.id);
              return (
                <label
                  key={addOn.id}
                  className={cn(
                    "flex cursor-pointer items-start gap-2.5 rounded-xl border p-3 text-sm transition-colors",
                    checked
                      ? "border-accent/50 bg-accent/10 text-white"
                      : "border-white/10 bg-ink-800/50 text-slate-300 hover:border-white/20",
                  )}
                >
                  <input
                    type="checkbox"
                    name="addOns"
                    value={addOn.id}
                    checked={checked}
                    onChange={() => toggleAddOn(addOn.id)}
                    className="mt-0.5 h-4 w-4 accent-accent"
                  />
                  <span>
                    <span className="font-semibold">{addOn.name}</span>
                    <span className="block text-xs text-slate-500">
                      {addOn.price.kind === "from" ? `from $${addOn.price.amount}` : addOn.price.note}
                    </span>
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>
      </fieldset>

      <fieldset className="mt-8 space-y-4">
        <legend className="text-sm font-bold text-white">3. Where &amp; when</legend>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="sm:col-span-1">
            <label htmlFor="suburb" className={LABEL}>Address</label>
            <input id="suburb" name="suburb" required autoComplete="address-level2" placeholder="330 Geogre Street" className={cn(FIELD, "mt-1.5")} />
          </div>
          <div className="sm:col-span-1">
            <label htmlFor="suburb" className={LABEL}>Postcode</label>
            <input id="suburb" name="suburb" required autoComplete="address-level2" placeholder="2000" className={cn(FIELD, "mt-1.5")} />
          </div>
          <div>
            <label htmlFor="preferredDate" className={LABEL}>Preferred date</label>
            <input id="preferredDate" name="preferredDate" type="date" min={minDate} required className={cn(FIELD, "mt-1.5")} />
          </div>
          <div>
            <label htmlFor="preferredTime" className={LABEL}>Preferred time</label>
            <select id="preferredTime" name="preferredTime" required defaultValue="" className={cn(FIELD, "mt-1.5")}>
              <option value="" disabled>Select…</option>
              <option value="morning">Morning (7am–11am)</option>
              <option value="midday">Midday (11am–2pm)</option>
              <option value="afternoon">Afternoon (2pm–6pm)</option>
            </select>
          </div>
        </div>
        {fieldError("suburb") ? (
          <p className="text-xs text-red-400">{fieldError("suburb")}</p>
        ) : null}
      </fieldset>

      <fieldset className="mt-8 space-y-4">
        <legend className="text-sm font-bold text-white">4. Your details</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className={LABEL}>Full name</label>
            <input id="name" name="name" required autoComplete="name" placeholder="Alex Nguyen" className={cn(FIELD, "mt-1.5")} />
          </div>
          <div>
            <label htmlFor="phone" className={LABEL}>Phone</label>
            <input id="phone" name="phone" type="tel" required autoComplete="tel" placeholder="0412 345 678" className={cn(FIELD, "mt-1.5")} />
          </div>
        </div>
        <div>
          <label htmlFor="email" className={LABEL}>Email <span className="text-slate-600">(optional)</span></label>
          <input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" className={cn(FIELD, "mt-1.5")} />
        </div>
        <div>
          <label htmlFor="notes" className={LABEL}>Notes <span className="text-slate-600">(optional)</span></label>
          <textarea id="notes" name="notes" rows={3} placeholder="Access instructions, condition of the car, parking, etc." className={cn(FIELD, "mt-1.5 resize-y")} />
        </div>
        {fieldError("customer") ? (
          <p className="text-xs text-red-400">{fieldError("customer")}</p>
        ) : null}
      </fieldset>

      {status === "error" && response ? (
        <p role="alert" className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {response.message}
        </p>
      ) : null}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" disabled={status === "submitting"} className="w-full sm:w-auto">
          {status === "submitting" ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
              Sending…
            </>
          ) : (
            "Request my booking"
          )}
        </Button>
        <p className="text-xs text-slate-500">
          Prefer to talk?{" "}
          <a href={`tel:${site.phone}`} className="font-semibold text-accent-400 hover:text-accent">
            Call {site.phoneDisplay}
          </a>
        </p>
      </div>
    </form>
  );
}
