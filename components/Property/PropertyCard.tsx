"use client";

import Link from "next/link";
import { MapPin, BedDouble, Bath, Maximize } from "lucide-react";
import { PropertyTypeData } from "@/types/PropertyType";

export default function PropertyCard(props:PropertyTypeData) {
  const property = props;
  const formattedPrice = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2,
  }).format(property.price ?? 0);

  // Support backward compatibility: Try to get the first image if available
  const getImageUrl = (): string | null => {
    const firstImage = property.images?.[0];
  
    if (typeof firstImage === "string") {
      return firstImage;
    }
  
    if (firstImage && typeof firstImage === "object") {
      return firstImage.url || null;
    }
  
    if (typeof (property as any).image === "string") {
      return (property as any).image;
    }
  
    return null;
  };

  return (
    <article className="group min-w-0 text-[#20211f]">
      {/* Property Image */}
      <div className="relative aspect-[1.12/1] overflow-hidden bg-[#e5e7e2]">
        <Link
          href={`/properties/${property._id}`}
          aria-label={`View ${property.title}`}
          className="absolute inset-0"
        >
          {getImageUrl() ? (
            <img
              src={getImageUrl()}
              alt={property.title}
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
                transition: "transform 0.7s ease-out",
              }}
              className="object-cover transition-all group-hover:scale-[1.04] w-full h-full"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-neutral-500">
              No image available
            </div>
          )}
        </Link>

        {/* Listing Type */}
        <span className="absolute left-3 top-3 rounded-full border border-white/50 bg-[#e7ebdf]/90 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.12em] backdrop-blur-sm">
          For {property.listingType === "sale" ? "Sale" : "Rent"}
        </span>
      </div>

      {/* Property Information */}
      <div className="pt-4">
        <Link
          href={`/properties/${property._id}`}
          className="block truncate text-lg font-medium tracking-tight transition-colors hover:text-[#71816d]"
        >
          {property.title}
        </Link>

        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-[#686a65]">
          <MapPin size={14} strokeWidth={1.5} className="shrink-0" />
          <span className="truncate">
            {/* For compatibility, try locality/city/address or fallback to .location */}
            {(property as any).location ||
              (property.address &&
                (property.address.locality || property.address.city || "")) ||
              ""}
          </span>
        </p>

        {/* Price */}
        <p className="mt-4 text-lg font-medium tracking-tight">
          ₹{formattedPrice}
          {property.listingType === "rent" && (
            <span className="ml-1 text-sm font-normal text-[#686a65]">
              / month
            </span>
          )}
        </p>

        {/* Amenities */}
        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-3 text-xs text-[#555752]">
          {property.specifications.bedrooms !== undefined && property.specifications.bedrooms !== null && (
            <span className="flex items-center gap-1.5">
              <BedDouble size={17} strokeWidth={1.4} />
              {property.specifications.bedrooms} Beds
            </span>
          )}

          {property.specifications.bathrooms !== undefined && property.specifications.bathrooms !== null && (
            <span className="flex items-center gap-1.5">
              <Bath size={17} strokeWidth={1.4} />
              {property.specifications.bathrooms} Baths
            </span>
          )}

          {property.specifications.area !== undefined && property.specifications.area !== null && (
            <span className="flex items-center gap-1.5">
              <Maximize size={15} strokeWidth={1.4} />
              {property.specifications.area.toLocaleString("en-IN")} sq.ft
            </span>
          )}
        </div>

        {/* Details Link */}
        <Link
          href={`/properties/${property._id}`}
          className="mt-6 flex items-center justify-between border-t border-[#d9dcd5] py-4 text-sm text-[#657760] transition-colors hover:text-black"
        >
          <span>View property</span>
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          >
            ↗
          </span>
        </Link>
      </div>
    </article>
  );
}
