import React from "react";

const UpperForm = () => {
  return (
    <div className="h-screen w-full mt-[10vh] relative overflow-hidden">
      <div data-speed="0.8" >
        <img
          className="h-[120%] w-full object-cover"
          src="https://cdn.prod.website-files.com/69e15aa1d45aa73e62a536a8/69f7d28e73a47563bcdae70c_img20%201.webp"
          alt=""
        />
      </div>
      <div className="absolute top-0 h-screen w-full">
        <h1></h1>
      </div>
    </div>
  );
};

export default UpperForm;
