import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CalendarCheck, Check, Clock, Phone } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { blogPosts, getPost } from "@/lib/blog";
import { site } from "@/lib/site";

interface Params {
  params: { slug: string };
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const post = getPost(params.slug);
  if (!post) return {};

  const url = `/blog/${post.slug}`;
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.metaTitle,
      description: post.metaDescription,
      publishedTime: post.date,
      modifiedTime: post.updated,
      authors: [post.author],
      siteName: site.name,
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription,
    },
  };
}

const dateFmt = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default function BlogPostPage({ params }: Params) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const canonical = `${site.url}/blog/${post.slug}`;
  const related = post.related
    .map((slug) => getPost(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${canonical}#article`,
        headline: post.title,
        description: post.metaDescription,
        datePublished: post.date,
        dateModified: post.updated,
        author: { "@type": "Organization", name: site.name, url: site.url },
        publisher: {
          "@type": "Organization",
          name: site.name,
          url: site.url,
          logo: { "@type": "ImageObject", url: `${site.url}/images/og.jpg` },
        },
        mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
        keywords: post.keywords.join(", "),
        articleSection: post.tag,
        inLanguage: "en-AU",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${site.url}/blog` },
          { "@type": "ListItem", position: 3, name: post.title, item: canonical },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: post.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };

  return (
    <article className="py-14 lg:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container max-w-3xl">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-xs text-slate-500">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li><Link href="/" className="hover:text-white">Home</Link></li>
            <li aria-hidden>/</li>
            <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
            <li aria-hidden>/</li>
            <li className="text-slate-400">{post.tag}</li>
          </ol>
        </nav>

        <header className="mt-6">
          <div className="flex flex-wrap items-center gap-3">
            <Badge tone="accent">{post.tag}</Badge>
            <span className="flex items-center gap-1.5 text-xs text-slate-500">
              <Clock className="h-3.5 w-3.5" aria-hidden />
              {post.readMinutes} min read
            </span>
          </div>
          <h1 className="mt-4 text-fluid-h2 font-bold text-white">{post.title}</h1>
          <p className="mt-4 text-fluid-lead text-slate-400">{post.metaDescription}</p>
          <p className="mt-4 text-xs text-slate-500">
            By {post.author} · Published{" "}
            <time dateTime={post.date}>{dateFmt.format(new Date(post.date))}</time>
            {post.updated !== post.date ? (
              <>
                {" "}· Updated{" "}
                <time dateTime={post.updated}>
                  {dateFmt.format(new Date(post.updated))}
                </time>
              </>
            ) : null}
          </p>
        </header>

        {/* Key takeaways */}
        <aside className="surface mt-10 p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-accent-400">
            Key takeaways
          </h2>
          <ul className="mt-4 space-y-2.5">
            {post.keyTakeaways.map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-sm text-slate-300">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-400" aria-hidden />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </aside>

        {/* Body */}
        <div className="mt-10 space-y-5">
          {post.intro.map((para) => (
            <p key={para} className="text-base leading-relaxed text-slate-300">
              {para}
            </p>
          ))}
        </div>

        {post.sections.map((section) => (
          <section key={section.heading} className="mt-12">
            <h2 className="text-xl font-bold text-white">{section.heading}</h2>
            <div className="mt-4 space-y-5">
              {section.paragraphs?.map((para) => (
                <p key={para} className="text-base leading-relaxed text-slate-300">
                  {para}
                </p>
              ))}
              {section.bullets ? (
                <ul className="space-y-2.5">
                  {section.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-2.5 text-base leading-relaxed text-slate-300"
                    >
                      <Check className="mt-1 h-4 w-4 shrink-0 text-accent-400" aria-hidden />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </section>
        ))}

        {/* Inline CTA */}
        <div className="surface mt-14 p-6 lg:p-8">
          <h2 className="text-lg font-bold text-white">
            Book a mobile detail anywhere in Sydney
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            We bring professional detailing to your home or office across Greater
            Sydney. Choose a package and we&apos;ll confirm a time that suits you.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Button href="/book" size="lg">
              <CalendarCheck className="h-5 w-5" aria-hidden />
              Book a Detail
            </Button>
            <Button href={`tel:${site.phone}`} variant="secondary" size="lg">
              <Phone className="h-5 w-5" aria-hidden />
              Call {site.phoneDisplay}
            </Button>
          </div>
        </div>

        {/* FAQ */}
        <section className="mt-14">
          <h2 className="text-xl font-bold text-white">Frequently asked questions</h2>
          <div className="mt-6 space-y-3">
            {post.faqs.map((faq) => (
              <details
                key={faq.question}
                className="surface group p-5 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-sm font-semibold text-white">
                  {faq.question}
                  <span className="text-accent-400 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Related */}
        {related.length > 0 ? (
          <section className="mt-14 border-t border-white/10 pt-10">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
              Keep reading
            </h2>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2">
              {related.map((rel) => (
                <li key={rel.slug}>
                  <Link
                    href={`/blog/${rel.slug}`}
                    className="surface group flex h-full flex-col p-5"
                  >
                    <Badge tone="neutral">{rel.tag}</Badge>
                    <span className="mt-3 flex-1 text-sm font-semibold text-white group-hover:text-accent-400">
                      {rel.title}
                    </span>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-accent-400">
                      Read article
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <div className="mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-400 hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            All articles
          </Link>
        </div>
      </div>
    </article>
  );
}
