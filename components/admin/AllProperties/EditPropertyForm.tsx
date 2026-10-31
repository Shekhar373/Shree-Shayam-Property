"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type PropertyImage = {
  url: string;
  publicId: string;
  alt?: string;
};

type PropertyForm = {
  title: string;
  slug: string;
  description: string;
  listingType: string;
  propertyType: string;
  price: string;
  priceUnit: string;
  address: {
    street: string;
    locality: string;
    city: string;
    state: string;
    pincode: string;
  };
  specifications: {
    bedrooms: string;
    bathrooms: string;
    area: string;
    parking: string;
    areaUnit: string;
    furnishing: string;
  };
  images: PropertyImage[];
  status: string;
  featured: boolean;
};

const inputClass =
  "w-full rounded-xl border border-[#d9dcd5] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#536e59]";

const labelClass = "mb-2 block text-sm text-[#536e59]";

export default function EditPropertyForm({
  propertyId,
}: {
  propertyId: string;
}) {
  const router = useRouter();

  const [formData, setFormData] = useState<PropertyForm | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [imagesToDelete, setImagesToDelete] = useState<PropertyImage[]>([]);

  useEffect(() => {
    async function fetchProperty() {
      try {
        const response = await fetch(`/api/properties/${propertyId}`);
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to load property");
        }

        const p = result.property;

        setFormData({
          title: p.title ?? "",
          slug: p.slug ?? "",
          description: p.description ?? "",
          listingType: p.listingType ?? "sale",
          propertyType: p.propertyType ?? "apartment",
          price: String(p.price ?? ""),
          priceUnit: p.priceUnit ?? "total",
          address: {
            street: p.address?.street ?? "",
            locality: p.address?.locality ?? "",
            city: p.address?.city ?? "",
            state: p.address?.state ?? "",
            pincode: p.address?.pincode ?? "",
          },
          specifications: {
            bedrooms: String(p.specifications?.bedrooms ?? 0),
            bathrooms: String(p.specifications?.bathrooms ?? 0),
            area: String(p.specifications?.area ?? ""),
            parking: String(p.specifications?.parking ?? 0),
            areaUnit: p.specifications?.areaUnit ?? "sqft",
            furnishing: p.specifications?.furnishing ?? "unfurnished",
          },
          images: p.images ?? [],
          status: p.status ?? "draft",
          featured: Boolean(p.featured),
        });
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load property",
        );
      } finally {
        setLoading(false);
      }
    }

    fetchProperty();
  }, [propertyId]);

  function updateField<K extends keyof PropertyForm>(
    key: K,
    value: PropertyForm[K],
  ) {
    setFormData((prev) => (prev ? { ...prev, [key]: value } : prev));
  }

  function updateAddress(key: keyof PropertyForm["address"], value: string) {
    setFormData((prev) =>
      prev ? { ...prev, address: { ...prev.address, [key]: value } } : prev,
    );
  }

  function updateSpecifications(
    key: keyof PropertyForm["specifications"],
    value: string,
  ) {
    setFormData((prev) =>
      prev
        ? {
            ...prev,
            specifications: {
              ...prev.specifications,
              [key]: value,
            },
          }
        : prev,
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formData) return;

    setSaving(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(`/api/properties/${propertyId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          specifications: {
            ...formData.specifications,
            bedrooms: Number(formData.specifications.bedrooms),
            bathrooms: Number(formData.specifications.bathrooms),
            area: Number(formData.specifications.area),
            parking: Number(formData.specifications.parking),
          },
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to update property");
      }

      // The property update succeeded. Now clean up removed Cloudinary images.
      const deletionResults = await Promise.allSettled(
        imagesToDelete.map(async (image) => {
          const deleteResponse = await fetch("/api/admin/upload/delete", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ publicId: image.publicId }),
          });

          if (!deleteResponse.ok) {
            throw new Error(`Failed to delete ${image.publicId}`);
          }
        }),
      );

      const failedDeletions = deletionResults.filter(
        (result) => result.status === "rejected",
      ).length;

      setImagesToDelete([]);
      setMessage(
        failedDeletions > 0
          ? "Property updated, but some removed images could not be deleted from Cloudinary."
          : "Property and images updated successfully.",
      );

      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  async function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    if (!files.length || !formData) return;

    setUploading(true);
    setError("");
    setMessage("");

    try {
      const uploadedImages: PropertyImage[] = [];

      for (const file of files) {
        const body = new FormData();
        body.append("image", file);

        const response = await fetch("/api/admin/upload", {
          method: "POST",
          body,
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || `Failed to upload ${file.name}`);
        }

        uploadedImages.push(result.image);
      }

      setFormData((prev) =>
        prev ? { ...prev, images: [...prev.images, ...uploadedImages] } : prev,
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Image upload failed");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  function handleRemoveImage(image: PropertyImage) {
    setFormData((prev) =>
      prev
        ? {
            ...prev,
            images: prev.images.filter(
              (item) => item.publicId !== image.publicId,
            ),
          }
        : prev,
    );

    setImagesToDelete((prev) =>
      prev.some((item) => item.publicId === image.publicId)
        ? prev
        : [...prev, image],
    );
  }

  if (loading) {
    return <p className="p-8 text-sm text-neutral-500">Loading property...</p>;
  }

  if (!formData) {
    return (
      <p className="p-8 text-sm text-red-600">
        {error || "Property could not be loaded."}
      </p>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f6f2] px-5 py-8 text-[#25382d] md:px-10 md:py-12">
      <div className="mx-auto max-w-5xl">
        <button
          type="button"
          onClick={() => router.back()}
          className="mb-6 text-sm text-[#536e59] hover:text-[#25382d]"
        >
          ← Back to properties
        </button>

        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.2em] text-[#71816d]">
            Property management
          </p>
          <h1 className="mt-2 text-3xl font-medium tracking-tight md:text-4xl">
            Edit property
          </h1>
          <p className="mt-2 text-sm text-neutral-500">
            Update the listing details and property information.
          </p>
        </div>

        {message && (
          <p className="mb-5 rounded-xl bg-green-100 p-4 text-sm text-green-800">
            {message}
          </p>
        )}
        {error && (
          <p className="mb-5 rounded-xl bg-red-100 p-4 text-sm text-red-700">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Overview */}
          <section className="rounded-2xl border border-[#e1e4dc] bg-white p-5 md:p-8">
            <p className="text-xs tracking-widest text-[#71816d]">
              01 / OVERVIEW
            </p>
            <h2 className="mb-6 mt-2 text-xl font-medium">Basic information</h2>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className={labelClass}>Property title</label>
                <input
                  required
                  className={inputClass}
                  value={formData.title}
                  onChange={(e) => updateField("title", e.target.value)}
                />
              </div>

              <div>
                <label className={labelClass}>Slug</label>
                <input
                  required
                  className={inputClass}
                  value={formData.slug}
                  onChange={(e) => updateField("slug", e.target.value)}
                />
              </div>

              <div>
                <label className={labelClass}>Listing type</label>
                <select
                  className={inputClass}
                  value={formData.listingType}
                  onChange={(e) => updateField("listingType", e.target.value)}
                >
                  <option value="sale">For sale</option>
                  <option value="rent">For rent</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Property type</label>
                <select
                  className={inputClass}
                  value={formData.propertyType}
                  onChange={(e) => updateField("propertyType", e.target.value)}
                >
                  {[
                    "apartment",
                    "house",
                    "villa",
                    "plot",
                    "commercial",
                    "office",
                  ].map((type) => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className={labelClass}>Description</label>
                <textarea
                  required
                  rows={5}
                  className={inputClass}
                  value={formData.description}
                  onChange={(e) => updateField("description", e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* Pricing */}
          <section className="rounded-2xl border border-[#e1e4dc] bg-white p-5 md:p-8">
            <p className="text-xs tracking-widest text-[#71816d]">
              02 / PRICING
            </p>
            <h2 className="mb-6 mt-2 text-xl font-medium">Price details</h2>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className={labelClass}>Price (₹)</label>
                <input
                  required
                  type="number"
                  min="0"
                  className={inputClass}
                  value={formData.price}
                  onChange={(e) => updateField("price", e.target.value)}
                />
              </div>

              <div>
                <label className={labelClass}>Price unit</label>
                <select
                  className={inputClass}
                  value={formData.priceUnit}
                  onChange={(e) => updateField("priceUnit", e.target.value)}
                >
                  <option value="total">Total price</option>
                  <option value="monthly">Monthly rent</option>
                </select>
              </div>
            </div>
          </section>

          {/* Location */}
          <section className="rounded-2xl border border-[#e1e4dc] bg-white p-5 md:p-8">
            <p className="text-xs tracking-widest text-[#71816d]">
              03 / LOCATION
            </p>
            <h2 className="mb-6 mt-2 text-xl font-medium">Property address</h2>

            <div className="grid gap-5 md:grid-cols-2">
              {(
                [
                  ["street", "Street"],
                  ["locality", "Locality"],
                  ["city", "City"],
                  ["state", "State"],
                  ["pincode", "Pincode"],
                ] as const
              ).map(([key, label]) => (
                <div key={key}>
                  <label className={labelClass}>{label}</label>
                  <input
                    className={inputClass}
                    value={formData.address[key]}
                    onChange={(e) => updateAddress(key, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Specifications */}
          <section className="rounded-2xl border border-[#e1e4dc] bg-white p-5 md:p-8">
            <p className="text-xs tracking-widest text-[#71816d]">
              04 / DETAILS
            </p>
            <h2 className="mb-6 mt-2 text-xl font-medium">Specifications</h2>

            <div className="grid gap-5 md:grid-cols-2">
              {(
                [
                  ["bedrooms", "Bedrooms"],
                  ["bathrooms", "Bathrooms"],
                  ["area", "Area"],
                  ["parking", "Parking spaces"],
                ] as const
              ).map(([key, label]) => (
                <div key={key}>
                  <label className={labelClass}>{label}</label>
                  <input
                    type="number"
                    min="0"
                    required={key === "area"}
                    className={inputClass}
                    value={formData.specifications[key]}
                    onChange={(e) => updateSpecifications(key, e.target.value)}
                  />
                </div>
              ))}

              <div>
                <label className={labelClass}>Area unit</label>
                <select
                  className={inputClass}
                  value={formData.specifications.areaUnit}
                  onChange={(e) =>
                    updateSpecifications("areaUnit", e.target.value)
                  }
                >
                  <option value="sqft">Square feet</option>
                  <option value="sqm">Square metres</option>
                  <option value="sqyd">Square yards</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Furnishing</label>
                <select
                  className={inputClass}
                  value={formData.specifications.furnishing}
                  onChange={(e) =>
                    updateSpecifications("furnishing", e.target.value)
                  }
                >
                  <option value="unfurnished">Unfurnished</option>
                  <option value="semi-furnished">Semi-furnished</option>
                  <option value="furnished">Furnished</option>
                </select>
              </div>
            </div>
          </section>

          {/* Images */}
          <section className="rounded-2xl border border-[#e1e4dc] bg-white p-5 md:p-8">
            <p className="text-xs tracking-widest text-[#71816d]">05 / MEDIA</p>
            <h2 className="mb-6 mt-2 text-xl font-medium">Property images</h2>

            {formData.images.length === 0 ? (
              <p className="text-sm text-neutral-500">No images attached.</p>
            ) : (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {formData.images.map((image, index) => (
                  <div
                    key={image.publicId || image.url}
                    className="overflow-hidden rounded-xl border border-[#e1e4dc]"
                  >
                    <img
                      src={image.url}
                      alt={image.alt || `Property image ${index + 1}`}
                      className="h-36 w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(image)}
                    >
                      Remove image
                    </button>
                  </div>
                ))}
              </div>
            )}
            <p className="mt-4 text-xs text-neutral-500">
              This form displays and removes existing images. New image uploads
              can be added next.
            </p>

            {/* add images */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              className="hidden"
              onChange={handleImageUpload}
            />

            <button
              type="button"
              disabled={uploading}
              onClick={() => fileInputRef.current?.click()}
              className="mt-5 rounded-xl border border-[#536e59] px-5 py-3 text-sm text-[#25382d] transition hover:bg-[#f5f6f2] disabled:opacity-50"
            >
              {uploading ? "Uploading images..." : "+ Add images"}
            </button>

            <p className="mt-2 text-xs text-neutral-500">
              JPG, PNG or WebP · Maximum 5 MB per image
            </p>
          </section>

          {/* Publishing */}
          <section className="rounded-2xl border border-[#e1e4dc] bg-white p-5 md:p-8">
            <p className="text-xs tracking-widest text-[#71816d]">
              06 / PUBLISHING
            </p>
            <h2 className="mb-6 mt-2 text-xl font-medium">Listing status</h2>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className={labelClass}>Status</label>
                <select
                  className={inputClass}
                  value={formData.status}
                  onChange={(e) => updateField("status", e.target.value)}
                >
                  {["draft", "published", "sold", "rented", "archived"].map(
                    (status) => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ),
                  )}
                </select>
              </div>

              <label className="flex items-center gap-3 self-end rounded-xl border border-[#d9dcd5] p-4 text-sm">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => updateField("featured", e.target.checked)}
                  className="h-4 w-4 accent-[#536e59]"
                />
                Feature this property
              </label>
            </div>
          </section>

          <div className="flex flex-wrap justify-end gap-3 pb-8">
            <button
              type="button"
              onClick={() => router.back()}
              className="rounded-xl border border-[#d9dcd5] px-5 py-3 text-sm hover:bg-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving || uploading}
              className="rounded-xl bg-[#25382d] px-6 py-3 text-sm text-white transition hover:bg-[#3b5242] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {uploading
                ? "Uploading images..."
                : saving
                  ? "Saving changes..."
                  : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
