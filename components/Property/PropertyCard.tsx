import React from 'react'

const PropertyCard = () => {
  return (
    <div className="h-[90vh] w-full  flex flex-col overflow-hidden border-y border-black/10 py-5">
      {/* Top content */}
      <div className="flex flex-col gap-2 pb-2">
        <h1 className="text-xl font-bold text-gray-400 tracking-widest">01</h1>
        <h1 className="text-2xl font-semibold font-[heading-font] text-gray-900 mb-1">The Grand Palm Sanctuary</h1>
        <p className="text-base text-gray-600 leading-relaxed">
          Discover and purchase premium water-facing properties with expert guidance, organic teak architecture, and complete structural transparency.
        </p>
      </div>
      {/* Property Image */}
      <div className="flex-1 w-full py-3 flex items-center justify-center">
        <img
          src="https://i.pinimg.com/1200x/b3/09/31/b30931aff9c68e7f1e3a98137890de91.jpg"
          alt="Property"
          className="object-cover rounded-2xl h-[50vh] w-full"
        />
      </div>
      {/* Location and Price */}
      <div className="flex items-center justify-between py-5 ">
        <span className="text-lg font-medium text-gray-700">Dashrathpuri</span>
        <span className="text-xl font-medium ">₹25,00,000</span>
      </div>
    </div>
  )
}

export default PropertyCard