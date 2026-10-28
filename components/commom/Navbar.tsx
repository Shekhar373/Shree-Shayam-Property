"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
    <div ref={navRef} className='p-5 overflow-hidden fixed top-0 w-full z-50 text-white mix-blend-difference'>
      <div className=' flex items-center justify-between font-[heading-font]'>
        {/* Left - Logo and Title */}
        <div className='flex gap-2 items-center'>
          <img
            className='h-8 w-8 object-cover rounded-full'
            src="https://i.pinimg.com/1200x/d5/1c/a8/d51ca8e3f2e37e22ab7d5842e6480720.jpg"
            alt="ShreeShayam Logo"
          />
          <span className='text-md font-medium tracking-wide'>ShreeShayam</span>
        </div>
        {/* Center - Menu */}
        <div className='flex gap-8 items-center text-sm font-medium'>
          <span>Properties</span>
          <span>Our Services</span>
          <span>About</span>
          <span>Houses</span>
        </div>
        {/* Right - Contact Button */}
        <div>
          <span className='text-sm  font-semibold'>
            Contact Us
          </span>
        </div>
      </div>
    </div>
  )
}

export default Navbar
