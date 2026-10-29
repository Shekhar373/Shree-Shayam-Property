"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import type { PropertyFormData } from "@/types/PropertyFormData";

const initialFormData: PropertyFormData = {
  title: "",
  slug: "",
  description: "",
  listingType: "",
  propertyType: "",
  price: "",
  priceUnit: "",
  address: {
    street: "",
    locality: "",
    city: "",
    state: "",
    pincode: "",
  },
  specifications: {
    bedrooms: "0",
    bathrooms: "0",
    area: "",
    parking: "0",
    areaUnit: "sqft",
    furnishing: "unfurnished",
  },
  images: [],
  status: "draft",
  featured: false,
  publishedAt: "",
};

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100";

const labelClass = "mb-2 block text-sm font-medium text-gray-700";

export default function AddPropertyPage() {
  const [formData, setFormData] = useState<PropertyFormData>(initialFormData);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = event.target;

    const newValue =
      type === "checkbox" ? (event.target as HTMLInputElement).checked : value;

    setFormData((prev) => {
      if (name.startsWith("address.")) {
        const field = name.split(".")[1] as keyof PropertyFormData["address"];

        return {
          ...prev,
          address: {
            ...prev.address,
            [field]: newValue as string,
          },
        };
      }

      if (name.startsWith("specifications.")) {
        const field = name.split(
          ".",
        )[1] as keyof PropertyFormData["specifications"];

        return {
          ...prev,
          specifications: {
            ...prev.specifications,
            [field]: newValue as string,
          },
        };
      }

      if (name === "featured") {
        return {
          ...prev,
          featured: newValue as boolean,
        };
      }

      if (name === "listingType") {
        return {
          ...prev,
          listingType: newValue as PropertyFormData["listingType"],
          priceUnit: newValue === "rent" ? "monthly" : "total",
        };
      }

      if (name === "propertyType") {
        return {
          ...prev,
          propertyType: newValue as PropertyFormData["propertyType"],
        };
      }

      if (name === "priceUnit") {
        return {
          ...prev,
          priceUnit: newValue as PropertyFormData["priceUnit"],
        };
      }

      if (name === "status") {
        return {
          ...prev,
          status: newValue as PropertyFormData["status"],
        };
      }

      return {
        ...prev,
        [name]: newValue as string,
      };
    });
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const title = event.target.value;

    setFormData((prev) => ({
      ...prev,
      title,
      slug: title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-"),
    }));
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = Array.from(event.target.files ?? []);

    // Allow selecting the same file again later.
    event.target.value = "";

    if (files.length === 0) return;

    setUploading(true);
    setError("");
    setMessage("");

    try {
      for (const file of files) {
        const data = new FormData();
        data.append("image", file);

        const response = await fetch("/api/admin/upload", {
          method: "POST",
          body: data,
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || `Failed to upload ${file.name}`);
        }

        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, result.image],
        }));
      }

      setMessage("Images uploaded successfully.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = async (publicId: string) => {
    setError("");
    setMessage("");
  
    try {
      const response = await fetch("/api/admin/upload/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ publicId }),
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.message || "Failed to delete image");
      }
  
      setFormData((prev) => ({
        ...prev,
        images: prev.images.filter(
          (image) => image.publicId !== publicId
        ),
      }));
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Image deletion failed"
      );
    }
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    status: "draft" | "published",
  ) => {
    event.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const payload = {
        ...formData,
        status,
        price: Number(formData.price),
        specifications: {
          ...formData.specifications,
          bedrooms: Number(formData.specifications.bedrooms),
          bathrooms: Number(formData.specifications.bathrooms),
          area: Number(formData.specifications.area),
          parking: Number(formData.specifications.parking),
        },
      };

      const response = await fetch("/api/properties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create property.");
      }

      setMessage(
        status === "published"
          ? "Property published successfully."
          : "Property saved as draft.",
      );

      setFormData(initialFormData);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f8f4] px-4 py-8 text-gray-900 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <Link
              href="/admin"
              className="mb-4 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-emerald-700"
            >
              <span aria-hidden="true">←</span> Back to admin page
            </Link>

            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Add a property
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Add the details of your property to your listings.
            </p>
          </div>

          <span className="w-fit rounded-full bg-emerald-100 px-4 py-2 text-xs font-medium uppercase tracking-wider text-emerald-800">
            New listing
          </span>
        </div>

        {message && (
          <div
            role="status"
            className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800"
          >
            {message}
          </div>
        )}

        {error && (
          <div
            role="alert"
            className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        <form
          onSubmit={(event) => handleSubmit(event, "draft")}
          
          className="space-y-6"
        >
          {/* Basic information */}
          <section className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm sm:p-8">
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                01 / Overview
              </p>
              <h2 className="mt-2 text-xl font-semibold">Basic information</h2>
              <p className="mt-1 text-sm text-gray-500">
                Give your property a title and describe what makes it special.
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label className={labelClass} htmlFor="title">
                  Property title *
                </label>
                <input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleTitleChange}
                  className={inputClass}
                  placeholder="e.g. Modern 3 BHK Apartment"
                  maxLength={150}
                  required
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="slug">
                  URL slug *
                </label>
                <input
                  id="slug"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="modern-3-bhk-apartment"
                  required
                />
                <p className="mt-2 text-xs text-gray-400">
                  Generated from the title. You can edit it.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelClass} htmlFor="listingType">
                    Listing type *
                  </label>
                  <select
                    id="listingType"
                    name="listingType"
                    value={formData.listingType}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  >
                    <option value="">Select listing type</option>
                    <option value="sale">For sale</option>
                    <option value="rent">For rent</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass} htmlFor="propertyType">
                    Property type *
                  </label>
                  <select
                    id="propertyType"
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  >
                    <option value="">Select property type</option>
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                    <option value="villa">Villa</option>
                    <option value="plot">Plot</option>
                    <option value="commercial">Commercial</option>
                    <option value="office">Office</option>
                  </select>
                </div>
              </div>

              <div>
                <label className={labelClass} htmlFor="description">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className={`${inputClass} min-h-36 resize-y`}
                  placeholder="Describe the property, amenities, surroundings and key features..."
                  maxLength={3000}
                  required
                />
              </div>
            </div>
          </section>

          {/* Pricing */}
          <section className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm sm:p-8">
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                02 / Pricing
              </p>
              <h2 className="mt-2 text-xl font-semibold">Price details</h2>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="price">
                  Price in ₹ *
                </label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="any"
                  value={formData.price}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="e.g. 8500000"
                  required
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="priceUnit">
                  Price unit *
                </label>
                <select
                  id="priceUnit"
                  name="priceUnit"
                  value={formData.priceUnit}
                  onChange={handleChange}
                  className={inputClass}
                  required
                >
                  <option value="">Select price unit</option>
                  <option value="total">Total price</option>
                  <option value="monthly">Monthly rent</option>
                </select>
              </div>
            </div>
          </section>

          {/* Location */}
          <section className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm sm:p-8">
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                03 / Location
              </p>
              <h2 className="mt-2 text-xl font-semibold">Property address</h2>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className={labelClass} htmlFor="street">
                  Street address
                </label>
                <input
                  id="street"
                  name="address.street"
                  value={formData.address.street}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="House number, street or building"
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="locality">
                  Locality *
                </label>
                <input
                  id="locality"
                  name="address.locality"
                  value={formData.address.locality}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="e.g. South Extension"
                  required
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="city">
                  City *
                </label>
                <input
                  id="city"
                  name="address.city"
                  value={formData.address.city}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="e.g. New Delhi"
                  required
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="state">
                  State *
                </label>
                <input
                  id="state"
                  name="address.state"
                  value={formData.address.state}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="e.g. Delhi"
                  required
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="pincode">
                  PIN code
                </label>
                <input
                  id="pincode"
                  name="address.pincode"
                  value={formData.address.pincode}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="e.g. 110001"
                />
              </div>
            </div>
          </section>

          {/* Specifications */}
          <section className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm sm:p-8">
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                04 / Details
              </p>
              <h2 className="mt-2 text-xl font-semibold">Specifications</h2>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className={labelClass} htmlFor="bedrooms">
                  Bedrooms
                </label>
                <input
                  id="bedrooms"
                  name="specifications.bedrooms"
                  type="number"
                  min="0"
                  value={formData.specifications.bedrooms}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="bathrooms">
                  Bathrooms
                </label>
                <input
                  id="bathrooms"
                  name="specifications.bathrooms"
                  type="number"
                  min="0"
                  value={formData.specifications.bathrooms}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="parking">
                  Parking spaces
                </label>
                <input
                  id="parking"
                  name="specifications.parking"
                  type="number"
                  min="0"
                  value={formData.specifications.parking}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="area">
                  Area *
                </label>
                <input
                  id="area"
                  name="specifications.area"
                  type="number"
                  min="0"
                  step="any"
                  value={formData.specifications.area}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="e.g. 1800"
                  required
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="areaUnit">
                  Area unit
                </label>
                <select
                  id="areaUnit"
                  name="specifications.areaUnit"
                  value={formData.specifications.areaUnit}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="sqft">Square feet</option>
                  <option value="sqm">Square metres</option>
                  <option value="sqyd">Square yards</option>
                </select>
              </div>

              <div>
                <label className={labelClass} htmlFor="furnishing">
                  Furnishing
                </label>
                <select
                  id="furnishing"
                  name="specifications.furnishing"
                  value={formData.specifications.furnishing}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="unfurnished">Unfurnished</option>
                  <option value="semi-furnished">Semi-furnished</option>
                  <option value="furnished">Furnished</option>
                </select>
              </div>
            </div>
          </section>

          {/* Images */}
          <section className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm sm:p-8">
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                05 / Media
              </p>

              <h2 className="mt-2 text-xl font-semibold">Property images</h2>

              <p className="mt-1 text-sm text-gray-500">
                Upload property photos. JPEG, PNG, or WebP, maximum 5 MB each.
              </p>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              onChange={handleImageUpload}
              className="hidden"
              disabled={uploading || loading}
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading || loading}
              className="w-full rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 px-5 py-10 text-center transition hover:border-emerald-600 hover:bg-emerald-50/50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-xl text-emerald-800">
                {uploading ? "…" : "↑"}
              </span>

              <span className="block font-medium text-gray-900">
                {uploading ? "Uploading images..." : "Click to upload images"}
              </span>

              <span className="mt-2 block text-sm text-gray-500">
                {uploading
                  ? "Please wait while your images are uploaded."
                  : "Select one or multiple images"}
              </span>
            </button>

            {formData.images.length > 0 && (
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {formData.images.map((image) => (
                  <div
                    key={image.publicId}
                    className="group relative overflow-hidden rounded-xl border border-gray-200"
                  >
                    <img
                      src={image.url}
                      alt={image.alt || "Property image"}
                      className="h-40 w-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={() => handleRemoveImage(image.publicId)}
                      disabled={uploading || loading}
                      aria-label={`Remove ${image.alt || "property image"}`}
                      className="absolute right-2 top-2 rounded-lg bg-black/70 px-3 py-2 text-xs font-medium text-white transition hover:bg-red-600 disabled:opacity-50"
                    >
                      Remove
                    </button>

                    <p className="truncate px-3 py-2 text-xs text-gray-500">
                      {image.alt}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <p className="mt-4 text-sm text-gray-500">
              {formData.images.length} image
              {formData.images.length === 1 ? "" : "s"} uploaded
            </p>
          </section>

          {/* Listing settings */}
          <section className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm sm:p-8">
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                06 / Publishing
              </p>
              <h2 className="mt-2 text-xl font-semibold">Listing settings</h2>
            </div>

            <div className="space-y-5">
              <div>
                <label className={labelClass} htmlFor="status">
                  Listing status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="sold">Sold</option>
                  <option value="rented">Rented</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-200 p-4">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 accent-emerald-700"
                />

                <span>
                  <span className="block text-sm font-medium">
                    Feature this property
                  </span>
                  <span className="mt-1 block text-xs text-gray-500">
                    Mark this property for featured sections on your website.
                  </span>
                </span>
              </label>
            </div>
          </section>

          {/* Actions */}
          <div className="flex flex-col-reverse justify-between gap-4 border-t border-gray-200 pt-6 sm:flex-row sm:items-center">
            <Link
              href="/admin/properties"
              className="rounded-xl px-5 py-3 text-center text-sm font-medium text-gray-600 transition hover:bg-gray-200/60"
            >
              Cancel
            </Link>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                disabled={loading || uploading}
                onClick={() => {
                  // The form's default submit saves as draft.
                }}
                className="rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-medium transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Saving..." : "Save as draft"}
              </button>

              <button
                type="button"
                disabled={loading || uploading} 
                  onClick={(event) => {
                  const form = event.currentTarget.form;
                  if (!form) return;

                  if (form.reportValidity()) {
                    void handleSubmit(
                      {
                        preventDefault: () => {},
                      } as React.FormEvent<HTMLFormElement>,
                      "published",
                    );
                  }
                }}
                className="rounded-xl bg-emerald-800 px-6 py-3 text-sm font-medium text-white transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Processing..." : "Publish property ↗"}
              </button>
            </div>
          </div>
        </form>

        {/* Temporary state preview — useful while learning */}
        <details className="mt-8 rounded-xl border border-gray-200 bg-white p-4">
          <summary className="cursor-pointer text-sm font-medium text-gray-600">
            Debug form state
          </summary>

          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap break-words text-xs text-gray-600">
            {JSON.stringify(formData, null, 2)}
          </pre>
        </details>
      </div>
    </main>
  );
}
