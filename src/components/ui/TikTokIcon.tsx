/** TikTok doesn't ship in lucide-react, so this is a small hand-rolled glyph
 * matched to the same 24x24 / stroke-free style as the other footer icons. */
export function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M16.6 5.82c-.9-.83-1.45-1.99-1.5-3.32h-2.98v13.44c0 1.4-1.14 2.54-2.55 2.54a2.55 2.55 0 0 1-2.55-2.54c0-1.4 1.14-2.54 2.55-2.54.26 0 .52.04.76.11v-3.02a5.6 5.6 0 0 0-.76-.05A5.55 5.55 0 0 0 4 16a5.55 5.55 0 0 0 5.57 5.53A5.55 5.55 0 0 0 15.12 16V8.6a8.2 8.2 0 0 0 4.72 1.5V7.12a4.87 4.87 0 0 1-3.24-1.3Z" />
    </svg>
  );
}
