import Image from "next/image";
import { ImageOff } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getGalleryItems } from "@/lib/gallery";

export function GallerySection() {
  const items = getGalleryItems();

  return (
    <section id="gallery" className="scroll-mt-24 border-t border-white/10 bg-ink-900/40 py-20 lg:py-28">
      <div className="container">
        <SectionHeading
          eyebrow="Recent Work"
          title="Completed transformations across Sydney"
          description="A selection of vehicles we've recently detailed on-site. Real cars, real driveways, real results."
        />

        {items.length === 0 ? (
          <div className="surface mx-auto mt-14 flex max-w-xl flex-col items-center gap-3 p-10 text-center">
            <ImageOff className="h-8 w-8 text-slate-500" aria-hidden />
            <p className="text-sm font-semibold text-white">Gallery coming soon</p>
            <p className="text-sm text-slate-400">
              Add optimised images to{" "}
              <code className="rounded bg-ink-800 px-1.5 py-0.5 text-xs text-accent-400">
                public/data/completed-cars/
              </code>{" "}
              and they will appear here automatically.
            </p>
          </div>
        ) : (
          <ul className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, i) => (
              <li
                key={item.src}
                className="group surface overflow-hidden p-0"
              >
                <figure className="relative">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                      priority={i < 3}
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />
                  </div>
                  {item.caption ? (
                    <figcaption className="sr-only">{item.caption}</figcaption>
                  ) : null}
                </figure>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
