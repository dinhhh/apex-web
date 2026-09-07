import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { blogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Car Detailing Blog — Tips & Guides for Sydney Drivers",
  description:
    "Practical car detailing guides for Sydney drivers — how often to detail your car, pre-sale detailing that adds resale value, and interior steam vs shampoo cleaning.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Car Detailing Blog — Tips & Guides for Sydney Drivers",
    description:
      "Practical car detailing guides for Sydney drivers from the Apex Mobile Car Detailing team.",
    url: "/blog",
    type: "website",
  },
};

const dateFmt = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default function BlogPage() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container">
        <SectionHeading
          eyebrow="Blogs"
          title="Detailing guides for Sydney drivers"
          description="Practical, no-nonsense advice from the team — what works, what's a waste of money, and how to keep your car looking its best between details."
        />

        <ul className="mx-auto mt-14 grid max-w-4xl gap-6 sm:grid-cols-2">
          {blogPosts.map((post) => (
            <li key={post.slug}>
              <article className="surface group h-full">
                <Link
                  href={`/blog/${post.slug}`}
                  className="flex h-full flex-col p-6 focus-visible:outline-none"
                >
                  <div className="flex items-center justify-between">
                    <Badge tone="accent">{post.tag}</Badge>
                    <span className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Clock className="h-3.5 w-3.5" aria-hidden />
                      {post.readMinutes} min read
                    </span>
                  </div>
                  <h2 className="mt-4 text-lg font-bold text-white group-hover:text-accent-400">
                    {post.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">
                    {post.excerpt}
                  </p>
                  <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                    <time dateTime={post.date} className="text-xs text-slate-500">
                      {dateFmt.format(new Date(post.date))}
                    </time>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-accent-400">
                      Read
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                    </span>
                  </div>
                </Link>
              </article>
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-10 max-w-4xl text-center text-sm text-slate-500">
          More articles are on the way. Follow us for the latest detailing tips.
        </p>
      </div>
    </section>
  );
}
