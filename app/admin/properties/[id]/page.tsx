
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";

type Property = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  listingType: "sale" | "rent";
  propertyType: string;
  price: number | string;
  priceUnit: "total" | "monthly";
  address: {
    street?: string;
    locality: string;
    city: string;
    state: string;
    pincode?: string;
  };
  specifications: {
    bedrooms: number;
    bathrooms: number;
    area: number;
    areaUnit: string;
    parking: number;
    furnishing: string;
  };
  images: {
    url: string;
    publicId: string;
    alt?: string;
  }[];
  status: "draft" | "published" | "sold" | "rented" | "archived";
  featured: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
};

const statusStyles: Record<string, string> = {
  published: "bg-emerald-50 text-emerald-700",
  draft: "bg-amber-50 text-amber-700",
  sold: "bg-blue-50 text-blue-700",
  rented: "bg-purple-50 text-purple-700",
  archived: "bg-gray-100 text-gray-600",
};

const formatDate = (date?: string) => {
  if (!date) return "Not available";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export default function PropertyDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (!id) return;

    const getProperty = async () => {
        try {
            console.log("Property ID from URL:", id);
        
            const { data } = await axios.get(`/api/properties/${id}`);
        
            console.log("Fetched property:", data.property);
            setProperty(data.property);
          } catch (err) {
            console.error("Failed to fetch property:", err);
            setError("Failed to load property details.");
          } finally {
        setLoading(false);
      }
    };

    getProperty();
  }, [id]);

  const formatPrice = (property: Property) => {
    const price = Number(property.price);

    if (!Number.isFinite(price)) return "Price unavailable";

    return `₹${new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(price)}${
      property.priceUnit === "monthly" ? " / month" : ""
    }`;
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f5f6f2] p-8 text-[#536e59]">
        Loading property details...
      </main>
    );
  }

  if (error || !property) {
    return (
      <main className="min-h-screen bg-[#f5f6f2] p-8">
        <p className="text-red-600">
          {error || "Property not found."}
        </p>

        <Link
          href="/admin/properties"
          className="mt-4 inline-block text-[#25382d] underline"
        >
          Back to properties
        </Link>
      </main>
    );
  }

  const images = property.images || [];

  return (
    <main className="min-h-screen bg-[#f5f6f2] px-4 py-8 text-[#25382d] sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <header className="mb-8 flex flex-wrap items-start justify-between gap-5">
          <div>
            <Link
              href="/admin/properties"
              className="mb-4 inline-flex items-center gap-2 text-sm text-[#718074] hover:text-[#25382d]"
            >
              ← Back to properties
            </Link>

            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Property details
              </h1>

              <span
                className={`rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${
                  statusStyles[property.status] ||
                  "bg-gray-100 text-gray-600"
                }`}
              >
                {property.status}
              </span>
            </div>

            <p className="mt-2 text-sm text-[#7b8578]">
              Review the property listing and its information.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href={`/admin/properties/${property._id}/edit`}
              className="rounded-xl border border-[#dce2d7] bg-white px-5 py-3 text-sm font-medium transition hover:bg-[#edf0e9]"
            >
              Edit property
            </Link>

            <Link
              href={`/property/${property.slug}`}
              target="_blank"
              className="rounded-xl bg-[#25382d] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#3b5543]"
            >
              View live page ↗
            </Link>
          </div>
        </header>

        <div className="grid items-start gap-6 lg:grid-cols-[1.6fr_1fr]">
          {/* Main column */}
          <div className="space-y-6">
            {/* Image gallery */}
            <section className="overflow-hidden rounded-2xl border border-[#e4e8df] bg-white p-4 sm:p-6">
              <div className="relative flex h-64 items-center justify-center overflow-hidden rounded-xl bg-[#edf0e9] sm:h-[420px]">
                {images.length > 0 ? (
                  <img
                    src={images[activeImage]?.url}
                    alt={
                      images[activeImage]?.alt || property.title
                    }
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="text-center text-[#899287]">
                    <p className="text-4xl">⌂</p>
                    <p className="mt-2 text-sm">
                      No property images uploaded
                    </p>
                  </div>
                )}

                {images.length > 1 && (
                  <>
                    <button
                      type="button"
                      aria-label="Previous image"
                      onClick={() =>
                        setActiveImage(
                          (activeImage - 1 + images.length) %
                            images.length
                        )
                      }
                      className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-xl shadow transition hover:bg-white"
                    >
                      ‹
                    </button>

                    <button
                      type="button"
                      aria-label="Next image"
                      onClick={() =>
                        setActiveImage(
                          (activeImage + 1) % images.length
                        )
                      }
                      className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-xl shadow transition hover:bg-white"
                    >
                      ›
                    </button>
                  </>
                )}

                {images.length > 0 && (
                  <span className="absolute bottom-3 right-3 rounded-lg bg-black/60 px-3 py-1.5 text-xs text-white">
                    {activeImage + 1} / {images.length}
                  </span>
                )}
              </div>

              {images.length > 1 && (
                <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
                  {images.map((image, index) => (
                    <button
                      key={image.publicId || image.url}
                      type="button"
                      onClick={() => setActiveImage(index)}
                      aria-label={`View image ${index + 1}`}
                      className={`h-16 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition ${
                        activeImage === index
                          ? "border-[#536e59]"
                          : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={image.url}
                        alt={image.alt || `${property.title} ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </section>

            {/* Overview */}
            <section className="rounded-2xl border border-[#e4e8df] bg-white p-6 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#899287]">
                    {property.listingType === "sale"
                      ? "Property for sale"
                      : "Property for rent"}
                  </p>

                  <h2 className="text-2xl font-semibold tracking-tight">
                    {property.title}
                  </h2>

                  <p className="mt-2 text-sm text-[#899287]">
                    {[
                      property.address?.locality,
                      property.address?.city,
                      property.address?.state,
                    ]
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                </div>

                {property.featured && (
                  <span className="rounded-full bg-[#f3eedc] px-3 py-1.5 text-xs font-semibold text-[#92753b]">
                    Featured listing
                  </span>
                )}
              </div>

              <div className="my-6 border-t border-[#edf0e9]" />

              <p className="text-3xl font-semibold tracking-tight">
                {formatPrice(property)}
              </p>

              <p className="mt-1 text-xs capitalize text-[#899287]">
                {property.propertyType} ·{" "}
                {property.priceUnit === "monthly"
                  ? "Monthly pricing"
                  : "Total price"}
              </p>

              <div className="my-6 border-t border-[#edf0e9]" />

              <h3 className="mb-3 font-semibold">Description</h3>

              <p className="whitespace-pre-wrap text-sm leading-7 text-[#687466]">
                {property.description || "No description provided."}
              </p>
            </section>

            {/* Specifications */}
            <section className="rounded-2xl border border-[#e4e8df] bg-white p-6 sm:p-8">
              <h2 className="mb-6 text-lg font-semibold">
                Property specifications
              </h2>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {[
                  {
                    label: "Bedrooms",
                    value: property.specifications?.bedrooms ?? 0,
                  },
                  {
                    label: "Bathrooms",
                    value: property.specifications?.bathrooms ?? 0,
                  },
                  {
                    label: "Area",
                    value: `${property.specifications?.area ?? 0} ${
                      property.specifications?.areaUnit || "sqft"
                    }`,
                  },
                  {
                    label: "Parking spaces",
                    value: property.specifications?.parking ?? 0,
                  },
                  {
                    label: "Furnishing",
                    value:
                      property.specifications?.furnishing ||
                      "Not specified",
                  },
                  {
                    label: "Property type",
                    value: property.propertyType,
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl bg-[#f7f8f5] p-4"
                  >
                    <p className="text-xs text-[#899287]">
                      {item.label}
                    </p>
                    <p className="mt-2 break-words text-sm font-semibold capitalize">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Address */}
            <section className="rounded-2xl border border-[#e4e8df] bg-white p-6 sm:p-8">
              <h2 className="mb-5 text-lg font-semibold">
                Location details
              </h2>

              <div className="space-y-4 text-sm">
                {property.address?.street && (
                  <div>
                    <p className="text-xs text-[#899287]">Street</p>
                    <p className="mt-1">{property.address.street}</p>
                  </div>
                )}

                <div>
                  <p className="text-xs text-[#899287]">Locality</p>
                  <p className="mt-1">
                    {property.address?.locality}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-[#899287]">City and state</p>
                  <p className="mt-1">
                    {property.address?.city},{" "}
                    {property.address?.state}
                  </p>
                </div>

                {property.address?.pincode && (
                  <div>
                    <p className="text-xs text-[#899287]">Pincode</p>
                    <p className="mt-1">
                      {property.address.pincode}
                    </p>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <section className="rounded-2xl border border-[#e4e8df] bg-white p-6">
              <h2 className="mb-5 text-lg font-semibold">
                Listing information
              </h2>

              <div className="space-y-5">
                <div>
                  <p className="text-xs text-[#899287]">
                    Listing status
                  </p>
                  <p className="mt-1 font-medium capitalize">
                    {property.status}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-[#899287]">
                    Listing type
                  </p>
                  <p className="mt-1 font-medium capitalize">
                    For {property.listingType}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-[#899287]">
                    Featured
                  </p>
                  <p className="mt-1 font-medium">
                    {property.featured ? "Yes" : "No"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-[#899287]">
                    Date added
                  </p>
                  <p className="mt-1 font-medium">
                    {formatDate(property.createdAt)}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-[#899287]">
                    Last updated
                  </p>
                  <p className="mt-1 font-medium">
                    {formatDate(property.updatedAt)}
                  </p>
                </div>

                {property.publishedAt && (
                  <div>
                    <p className="text-xs text-[#899287]">
                      Published on
                    </p>
                    <p className="mt-1 font-medium">
                      {formatDate(property.publishedAt)}
                    </p>
                  </div>
                )}
              </div>
            </section>

            <section className="rounded-2xl border border-[#e4e8df] bg-white p-6">
              <h2 className="mb-4 text-lg font-semibold">
                Property reference
              </h2>

              <p className="text-xs text-[#899287]">Database ID</p>
              <p className="mt-2 break-all font-mono text-xs leading-6">
                {property._id}
              </p>

              <div className="my-4 border-t border-[#edf0e9]" />

              <p className="text-xs text-[#899287]">URL slug</p>
              <p className="mt-2 break-all text-sm">{property.slug}</p>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
