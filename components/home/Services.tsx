import React from "react";
import ServiceCard from "./ServiceCard";

const Services = () => {
  return (
    <div className="h-screen w-full">
      <div className="flex font-[heading-font] justify-between p-10 text-[5vw] pt-[15vh]">
        <h1>OUR</h1>
        <h1>SERVICES</h1>
      </div>
    <div className="w-full overflow-hidden pt-10">
      <div className="flex gap-10 flex-nowrap w-[300vw]">
        <ServiceCard />
        <ServiceCard />
        <ServiceCard />
        <ServiceCard />
      </div>
    </div>
   
    </div>
  );
};

export default Services;
