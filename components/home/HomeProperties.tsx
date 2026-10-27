import React from "react";
import NewPropertyCard from "./NewPropertyCard";

export const HomeProperties = () => {
  return (
    <div className="h-fit w-full mb-[20vh] relative z-10 bg-[#EEF1EE]">
      <div className="p-5 lg:p-10 text-2xl lg:text-6xl tracking-tight">
        <h1>Featured Properties</h1>
      </div>

      <div className="flex flex-col gap-5 lg:gap-0">
        <NewPropertyCard img={"https://cdn.prod.website-files.com/69e0bb41d2ab22009f0e60c1/6a7f7f8d8121287c482aced6_project-s-9.webp"} />
        <NewPropertyCard img={"https://cdn.prod.website-files.com/69e15aa1d45aa73e62a536a8/6a778aab1f6681ee558e6866_the-den-13.webp"} />
        <NewPropertyCard img={"https://cdn.prod.website-files.com/69e15aa1d45aa73e62a536a8/69f7d28e73a47563bcdae70c_img20%201.webp"} />
      </div>
    </div>
  );
};
