import React from 'react'

const RightSide = () => {
  return (
    <aside className="space-y-8">

            {/* Listing information */}
            <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8">
              <h2 className="text-xl font-semibold">Listing Information</h2>

              <div className="mt-6 space-y-5">
                {[
                  ["Property ID", "PROP-2026-001"],
                  ["Listing Status", "Available"],
                  ["Listed On", "18 October 2026"],
                  ["Last Updated", "24 October 2026"],
                  ["Listed By", "Admin"],
                  ["Featured Listing", "Yes"],
                ].map(([label, value]) => (
                  <div key={label}>
                    <p className="text-xs text-gray-500">{label}</p>
                    <p className="mt-2 text-sm font-medium">{value}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Inquiry summary */}
            <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-xl font-semibold">Inquiry Summary</h2>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
                  Active
                </span>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-[#f7f8f6] p-4">
                  <p className="text-xs text-gray-500">Total Inquiries</p>
                  <p className="mt-3 text-3xl font-semibold">24</p>
                </div>

                <div className="rounded-2xl bg-[#f7f8f6] p-4">
                  <p className="text-xs text-gray-500">Pending</p>
                  <p className="mt-3 text-3xl font-semibold">08</p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-semibold">Latest Inquiry</h3>

                <div className="mt-4 flex items-center gap-3">
                  <div className="grid size-11 place-items-center rounded-full bg-[#e9eee7] font-semibold text-[#345440]">
                    AM
                  </div>

                  <div>
                    <p className="text-sm font-medium">Aarav Mehta</p>
                    <p className="mt-1 text-xs text-gray-500">
                      Interested in this property
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-xs text-gray-400">
                  Received 10 minutes ago
                </p>
              </div>

              <button className="mt-6 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium transition hover:bg-gray-50">
                View All Inquiries →
              </button>
            </section>

            {/* Danger zone */}
            <section className="rounded-3xl border border-red-100 bg-white p-6">
              <h2 className="text-base font-semibold text-red-700">
                Danger Zone
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                Remove this property listing from your inventory.
              </p>

              <button className="mt-5 w-full rounded-xl border border-red-200 px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50">
                Delete Property
              </button>
            </section>
          </aside>
  )
}

export default RightSide