"use client"
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

// Type for Inquiry
type Inquiry = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  property?: string | null;
  status: "new" | "contacted" | "interested" | "closed" | "spam";
  createdAt: string;
  updatedAt: string;
  [key: string]: any; // allow extra fields just in case
};

const statusStyles: Record<string, string> = {
  new: "bg-blue-50 text-blue-700 ring-blue-600/15",
  contacted: "bg-amber-50 text-amber-700 ring-amber-600/15",
  interested: "bg-emerald-50 text-emerald-700 ring-emerald-600/15",
  closed: "bg-gray-100 text-gray-600 ring-gray-500/15",
  spam: "bg-red-50 text-red-700 ring-red-600/15",
};

function StatusBadge({ status }: { status: Inquiry["status"] }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium capitalize ring-1 ring-inset ${
        statusStyles[status] || statusStyles.new
      }`}
    >
      {status}
    </span>
  );
}

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("")

  useEffect(() => {
    const getInquiries = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await axios.get("/api/inquiry");
        // Map the data to the UI shape (show data according to the response)
        // If you want to display the actual property name, you'll need to populate in the backend
        setInquiries(
          Array.isArray(response.data.inquiries)
            ? response.data.inquiries.map((i: any) => ({
                _id: i._id ?? i.id ?? String(Math.random()),
                name: i.name || "",
                email: i.email || "",
                phone: i.phone || "",
                message: i.message || "",
                property:
                  typeof i.property === "object"
                    ? i.property?.title || "" // if property was populated
                    : i.property || "",
                status: i.status || "new",
                createdAt: i.createdAt || "",
                updatedAt: i.updatedAt || "",
                ...i,
              }))
            : []
        );
        // Optionally: set counts by status here if you want dynamic stats
      } catch (error: any) {
        console.error("failed to fetch inquiries", error);
        setError(
          error?.response?.data?.message ||
            "Failed to load inquiries. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    getInquiries();
  }, []);

  // If you wish to calculate counts for stats
  const totalCount = inquiries.length;
  const newCount = inquiries.filter((inq) => inq.status === "new").length;
  const interestedCount = inquiries.filter(
    (inq) => inq.status === "interested"
  ).length;
  const closedCount = inquiries.filter((inq) => inq.status === "closed").length;

  return (
    <main className="min-h-screen bg-[#f5f6f2] px-4 py-6 text-[#25382d] sm:px-8 lg:px-10 lg:py-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <header className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#7d8b78]">
              Client management
            </p>
            <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">
              Inquiries<span className="text-[#9cac8f]">.</span>
            </h1>
            <p className="mt-2 text-sm text-[#7b867b]">
              Keep track of property requests and potential clients.
            </p>
          </div>

          <Link
            href="/admin"
            className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-[#dce3d8] bg-white px-5 py-3 text-sm font-medium text-[#526252] transition hover:bg-[#f7f9f5] sm:self-auto"
          >
            ← Dashboard
          </Link>
        </header>

        {/* Stats */}
        <section className="mb-8 grid grid-cols-2 gap-4 xl:grid-cols-4">
          <div className="rounded-2xl border border-[#e8ebe4] bg-white p-5">
            <p className="text-sm text-[#829080]">Total inquiries</p>
            <p className="mt-3 text-3xl font-medium">{totalCount}</p>
            <p className="mt-2 text-xs text-[#8a9a83]">All time</p>
          </div>

          <div className="rounded-2xl border border-[#e8ebe4] bg-white p-5">
            <p className="text-sm text-[#829080]">New inquiries</p>
            <p className="mt-3 text-3xl font-medium">{newCount}</p>
            <p className="mt-2 text-xs text-blue-600">Need your attention</p>
          </div>

          <div className="rounded-2xl border border-[#e8ebe4] bg-white p-5">
            <p className="text-sm text-[#829080]">Interested clients</p>
            <p className="mt-3 text-3xl font-medium">{interestedCount}</p>
            <p className="mt-2 text-xs text-emerald-700">Potential leads</p>
          </div>

          <div className="rounded-2xl border border-[#e8ebe4] bg-white p-5">
            <p className="text-sm text-[#829080]">Closed inquiries</p>
            <p className="mt-3 text-3xl font-medium">{closedCount}</p>
            <p className="mt-2 text-xs text-[#8a9a83]">Completed</p>
          </div>
        </section>

        {/* Inquiry table */}
        <section className="overflow-hidden rounded-2xl border border-[#e8ebe4] bg-white">
          <div className="flex flex-col gap-4 border-b border-[#edf0e9] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              <h2 className="text-lg font-semibold">All inquiries</h2>
              <p className="mt-1 text-sm text-[#859084]">
                Review and manage your property leads.
              </p>
            </div>

            {/* <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="search"
                placeholder="Search inquiries..."
                className="w-full rounded-xl border border-[#e2e7df] bg-[#fcfdfb] px-4 py-2.5 text-sm outline-none placeholder:text-[#a0aaa0] focus:border-[#536e59] sm:w-56"
              />

               <select
                defaultValue="all"
                className="rounded-xl border border-[#e2e7df] bg-white px-4 py-2.5 text-sm text-[#526252] outline-none focus:border-[#536e59]"
              >
                <option value="all">All statuses</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="interested">Interested</option>
                <option value="closed">Closed</option>
                <option value="spam">Spam</option>
              </select> 
            </div> */}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left">
              <thead className="bg-[#f9faf7]">
                <tr className="text-xs uppercase tracking-wider text-[#899487]">
                  <th className="px-6 py-4 font-medium">Client</th>
                  <th className="px-6 py-4 font-medium">Property</th>
                  <th className="px-6 py-4 font-medium">Date received</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 text-right font-medium">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#edf0e9]">
                {inquiries.map((inquiry, index) => (
                  <tr
                    key={`${inquiry._id || inquiry.email || index}`}
                    className="transition hover:bg-[#fafbf8]"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#edf2e9] text-sm font-semibold text-[#536e59]">
                          {inquiry.name
                            .split(" ")
                            .map((part: string) => part[0])
                            .join("")}
                        </div>

                        <div>
                          <p className="text-sm font-medium text-[#304234]">
                            {inquiry.name}
                          </p>
                          <p className="mt-1 text-xs text-[#899487]">
                            {inquiry.email}
                          </p>
                          <p className="mt-1 text-xs text-[#899487]">
                            {inquiry.phone}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <p className="text-sm font-medium text-[#46564a]">
                        {inquiry.property || "-"}
                      </p>
                    </td>

                    <td className="px-6 py-5 text-sm text-[#788477]">
                      {/* Format date to readable form */}
                      {inquiry.createdAt
                        ? new Date(inquiry.createdAt).toLocaleDateString()
                        : "-"}
                    </td>

                    <td className="px-6 py-5">
                      <StatusBadge status={inquiry.status} />
                    </td>

                    <td className="px-6 py-5 text-right">
                      <Link
                        href={`/admin/inquiries/${inquiry._id}`}
                        className="inline-flex items-center rounded-lg border border-[#dce3d8] px-3 py-2 text-xs font-medium text-[#526252] transition hover:bg-[#edf2e9]"
                      >
                        View details ↗
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination UI */}
          {/* <div className="flex flex-col gap-4 border-t border-[#edf0e9] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <p className="text-xs text-[#899487]">
              Showing 1–{inquiries.length} of {totalCount} inquiries
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="rounded-lg border border-[#e2e7df] px-3 py-2 text-xs text-[#9aa398]"
                disabled
              >
                Previous
              </button>
              <button
                type="button"
                className="rounded-lg bg-[#253d2e] px-3.5 py-2 text-xs font-medium text-white"
              >
                1
              </button>
              <button
                type="button"
                className="rounded-lg border border-[#e2e7df] px-3.5 py-2 text-xs text-[#526252]"
                disabled
              >
                2
              </button>
              <button
                type="button"
                className="rounded-lg border border-[#e2e7df] px-3.5 py-2 text-xs text-[#526252]"
                disabled
              >
                Next →
              </button>
            </div>
          </div> */}
        </section>

        <footer className="py-6 text-center text-xs text-[#929b91]">
          Property management · Client inquiries
        </footer>
      </div>
    </main>
  );
}
