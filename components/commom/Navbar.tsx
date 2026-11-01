"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const navRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const nav = navRef.current;
    if (!nav) return;

    const showAnim = gsap.from(nav, {
      yPercent: -100,
      paused: true,
      duration: 0.45,
      ease: "power3.out",
    }).progress(1);

    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        if (self.scroll() < 20) {
          showAnim.play();
          return;
        }

        if (self.direction === -1) {
          showAnim.play();
        } else {
          showAnim.reverse();
        }
      },
    });
  });

  return (
    <div
    ref={navRef}
    className="fixed top-0 z-40 w-full px-5 text-white mix-blend-difference"
  >
    <div className="grid grid-cols-3 items-center font-[heading-font]">
  
      {/* Left - Navigation Links */}
      <div className="flex items-center justify-start gap-8 text-xs font-medium">
        <Link href="/properties" className="cursor-pointer">
          Properties
        </Link>
  
        <span className="cursor-pointer whitespace-nowrap">
          Our Services
        </span>
      </div>
  
      {/* Center - Logo */}
      <div className="flex items-center justify-center">
        <span className="whitespace-nowrap text-xl font-medium tracking-wide">
          ShreeShayam
        </span>
      </div>
  
      {/* Right - Contact */}
      <div className="flex justify-end">
        <span className="cursor-pointer whitespace-nowrap text-xs font-medium">
          Contact Us
        </span>
      </div>
  
    </div>
  </div>
  )
}

export default Navbar
