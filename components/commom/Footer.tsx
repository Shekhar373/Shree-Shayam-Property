// "use client"
import Link from "next/link";
import {
  KeyRound,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowUpRight,
} from "lucide-react";

const quickLinks = [
  { label: "Properties", href: "/properties" },
  { label: "About Us", href: "/about" },
  { label: "Our Services", href: "/services" },
  { label: "Commercial", href: "/properties?type=commercial" },
  { label: "Contact", href: "/contact" },
];

const propertyTypes = [
  { label: "Apartments", href: "/properties?type=apartment" },
  { label: "Houses", href: "/properties?type=house" },
  { label: "Villas", href: "/properties?type=villa" },
  { label: "Land / Plots", href: "/properties?type=land" },
  { label: "Commercial", href: "/properties?type=commercial" },
];

// Removed socials and social icons

export default function Footer() {
  return (
    <footer className="">
      <div className="mx-auto max-w-[1600px] overflow-hidden rounded-[28px] bg-[#f0f3ef] px-6 py-8 text-black md:px-10 md:py-10 lg:px-12">
        {/* Main footer */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-3">
            <Link href="/" className="mb-5 inline-flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
                <KeyRound size={19} strokeWidth={2} />
              </span>
              <span className="text-lg font-medium">
                 ShreeShayam
              </span>
            </Link>

            <p className="max-w-xs text-sm leading-6 text-black/55">
              Your trusted partner in finding the perfect property. We make real
              estate simple, transparent and stress-free.
            </p>
            {/* Social icons removed */}
          </div>

          {/* Quick links */}
          <div className="lg:col-span-2">
            <h3 className="mb-5 text-sm font-medium">Quick Links</h3>

            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-black/55 transition-colors duration-200 hover:text-black"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Property types */}
          <div className="lg:col-span-2">
            <h3 className="mb-5 text-sm font-medium">Property Types</h3>

            <ul className="space-y-3">
              {propertyTypes.map((type) => (
                <li key={type.label}>
                  <Link
                    href={type.href}
                    className="text-sm text-black/55 transition-colors duration-200 hover:text-black"
                  >
                    {type.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="mb-5 text-sm font-medium">Contact Us</h3>

            <div className="space-y-4 text-sm text-black/60">
              <a
                href="tel:+15551234567"
                className="flex items-start gap-3 transition-colors hover:text-black"
              >
                <Phone size={15} className="mt-0.5 shrink-0 text-black" />
                <span>+1 (555) 123-4567</span>
              </a>

              <a
                href="mailto:hello@homekeyrealty.com"
                className="flex items-start gap-3 transition-colors hover:text-black"
              >
                <Mail size={15} className="mt-0.5 shrink-0 text-black" />
                <span className="break-all">hello@homekeyrealty.com</span>
              </a>

              <div className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-black" />
                <span className="leading-6">
                  123 Skyline Drive,
                  <br />
                  San Jose, CA 95134
                </span>
              </div>

              <div className="flex items-start gap-3">
                <Clock size={16} className="mt-0.5 shrink-0 text-black" />
                <span className="leading-6">
                  Mon – Fri, 9:00 AM – 6:00 PM
                  <br />
                  (Business hours)
                </span>
              </div>
            </div>
          </div>

          {/* Contact CTA — no newsletter */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-medium">Let’s Talk</h3>

            <p className="mt-4 text-sm leading-6 text-black/55">
              Looking to buy, sell or rent a property? Let’s find the right
              opportunity for you.
            </p>

            <Link
              href="/contact"
              className="group mt-5 inline-flex items-center gap-4 rounded-full bg-black px-5 py-3.5 text-sm text-white transition-colors duration-300 hover:bg-[#354137]"
            >
              Contact Us
              <ArrowUpRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col gap-5 border-t border-black/10 pt-6 text-xs text-black/50 md:flex-row md:items-center md:justify-between">
          <p>
            ©
             {/* {new Date().getFullYear()} */}
             HomeKey Realty. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-x-6 gap-y-3">
            <Link
              href="/privacy-policy"
              className="transition-colors hover:text-black"
            >
              Privacy Policy
            </Link>

            <Link href="/terms" className="transition-colors hover:text-black">
              Terms of Service
            </Link>

            <Link
              href="/sitemap"
              className="transition-colors hover:text-black"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
