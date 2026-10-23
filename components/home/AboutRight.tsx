"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useRef } from "react";

const AboutRight = () => {
  gsap.registerPlugin(ScrollTrigger, SplitText);
  const containerRef = useRef(null);

  useGSAP(() => {
    SplitText.create(".about-text", {
      type: "lines",
      mask: "lines",
      autoSplit: true,

      onSplit(text) {
        return gsap.from(text.lines, {
          yPercent: 100,
          autoAlpha: 0,
          duration: 1.2,
          stagger: {
            amount: 1.2,
          },
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 40%",
            // markers: true,
          },
        });
      },
    });
  },{scope: containerRef});

  return (
    <div ref={containerRef} className="h-full w-1/2 flex flex-col gap-10">
      <h1 className="about-text text-2xl leading-tight">
        <span className="pl-[8vw]">Lenval</span> develops timeless landmarks
        shaped by architecture, design and creative landscapes with a deep
        understanding of contemporary luxury. Each project begins with a clear
        vision - to create spaces that balance elegance, privacy and enduring
        comfort. The result is architecture that is timeless and quietly
        distinctive.
      </h1>
      <div className="h-full w-full flex">
        <div className="h-full w-1/2 text-xs text-zinc-400">
          <h1 className="about-text">
            To craft exceptional properties <br /> and refined experiences.
          </h1>
        </div>
        <div className="h-full w-1/2 text-sm leading-tight tracking-tight font-medium flex flex-col gap-5">
          <h1 className="about-text">
            Lenval combines deep financial and investment expertise with a
            refined development vision to create exceptional residential,
            commercial, and hospitality properties. Our projects embody quality,
            innovation, and enduring value.
          </h1>
          <h1 className="about-text">
            Every development is approached with an uncompromising attention to
            detail and a commitment to creating landmark destinations. While our
            foundations are in Abu Dhabi, our vision is global: to develop the
            world’s most sought-after spaces.
          </h1>
          <button className="w-fit">See our work</button>
        </div>
      </div>
    </div>
  );
};

export default AboutRight;
