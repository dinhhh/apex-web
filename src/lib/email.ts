import nodemailer from "nodemailer";
import { addOns, getPackage } from "@/lib/packages";
import { site } from "@/lib/site";
import type { BookingRequest } from "@/types/detailing";

/**
 * Booking notification email.
 *
 * Configure SMTP via environment variables (see .env.example). With a Gmail
 * inbox, create an App Password (Google Account → Security → 2-Step
 * Verification → App passwords) and use:
 *
 *   SMTP_HOST=smtp.gmail.com
 *   SMTP_PORT=465
 *   SMTP_USER=apexcardetailing.info@gmail.com
 *   SMTP_PASS=<16-char app password>
 *
 * If SMTP is not configured the request still succeeds — the payload is logged
 * so nothing is lost in local development.
 */

const TO = process.env.BOOKINGS_TO || site.email;

function transport() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;

  const port = Number(SMTP_PORT ?? 465);
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

const TIME_LABELS: Record<string, string> = {
  morning: "Morning (7am–11am)",
  midday: "Midday (11am–2pm)",
  afternoon: "Afternoon (2pm–6pm)",
};

export interface EnrichedBooking extends BookingRequest {
  reference: string;
}

/** A customer-uploaded photo, ready to attach to the notification email. */
export interface EmailAttachment {
  filename: string;
  content: Buffer;
  contentType: string;
}

function summarise(b: EnrichedBooking) {
  const pkg = getPackage(b.packageId);
  const selectedAddOns = b.addOnIds
    .map((id) => addOns.find((a) => a.id === id)?.name)
    .filter((name): name is string => Boolean(name));

  return {
    packageName: pkg?.name ?? b.packageId,
    packagePrice:
      pkg?.price.kind === "from"
        ? `from $${pkg.price.amount} AUD`
        : "custom pricing",
    addOnList: selectedAddOns.length ? selectedAddOns.join(", ") : "None",
    timeLabel: TIME_LABELS[b.preferredTime] ?? b.preferredTime,
  };
}

function photoLine(photoCount: number, note?: string): string {
  const base = photoCount > 0 ? `${photoCount} attached` : "None";
  return note ? `${base} — ${note}` : base;
}

function textBody(b: EnrichedBooking, photoCount: number, note?: string): string {
  const s = summarise(b);
  return [
    `New booking / quote request — ${b.reference}`,
    "",
    `Package:      ${s.packageName} (${s.packagePrice})`,
    `Add-ons:      ${s.addOnList}`,
    "",
    `Vehicle:      ${b.vehicle.year} ${b.vehicle.make} ${b.vehicle.model}`,
    `Suburb:       ${b.suburb}`,
    `Preferred:    ${b.preferredDate} — ${s.timeLabel}`,
    "",
    `Name:         ${b.customer.name}`,
    `Phone:        ${b.customer.phone}`,
    `Email:        ${b.customer.email ?? "—"}`,
    "",
    `Notes:        ${b.notes ?? "—"}`,
    `Photos:       ${photoLine(photoCount, note)}`,
    "",
    `Parking space confirmed:     ${b.parkingConfirmed ? "Yes" : "No"}`,
    `Power & water access confirmed: ${b.utilitiesConfirmed ? "Yes" : "No"}`,
    "",
    `Submitted:    ${new Date().toLocaleString("en-AU", { timeZone: "Australia/Sydney" })}`,
  ].join("\n");
}

