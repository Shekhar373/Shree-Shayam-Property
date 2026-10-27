import React from "react";

const PropertyHero = () => {
  return (
    <div
      className="
      w-full 
      flex 
      flex-col md:flex-row 
      p-5 md:p-10 
      pt-[10vh] md:pt-[20vh] 
      h-auto md:h-[70vh] 
      gap-8 md:gap-0
    "
    >
      <div
        className="
        w-full md:w-1/3 
        max-md:gap-5
        flex flex-col 
        justify-center
        items-start
        text-left
      "
      >
        <h1 className="text-lg md:text-lg">Properties</h1>
        <h1
          className="
          max-md:pr-[20vw]
          text-lg md:text-lg 
          tracking-tight 
         text-gray-500
          leading-snug md:leading-tight
        "
        >
          A trusted partner in finding spaces that feel like yours.
        </h1>
      </div>
      <div
        className="
        w-full md:w-2/3 flex items-end
      "
      >
        <h1
          className="
          text-3xl md:text-5xl 
           leading-[8vw] md:leading-tight
          text-left
        "
        >
          <span className="lg:pl-[10vw] lg:leading-tight">Browse</span> residences and commercial spaces chosen for quality, location, and lasting value.
        </h1>
      </div>
    </div>
  );
};

export default PropertyHero;
