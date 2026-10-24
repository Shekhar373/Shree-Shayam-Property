"use client";
import React, { useRef } from "react";
import gsap from "gsap";

// Rewritten as a separate component for cursor-follow effect, only renders on large screens
const PropertyCardCursor = ({ img }) => {
  const imgRef = useRef(null);
  const containerRef = useRef(null);
  const cursorFollowRef = useRef(null);

  // Helper to check for large screens only
  const isLargeScreen = () =>
    typeof window !== "undefined" && window.innerWidth >= 1024;

  // Mouse move event handler to move cursor-follow div - enabled only on large screens
  const handleMouseMove = (e) => {
    if (!isLargeScreen()) return;
    if (cursorFollowRef.current && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      gsap.to(cursorFollowRef.current, {
        x: x,
        y: y,
        duration: 0.8,
        ease: "expo.inOut",
      });
    }
  };

  // Hide cursor-follow when mouse leaves (on large screens)
  const handleMouseLeave = () => {
    if (!isLargeScreen()) return;
    if (cursorFollowRef.current) {
      gsap.to(cursorFollowRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.5,
        ease: "power3.out",
      });
    }
  };

  // Show cursor-follow when mouse enters (on large screens)
  const handleMouseEnter = () => {
    if (!isLargeScreen()) return;
    if (cursorFollowRef.current) {
      gsap.to(cursorFollowRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "power3.out",
      });
    }
  };

  return (
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
          cursor-pointer
          border border-white/40
          z-10
          -translate-x-1/2 
          -translate-y-1/2
          flex justify-center items-center
          text-xs text-white mix-blend-difference
          pointer-events-none
          hidden lg:flex
        `}
        style={{ pointerEvents: "none" }}
      >
        <h1>view property</h1>
      </div>
  );
};

export default PropertyCardCursor;
