"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useRef } from "react";

interface NewPropertyCardProps {
  img: string;
}

const NewPropertyCard: React.FC<NewPropertyCardProps> = ({ img }) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Register GSAP plugin only once globally
  React.useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  useGSAP(() => {
    // Only setup the ScrollTrigger animation for this specific card and only on large screens
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      if (imgRef.current && containerRef.current) {
        const timeline = gsap.fromTo(
          imgRef.current,
          { scale: 1, yPercent: -30 },
          {
            scale: 1,
            yPercent: 30,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );

        // Cleanup: kill timeline and ScrollTrigger on unmount
        return () => {
          timeline.kill();
        };
      }
    });

    // Cleanup all media queries on unmount
    return () => mm.kill();
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-[40vh] lg:h-screen w-full workcard-main overflow-hidden relative"
    >
      <div className="clip-wrapper h-full w-full">
        <img
          ref={imgRef}
          className="workcard-img h-[120%] w-full object-cover"
          src={img}
          alt=""
          loading="lazy"
          draggable={false}
        />
      </div>
    </div>
  );
};

export default NewPropertyCard;
