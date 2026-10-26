
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  MapPin,
  BedDouble,
  Bath,
  Maximize,
  ArrowLeft,
  Phone,
} from "lucide-react";
import axios from "axios";

// Helper to get query param in client component (since useParams can't be used in client comp)
function getIdFromPath() {
  if (typeof window === "undefined") return undefined;
  // Matches /properties/[id] or /properties/[id]?...
  const match = window.location.pathname.match(/\/properties\/([^\/\?]+)/);
  return match ? decodeURIComponent(match[1]) : undefined;
}

interface Property {
  _id: string;
  title: string;
  slug?: string;
  description?: string;
  price: number;
  listingType: "sale" | "rent";

  address?: {
    locality?: string;
    city?: string;
    state?: string;
    pincode?: string;
  };

  specifications?: {
    bedrooms?: number;
    bathrooms?: number;
    area?: number;
    propertyType?: string;
  };

  images?: {
    url: string;
    alt?: string;
  }[];

  features?: string[];
}

export default function PropertyDetailsPage() {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeImage, setActiveImage] = useState(0);
  const [propertyId, setPropertyId] = useState<string | undefined>(undefined);

  // Get ID from the URL client-side
  useEffect(() => {
    const id = getIdFromPath();
    setPropertyId(id);
  }, []);

  useEffect(() => {
    if (!propertyId) return;

    async function fetchProperty() {
      try {
        setLoading(true);
        setError("");
        const response = await axios.get(`/api/properties/${propertyId}`);
        const data = response.data;
        const propertyData = data.property ?? data;
        if (!propertyData?._id) {
          throw new Error("Invalid property data received.");
        }
        setProperty(propertyData);
      } catch (err: any) {
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 404) {
            setError("Property not found.");
          } else if (err.response) {
            setError("Failed to load property details.");
          } else {
            setError(err.message || "Something went wrong.");
          }
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Something went wrong.");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchProperty();
  }, [propertyId]);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 2,
    }).format(price);

  const location = [
    property?.address?.locality,
    property?.address?.city,
    property?.address?.state,
    property?.address?.pincode,
  ]
    .filter(Boolean)
    .join(", ");

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f0f1ed] px-5 py-16 md:px-10">
        <div className="mx-auto max-w-7xl animate-pulse">
          <div className="mb-8 h-5 w-32 bg-neutral-200" />
          <div className="h-[45vh] bg-neutral-200 md:h-[65vh]" />
          <div className="mt-8 h-10 w-2/3 bg-neutral-200" />
          <div className="mt-4 h-5 w-1/3 bg-neutral-200" />
        </div>
      </main>
    );
  }

  if (error || !property) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#f0f1ed] px-5">
        <div className="text-center">
          <h1 className="text-3xl">
            {error || "Property not found"}
          </h1>
          <Link
            href="/properties"
            className="mt-6 inline-flex items-center gap-2 text-sm text-[#657760]"
          >
            <ArrowLeft size={16} />
            Back to properties
          </Link>
        </div>
      </main>
    );
  }

  const images = property.images ?? [];
  const currentImage = images[activeImage];

  return (
    <main className="min-h-screen bg-[#f0f1ed] px-5 py-8 text-[#20211f] md:px-10 md:py-12 lg:px-14">
      <div className="mx-auto max-w-[1500px]">

        {/* Back Navigation */}
        <Link
          href="/properties"
          className="mb-8 inline-flex items-center gap-2 text-sm text-neutral-600 transition-colors hover:text-black"
        >
          <ArrowLeft size={16} />
          All properties
        </Link>

        {/* Heading */}
        <section className="mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="inline-block rounded-full border border-[#cbd0c6] px-3 py-1.5 text-[10px] uppercase tracking-[0.15em]">
              For {property.listingType === "sale" ? "Sale" : "Rent"}
            </span>

            <h1 className="mt-5 text-3xl tracking-tight sm:text-4xl md:text-5xl">
              {property.title}
            </h1>

            <p className="mt-3 flex items-center gap-2 text-sm text-neutral-600">
              <MapPin size={16} />
              {location || "Location unavailable"}
            </p>
          </div>

          <div className="md:text-right">
            <p className="text-sm text-neutral-500">Property price</p>

            <p className="mt-1 text-3xl font-medium tracking-tight">
              ₹{formatPrice(property.price)}
            </p>

            {property.listingType === "rent" && (
              <span className="text-sm text-neutral-500">
                per month
              </span>
            )}
          </div>
        </section>

        {/* Main Image */}
        <section className="grid gap-3 md:grid-cols-[1fr_150px] lg:grid-cols-[1fr_200px]">
          <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200 md:aspect-[16/10]">
            {currentImage?.url ? (
              <img
                src={currentImage.url}
                alt={currentImage.alt || property.title}
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  inset: 0,
                  display: "block",
                }}
                loading="eager"
              />
            ) : (
              <div className="grid h-full place-items-center text-neutral-500">
                No property image available
              </div>
            )}
          </div>

          {/* Image Gallery */}
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto md:flex-col md:overflow-y-auto">
              {images.map((image, index) => (
                <button
                  key={`${image.url}-${index}`}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  aria-label={`View image ${index + 1}`}
                  aria-pressed={activeImage === index}
                  className={`relative aspect-square w-24 shrink-0 overflow-hidden bg-neutral-200 md:w-full ${
                    activeImage === index
                      ? "ring-2 ring-[#657760] ring-offset-2"
                      : "opacity-70 transition-opacity hover:opacity-100"
                  }`}
                >
                  <img
                    src={image.url}
                    alt={image.alt || `${property.title} ${index + 1}`}
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                      position: "absolute",
                      inset: 0,
                      display: "block",
                    }}
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          )}
        </section>

        {/* Property Information */}
        <section className="grid gap-12 py-12 lg:grid-cols-[1fr_360px] lg:py-16">

          {/* Left Content */}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#657760]">
              Property overview
            </p>

            <h2 className="mt-4 text-3xl tracking-tight">
              A place to call yours.
            </h2>

            {property.description && (
              <p className="mt-5 max-w-3xl whitespace-pre-line text-base leading-8 text-neutral-600">
                {property.description}
              </p>
            )}

            {/* Specifications */}
            <div className="mt-10 grid grid-cols-2 gap-6 border-y border-[#d9dcd5] py-7 sm:grid-cols-3">
              {property.specifications?.bedrooms !== undefined && (
                <div>
                  <BedDouble size={21} strokeWidth={1.4} />

                  <p className="mt-3 text-xl">
                    {property.specifications.bedrooms}
                  </p>

                  <p className="mt-1 text-sm text-neutral-500">
                    Bedrooms
                  </p>
                </div>
              )}

              {property.specifications?.bathrooms !== undefined && (
                <div>
                  <Bath size={21} strokeWidth={1.4} />

                  <p className="mt-3 text-xl">
                    {property.specifications.bathrooms}
                  </p>

                  <p className="mt-1 text-sm text-neutral-500">
                    Bathrooms
                  </p>
                </div>
              )}

              {property.specifications?.area !== undefined && (
                <div>
                  <Maximize size={21} strokeWidth={1.4} />

                  <p className="mt-3 text-xl">
                    {property.specifications.area.toLocaleString("en-IN")}
                  </p>

                  <p className="mt-1 text-sm text-neutral-500">
                    Square feet
                  </p>
                </div>
              )}
            </div>

            {/* Additional Details */}
            <div className="mt-10">
              <h3 className="text-xl">Property details</h3>

              <div className="mt-5 divide-y divide-[#d9dcd5] border-t border-[#d9dcd5]">
                {[
                  ["Property name", property.title],
                  ["Listing type", property.listingType === "sale" ? "For Sale" : "For Rent"],
                  ["Property type", property.specifications?.propertyType],
                  ["Locality", property.address?.locality],
                  ["City", property.address?.city],
                  ["State", property.address?.state],
                  ["Pincode", property.address?.pincode],
                ]
                  .filter((item): item is [string, string] => Boolean(item[1]))
                  .map(([label, value]) => (
                    <div
                      key={label}
                      className="flex justify-between gap-4 py-4 text-sm"
                    >
                      <span className="text-neutral-500">{label}</span>
                      <span className="text-right">{value}</span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Features */}
            {property.features && property.features.length > 0 && (
              <div className="mt-10">
                <h3 className="text-xl">Features & amenities</h3>

                <div className="mt-5 flex flex-wrap gap-3">
                  {property.features.map((feature) => (
                    <span
                      key={feature}
                      className="border border-[#d9dcd5] px-4 py-2 text-sm"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Contact Card */}
          <aside className="h-fit border border-[#d9dcd5] p-6 md:p-8 lg:sticky lg:top-10">
            <p className="text-xs uppercase tracking-[0.2em] text-[#657760]">
              Interested in this property?
            </p>

            <h3 className="mt-4 text-2xl tracking-tight">
              Let's discuss your next move.
            </h3>

            <p className="mt-3 text-sm leading-6 text-neutral-600">
              Contact our team to learn more about this property or arrange a visit.
            </p>

            <Link
              href={`/contact?property=${property._id}`}
              className="mt-7 flex w-full items-center justify-center gap-2 bg-[#242522] px-5 py-4 text-sm text-white transition-colors hover:bg-[#657760]"
            >
              <Phone size={16} />
              Enquire about property
            </Link>

            <p className="mt-4 text-center text-xs text-neutral-500">
              Reference: {property._id}
            </p>
          </aside>
        </section>

      </div>
    </main>
  );
}