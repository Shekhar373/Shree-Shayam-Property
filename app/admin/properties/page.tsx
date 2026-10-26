
"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { PropertyTypeData } from "@/types/PropertyType";

const filters = [
  "all",
  "published",
  "draft",
  "sold",
  "rented",
  "archived",
] as const;

const statusStyles: Record<string, string> = {
  published: "bg-emerald-50 text-emerald-700",
  draft: "bg-amber-50 text-amber-700",
  sold: "bg-blue-50 text-blue-700",
  rented: "bg-purple-50 text-purple-700",
  archived: "bg-gray-100 text-gray-600",
};

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<PropertyTypeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] =
    useState<(typeof filters)[number]>("all");

  useEffect(() => {
    const getProperties = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get("/api/properties");

        setProperties(response.data.properties || []);
      } catch (err) {
        console.error("Failed to fetch properties:", err);

        setError(
          axios.isAxiosError(err)
            ? err.response?.data?.message ||
                "Failed to load properties."
            : "Failed to load properties."
        );
      } finally {
        setLoading(false);
      }
    };

    getProperties();
  }, []);

  const filteredProperties = useMemo(() => {
    const query = search.trim().toLowerCase();

    return properties.filter((property) => {
      const matchesFilter =
        activeFilter === "all" || property.status === activeFilter;

      const matchesSearch =
        !query ||
        property.title?.toLowerCase().includes(query) ||
        property.address?.locality?.toLowerCase().includes(query) ||
        property.address?.city?.toLowerCase().includes(query) ||
        property.slug?.toLowerCase().includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [properties, search, activeFilter]);

  const counts = useMemo(() => {
    return {
      all: properties.length,
      published: properties.filter((p) => p.status === "published").length,
      draft: properties.filter((p) => p.status === "draft").length,
      sold: properties.filter((p) => p.status === "sold").length,
      rented: properties.filter((p) => p.status === "rented").length,
      archived: properties.filter((p) => p.status === "archived").length,
    };
  }, [properties]);

  const formatPrice = (property: PropertyTypeData) => {
    const price = Number(property.price);

    if (!Number.isFinite(price)) return "Price unavailable";

    const formatted = new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(price);

    return `₹${formatted}${
      property.priceUnit === "monthly" ? "/mo" : ""
    }`;
  };

  return (
    <main className="min-h-screen bg-[#f5f6f2] px-4 py-8 text-[#25382d] sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <header className="mb-8 flex flex-wrap items-center justify-between gap-5">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#7d8b7d]">
              Property management
            </p>

            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Properties
            </h1>

            <p className="mt-2 text-sm text-[#7b8578]">
              Manage your listings and keep your inventory up to date.
            </p>
          </div>

          <Link
            href="/admin/properties/new"
            className="inline-flex items-center gap-2 rounded-xl bg-[#25382d] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#3b5543]"
          >
            <span className="text-lg leading-none">+</span>
            Add property
          </Link>
        </header>

        {/* Summary cards */}
        <section className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            {
              label: "Total properties",
              value: counts.all,
            },
            {
              label: "Published",
              value: counts.published,
            },
            {
              label: "Drafts",
              value: counts.draft,
            },
            {
              label: "Sold / rented",
              value: counts.sold + counts.rented,
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-[#e4e8df] bg-white p-5 sm:p-6"
            >
              <p className="text-sm text-[#849081]">{item.label}</p>
              <p className="mt-3 text-3xl font-semibold tracking-tight">
                {item.value}
              </p>
            </div>
          ))}
        </section>

        {/* Listings */}
        <section className="overflow-hidden rounded-2xl border border-[#e4e8df] bg-white">
          <div className="border-b border-[#edf0e9] p-5 sm:p-6">
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
              <div>
                <h2 className="text-lg font-semibold">All listings</h2>
                <p className="mt-1 text-sm text-[#899287]">
                  {filteredProperties.length} properties found
                </p>
              </div>

              <div className="relative w-full lg:max-w-sm">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#899287]">
                  ⌕
                </span>

                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search title or location..."
                  className="w-full rounded-xl border border-[#e0e5dc] bg-[#fafbf8] py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#536e59]"
                />
              </div>
            </div>

            {/* Status filters */}
            <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`shrink-0 rounded-lg px-4 py-2 text-sm capitalize transition ${
                    activeFilter === filter
                      ? "bg-[#25382d] text-white"
                      : "bg-[#f5f6f2] text-[#718071] hover:bg-[#e8ebe4]"
                  }`}
                >
                  {filter}
                  <span className="ml-2 opacity-70">
                    {counts[filter]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="p-12 text-center text-sm text-[#7b8578]">
              Loading properties...
            </div>
          ) : error ? (
            <div className="p-12 text-center">
              <p className="text-sm text-red-600">{error}</p>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-4 text-sm font-medium underline"
              >
                Try again
              </button>
            </div>
          ) : filteredProperties.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f0f2ec] text-2xl">
                ⌂
              </div>

              <h3 className="mt-4 font-semibold">
                No properties found
              </h3>

              <p className="mt-2 text-sm text-[#899287]">
                Try another search or add your first property.
              </p>

              <Link
                href="/admin/properties/new"
                className="mt-5 inline-block rounded-xl bg-[#25382d] px-5 py-3 text-sm text-white hover:bg-[#3b5543]"
              >
                Add property
              </Link>
            </div>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full text-left">
                  <thead className="bg-[#fafbf8] text-xs uppercase tracking-wider text-[#899287]">
                    <tr>
                      <th className="px-6 py-4 font-medium">Property</th>
                      <th className="px-6 py-4 font-medium">Type</th>
                      <th className="px-6 py-4 font-medium">Price</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                      <th className="px-6 py-4 font-medium">Added</th>
                      <th className="px-6 py-4 text-right font-medium">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-[#edf0e9]">
                    {filteredProperties.map((property) => (
                      <tr
                        key={property._id}
                        className="transition hover:bg-[#fafbf8]"
                      >
                        <td className="px-6 py-4">
                          <div className="flex min-w-[240px] items-center gap-4">
                            <div className="h-16 w-20 shrink-0 overflow-hidden rounded-xl bg-[#edf0e9]">
                              {property.images?.[0]?.url ? (
                                <img
                                  src={property.images[0].url}
                                  alt={
                                    property.images[0].alt ||
                                    property.title
                                  }
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <div className="flex h-full items-center justify-center text-xl text-[#899287]">
                                  ⌂
                                </div>
                              )}
                            </div>

                            <div>
                              <p className="font-medium">
                                {property.title}
                              </p>
                              <p className="mt-1 text-xs text-[#899287]">
                                {property.address?.locality},{" "}
                                {property.address?.city}
                              </p>

                              {property.featured && (
                                <span className="mt-2 inline-block rounded-md bg-[#f3eedc] px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#92753b]">
                                  Featured
                                </span>
                              )}
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <p className="text-sm capitalize">
                            {property.propertyType}
                          </p>
                          <p className="mt-1 text-xs capitalize text-[#899287]">
                            For {property.listingType}
                          </p>
                        </td>

                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                          {formatPrice(property)}
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`rounded-full px-3 py-1.5 text-xs font-medium capitalize ${
                              statusStyles[property.status] ||
                              "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {property.status}
                          </span>
                        </td>

                        <td className="whitespace-nowrap px-6 py-4 text-sm text-[#899287]">
                          {new Date(property.createdAt).toLocaleDateString(
                            "en-IN",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </td>

                        <td className="px-6 py-4 text-right">
                          <Link
                            href={`/admin/properties/${property._id}`}
                            className="text-sm font-medium text-[#536e59] hover:underline"
                          >
                            View details →
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="divide-y divide-[#edf0e9] md:hidden">
                {filteredProperties.map((property) => (
                  <article key={property._id} className="p-4">
                    <div className="flex gap-4">
                      <div className="h-24 w-28 shrink-0 overflow-hidden rounded-xl bg-[#edf0e9]">
                        {property.images?.[0]?.url ? (
                          <img
                            src={property.images[0].url}
                            alt={
                              property.images[0].alt || property.title
                            }
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-xl text-[#899287]">
                            ⌂
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="line-clamp-2 font-medium">
                          {property.title}
                        </h3>

                        <p className="mt-1 text-xs text-[#899287]">
                          {property.address?.locality},{" "}
                          {property.address?.city}
                        </p>

                        <p className="mt-2 text-sm font-semibold">
                          {formatPrice(property)}
                        </p>

                        <span
                          className={`mt-2 inline-block rounded-full px-2.5 py-1 text-xs capitalize ${
                            statusStyles[property.status] ||
                            "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {property.status}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between text-xs text-[#899287]">
                      <span className="capitalize">
                        {property.propertyType} · {property.listingType}
                      </span>

                      <Link
                        href={`/admin/properties/${property._id}`}
                        className="font-medium text-[#536e59]"
                      >
                        View details →
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
