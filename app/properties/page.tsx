import Footer from "@/components/commom/Footer";
import PropertyCard from "@/components/Property/PropertyCard";
import PropertyHero from "@/components/Property/PropertyHero";
import React from "react";

const page = () => {
  return (
    <div className="min-h-screen bg-[#EEF1EE] text-[#000001]">
      <PropertyHero />

      <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        <PropertyCard />
        <PropertyCard />
        <PropertyCard />
        <PropertyCard />
        <PropertyCard />
      </div>

      <Footer />
    </div>
  );
};

export default page;
