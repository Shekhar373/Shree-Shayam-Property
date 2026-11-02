"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import React, { useRef } from "react";

const HeroText = () => {
  gsap.registerPlugin(SplitText);
  const divRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    SplitText.create(".hero-heading", {
      type: "chars",
      mask: "chars",
      autoSplit: true,

      onSplit(text) {
        return gsap.from(text.chars, {
          x: 70,
          stagger: {
            amount: 0.5,
            from: "start",
          },
          duration: 2.5,
          ease: "expo.inOut",
        });
      },
    });

    tl.to(
      divRef.current,
      {
        xPercent: -100,
        duration: 1.4,
        ease: "expo.inOut",
      },
      "+=1.1",
    );

    tl.from(
      ".hero-text",
      {
        xPercent: 20,
        opacity: 0,
        stagger: {
          amount: 0.2,
          from: "end",
        },
        duration: 0.6,
      },
      "-=0.8",
    );
  }, []);

  return (
    <div className="h-screen w-full text-white relative">
      <div
        ref={divRef}
        className="h-screen w-full absolute top-0 bg-blue-700"
      ></div>
      <div className="p-10 h-full w-full relative z-10">
        <div className="h-1/2 w-full flex">
          <div className="h-full w-1/2 pt-[20vh] text-xl font-[heading-font]">
            <h1 className="hero-text">RESIDENTIAL</h1>
            <h1 className="hero-text">COMMERCIAL</h1>
            <h1 className="hero-text">INVESTMENT</h1>
          </div>
          <div className="h-full w-1/2 pt-[20vh] px-20">
            <h1 className="hero-text">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Quibusdam dignissimos impedit
            </h1>
          </div>
        </div>
        <div className="h-1/2 w-full flex pt-10 hero-heading text-[6vw] leading-[6vw] font-[heading-font]">
          <div className="h-full w-1/2 ">
             <h1>FIND A SPACE</h1>
          </div>
          <div className="h-full w-1/2 pt-20">
               <h1>THAT FEELS LIKE YOURS</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroText;
