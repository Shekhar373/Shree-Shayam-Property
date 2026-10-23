import React from "react";

const Hero = () => {
  return (
    <div data-speed="0.3" className="h-screen w-full">

      <video  autoPlay muted loop className="h-full -w-full object-cover absolute top-0 z-0" src="https://assets.lenvalproperties.com/projects/project-j_src.mp4"></video>
      {/* <div className=" h-[80vh] rounded-4xl overflow-hidden mt-15 relative">

     <div className="absolute top-10 left-20 font-[heading-font] text-5xl">
     <h1 className="mix-blend-difference text-white">
          Find Your Perfect <br /> Place To Call Home
        </h1>
     </div>
        <img
          className="h-full w-full object-cover"
          src="https://i.pinimg.com/1200x/70/aa/54/70aa54462d1eeb42679fa42c803823d6.jpg"
          alt=""
        />
      </div> */}
    </div>
  );
};

export default Hero;
