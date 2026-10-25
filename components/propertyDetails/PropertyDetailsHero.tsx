import React from 'react'

const PropertyDetailsHero = () => {
  return (
    <section className="overflow-hidden rounded-3xl border border-gray-200 bg-white">
    <div className="grid gap-0 lg:grid-cols-[1.4fr_1fr]">

      {/* Image gallery */}
      <div className="p-4 sm:p-6">
        <div className="relative h-[280px] overflow-hidden rounded-2xl sm:h-[420px]">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1400"
            alt="Luxury residential property"
            className="h-full w-full object-cover"
          />

          <span className="absolute left-4 top-4 rounded-full bg-white px-4 py-2 text-xs font-semibold">
            FOR SALE
          </span>

          <span className="absolute right-4 top-4 rounded-full bg-emerald-100 px-4 py-2 text-xs font-medium text-emerald-800">
            Available
          </span>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-3">
          {[
            "photo-1600596542815-ffad4c1539a9",
            "photo-1600566753086-00f18fb6b3ea",
            "photo-1600607687920-4e2a09cf159d",
          ].map((image) => (
            <div
              key={image}
              className="h-24 overflow-hidden rounded-xl sm:h-32"
            >
              <img
                src={`https://images.unsplash.com/${image}?w=400`}
                alt="Property interior"
                className="h-full w-full object-cover transition duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Property summary */}
      <div className="flex flex-col p-5 sm:p-8 lg:p-10">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>⌖</span>
          Gurugram, Haryana, India
        </div>

        <h2 className="mt-5 text-2xl font-semibold leading-tight sm:text-3xl">
          The Grand Residence
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-500">
          A beautifully designed contemporary residence featuring
          spacious interiors, premium finishes, and a peaceful
          residential setting.
        </p>

        <div className="mt-7 border-y border-gray-100 py-6">
          <p className="text-sm text-gray-500">Property Price</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            ₹2.45 Cr
          </p>
          <p className="mt-2 text-xs text-gray-400">
            Two crore forty-five lakh rupees
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 py-6">
          {[
            ["Property Type", "Luxury Villa"],
            ["Listing Type", "For Sale"],
            ["Bedrooms", "4 Bedrooms"],
            ["Bathrooms", "3 Bathrooms"],
            ["Area", "2,400 sq.ft."],
            ["Parking", "2 Spaces"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-xl bg-[#f7f8f6] p-4">
              <p className="text-xs text-gray-500">{label}</p>
              <p className="mt-2 text-sm font-semibold">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-auto grid grid-cols-2 gap-3">
          <button className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium transition hover:bg-gray-50">
            Preview Listing
          </button>
          <button className="rounded-xl bg-[#243b2e] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#345440]">
            Edit Property ↗
          </button>
        </div>
      </div>
    </div>
  </section>
  )
}

export default PropertyDetailsHero