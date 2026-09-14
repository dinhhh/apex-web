/** Shared client + server limits for photos attached to a booking. */

export const MAX_PHOTOS = 10;
export const MAX_FILE_SIZE_MB = 5;
export const MAX_TOTAL_SIZE_MB = 25;

export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
];

/**
 * iOS often reports an empty/octet-stream MIME type for HEIC photos picked
 * from the camera roll, so fall back to the file extension.
 */
export function isAcceptedImage(file: { type: string; name: string }): boolean {
  if (ACCEPTED_IMAGE_TYPES.includes(file.type)) return true;
  return /\.(heic|heif|jpe?g|png|webp)$/i.test(file.name);
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const units = ["KB", "MB", "GB"];
  let value = bytes / 1024;
  let i = 0;
  while (value >= 1024 && i < units.length - 1) {
    value /= 1024;
    i++;
  }
  return `${value.toFixed(1)} ${units[i]}`;
}
