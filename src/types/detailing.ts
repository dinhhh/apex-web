/**
 * Core domain types for Apex Mobile Car Detailing.
 * All data structures used across marketing pages, the booking flow,
 * and the enquiry API are defined here.
 */

/** A single line item shown in a package feature checklist. */
export interface PackageFeature {
  /** Human readable feature label. */
  label: string;
  /** Whether the feature is an optional / on-request extra. */
  optional?: boolean;
  /** Grouping used to render Interior vs Exterior columns. */
  group: "interior" | "exterior" | "process";
}

/** Pricing model for a package or add-on. */
export type PriceModel =
  | { kind: "from"; amount: number; currency: "AUD" }
  | { kind: "custom"; note: string };

/** Stable identifiers for every bookable package. */
export type PackageId =
  | "deluxe"
  | "luxury"
  | "pre-sale"
  | "deep-interior"
  | "ceramic-coating";

/** A detailing package presented on the pricing section. */
export interface DetailingPackage {
  id: PackageId;
  name: string;
  tagline: string;
  price: PriceModel;
  /** Marketing badge, e.g. "Most Popular". */
  badge?: string;
  /** Short list of what makes this tier distinct. */
  highlights: string[];
  /** Full feature checklist rendered on the card. */
  features: PackageFeature[];
  /** Approximate on-site duration, in hours. */
  durationHours?: [number, number];
  /** Written protection guarantee, in years (e.g. ceramic coating). */
  guaranteeYears?: number;
  /** Marks the visually emphasised card. */
  featured?: boolean;
}

/** Optional paid extras a customer can attach to any booking. */
export interface AddOn {
  id: string;
  name: string;
  description: string;
  price: PriceModel;
}

/** A generic marketing service (used for Schema.org + service-area content). */
export interface Service {
  name: string;
  description: string;
  areaServed: string[];
}

/** A completed job shown in the gallery. */
export interface GalleryItem {
  /** Optimised image path under /public. */
  src: string;
  /** Descriptive alt text for accessibility + SEO. */
  alt: string;
  /** Optional caption shown on hover / below the image. */
  caption?: string;
  /** Intrinsic width/height for next/image (falls back to a 4:3 box). */
  width: number;
  height: number;
}

/** Vehicle details captured in the booking form. */
export interface VehicleDetails {
  make: string;
  model: string;
  year: string;
}

/** Full payload submitted from the booking / quick-enquiry form. */
export interface BookingRequest {
  vehicle: VehicleDetails;
  packageId: PackageId;
  addOnIds: string[];
  suburb: string;
  preferredDate: string;
  preferredTime: string;
  customer: {
    name: string;
    phone: string;
    email?: string;
  };
  notes?: string;
  /** Honeypot field — must be empty for a legitimate submission. */
  company?: string;
}

/** Result returned by the bookings API. */
export interface BookingResponse {
  ok: boolean;
  message: string;
  reference?: string;
  errors?: Partial<Record<string, string>>;
}
