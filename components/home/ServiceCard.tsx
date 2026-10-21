import React from "react";

const ServiceCard = () => {
  return (
    <div className="h-[70vh] w-[70vw] px-10">
      <div>
        <h1 className="text-5xl leading-10">
          Architectual <br />
          Design
        </h1>
      </div>
      <div className="flex gap-10 pt-10">
        <img className="h-[60vh] w-[60vw] object-cover" src="https://www.tarqstudio.com/_next/image?url=%2Fprocess%2F01.avif&w=1080&q=75" alt="" />
        <h1 className="text-xl font-light">We design buildings from strategic planning to execution, considering structure, materials and spatial efficiency.</h1>
        

      </div>
    </div>
  );
}; 

export default ServiceCard;
