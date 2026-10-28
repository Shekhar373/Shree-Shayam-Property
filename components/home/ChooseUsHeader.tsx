"use client"
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger, SplitText } from 'gsap/all';
import React, { useRef } from 'react'

const ChooseUsHeader = () => {

    const containerRef = useRef(null)
    gsap.registerPlugin(ScrollTrigger, SplitText)

    useGSAP(
        () => {
          SplitText.create(".chooseUs-text h1", {
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
                //   markers:true,
                  start: "top 90%",
                },
              });
            },
          });
        },
        { scope: containerRef },
      );
  return (
    <header ref={containerRef} className="chooseUs-text flex h-auto w-full flex-col gap-6 lg:h-[30vh] lg:flex-row lg:gap-0">
          <div className="flex h-auto w-full flex-col gap-4 lg:h-full lg:w-1/2 lg:gap-10">  
            <h1 className="text-lg font-medium">Why choose us</h1>
            <h1 className="text-2xl sm:text-3xl lg:text-5xl">Property advice that starts <br className="hidden lg:inline" /> with you, not the listing.</h1>
          </div>
          <div className="flex h-auto w-full flex-col gap-5 lg:h-full lg:w-1/2 lg:px-20">  
              <h1 className="text-sm leading-relaxed sm:text-base lg:text-lg lg:leading-tight">Real estate is a decision about how you want to live and grow. We take the time to understand it, then guide every step with local knowledge and clear communication.</h1>
              <button className="w-full px-7 py-4 bg-black text-white lg:w-fit">Speak with our team</button>
          </div>
      </header>
  )
}

export default ChooseUsHeader