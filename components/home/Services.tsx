import React from "react";
import ServiceHeader from "./ServiceHeader";
import ServiceCard from "./ServiceCard";
import NewServiceCard from "./NewServiceCard";

const Services = () => {
  return (
    <div className="h-fit lg:min-h-screen w-full ">
      <ServiceHeader />
      <NewServiceCard />
    </div>
  );
};

export default Services;
