import React from "react";

const PropertyCard = () => {
  return (
    <div className="h-[60vh] w-[25vw] bg-white rounded-4xl p-2">
      <div className="h-[35vh] w-full rounded-4xl overflow-hidden">
        <img className="h-full w-full object-center" src="https://i.pinimg.com/1200x/0a/c5/d1/0ac5d1c4dfe0338c52bd63f2e213dea8.jpg" alt="" />
      </div>
      <div className="flex flex-col justify-around h-[25vh] w-full p-2">
        <div className="flex gap-2 text-sm text-zinc-500">
            <h1>74sqf</h1>
            <h1>appartment</h1>
        </div>
        <div className="flex gap-2">
            <span className="border border-zinc-400 rounded-4xl text-sm px-2">2 bedrooms</span>
            <span className="border border-zinc-400 rounded-4xl text-sm px-2">2 bathrooms</span>
       
        </div>
        <div className="flex items-center"> 
            <h1 className="text-3xl font-bold font-[heading-font]">rs 25,000/-</h1>
            <button
                className="mt-auto ml-auto flex h-[52px] w-[52px]
                  shrink-0 items-center justify-center rounded-full
                  bg-black font-extralight text-3xl text-white transition-transform
                  duration-300 hover:scale-110"
              >
                ↗
              </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
