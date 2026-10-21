import React from "react";

const AboutUs = () => {
  return (
    <div className="h-fit w-full p-10 ">
      <div>
        <div className="h-[40vh] w-full flex justify-between ">
          <div className="flex flex-col justify- w-1/2 justify-between pr-[20vw] py-5">
            <h1 className="font-[heading-font] text-5xl">About Us</h1>
            <h1 className="leading-tight">
              Our experienced team of speciallist is ready to provide you with comprehensive support of all stages os the transection
            </h1>
            <button className="w-fit bg-[#000001] text-white px-8 py-3 rounded-4xl">
              Explore more
            </button>
          </div>
          <div className="h-full w-1/2 flex flex-col justify-between py-5">
            <div className="flex justify-between px-5">
              <div>
                <h1 className="text-4xl font-bold font-[heading-font] tracking-tighter ">112</h1>
                <h1 className="text-xl font-medium font-[heading-font]">Completed Deals</h1>
              </div>
              <div>
                <h1 className="text-4xl font-bold font-[heading-font] tracking-tighter ">5+</h1>
                <h1 className="text-xl font-medium font-[heading-font]">Places around Delhi</h1>
              </div>
            </div>
            <div className="flex justify-between px-5">
              <div>
                <h1 className="text-4xl font-bold font-[heading-font] tracking-tighter ">+100</h1>
                <h1 className="text-xl font-medium font-[heading-font]">Satisfied Constumers</h1>
              </div>
              <div>
                <h1 className="text-4xl font-bold font-[heading-font] tracking-tighter ">15</h1>
                <h1 className="text-xl font-medium font-[heading-font]">Years of experience</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[60vh] w-full">
          <img className="h-full w-full object-cover" src="#" alt="" />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