function htmlBody(b: EnrichedBooking, photoCount: number, note?: string): string {
  const s = summarise(b);
  const esc = (v: string) =>
    v.replace(/[&<>"]/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c] as string,
    );
  const row = (label: string, value: string) =>
    `<tr><td style="padding:6px 12px;color:#64748b;font:600 12px/1.4 system-ui;text-transform:uppercase;letter-spacing:.04em;white-space:nowrap;vertical-align:top">${label}</td><td style="padding:6px 12px;color:#0f172a;font:14px/1.5 system-ui">${esc(value)}</td></tr>`;

  return `<div style="max-width:600px;margin:0 auto;font-family:system-ui,sans-serif">
    <h2 style="margin:0 0 4px;color:#0f172a">New booking / quote request</h2>
    <p style="margin:0 0 16px;color:#64748b;font-size:13px">Reference <strong>${b.reference}</strong></p>
    <table style="width:100%;border-collapse:collapse;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden">
      ${row("Package", `${s.packageName} (${s.packagePrice})`)}
      ${row("Add-ons", s.addOnList)}
      ${row("Vehicle", `${b.vehicle.year} ${b.vehicle.make} ${b.vehicle.model}`)}
      ${row("Suburb", b.suburb)}
      ${row("Preferred", `${b.preferredDate} — ${s.timeLabel}`)}
      ${row("Name", b.customer.name)}
      ${row("Phone", b.customer.phone)}
      ${row("Email", b.customer.email ?? "—")}
      ${row("Notes", b.notes ?? "—")}
      ${row("Photos", photoLine(photoCount, note))}
      ${row("Parking space confirmed", b.parkingConfirmed ? "Yes" : "No")}
      ${row("Power & water access confirmed", b.utilitiesConfirmed ? "Yes" : "No")}
    </table>
    <p style="margin:16px 0 0;color:#94a3b8;font-size:12px">Submitted ${new Date().toLocaleString("en-AU", { timeZone: "Australia/Sydney" })} (Sydney)</p>
  </div>`;
}

/**
 * Sends one email attempt. Throws on SMTP/transport failure — callers that
 * want a resilient, non-blocking send should use {@link dispatchBookingEmail}
 * instead of calling this directly.
 *
 * @param note Optional extra context appended to the "Photos" line, e.g. to
 *   flag that some photos couldn't be read or attached.
 * @returns `true` if an email was actually dispatched, `false` if SMTP isn't
 *   configured (the payload is logged instead so nothing is lost locally).
 */
export async function sendBookingEmail(
  booking: EnrichedBooking,
  photos: EmailAttachment[] = [],
  note?: string,
): Promise<boolean> {
  const tx = transport();

  if (!tx) {
    console.warn(
      "[email] SMTP not configured — booking not emailed. Payload:",
      textBody(booking, photos.length, note),
    );
    return false;
  }

  const s = summarise(booking);
  await tx.sendMail({
    from: process.env.SMTP_FROM || `"${site.name} Website" <${process.env.SMTP_USER}>`,
    to: TO,
    replyTo: booking.customer.email
      ? `"${booking.customer.name}" <${booking.customer.email}>`
      : undefined,
    subject: `New booking — ${s.packageName} in ${booking.suburb} (${booking.reference})`,
    text: textBody(booking, photos.length, note),
    html: htmlBody(booking, photos.length, note),
    attachments: photos.map((p) => ({
      filename: p.filename,
      content: p.content,
      contentType: p.contentType,
    })),
  });

  return true;
}

/**
 * Fire-and-forget email dispatch for a booking request.
 *
 * Never throws — callers (the API route) should call this *without*
 * awaiting it so the customer gets their booking reference immediately
 * instead of waiting on SMTP round-trip latency. Runs on the same Node
 * process after the response is sent, which is safe on a long-running
 * server (e.g. `next start` behind PM2); it would need a queue or
 * `waitUntil` on a serverless/edge host where the runtime can be frozen
 * right after the response returns.
 *
 * If sending with photo attachments fails (a bad/corrupt attachment, an
 * oversized payload rejected by the SMTP server, etc.) the booking details
 * are NOT dropped — we retry once, without the attachments, so the lead
 * still reaches the inbox.
 *
 * @param photoReadFailures Count of photos that failed to parse before
 *   reaching this function (see the API route) — reported in the email so
 *   nothing is silently lost.
 */
export async function dispatchBookingEmail(
  booking: EnrichedBooking,
  photos: EmailAttachment[],
  photoReadFailures = 0,
): Promise<void> {
  const readNote =
    photoReadFailures > 0
      ? `${photoReadFailures} photo(s) couldn't be read and were skipped.`
      : undefined;

  try {
    const sent = await sendBookingEmail(booking, photos, readNote);
    if (sent) {
      console.info(
        `[booking] email sent for ${booking.reference}` +
          (photos.length > 0 ? ` with ${photos.length} photo(s)` : ""),
      );
    }
  } catch (error) {
    console.error(
      `[booking] email dispatch failed for ${booking.reference}` +
        (photos.length > 0 ? " (with photo attachments)" : ""),
      error,
    );

    if (photos.length === 0) return;

    // Don't let an attachment problem cost us the whole lead — resend with
    // just the booking details and a note explaining the photos are missing.
    try {
      await sendBookingEmail(
        booking,
        [],
        `${photos.length} photo(s) failed to send — check server logs for reference ${booking.reference}, or ask the customer to resend them.`,
      );
    } catch (fallbackError) {
      console.error(
        `[booking] fallback email (without photos) also failed for ${booking.reference}`,
        fallbackError,
      );
    }
  }
}
