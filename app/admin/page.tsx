"use client";
import AdminFooter from "@/components/admin/DashBoard/AdminFooter";
import DashboardHeader from "@/components/admin/DashBoard/DashboardHeader";
import RecentPropertyRow from "@/components/admin/DashBoard/RecentProperties";
import Sidebar from "@/components/admin/DashBoard/Sidebar";
import StatCard from "@/components/admin/DashBoard/StatesSection";
import { PropertyTypeData } from "@/types/PropertyType";
import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [properties, setProperties] = useState<PropertyTypeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchproperties = async () => {
      try {
        const { data } = await axios.get("/api/properties");
        setProperties(data.properties ?? []);
      } catch (err) {
        console.error("unable to fetch properties data", err);
        setError("unable to fetch properties data");
      } finally {
        setLoading(false);
      }
    };

    fetchproperties();
  }, []);

  const totalProperties = properties.length;

  const featuredProperties = properties.filter(
    (property) => property.featured,
  ).length;

  const saleProperties = properties.filter(
    (property) => property.listingType === "sale",
  ).length;

  const rentProperties = properties.filter(
    (property) => property.listingType === "rent",
  ).length;

  const recentProperties = [...properties]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 4);

  const formatPrice = (property: PropertyTypeData) => {
    const price = Number(property.price);

    if (!Number.isFinite(price)) {
      return String(property.price);
    }

    const formatted = `₹${price.toLocaleString("en-IN")}`;

    return property.priceUnit === "monthly" ? `${formatted}/month` : formatted;
  };

  const formatStatus = (status: PropertyTypeData["status"]) => {
    if (status === "published") return "Available";
    if (status === "rented") return "Rented";
    if (status === "sold") return "Sold";
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const stats = [
    {
      title: "Total Properties",
      value: totalProperties,
      description: "All property records",
      icon: "⌂",
    },
    {
      title: "Featured Properties",
      value: featuredProperties,
      description: "Highlighted listings",
      icon: "★",
    },
    {
      title: "For Sale",
      value: saleProperties,
      description: "Properties for sale",
      icon: "↗",
    },
    {
      title: "For Rent",
      value: rentProperties,
      description: "Properties for rent",
      icon: "↔",
    },
  ];

  return (
    <main className="min-h-screen bg-[#f6f7f4] text-[#202820] md:flex">
      {/* Navigation */}
      <Sidebar />

      {/* Dashboard content */}
      <section className="min-w-0 flex-1 px-5 py-7 sm:px-8 sm:py-9 lg:px-10">
        <DashboardHeader />

        <section>
          <div className="mb-5">
            <h2 className="text-base font-semibold">Overview</h2>

            <p className="mt-1 text-xs text-gray-500">
              Your property portfolio at a glance.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat, index) => (
              <StatCard
                key={stat.title}
                title={stat.title}
                value={stat.value}
                description={stat.description}
                icon={stat.icon}
                index={index}
              />
            ))}
          </div>
        </section>

        <section className="mt-9 overflow-hidden rounded-2xl border border-[#e8eae4] bg-white">
          <div className="flex flex-wrap items-center justify-between gap-4 p-5 sm:p-7">
            <div>
              <h2 className="text-lg font-semibold">Recent Properties</h2>

              <p className="mt-1 text-sm text-gray-500">
                A quick look at your latest listings.
              </p>
            </div>

            <a
              href="/admin/properties"
              className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium transition hover:bg-gray-50"
            >
              View All Properties →
            </a>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left">
              <thead className="border-y border-[#eceee8] bg-[#fafbf9]">
                <tr className="text-[10px] uppercase tracking-[0.15em] text-gray-500">
                  <th className="px-6 py-4 font-medium">Property</th>
                  <th className="px-5 py-4 font-medium">Listing Type</th>
                  <th className="px-5 py-4 font-medium">Price</th>
                  <th className="px-5 py-4 font-medium">Status</th>
                  <th className="px-5 py-4 font-medium">Featured</th>
                  <th className="px-5 py-4 font-medium">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#eff0ec]">
                {recentProperties.map((property) => (
                  <RecentPropertyRow
                    key={property._id}
                    id={property._id}
                    name={property.title}
                    location={`${property.address.locality}, ${property.address.city}`}
                    price={formatPrice(property)}
                    type={property.listingType}
                    status={formatStatus(property.status)}
                    featured={property.featured}
                    image={property.images[0]?.url ?? ""}
                  />
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#eceee8] px-6 py-4">
            <p className="text-xs text-gray-400">
              Showing {recentProperties.length} recent properties
            </p>

            <a
              href="/admin/properties"
              className="text-xs font-medium text-[#36533e] hover:underline"
            >
              Manage listings →
            </a>
          </div>
        </section>

        <AdminFooter />
      </section>
    </main>
  );
}
