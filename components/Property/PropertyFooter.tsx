import React from "react";

const PropertyFooter = () => {
  return (
    <div className="h-fit lg:h-[50vh] w-full bg-[#E3E8E0] my-[20vh] flex flex-col lg:flex-row justify-center items-center max-md:py-10">
      <div className="h-fit w-full lg:w-2/3 p-5 lg:p-10 lg:pr-25 flex flex-col gap-3 lg:gap-5">
        <h1 className="text-xs font-medium">Looking for something specific?</h1>
        <h1 className="text-2xl lg:text-4xl max-md:leading-tight">
          Tell is what you need and we will find the space that feels like
          yours.
        </h1>
      </div>
      <div className="h-fit w-full lg:w-1/3 flex gap-5 max-md:px-5">
        <button className="w-full px-5 py-2 lg:py-3 bg-black text-xs text-white lg:w-fit cursor-pointer text-nowrap">
          Share your requirement
        </button>
        <button className="w-full px-5 py-2 lg:py-3 bg-white text-xs text-black lg:w-fit cursor-pointer">
          Contact us
        </button>
      </div>
    </div>
  );
};

export default PropertyFooter;
