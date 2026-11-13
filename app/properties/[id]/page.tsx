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
  ArrowUpRight,
  ArrowUpDown,
  Car,
  Check,
  ChevronLeft,
  ChevronRight,
  Dumbbell,
  ShieldCheck,
  Sprout,
  Monitor,
  Waves,
  Wifi,
  Zap,
  type LucideIcon,
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

// Picks an icon for a feature from its wording. Anything unmatched gets a check mark.
const featureIcons: { match: string[]; icon: LucideIcon }[] = [
  { match: ["parking", "garage", "car port", "carport"], icon: Car },
  { match: ["pool", "swim"], icon: Waves },
  { match: ["security", "gated", "cctv", "guard"], icon: ShieldCheck },
  { match: ["wifi", "wi-fi", "smart", "internet", "broadband"], icon: Wifi },
  { match: ["garden", "terrace", "balcony", "lawn", "park"], icon: Sprout },
  { match: ["office", "study", "workspace"], icon: Monitor },
  { match: ["lift", "elevator"], icon: ArrowUpDown },
  { match: ["gym", "fitness"], icon: Dumbbell },
  { match: ["power", "backup", "generator", "inverter"], icon: Zap },
];

function featureIcon(label: string): LucideIcon {
  const text = label.toLowerCase();
  return featureIcons.find(({ match }) => match.some((m) => text.includes(m)))?.icon ?? Check;
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
      <main className="min-h-screen bg-[#F0F1EE] px-5 py-10 md:px-10 lg:px-[60px]">
        <div className="mx-auto max-w-[1500px] animate-pulse">
          <div className="mb-8 h-5 w-36 bg-[#DDE1D9]" />
          <div className="h-12 w-3/4 max-w-xl bg-[#DDE1D9]" />
          <div className="mt-4 h-5 w-1/3 max-w-xs bg-[#DDE1D9]" />
          <div className="mt-9 h-[45vh] bg-[#E3E8E0] lg:h-[632px]" />
          <div className="mt-10 grid grid-cols-3 gap-5">
            <div className="h-20 bg-[#E3E8E0]" />
            <div className="h-20 bg-[#E3E8E0]" />
            <div className="h-20 bg-[#E3E8E0]" />
          </div>
        </div>
      </main>
    );
  }

  if (error || !property) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#F0F1EE] px-5 text-[#0F1110]">
        <div className="text-center">
          <p className="text-sm font-medium text-[#5F6663]">Something went wrong</p>
          <h1 className="mt-3 text-[34px] font-normal leading-[1.1] tracking-[-0.03em] lg:text-5xl">
            {error || "Property not found"}
          </h1>
          <Link
            href="/properties"
            className="mt-8 inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-[2px] bg-[#0F1110] px-7 text-[17px] text-[#F0F1EE] transition-colors hover:bg-[#2B332F]"
          >
            <ArrowLeft size={18} strokeWidth={1.6} />
            Back to properties
          </Link>
        </div>
      </main>
    );
  }

  const images = property.images ?? [];
  const currentImage = images[activeImage];
  const hasThumbs = images.length > 1;
  const goTo = (step: number) =>
    setActiveImage((i) => (i + step + images.length) % images.length);

  const priceText = `₹${formatPrice(property.price)}`;
  const listingLabel = property.listingType === "sale" ? "For Sale" : "For Rent";
  const mapsHref = location
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`
    : undefined;

  const specs = property.specifications;
  const facts: { Icon: LucideIcon; value: string; label: string }[] = [];
  if (specs?.bedrooms !== undefined) {
    facts.push({ Icon: BedDouble, value: String(specs.bedrooms), label: "Bedrooms" });
  }
  if (specs?.bathrooms !== undefined) {
    facts.push({ Icon: Bath, value: String(specs.bathrooms), label: "Bathrooms" });
  }
  if (specs?.area !== undefined) {
    facts.push({ Icon: Maximize, value: specs.area.toLocaleString("en-IN"), label: "Square feet" });
  }

  const detailRows = [
    ["Property name", property.title],
    ["Listing type", listingLabel],
    ["Property type", property.specifications?.propertyType],
    ["Locality", property.address?.locality],
    ["City", property.address?.city],
    ["State", property.address?.state],
    ["Pincode", property.address?.pincode],
  ].filter((item): item is [string, string] => Boolean(item[1]));

  return (
    <main className="min-h-screen bg-[#F0F1EE] text-[17px] leading-[1.45] tracking-[-0.02em] text-[#0F1110] lg:text-lg pt-[5vh]">
      <div className="mx-auto max-w-[1500px] px-5 pb-16 pt-3 md:px-10 lg:px-[60px] lg:pb-24 lg:pt-5">

        {/* Back navigation and breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
          <Link
            href="/properties"
            className="inline-flex min-h-11 items-center gap-2.5 text-[15.5px] hover:underline hover:underline-offset-[6px] lg:text-base"
          >
            <ArrowLeft size={18} strokeWidth={1.6} />
            All properties
          </Link>

          <nav aria-label="Breadcrumb" className="hidden text-[15px] text-[#5F6663] lg:block">
            Properties
            {location && (
              <>
                <span className="mx-2">/</span>
                {property.address?.locality ?? property.address?.city ?? location}
              </>
            )}
            <span className="mx-2">/</span>
            <span className="text-[#0F1110]">{property.title}</span>
          </nav>
        </div>

        {/* Heading */}
        <section className="mt-5 flex flex-col justify-between gap-6 lg:mt-7 lg:flex-row lg:items-end lg:gap-12">
          <div className="min-w-0">
            <div className="flex flex-wrap gap-2">
              <span className="bg-[#0F1110] px-3 py-[5px] text-[13.5px] leading-[1.3] text-[#F0F1EE] lg:px-3.5 lg:py-1.5 lg:text-sm">
                {listingLabel}
              </span>
              {property.specifications?.propertyType && (
                <span className="border border-[#0F1110]/30 px-3 py-[5px] text-[13.5px] leading-[1.3] lg:px-3.5 lg:py-1.5 lg:text-sm">
                  {property.specifications.propertyType}
                </span>
              )}
            </div>

            <h1 className="mt-[18px] text-[42px] font-normal leading-[1.03] tracking-[-0.035em] lg:mt-5 lg:text-[72px] lg:leading-[1.02]">
              {property.title}
            </h1>

            <p className="mt-3 flex items-center gap-2 text-[17px] text-[#3F4643] lg:mt-4 lg:gap-2.5 lg:text-[19px]">
              <MapPin size={20} strokeWidth={1.6} className="shrink-0" />
              {location || "Location unavailable"}
            </p>
          </div>

          <div className="lg:text-right">
            <p className="text-[13.5px] text-[#5F6663] lg:text-sm">Property price</p>

            <p className="mt-0.5 text-[40px] font-normal leading-[1.05] tracking-[-0.035em] text-[#7A5C3E] lg:text-[56px]">
              {priceText}
            </p>

            {property.listingType === "rent" && (
              <span className="text-sm text-[#5F6663]">per month</span>
            )}
          </div>
        </section>

        {/* Gallery */}
        <section
          aria-label="Photo gallery"
          className={`mt-8 grid gap-3 lg:mt-9 lg:h-[632px] ${
            hasThumbs ? "lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]" : ""
          }`}
        >
          <div className="relative aspect-[1/1.05] overflow-hidden bg-[#E3E8E0] sm:aspect-[4/3] lg:aspect-auto lg:h-full">
            {currentImage?.url ? (
              <img
                src={currentImage.url}
                alt={currentImage.alt || property.title}
                className="absolute inset-0 block h-full w-full object-cover"
                loading="eager"
              />
            ) : (
              <div className="grid h-full place-items-center text-[#5F6663]">
                No property image available
              </div>
            )}

            {hasThumbs && (
              <>
                <span className="absolute bottom-3 left-3 bg-[#F0F1EE] px-3 py-1.5 text-sm leading-[1.3]">
                  {activeImage + 1} / {images.length}
                </span>

                <div className="absolute bottom-3 right-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => goTo(-1)}
                    aria-label="Previous image"
                    className="grid size-11 place-items-center bg-[#F0F1EE] text-[#0F1110] transition-colors hover:bg-[#0F1110] hover:text-[#F0F1EE]"
                  >
                    <ChevronLeft size={20} strokeWidth={1.6} />
                  </button>
                  <button
                    type="button"
                    onClick={() => goTo(1)}
                    aria-label="Next image"
                    className="grid size-11 place-items-center bg-[#F0F1EE] text-[#0F1110] transition-colors hover:bg-[#0F1110] hover:text-[#F0F1EE]"
                  >
                    <ChevronRight size={20} strokeWidth={1.6} />
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Thumbnails: swipe row on mobile, scrolling grid beside the main photo on laptop */}
          {hasThumbs && (
            <div className="flex gap-2.5 overflow-x-auto p-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:grid lg:min-h-0 lg:grid-cols-2 lg:content-start lg:gap-3 lg:overflow-x-visible lg:overflow-y-auto lg:p-1">
              {images.map((image, index) => (
                <button
                  key={`${image.url}-${index}`}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  aria-label={`View image ${index + 1}`}
                  aria-pressed={activeImage === index}
                  className={`relative aspect-[4/3] w-28 shrink-0 overflow-hidden bg-[#E3E8E0] lg:w-full ${
                    activeImage === index
                      ? "ring-2 ring-[#0F1110] ring-offset-2 ring-offset-[#F0F1EE]"
                      : "opacity-70 transition-opacity hover:opacity-100"
                  }`}
                >
                  <img
                    src={image.url}
                    alt={image.alt || `${property.title} ${index + 1}`}
                    className="absolute inset-0 block h-full w-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          )}
        </section>

        {/* Property Information */}
        <section className="grid gap-14 pt-10 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-16 lg:pt-[72px]">

          {/* Left Content */}
          <div className="min-w-0">

            {/* Specifications */}
            {facts.length > 0 && (
              <div className="grid grid-cols-2 gap-x-5 gap-y-2 border-y border-[#0F1110]/20 sm:grid-cols-3 lg:gap-x-8">
                {facts.map(({ Icon, value, label }) => (
                  <div key={label} className="py-5 lg:py-[26px]">
                    <Icon size={22} strokeWidth={1.4} className="text-[#7A5C3E]" />
                    <p className="mt-4 text-[38px] font-light leading-none tracking-[-0.035em] lg:text-[46px]">
                      {value}
                    </p>
                    <p className="mt-2 text-[15px] text-[#5F6663] lg:mt-2.5 lg:text-base">{label}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Overview */}
            <div className={facts.length > 0 ? "mt-16 lg:mt-20" : ""}>
              <p className="font-medium leading-[1.8] lg:leading-[1.9]">Property overview</p>

              <h2 className="mt-3 text-[31px] font-normal leading-[1.1] tracking-[-0.03em] lg:mt-3.5 lg:text-[40px]">
                A place to call yours.
              </h2>

              {property.description && (
                <p className="mt-[22px] max-w-[700px] whitespace-pre-line text-[17px] leading-[1.55] lg:mt-7 lg:text-[19px]">
                  {property.description}
                </p>
              )}
            </div>

            {/* Features */}
            {property.features && property.features.length > 0 && (
              <div className="mt-16 lg:mt-[88px]">
                <p className="font-medium leading-[1.8] lg:leading-[1.9]">Features &amp; amenities</p>

                <div className="mt-4 grid border-t border-[#0F1110]/20 lg:mt-5 lg:grid-cols-2 lg:gap-x-12">
                  {property.features.map((feature) => {
                    const Icon = featureIcon(feature);
                    return (
                      <div
                        key={feature}
                        className="flex min-h-11 items-center gap-4 border-b border-[#0F1110]/20 py-4 lg:gap-[18px] lg:py-5"
                      >
                        <Icon size={26} strokeWidth={1.5} className="shrink-0 text-[#7A5C3E]" />
                        <span className="text-[17.5px] lg:text-[19px]">{feature}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Location */}
            {location && (
              <div className="mt-16 lg:mt-[88px]">
                <p className="font-medium leading-[1.8] lg:leading-[1.9]">Location</p>

                <div className="mt-3.5 flex flex-col gap-4 bg-[#E7EAE4] p-5 lg:mt-4 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:p-7">
                  <p className="flex items-start gap-3 text-[17px] lg:items-center lg:text-[19px]">
                    <MapPin size={22} strokeWidth={1.5} className="mt-0.5 shrink-0 text-[#7A5C3E] lg:mt-0" />
                    {location}
                  </p>

                  {mapsHref && (
                    <a
                      href={mapsHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 shrink-0 items-center gap-2.5 text-base underline underline-offset-[6px] lg:no-underline lg:hover:underline"
                    >
                      Open in maps
                      <ArrowUpRight size={18} strokeWidth={1.6} />
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Additional Details */}
            {detailRows.length > 0 && (
              <div className="mt-16 lg:mt-[88px]">
                <p className="font-medium leading-[1.8] lg:leading-[1.9]">Property details</p>

                <div className="mt-3.5 grid border-t border-[#0F1110]/20 lg:mt-5 lg:grid-cols-2 lg:gap-x-12">
                  {detailRows.map(([label, value]) => (
                    <div
                      key={label}
                      className="flex justify-between gap-3 border-b border-[#0F1110]/20 py-[15px] lg:gap-4 lg:py-[18px]"
                    >
                      <span className="text-[#5F6663]">{label}</span>
                      <span className="text-right">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Contact Card */}
          <aside
            id="enquire"
            className="box-border h-fit scroll-mt-6 border border-[#0F1110]/15 bg-[#F8F9F7] px-5 py-6 lg:sticky lg:top-6 lg:p-8"
          >
            <p className="text-sm text-[#5F6663]">Property price</p>
            <p className="mt-0.5 text-[40px] leading-[1.05] tracking-[-0.035em] text-[#7A5C3E]">
              {priceText}
              {property.listingType === "rent" && (
                <span className="ml-2 text-base tracking-normal text-[#5F6663]">per month</span>
              )}
            </p>

            <p className="mt-7 text-sm font-medium text-[#5F6663]">Interested in this property?</p>

            <h3 className="mt-2 text-[28px] font-normal leading-[1.1] tracking-[-0.03em] lg:text-[26px] lg:leading-[1.15]">
              Let&apos;s discuss your next move.
            </h3>

            <p className="mt-3 text-[15.5px] leading-[1.55] text-[#3F4643]">
              Contact our team to learn more about this property or arrange a visit.
            </p>

            <Link
              href={`/contact?property=${property._id}`}
              className="mt-7 flex min-h-[58px] w-full items-center justify-center gap-2.5 rounded-[2px] bg-[#0F1110] px-5 text-[17px] text-[#F0F1EE] transition-colors hover:bg-[#2B332F] lg:text-lg"
            >
              <Phone size={18} strokeWidth={1.6} />
              Enquire about property
            </Link>

            <p className="mt-5 break-all border-t border-[#0F1110]/15 pt-5 text-center text-[13px] text-[#5F6663]">
              Reference: {property._id}
            </p>
          </aside>
        </section>
      </div>

      {/* Mobile action bar */}
      <div className="sticky bottom-0 z-20 flex items-center justify-between gap-4 border-t border-[#0F1110]/15 bg-[#F8F9F7] px-5 py-3 lg:hidden">
        <div>
          <p className="text-[12.5px] leading-[1.3] text-[#5F6663]">
            {property.listingType === "rent" ? "Rent per month" : "Property price"}
          </p>
          <p className="text-[22px] leading-[1.15] tracking-[-0.03em] text-[#7A5C3E]">{priceText}</p>
        </div>

        <Link
          href={`/contact?property=${property._id}`}
          className="inline-flex min-h-[50px] items-center justify-center rounded-[2px] bg-[#0F1110] px-[26px] text-[16.5px] text-[#F0F1EE]"
        >
          Enquire now
        </Link>
      </div>
    </main>
  );
}