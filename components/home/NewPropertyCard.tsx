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
  const cursorFollowRef = useRef<HTMLDivElement | null>(null);

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

  // Cursor follow logic
  React.useEffect(() => {
    function isLargeScreen() {
      return typeof window !== "undefined" && window.innerWidth >= 1024;
    }

    const container = containerRef.current;
    const cursorDiv = cursorFollowRef.current;

    if (!container || !cursorDiv) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isLargeScreen()) return;
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      gsap.to(cursorDiv, {
        x: x,
        y: y,
        duration: 0.8,
        ease: "expo.inout",
      });
    };

    const handleMouseEnter = () => {
      if (!isLargeScreen()) return;
      gsap.to(cursorDiv, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "power3.out",
      });
    };

    const handleMouseLeave = () => {
      if (!isLargeScreen()) return;
      gsap.to(cursorDiv, {
        opacity: 0,
        scale: 0.8,
        duration: 0.5,
        ease: "power3.out",
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    // Initial hidden state for cursorDiv
    gsap.set(cursorDiv, { opacity: 0, scale: 0.8 });

    // Clean up
    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-[40vh] lg:h-screen w-full workcard-main overflow-hidden relative"
      // style={{ cursor: "none" }}
    >
      {/* Cursor Follow - Only appears on large screens */}
      <div
        ref={cursorFollowRef}
        className={`
          absolute 
          top-0 
          left-0 
          w-28 
          h-28 
          opacity-0 
          rounded-full
          pointer-events-none
          border border-white/40
          z-20
          -translate-x-1/2 
          -translate-y-1/2
          flex justify-center items-center
          text-xs text-white mix-blend-difference
          hidden lg:flex
        `}
        style={{ pointerEvents: "none" }}
      >
        <h1>view property</h1>
      </div>
      <div className=" h-full w-full">
        <img
          ref={imgRef}
          className=" h-[120%] w-full object-cover"
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