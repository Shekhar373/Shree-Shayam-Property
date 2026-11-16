
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function Template({
  children,
}: {
  children: React.ReactNode;
}) {
  const pageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        pageRef.current,
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          duration: 0.8,
          ease: "power2.inOut",
          clearProps: "opacity,visibility",
        }
      );
    },
    { scope: pageRef }
  );

  return <div ref={pageRef}>{children}</div>;
}
