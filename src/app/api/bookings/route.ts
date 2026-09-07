import { NextResponse } from "next/server";
import { addOns, getPackage } from "@/lib/packages";
import type { BookingRequest, BookingResponse } from "@/types/detailing";

export const runtime = "nodejs";

function reference(): string {
  const now = new Date();
  const stamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `APX-${stamp}-${rand}`;
}

function validate(payload: Partial<BookingRequest>): BookingResponse["errors"] {
  const errors: NonNullable<BookingResponse["errors"]> = {};

  const v = payload.vehicle;
  if (!v?.make || !v?.model || !/^\d{4}$/.test(v?.year ?? "")) {
    errors.vehicle = "Please enter the vehicle make, model and a 4-digit year.";
  }

  if (!payload.packageId || !getPackage(payload.packageId)) {
    errors.packageId = "Please choose a valid package.";
  }

  if (!payload.suburb || payload.suburb.trim().length < 2) {
    errors.suburb = "Please enter your Sydney suburb.";
  }

  if (!payload.preferredDate || !payload.preferredTime) {
    errors.schedule = "Please choose a preferred date and time.";
  }

  const c = payload.customer;
  const phoneDigits = (c?.phone ?? "").replace(/\D/g, "");
  if (!c?.name || phoneDigits.length < 8) {
    errors.customer = "Please enter your name and a valid contact number.";
  }
  if (c?.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email)) {
    errors.customer = "That email address doesn't look right.";
  }

  return Object.keys(errors).length > 0 ? errors : undefined;
}

export async function POST(request: Request): Promise<NextResponse<BookingResponse>> {
  let payload: Partial<BookingRequest>;

  try {
    payload = (await request.json()) as Partial<BookingRequest>;
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid request body." },
      { status: 400 },
    );
  }

  // Honeypot — silently accept bots without doing anything.
  if (payload.company && payload.company.trim() !== "") {
    return NextResponse.json({
      ok: true,
      message: "Thanks — we'll be in touch shortly.",
      reference: reference(),
    });
  }

  const errors = validate(payload);
  if (errors) {
    return NextResponse.json(
      {
        ok: false,
        message: "Please check the highlighted fields and try again.",
        errors,
      },
      { status: 422 },
    );
  }

  const ref = reference();
  const validAddOns = (payload.addOnIds ?? []).filter((id) =>
    addOns.some((a) => a.id === id),
  );

  // In production, send to a CRM / email / database here.
  // e.g. await sendBookingEmail({ ...payload, addOnIds: validAddOns, reference: ref });
  console.info("[booking] new enquiry", {
    reference: ref,
    package: payload.packageId,
    addOns: validAddOns,
    suburb: payload.suburb,
    date: payload.preferredDate,
  });

  return NextResponse.json({
    ok: true,
    message:
      "Thanks! Your request is in. We'll call or text you shortly to confirm your on-site appointment.",
    reference: ref,
  });
}
