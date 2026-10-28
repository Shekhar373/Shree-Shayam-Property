"use client"
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import React, { useRef } from "react";

type ServiceCard = {
  title: String,
  description: String
}

const ServiceCardComponent = ({title, description}:ServiceCard) => {
  const containerRef = useRef(null)
  gsap.registerPlugin(ScrollTrigger, SplitText)

  useGSAP(
    () => {
      SplitText.create(".service-card h1", {
        type: "lines",
        mask: "lines",
        autoSplit: true,

        onSplit(text) {
          return gsap.from(text.lines, {
            yPercent: 100,
            autoAlpha: 0,
            duration: 1.2,
            stagger: {
              amount: 0.6,
            },
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              // markers:true,
              start: "top 90%",
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
      className="service-card flex h-auto w-full items-center border-t border-black/15 py-5 lg:h-[20vh] lg:py-0"
    >
      <div className="flex h-auto w-full min-w-0 flex-col gap-3 lg:h-[14vh] lg:flex-row lg:justify-between lg:gap-10">
        <div className="font-medium">
          <h1>01</h1>
        </div>
        <div className="flex min-w-0 flex-col justify-between gap-2 lg:gap-0">
          <h1 className="text-xl lg:text-3xl">{title}</h1>
          <h1 className="text-xs leading-relaxed lg:text-sm lg:leading-normal">
            {description}
          </h1>
        </div>
        <div className="hidden lg:block"></div>
      </div>
    </div>
  );
};

export default ServiceCardComponent;
