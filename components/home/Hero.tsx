import React from "react";

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
        className="absolute top-0 left-0 z-0 h-full w-full object-cover"
        src="https://assets.lenvalproperties.com/projects/project-j_src.mp4"
      />
    </section>
  );
};

export default Hero;
