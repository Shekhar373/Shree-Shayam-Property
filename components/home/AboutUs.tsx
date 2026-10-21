import React from "react";

const AboutUs = () => {
  return (
    <div className="h-screen w-full p-10">
      <div>
        <div className="h-[40vh] w-full flex justify-between ">
          <div className="flex flex-col justify-around w-1/2 pr-[20vw]">
            <h1 className="font-[heading-font] text-5xl">About Us</h1>
            <h1 className="leading-tight">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur voluptatibus nisi maiores dolore dolorem exercitationem, et atque, reprehenderit laborum dolores, dolorum provident.</h1>
            <button>Explore More</button>
          </div>
          <div className="h-full w-1/2">

          </div>
        </div>
        <div className="h-[60vh] w-full bg-zinc-400">

        </div>
      </div>
    </div>
  );
};

export default AboutUs;
