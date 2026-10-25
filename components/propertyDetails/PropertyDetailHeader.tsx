import React from 'react'

const PropertyDetailHeader = () => {
  return (
    <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mb-2 text-sm text-gray-500">
              Dashboard / Properties / Property Details
            </p>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Property Details
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              View and manage your property information.
            </p>
          </div>

          <div className="flex gap-3">
            <button className="rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-medium transition hover:bg-gray-50">
              ← Back
            </button>
            <button className="rounded-xl bg-[#243b2e] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#345440]">
              Edit Property ↗
            </button>
          </div>
        </header>
  )
}

export default PropertyDetailHeader