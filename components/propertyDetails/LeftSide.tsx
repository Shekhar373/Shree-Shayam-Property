import React from 'react'

const LeftSide = () => {
  return (
    <div className="space-y-8">

    {/* Description */}
    <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8">
      <h2 className="text-xl font-semibold">About this property</h2>

      <p className="mt-5 text-sm leading-7 text-gray-500">
        Discover an exceptional residential property designed for
        modern living. With carefully planned spaces, elegant
        architecture, and thoughtfully selected finishes, this
        residence offers a balance of comfort, functionality, and
        understated luxury.
      </p>

      <p className="mt-4 text-sm leading-7 text-gray-500">
        The property features spacious living areas, well-appointed
        bedrooms, a contemporary kitchen, and large windows that
        invite natural light throughout the day. Conveniently
        situated near essential amenities, shopping destinations,
        and major transport connections.
      </p>
    </section>

    {/* Amenities */}
    <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8">
      <h2 className="text-xl font-semibold">Property Amenities</h2>
      <p className="mt-2 text-sm text-gray-500">
        Features and facilities available at this property.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {[
          ["⌂", "Modular Kitchen"],
          ["❄", "Air Conditioning"],
          ["▤", "Power Backup"],
          ["♧", "Private Garden"],
          ["▣", "Covered Parking"],
          ["◈", "Security System"],
          ["☀", "Natural Lighting"],
          ["⌁", "Balcony"],
          ["♨", "Water Supply"],
        ].map(([icon, amenity]) => (
          <div
            key={amenity}
            className="flex items-center gap-3 rounded-xl bg-[#f7f8f6] p-4"
          >
            <span className="text-lg text-[#45654d]">{icon}</span>
            <span className="text-sm text-gray-600">{amenity}</span>
          </div>
        ))}
      </div>
    </section>

    {/* Location */}
    <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8">
      <h2 className="text-xl font-semibold">Location Details</h2>

      <div className="mt-6 space-y-4">
        {[
          ["Full Address", "Golf Course Road, Gurugram, Haryana"],
          ["City", "Gurugram"],
          ["State", "Haryana"],
          ["Postal Code", "122002"],
          ["Neighborhood", "DLF Phase 5"],
        ].map(([label, value]) => (
          <div
            key={label}
            className="flex flex-wrap justify-between gap-2 border-b border-gray-100 pb-4 last:border-0 last:pb-0"
          >
            <span className="text-sm text-gray-500">{label}</span>
            <span className="text-right text-sm font-medium">
              {value}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 flex h-48 items-center justify-center rounded-2xl bg-[#edf0e9]">
        <div className="text-center">
          <span className="text-3xl">⌖</span>
          <p className="mt-2 text-sm font-medium">
            Property Location
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Map integration can be added later.
          </p>
        </div>
      </div>
    </section>
  </div>
  )
}

export default LeftSide