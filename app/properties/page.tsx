"use client"
import Footer from "@/components/commom/Footer";
import PropertyCard from "@/components/Property/PropertyCard";
import PropertyHero from "@/components/Property/PropertyHero";
import { PropertyTypeData } from "@/types/PropertyType";
import axios from "axios";
import React, { useEffect, useState } from "react";

const PropertiesPage = () => {
  const [properties, setProperties] = useState<PropertyTypeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get("/api/properties");
        setProperties(response.data.properties || []);
      } catch (err) {
        console.error("Failed to fetch properties:", err);
        setError("Failed to fetch properties. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  return (
    <div className="min-h-screen bg-[#EEF1EE] text-[#000001]">
      <PropertyHero />

      <div className="  p-5 lg:p-10 grid grid-cols-1 md:grid-cols-3 gap-10 mt-[10vh]">
        {loading ? (
          <div className="col-span-full text-center text-lg">Loading properties...</div>
        ) : error ? (
          <div className="col-span-full text-center text-red-500">{error}</div>
        ) : properties.length === 0 ? (
          <div className="col-span-full text-center text-lg">No properties found.</div>
        ) : (
          properties.map((property) => (
            <PropertyCard key={property._id} {...property} />
          ))
        )}
      </div>

      <Footer />
    </div>
  );
};

export default PropertiesPage;
