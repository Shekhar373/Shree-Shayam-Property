import React from "react";

const Hero = () => {
  return (
    <div className="h-screen w-full p-10">
      <div className=" h-[80vh] rounded-4xl overflow-hidden mt-15 relative">

     <div className="absolute top-10 left-20 font-[heading-font] text-5xl">
     <h1 className="mix-blend-difference text-white">
          Find Your Perfect <br /> Place To Call Home
        </h1>
     </div>
        <img
          className="h-full w-full object-top"
          src="https://i.pinimg.com/1200x/70/aa/54/70aa54462d1eeb42679fa42c803823d6.jpg"
          alt=""
        />
      </div>
    </div>
  );
};

export default Hero;
