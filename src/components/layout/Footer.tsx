import Link from "next/link";
import { Clock, Map, Mail, MapPin, Phone, Sparkles } from "lucide-react";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { TikTokIcon } from "@/components/ui/TikTokIcon";
import { nav, site } from "@/lib/site";

const socialLinks = [
  { href: site.socials.instagram, label: "Instagram", icon: InstagramIcon },
  { href: site.socials.tiktok, label: "TikTok", icon: TikTokIcon },
  { href: site.socials.googleMaps, label: "Find us on Google Maps", icon: Map },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-ink-900">
      <div className="container grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/15 text-accent-400 ring-1 ring-inset ring-accent/30">
              <Sparkles className="h-5 w-5" aria-hidden />
            </span>
            <span className="text-sm font-bold">Apex Mobile Car Detailing</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            Fully mobile, automotive-grade detailing that comes to your home or
            office across {site.region}. Contract partner to leading Sydney
            detailers.
          </p>
          <p className="mt-4 text-sm font-semibold text-accent-400">
            {site.reviews.label}
          </p>
          <ul className="mt-5 flex items-center gap-2">
            {socialLinks.map(({ href, label, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition-colors hover:border-accent/40 hover:text-accent-400"
                >
                  <Icon className="h-4 w-4" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Quick Links
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Service Areas
          </h2>
          <ul className="mt-4 grid grid-cols-1 gap-1.5 text-sm text-slate-400">
            {site.serviceAreas.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Contact & Hours
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-400">
            <li className="flex items-start gap-2.5">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent-400" aria-hidden />
              <a href={`tel:${site.phone}`} className="hover:text-white">
                {site.phoneDisplay}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent-400" aria-hidden />
              <a href={`mailto:${site.email}`} className="hover:text-white">
                {site.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-400" aria-hidden />
              <span>{site.region}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent-400" aria-hidden />
              <span>
                {site.hours.map((h) => (
                  <span key={h.day} className="block">
                    {h.day}: {h.time}
                  </span>
                ))}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col gap-3 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} Apex Mobile Car Detailing. ABN 53 698 053 182. All
            rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <Link href="/terms" className="hover:text-white">
              Terms &amp; Conditions
            </Link>
            <Link href="/terms#privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/contact" className="hover:text-white">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
