"use client"
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger, SplitText } from 'gsap/all';
import React, { useRef } from 'react'

const ServiceHeader = () => {

  const containerRef = useRef(null)

  gsap.registerPlugin(ScrollTrigger, SplitText)

  useGSAP(
    () => {
      SplitText.create(".service-text h1", {
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
    <div ref={containerRef} className='service-text h-fit lg:h-[40vh] w-full flex flex-col lg:flex-row lg:justify-between p-5 lg:p-10 max-md:gap-10'>
      <div className='lg:w-1/3 max-md:flex flex-col gap-2'>
        <h1 className='text-lg '>Our services</h1>
        <h1 className='text-lg traking-tight text-zinc-500'>Ways we help you find, secure and <br /> grow the right space.</h1>
      </div>
      <div className='lg:w-2/3 text-3xl lg:text-4xl leading-tight'>
        <h1><span className=' lg:pl-[10vw]'>Every</span> kind of property, guided by the same careful eye. Buy, sell, rent or invest with a team that puts your future first.</h1>
      
      </div>

    </div>
  )
}

export default ServiceHeader