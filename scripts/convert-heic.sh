#!/usr/bin/env bash
#
# Convert every HEIC image in the gallery folder to a web-ready JPG, then
# delete the original HEIC file.
#
#   ./scripts/convert-heic.sh [target-dir]
#
# Defaults to public/data/completed-cars. Requires macOS `sips` (preinstalled).

set -euo pipefail

DIR="${1:-public/data/completed-cars}"
MAX_DIM=1600      # longest edge, in pixels
QUALITY=78        # JPEG quality (0-100)

if ! command -v sips >/dev/null 2>&1; then
  echo "error: 'sips' not found (this script needs macOS)." >&2
  exit 1
fi

if [ ! -d "$DIR" ]; then
  echo "error: directory not found: $DIR" >&2
  exit 1
fi

shopt -s nullglob nocaseglob
files=("$DIR"/*.heic)
shopt -u nocaseglob

if [ ${#files[@]} -eq 0 ]; then
  echo "No HEIC files in $DIR — nothing to do."
  exit 0
fi

converted=0
for src in "${files[@]}"; do
  base="$(basename "$src")"
  out="$DIR/${base%.*}.jpg"

  if [ -e "$out" ]; then
    echo "skip: $out already exists (leaving $base in place)"
    continue
  fi

  sips -s format jpeg -s formatOptions "$QUALITY" -Z "$MAX_DIM" "$src" --out "$out" >/dev/null
  rm -f "$src"
  echo "converted: $base -> $(basename "$out")"
  converted=$((converted + 1))
done

echo "Done. Converted $converted file(s)."
echo "Rebuild (npm run build) or restart the dev server to see them on the site."
