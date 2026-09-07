import fs from "node:fs";
import path from "node:path";
import type { GalleryItem } from "@/types/detailing";

const GALLERY_DIR = path.join(process.cwd(), "public", "data", "completed-cars");
const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

/** Turn "bmw-m3-eastern-suburbs.jpg" into "BMW M3 Eastern Suburbs". */
function humanise(fileName: string): string {
  return fileName
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

/**
 * Reads completed-project images from /public/data/completed-cars at request time.
 * Drop optimised images into that folder and they appear in the gallery automatically.
 * Falls back to an empty array (the section renders a friendly placeholder).
 */
export function getGalleryItems(): GalleryItem[] {
  let files: string[] = [];
  try {
    files = fs.readdirSync(GALLERY_DIR);
  } catch {
    return [];
  }

  return files
    .filter((f) => IMAGE_EXT.has(path.extname(f).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, "en", { numeric: true }))
    .map((file, index) => {
      const label = humanise(file);
      // Generic slugs like "apex-completed-detail-01" don't make useful captions.
      const isGenericSlug = /^(apex|img|image|photo|dsc)\b|\bdetail\b/i.test(label);
      const caption = isGenericSlug
        ? `Completed detail #${index + 1} — Sydney`
        : label;
      return {
        src: `/data/completed-cars/${file}`,
        alt: `${caption} · Apex Mobile Car Detailing, Greater Sydney`,
        caption,
        width: 1200,
        height: 900,
      } satisfies GalleryItem;
    });
}
