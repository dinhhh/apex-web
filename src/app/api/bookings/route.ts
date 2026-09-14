import { NextResponse } from "next/server";
import { addOns, getPackage } from "@/lib/packages";
import { dispatchBookingEmail, type EmailAttachment } from "@/lib/email";
import { isAcceptedImage, MAX_FILE_SIZE_MB, MAX_PHOTOS, MAX_TOTAL_SIZE_MB } from "@/lib/uploads";
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
    errors.suburb = "Please enter your address and postcode.";
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

/** Reads the booking fields + any attached photos out of a multipart submission. */
async function parseMultipart(
  request: Request,
): Promise<
  | {
      ok: true;
      payload: Partial<BookingRequest>;
      photos: EmailAttachment[];
      failedPhotoReads: number;
    }
  | { ok: false; message: string; status: number }
> {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return { ok: false, message: "Invalid request body.", status: 400 };
  }

  const str = (key: string) => (form.get(key)?.toString() ?? "").trim();
  const address = str("address");
  const postcode = str("postcode");

  const payload: Partial<BookingRequest> = {
    vehicle: { make: str("make"), model: str("model"), year: str("year") },
    packageId: str("package") as BookingRequest["packageId"],
    addOnIds: form.getAll("addOns").map((v) => v.toString()),
    suburb: [address, postcode].filter(Boolean).join(", "),
    preferredDate: str("preferredDate"),
    preferredTime: str("preferredTime"),
    customer: {
      name: str("name"),
      phone: str("phone"),
      email: str("email") || undefined,
    },
    notes: str("notes") || undefined,
    company: str("company"),
  };

  const files = form
    .getAll("photos")
    .filter((v): v is File => v instanceof File && v.size > 0);

  if (files.length > MAX_PHOTOS) {
    return {
      ok: false,
      message: `Please attach up to ${MAX_PHOTOS} photos.`,
      status: 422,
    };
  }

  let totalSize = 0;
  for (const file of files) {
    if (!isAcceptedImage(file)) {
      return {
        ok: false,
        message: `"${file.name}" isn't a supported image type.`,
        status: 422,
      };
    }
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      return {
        ok: false,
        message: `"${file.name}" is larger than ${MAX_FILE_SIZE_MB} MB.`,
        status: 422,
      };
    }
    totalSize += file.size;
  }
  if (totalSize > MAX_TOTAL_SIZE_MB * 1024 * 1024) {
    return {
      ok: false,
      message: `Total photo size can't exceed ${MAX_TOTAL_SIZE_MB} MB.`,
      status: 422,
    };
  }

  // Read each file independently — one corrupt/unreadable upload shouldn't
  // sink the whole booking. Failures are counted and reported in the email
  // rather than silently dropped (see dispatchBookingEmail).
  const results = await Promise.allSettled(
    files.map(async (file) => ({
      filename: file.name || "photo.jpg",
      content: Buffer.from(await file.arrayBuffer()),
      contentType: file.type || "image/jpeg",
    })),
  );

  const photos: EmailAttachment[] = [];
  let failedPhotoReads = 0;
  for (const result of results) {
    if (result.status === "fulfilled") {
      photos.push(result.value);
    } else {
      failedPhotoReads++;
      console.error("[booking] failed to read an uploaded photo", result.reason);
    }
  }

  return { ok: true, payload, photos, failedPhotoReads };
}

export async function POST(request: Request): Promise<NextResponse<BookingResponse>> {
  const contentType = request.headers.get("content-type") ?? "";
  let payload: Partial<BookingRequest>;
  let photos: EmailAttachment[] = [];
  let failedPhotoReads = 0;

  if (contentType.includes("multipart/form-data")) {
    const parsed = await parseMultipart(request);
    if (!parsed.ok) {
      return NextResponse.json(
        { ok: false, message: parsed.message },
        { status: parsed.status },
      );
    }
    payload = parsed.payload;
    photos = parsed.photos;
    failedPhotoReads = parsed.failedPhotoReads;
  } else {
    try {
      payload = (await request.json()) as Partial<BookingRequest>;
    } catch {
      return NextResponse.json(
        { ok: false, message: "Invalid request body." },
        { status: 400 },
      );
    }
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

  const booking = {
    ...(payload as BookingRequest),
    addOnIds: validAddOns,
    reference: ref,
  };

  console.info("[booking] new enquiry", {
    reference: ref,
    package: payload.packageId,
    addOns: validAddOns,
    suburb: payload.suburb,
    date: payload.preferredDate,
    photos: photos.length,
    failedPhotoReads,
  });

  // Intentionally not awaited: the customer gets their booking reference
  // immediately rather than waiting on SMTP latency. dispatchBookingEmail
  // never throws — it logs failures and, if attaching photos fails, retries
  // with the booking details alone so the lead is never silently dropped.
  void dispatchBookingEmail(booking, photos, failedPhotoReads);

  return NextResponse.json({
    ok: true,
    message:
      "Thanks! Your request is in. We'll call or text you shortly to confirm your on-site appointment.",
    reference: ref,
  });
}
