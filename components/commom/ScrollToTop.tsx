"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ScrollSmoother } from "gsap/ScrollSmoother";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    const smoother = ScrollSmoother.get();

    if (smoother) {
      smoother.scrollTo(0, true);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}