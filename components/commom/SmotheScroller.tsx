
"use client";

import { ReactNode, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

interface SmoothScrollerProps {
  children: ReactNode;
}

export default function SmoothScroller({
  children,
}: SmoothScrollerProps) {
  useEffect(() => {
    if (window.matchMedia("(max-width: 767px)").matches) return;
  
    let smoother: ScrollSmoother | null = null;
    let raf1 = 0, raf2 = 0;
  
    const init = () => {
      // two frames = after hydration commit has painted
      raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => {
          smoother = ScrollSmoother.create({
            wrapper: "#smooth-wrapper",
            content: "#smooth-content",
            smooth: 1.5,
            effects: true, // applies [data-speed] / [data-lag] for you
            smoothTouch: 0.1,
          });
        });
      });
    };
  
    if (document.readyState === "complete") init();
    else window.addEventListener("load", init, { once: true });
  
    return () => {
      window.removeEventListener("load", init);
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      smoother?.kill();
    };
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}
