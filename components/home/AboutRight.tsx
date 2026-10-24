"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useRef } from "react";

const AboutRight = () => {
  gsap.registerPlugin(ScrollTrigger, SplitText);
  const containerRef = useRef(null);

  useGSAP(
    () => {
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
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="h-full w-1/2 flex flex-col gap-10">
      <h1 className="about-text text-2xl leading-tight">
        <span className="pl-[8vw]">We</span> help you discover properties that
        reflect your lifestyle, ambitions, and vision for the future. From
        thoughtfully designed residences to premium commercial spaces, every
        property we present is selected with a focus on quality, location, and
        lasting value.
      </h1>
      <div className="h-full w-full flex">
        <div className="h-full w-1/2 text-xs text-zinc-400">
          <h1 className="about-text">
            A trusted partner in finding <br /> spaces that feel like yours.
          </h1>
        </div>
        <div className="h-full w-1/2 text-sm leading-tight tracking-tight font-medium flex flex-col gap-5">
          <h1 className="about-text">
            Real estate is more than buying, selling, or renting a property. It
            is about finding the right place to build your future.
          </h1>
          <h1 className="about-text">
            With a deep understanding of the local market and a commitment to
            personalised service, we guide you through every step of your
            property journey. Whether you're searching for your dream home, a
            valuable investment, or the ideal commercial space, we make the
            process seamless, transparent, and rewarding.
          </h1>
          <button className="w-fit">See our work</button>
        </div>
      </div>
    </div>
  );
};

export default AboutRight;
