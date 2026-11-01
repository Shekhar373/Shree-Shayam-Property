"use client";

import { ReactNode, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

interface SmothScrollerProps {
  children: ReactNode;
}

export default function SmotheScroller({
  children,
}: SmothScrollerProps) {
  useEffect(() => {
    if (window.matchMedia("(max-width: 767px)").matches) return;

    let smoother: ScrollSmoother | null = null;

    const frame = requestAnimationFrame(() => {
      smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.5,
        effects: true,
        smoothTouch: 0.1,
      });
    });

    return () => {
      cancelAnimationFrame(frame);
      smoother?.kill();
    };
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}