import React from "react";

const PropertyHero = () => {
  return (
    <div className="
      w-full 
      flex 
      flex-col md:flex-row 
      p-5 md:p-10 
      pt-[10vh] md:pt-[20vh] 
      h-auto md:h-[70vh] 
      gap-8 md:gap-0
    ">
      <div className="
        w-full md:w-1/2 
        flex flex-col gap-2 md:gap-5 
        justify-center
        items-start
        text-left
      ">
        <h1 className="text-xs md:text-xs text-zinc-500">OUR SELECTION</h1>
        <h1 className="
          text-2xl md:text-4xl 
          tracking-tight 
          font-[heading-font]
          leading-snug md:leading-tight
        ">
          End-to-End Luxury Real <br className="hidden md:block" /> Estate Solutions
        </h1>
      </div>
      <div className="
        w-full md:w-1/2 
        px-0 md:px-[10vw] 
        flex items-start md:items-center
        justify-start md:justify-center
      ">
        <h1 className="
          text-sm md:text-md 
          leading-normal md:leading-tight
          text-left
        ">
          From finding the perfect residence to managing long-term value, we provide bespoke architectural sanctuaries tailored to your lifestyle, investment goals, and vision for the future.
        </h1>
      </div>
    </div>
  );
};

export default PropertyHero;
