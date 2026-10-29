import React from "react";

const UpperForm = () => {
  return (
    <div className="h-fit lg:h-screen w-full mt-[10vh] relative overflow-hidden">
      <div data-speed="0.8">
        <img
          className="h-[120%] w-full object-cover"
          src="https://cdn.prod.website-files.com/69e15aa1d45aa73e62a536a8/69f7d28e73a47563bcdae70c_img20%201.webp"
          alt=""
        />
      </div>
      <div className="absolute top-0 h-screen w-full flex justify-between items-center text-white mix-blend-difference text-5xl font-[heading-font] p-5">
        <h1>Your</h1>
        <h1>Next</h1>
        <h1>Address</h1>
      </div>
      <div className="absolute bottom-5 right-5  ">
        <div className="w-[25vw] text-sm text-white">
          <h1>
            From private villas to waterfront residences, we guide you to a home
            that suits your lifestyle and your long-term goals. Honest advice,
            discreet service, and properties worth owning.
          </h1>
          <button className="underline">Explore now</button>
        </div>{" "}
      </div>
    </div>
  );
};

export default UpperForm;
