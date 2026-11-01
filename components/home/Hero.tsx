import React from "react";
import HeroText from "./HeroText";

const Hero = () => {
  return (
    <section
      data-speed="0.3"
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      <video
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 -z-10 h-full w-full object-cover"
        src="https://assets.lenvalproperties.com/projects/project-j_src.mp4"
      />

      <HeroText/>
    </section>
  );
};

export default Hero;
