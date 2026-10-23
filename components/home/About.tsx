import React from "react";
import AboutLeft from "./AboutLeft";
import AboutRight from "./AboutRight";

const About = () => {
  return (
    <div className="h-screen relative z-10 w-full bg-[#EEF1EE] flex p-10">
      <AboutLeft />
      <AboutRight />
    </div>
  );
};

export default About;
