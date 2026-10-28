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
              // markers:true,
              start: "top 75%",
            },
          });
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="flex min-w-0 w-full flex-col justify-between gap-8 sm:gap-10 lg:w-1/2 lg:gap-12"
    >
      <h2 className="about-text text-base leading-tight sm:text-lg md:text-xl lg:text-2xl lg:leading-tight">
        <span className="inline-block pl-3 sm:pl-10 md:pl-16 lg:pl-[6vw]">
          We
        </span>{" "}
        help you discover properties that reflect your lifestyle, ambitions, and
        vision for the future. From thoughtfully designed residences to premium
        commercial spaces, every property we present is selected with a focus on
        quality, location, and lasting value.
      </h2>

      <div className="flex w-full min-w-0 flex-col gap-6 sm:gap-8 lg:flex-row lg:gap-8">
        <div className="w-full shrink-0 text-xs leading-relaxed text-zinc-400 sm:text-sm lg:w-2/5">
          <p className="about-text">
            A trusted partner in finding spaces that feel like yours.
          </p>
        </div>

        <div className="flex w-full min-w-0 flex-col gap-4 text-sm leading-snug tracking-tight sm:gap-5 lg:w-3/5 lg:leading-tight">
          <p className="about-text">
            Real estate is more than buying, selling, or renting a property. It
            is about finding the right place to build your future.
          </p>
          <p className="about-text">
            With a deep understanding of the local market and a commitment to
            personalised service, we guide you through every step of your
            property journey. Whether you&apos;re searching for your dream home,
            a valuable investment, or the ideal commercial space, we make the
            process seamless, transparent, and rewarding.
          </p>
          <button className="px-5 py-3 bg-black text-white w-fit">
            See our work
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutRight;
