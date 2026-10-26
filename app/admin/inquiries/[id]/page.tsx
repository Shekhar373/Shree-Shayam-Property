
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

const statuses = ["new", "contacted", "interested", "closed", "spam"];

const statusStyles = {
  new: "bg-blue-50 text-blue-700",
  contacted: "bg-amber-50 text-amber-700",
  interested: "bg-emerald-50 text-emerald-700",
  closed: "bg-gray-100 text-gray-600",
  spam: "bg-red-50 text-red-700",
};

export default function InquiryDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [inquiry, setInquiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [notes, setNotes] = useState("");
  const [followUpAt, setFollowUpAt] = useState("");

  useEffect(() => {
    if (!id) return;

    const getInquiry = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(`/api/inquiry/${id}`);
        const data = response.data.inquiry;

        setInquiry(data);
        setNotes(data.notes || "");
        setFollowUpAt(
          data.followUpAt
            ? new Date(data.followUpAt).toISOString().slice(0, 16)
            : ""
        );
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to load inquiry."
        );
      } finally {
        setLoading(false);
      }
    };

    getInquiry();
  }, [id]);

  const updateInquiry = async (updates) => {
    try {
      setSaving(true);
      setError("");

      const response = await axios.patch(`/api/inquiry/${id}`, updates);

      setInquiry(response.data.inquiry);
      setNotes(response.data.inquiry.notes || "");
      setFollowUpAt(
        response.data.inquiry.followUpAt
          ? new Date(response.data.inquiry.followUpAt)
              .toISOString()
              .slice(0, 16)
          : ""
      );
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to update inquiry."
      );
    } finally {
      setSaving(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "Not available";

    return new Date(date).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f6f2] p-8 text-[#536e59]">
        Loading inquiry details...
      </div>
    );
  }

  if (!inquiry) {
    return (
      <div className="min-h-screen bg-[#f5f6f2] p-8">
        <p className="text-red-600">
          {error || "Inquiry not found."}
        </p>
        <Link
          href="/admin/inquiries"
          className="mt-4 inline-block text-[#25382d] underline"
        >
          Back to inquiries
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f6f2] px-4 py-8 text-[#25382d] sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <Link
              href="/admin/inquiries"
              className="mb-3 inline-flex items-center gap-2 text-sm text-[#718074] transition hover:text-[#25382d]"
            >
              <span>←</span> Back to inquiries
            </Link>

            <h1 className="text-3xl font-semibold tracking-tight">
              Inquiry Details
            </h1>

            <p className="mt-2 text-sm text-[#718074]">
              Review the request and manage your follow-up.
            </p>
          </div>

          <span
            className={`rounded-full px-4 py-2 text-xs font-semibold capitalize ${
              statusStyles[inquiry.status] || statusStyles.new
            }`}
          >
            {inquiry.status}
          </span>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          {/* Left column */}
          <div className="space-y-6">
            {/* Contact details */}
            <section className="rounded-2xl border border-[#e4e8df] bg-white p-6 sm:p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e8ebe4] text-lg font-semibold">
                  {inquiry.name?.charAt(0)?.toUpperCase() || "?"}
                </div>

                <div>
                  <h2 className="text-lg font-semibold">
                    Contact Information
                  </h2>
                  <p className="text-sm text-[#899287]">
                    Potential customer
                  </p>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <p className="mb-1 text-xs uppercase tracking-wider text-[#899287]">
                    Full name
                  </p>
                  <p className="font-medium">{inquiry.name}</p>
                </div>

                <div>
                  <p className="mb-1 text-xs uppercase tracking-wider text-[#899287]">
                    Phone number
                  </p>
                  <a
                    href={`tel:${inquiry.phone}`}
                    className="font-medium hover:underline"
                  >
                    {inquiry.phone}
                  </a>
                </div>

                <div className="sm:col-span-2">
                  <p className="mb-1 text-xs uppercase tracking-wider text-[#899287]">
                    Email address
                  </p>

                  {inquiry.email ? (
                    <a
                      href={`mailto:${inquiry.email}`}
                      className="break-all font-medium hover:underline"
                    >
                      {inquiry.email}
                    </a>
                  ) : (
                    <p className="text-[#899287]">Not provided</p>
                  )}
                </div>
              </div>
            </section>

            {/* Message */}
            <section className="rounded-2xl border border-[#e4e8df] bg-white p-6 sm:p-8">
              <h2 className="mb-5 text-lg font-semibold">
                Customer Message
              </h2>

              <div className="rounded-xl bg-[#f7f8f5] p-5">
                <p className="whitespace-pre-wrap text-sm leading-7 text-[#536052]">
                  {inquiry.message}
                </p>
              </div>

              <p className="mt-4 text-xs text-[#899287]">
                Received {formatDate(inquiry.createdAt)}
              </p>
            </section>

            {/* Property details */}
            <section className="rounded-2xl border border-[#e4e8df] bg-white p-6 sm:p-8">
              <h2 className="mb-5 text-lg font-semibold">
                Related Property
              </h2>

              {inquiry.property ? (
                <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-[#f7f8f5] p-5">
                  <div>
                    <p className="font-medium">
                      {inquiry.property.title}
                    </p>
                    {inquiry.property.slug && (
                      <p className="mt-1 text-xs text-[#899287]">
                        Slug: {inquiry.property.slug}
                      </p>
                    )}
                  </div>

                  {inquiry.property.slug && (
                    <Link
                      href={`/property/${inquiry.property.slug}`}
                      target="_blank"
                      className="text-sm font-medium text-[#536e59] hover:underline"
                    >
                      View property ↗
                    </Link>
                  )}
                </div>
              ) : (
                <p className="rounded-xl bg-[#f7f8f5] p-5 text-sm text-[#899287]">
                  This is a general inquiry and is not linked to a specific property.
                </p>
              )}
            </section>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Status */}
            <section className="rounded-2xl border border-[#e4e8df] bg-white p-6">
              <h2 className="mb-2 text-lg font-semibold">
                Inquiry Status
              </h2>
              <p className="mb-5 text-sm text-[#899287]">
                Track where this inquiry stands.
              </p>

              <label
                htmlFor="status"
                className="mb-2 block text-sm font-medium"
              >
                Current status
              </label>

              <select
                id="status"
                value={inquiry.status}
                disabled={saving}
                onChange={(e) =>
                  updateInquiry({ status: e.target.value })
                }
                className="w-full rounded-xl border border-[#dfe4da] bg-white px-4 py-3 text-sm outline-none focus:border-[#536e59] disabled:opacity-60"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </section>

            {/* Follow-up */}
            <section className="rounded-2xl border border-[#e4e8df] bg-white p-6">
              <h2 className="mb-2 text-lg font-semibold">
                Follow-up
              </h2>
              <p className="mb-5 text-sm text-[#899287]">
                Schedule your next contact with this customer.
              </p>

              <label
                htmlFor="followUpAt"
                className="mb-2 block text-sm font-medium"
              >
                Follow-up date and time
              </label>

              <input
                id="followUpAt"
                type="datetime-local"
                value={followUpAt}
                disabled={saving}
                onChange={(e) => setFollowUpAt(e.target.value)}
                className="w-full rounded-xl border border-[#dfe4da] px-4 py-3 text-sm outline-none focus:border-[#536e59] disabled:opacity-60"
              />

              <label
                htmlFor="notes"
                className="mb-2 mt-5 block text-sm font-medium"
              >
                Internal notes
              </label>

              <textarea
                id="notes"
                rows={5}
                value={notes}
                disabled={saving}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add notes about calls, requirements, or next steps..."
                className="w-full resize-y rounded-xl border border-[#dfe4da] px-4 py-3 text-sm leading-6 outline-none focus:border-[#536e59] disabled:opacity-60"
              />

              <button
                type="button"
                disabled={saving}
                onClick={() =>
                  updateInquiry({
                    notes,
                    followUpAt: followUpAt
                      ? new Date(followUpAt).toISOString()
                      : null,
                  })
                }
                className="mt-4 w-full rounded-xl bg-[#25382d] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#3b5543] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save Follow-up & Notes"}
              </button>
            </section>

            {/* Metadata */}
            <section className="rounded-2xl border border-[#e4e8df] bg-white p-6">
              <h2 className="mb-4 text-lg font-semibold">
                Record Information
              </h2>

              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-xs text-[#899287]">Inquiry ID</p>
                  <p className="mt-1 break-all font-mono text-xs">
                    {inquiry._id}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-[#899287]">Created</p>
                  <p className="mt-1">{formatDate(inquiry.createdAt)}</p>
                </div>

                <div>
                  <p className="text-xs text-[#899287]">Last updated</p>
                  <p className="mt-1">{formatDate(inquiry.updatedAt)}</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
