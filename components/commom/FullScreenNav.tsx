
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const navLinks = [
  { number: "01", title: "Home", href: "/" },
  { number: "02", title: "Properties", href: "/properties" },
  { number: "03", title: "Services", href: "/services" },
  { number: "04", title: "Why Us", href: "/about" },
  { number: "05", title: "Contact", href: "/contact" },
];

export default function FullScreenNav() {
  const [isOpen, setIsOpen] = useState(false);

  // Refs
  const menuRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLAnchorElement[]>([]);
  const featuredRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // GSAP Animation
  useGSAP(
    () => {
      const menu = menuRef.current;
      if (!menu) return;

      const links = linksRef.current;

      const tl = gsap.timeline({
        paused: true,
        onReverseComplete: () => {
          gsap.set(menu, {
            visibility: "hidden",
            pointerEvents: "none",
          });
        },
      });

      tl.to(menu, {
        clipPath: "inset(0 0 0% 0)",
        duration: 0.7,
        ease: "expo.inOut",
      });

      tl.fromTo(
        headerRef.current,
        { y: -20, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.5, ease: "power3.out" },
        "-=0.4"
      );

      tl.fromTo(
        links,
        { y: -45, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
        },
        "-=0.5"
      );

      if (featuredRef.current) {
        tl.fromTo(
          featuredRef.current,
          { scale: 0.94, autoAlpha: 0 },
          { scale: 1, autoAlpha: 1, duration: 0.7, ease: "power3.out" },
          "-=0.5"
        );
      }

      tl.fromTo(
        footerRef.current,
        { y: -20, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.5, ease: "power3.out" },
        "-=0.8"
      );

      timelineRef.current = tl;

      return () => {
        timelineRef.current = null;
      };
    },
    { scope: menuRef }
  );

  // Open / Close Menu
  useEffect(() => {
    const menu = menuRef.current;
    const tl = timelineRef.current;

    if (!menu || !tl) return;

    if (isOpen) {
      gsap.set(menu, {
        visibility: "visible",
        pointerEvents: "auto",
      });

      tl.play();
    } else {
      tl.reverse();
    }
  }, [isOpen]);

  // Escape Key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // Lock Background Scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Store Navigation Refs
  const setLinkRef = (
    element: HTMLAnchorElement | null,
    index: number
  ) => {
    if (element) {
      linksRef.current[index] = element;
    }
  };

  return (
    <>
      {/* Navbar Trigger */}
      <nav className="fixed left-0 top-0 z-40 flex w-full items-center justify-between px-6 py-6 text-white mix-blend-difference md:px-12">
        <Link
          href="/"
          className="text-xl tracking-wider font-medium"
        >
          ShreeShyam
        </Link>

        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={isOpen}
          className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] cursor-pointer"
        >
          Menu

          <span className="flex flex-col gap-[5px]">
            <span className="h-px w-7 bg-current" />
            <span className="h-px w-7 bg-current" />
          </span>
        </button>
      </nav>

      {/* Fullscreen Menu */}
      <div
        ref={menuRef}
        aria-hidden={!isOpen}
        className="fullscreen-menu invisible pointer-events-none fixed inset-0 z-[100] flex h-screen w-screen flex-col overflow-y-auto overscroll-contain bg-[#0d110f] px-6 py-7 text-[#f4f4f0] md:px-12"
        style={{ clipPath: "inset(0 0 100% 0)" }}
      >
        
        {/* Header */}
        <div
          ref={headerRef}
          className="flex shrink-0 items-center justify-between"
        >
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="text-lg tracking-wider"
          >
            ShreeShyam
          </Link>

          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close navigation menu"
            className="group flex items-center gap-3 text-xs uppercase tracking-wider cursor-pointer"
          >
            <span className="hidden sm:block">Close</span>

            <span className="relative block size-8">
              <span className="absolute left-0 top-1/2 h-px w-8 rotate-45 bg-white transition-transform duration-300 group-hover:rotate-0" />
              <span className="absolute left-0 top-1/2 h-px w-8 -rotate-45 bg-white transition-transform duration-300 group-hover:rotate-0" />
            </span>
          </button>
        </div>

        {/* Main Content */}
        <div className="my-auto grid grid-cols-1 gap-10 py-12 md:grid-cols-[1.8fr_0.8fr] md:items-center md:gap-14 md:py-16">

          {/* Navigation Links */}
          <div className="w-full border-t border-white/15">
            {navLinks.map((link, index) => (
              <Link
                key={link.number}
                ref={(el) => setLinkRef(el, index)}
                href={link.href}
                onClick={() => setIsOpen(false)}
                tabIndex={isOpen ? 0 : -1}
                className="group flex items-center gap-4 border-b border-white/15 py-4 transition-colors duration-300 hover:text-[#d9b879] sm:py-5 md:gap-8 md:py-3"
              >
                <span className="text-[10px] font-medium text-[#d9b879] md:text-xs">
                  {link.number}
                </span>

                <span className="text-[clamp(2rem,5.5vw,4.5rem)] overflow-clip font-medium uppercase leading-none tracking-[-0.045em] transition-transform duration-500 group-hover:translate-x-3">
                  {link.title}
                </span>

                <span className="ml-auto text-lg opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                  ↗
                </span>
              </Link>
            ))}
          </div>

          {/* Featured Property */}
          <div ref={featuredRef} className="hidden md:block">
            <Link
              href="/properties"
              onClick={() => setIsOpen(false)}
              className="group block"
            >
              <div className="aspect-[4/4.3] overflow-hidden bg-[#292c27]">
                <img
                  src="/images/featured-property.jpg"
                  alt="Featured property"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <p className="mt-4 text-[11px] uppercase tracking-wider text-white/70">
                Featured · The Terrace Residence
              </p>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <footer
          ref={footerRef}
          className="grid shrink-0 grid-cols-2 gap-8 border-t border-white/15 pt-6 pb-2 sm:grid-cols-3 md:grid-cols-4 md:items-end md:gap-6 md:pt-7"
        >
          <div>
            <p className="mb-3 text-[10px] uppercase tracking-wider text-white/60">
              Get in touch
            </p>

            <div className="flex flex-col gap-3 text-sm">
              <a href="mailto:hello@example.com" className="hover:text-[#d9b879]">
                hello@example.com
              </a>
              <a href="tel:+911234567890" className="hover:text-[#d9b879]">
                +91 12345 67890
              </a>
            </div>
          </div>

          <div>
            <p className="mb-3 text-[10px] uppercase tracking-wider text-white/60">
              Visit
            </p>
            <p className="text-sm leading-relaxed">
              Your Address,
              <br />
              New Delhi, India
            </p>
          </div>

          <div>
            <p className="mb-3 text-[10px] uppercase tracking-wider text-white/60">
              Follow
            </p>
            <div className="flex flex-col gap-3 text-sm">
              <a href="#" className="hover:text-[#d9b879]">Instagram</a>
              <a href="#" className="hover:text-[#d9b879]">LinkedIn</a>
            </div>
          </div>

          <div className="col-span-2 sm:col-span-3 md:col-span-1 md:flex md:justify-end">
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="flex w-full items-center justify-center bg-[#f1f1ed] px-6 py-4 text-sm text-[#111] transition-colors duration-300 hover:bg-[#d9b879] md:w-auto md:min-w-[150px]"
            >
              Enquire now ↗
            </Link>
          </div>
        </footer>
      </div>
    </>
  );
}
