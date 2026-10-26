import React from "react";

const Hero = () => {
  return (
    <section
      data-speed="0.3"
      className="relative h-[60vh] sm:h-[80vh] md:h-screen w-full overflow-hidden flex items-center justify-center"
    >
      <video
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 z-0 h-full w-full object-cover"
        src="https://assets.lenvalproperties.com/projects/project-j_src.mp4"
      />

      <div className="relative z-10 flex flex-col items-center justify-center w-full px-4 sm:px-8">
        <h1 className="text-center text-white font-bold font-[heading-font] text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-lg mix-blend-difference">
          Find Your Perfect <br className="hidden sm:block" /> Place To Call Home
        </h1>
      </div>
    </section>
  );
};

export default Hero;
