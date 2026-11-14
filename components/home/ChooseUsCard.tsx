"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { MapPin } from "lucide-react";
import React, { useRef } from "react";

type ChooseUsCard = {
  title: String;
  description: String;
  img: String;
};

const ChooseUsCard = ({ title, description, img }: ChooseUsCard) => {
  const containerRef = useRef(null);
  gsap.registerPlugin(ScrollTrigger, SplitText);

  useGSAP(
    () => {
      SplitText.create(".choose-card h1", {
        type: "lines",
        mask: "lines",
        autoSplit: true,

        onSplit(text) {
          return gsap.from(text.lines, {
            yPercent: 100,
            autoAlpha: 0,
            duration: 1.2,
            stagger: {
              amount: 0.4,
            },
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              // markers:true,
              start: "top 70%",
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
      className="flex h-full w-full flex-col justify-between border-t border-black/15 py-6 lg:py-10"
    >
      <MapPin strokeWidth={"2px"} />{" "}
      <div className=" choose-card flex flex-col gap-3 lg:gap-5">
        <h1 className="text-xl lg:text-2xl">{title}</h1>
        <h1 className="text-sm leading-tight">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat enim
          recusandae dicta.
        </h1>
      </div>
    </div>
  );
};

export default ChooseUsCard;
