"use client";

import { ReactNode, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

interface SmothScrollerProps {
  children: ReactNode;
}

// Utility function to determine if device is mobile based on window width
const isMobile = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 767px)").matches;
};

export default function SmotheScroller({ children }: SmothScrollerProps) {
  const isMobileRef = useRef(false);

  useLayoutEffect(() => {
    isMobileRef.current = isMobile();

    if (!isMobileRef.current) {
      const smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.5,
        effects: true,
        smoothTouch: 0.1,
      });

      return () => {
        smoother.kill();
      };
    }
    // If mobile, do nothing
    return;
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        {children}
      </div>
    </div>
  );
}