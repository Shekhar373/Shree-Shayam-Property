import Link from "next/link";
import React from "react";

const NewHeroText = () => {
  return (
<section className="relative flex min-h-screen w-full flex-col overflow-hidden px-5 py-7 text-[#fffaf0] sm:px-8 sm:py-9 md:px-12 md:py-12 lg:px-16">

  {/* Top Categories */}
  <div className="relative z-10 flex flex-wrap items-center gap-x-2 gap-y-2 text-[9px] font-medium uppercase tracking-[0.16em] sm:gap-x-3 sm:text-[10px] sm:tracking-[0.2em] md:gap-x-4 md:text-xs md:tracking-[0.25em]">
    <span>Residential</span>
    <span className="text-[#f0d29d]">•</span>
    <span>Commercial</span>
    <span className="text-[#f0d29d]">•</span>
    <span>Investment</span>

    <div className="ml-2 hidden h-px w-12 bg-[#fffaf0]/60 sm:block md:ml-4 md:w-20" />
  </div>

  {/* Description */}
  <div className="relative z-10 ml-auto mt-12 w-[85%] max-w-[360px] border-l border-[#fffaf0]/70 pl-4 sm:mt-16 sm:w-[65%] sm:pl-5 md:absolute md:right-12 md:top-[19%] md:mt-0 md:w-[40%] md:pl-6 lg:right-16 lg:top-[22%]">
    <p className="text-xs leading-relaxed sm:text-sm sm:leading-6 md:text-base md:leading-7">
      Discover spaces designed around the way you live.
      Find a property that feels distinctly yours.
    </p>
  </div>

  {/* Main Heading and Button */}
  <div className="relative z-10 mt-auto pb-16 pt-16 sm:pb-20 md:pb-[8vh] lg:pb-[9vh]">

    <h1 className="font-serif text-[9vw] lg:text-[6vw] uppercase leading-[0.8] tracking-[-0.055em]">

      <span className="block">Find a</span>

      <span className="block italic">Space</span>

      <span className="mt-3 block text-[9vw] lg:text-[6vw] leading-[0.9] tracking-[-0.045em]">
        That feels
      </span>

      <span className="block whitespace-nowrap text-[9vw] lg:text-[6vw] italic leading-[0.9] tracking-[-0.045em] text-[#f0d29d]">
        Like yours
      </span>

    </h1>

    {/* Decorative Line */}
    <div className="ml-[24%] mt-5 hidden h-px w-[20%] bg-[#fffaf0]/70 md:block" />

    {/* Explore Properties Button */}
    <Link
      href="/properties"
      className="group mt-8 inline-flex min-h-12 items-center justify-between gap-6 rounded-full border border-[#fffaf0]/80 px-6 py-3.5 text-[9px] uppercase tracking-[0.2em] transition-colors duration-500 hover:bg-[#fffaf0] hover:text-[#292116] active:scale-[0.98] sm:mt-10 sm:gap-8 sm:px-8 sm:text-[10px] md:mt-10 md:min-h-14 md:px-10 md:text-xs"
    >
      <span>Explore Properties</span>

      <span className="text-lg transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 sm:text-xl">
        ↗
      </span>
    </Link>

  </div>

  {/* Bottom Index */}
  <div className="absolute bottom-5 right-5 hidden items-center gap-3 text-[9px] uppercase tracking-[0.2em] sm:bottom-8 sm:right-8 md:flex">
    <span className="h-px w-8 bg-[#fffaf0]/70" />
    <span>scroll to explore</span>
  </div>

</section>

  );
};

export default NewHeroText;
