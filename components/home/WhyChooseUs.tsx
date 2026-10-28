import React from "react";
import ChooseUsCard from "./ChooseUsCard";
import ChooseUsHeader from "./ChooseUsHeader";

const WhyChooseUs = () => {
  return (
    <div className="mt-8 min-h-screen w-full p-5 sm:p-8 lg:mt-[10vh] lg:p-10">
      <ChooseUsHeader />
      <main className="mt-8 flex h-auto w-full flex-col gap-8 lg:mt-[10vh] lg:h-[80vh] lg:flex-row lg:gap-0">
          <div className="flex h-auto w-full flex-col gap-5 lg:h-full lg:w-1/2 lg:gap-10 lg:pr-25">
          <img className="h-[40vh] w-full object-cover sm:h-[50vh] lg:h-[70%]" src="https://cdn.prod.website-files.com/69e15aa1d45aa73e62a536a8/69f7d28e73a47563bcdae70c_img20%201.webp" alt="" />
          <h1 className="text-base text-gray-500 sm:text-lg">Quality, location and lasting value <br className="hidden lg:inline" /> in everything we present.</h1>
          </div>
          <div className="grid h-auto w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:h-[90%] lg:w-1/2">
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
