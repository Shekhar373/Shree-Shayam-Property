import React from "react";
import AboutLeft from "./AboutLeft";
import AboutRight from "./AboutRight";

const About = () => {
  return (
    <div className="relative z-10 flex h-fit lg:h-screen w-full flex-col gap-8 bg-[#EEF1EE] p-5 sm:p-8 lg:flex-row lg:items-start lg:gap-12 lg:p-10">
      <AboutLeft />
      <AboutRight />
    </div>
  );
};

export default About;
