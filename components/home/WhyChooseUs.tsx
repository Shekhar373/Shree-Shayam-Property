import React from "react";
import ChooseUsCard from "./ChooseUsCard";

const WhyChooseUs = () => {
  return (
    <div className="min-h-screen w-full p-10 mt-[10vh]">
      <header className="h-[30vh] w-full flex">
          <div className="h-full w-1/2 flex flex-col gap-10 ">  
            <h1 className="text-lg font-medium">Why choose us</h1>
            <h1 className="text-5xl ">Property advice that starts <br /> with you, not the listing.</h1>
          </div>
          <div className="h-full w-1/2 px-20 flex flex-col gap-5">  
              <h1 className="text-lg leading-tight ">Real estate is a decision about how you want to live and grow. We take the time to understand it, then guide every step with local knowledge and clear communication.</h1>
              <button className="px-7 py-4 bg-black text-white w-fit">Speak with our team</button>
          </div>
      </header>
      <main className="h-[80vh] w-full flex mt-[10vh]">
          <div className="h-full w-1/2 pr-25 flex flex-col gap-10">
          <img className="h-[70%] w-full object-cover" src="https://cdn.prod.website-files.com/69e15aa1d45aa73e62a536a8/69f7d28e73a47563bcdae70c_img20%201.webp" alt="" />
          <h1 className="text-lg text-gray-500">Quality, location and lasting value <br /> in everything we present.</h1>
          </div>
          <div className="h-[90%] w-1/2 grid grid-cols-2 gap-5">
          <ChooseUsCard />
          <ChooseUsCard />
          <ChooseUsCard />
          <ChooseUsCard />
          </div>
      </main>
    </div>
  );
};

export default WhyChooseUs;
