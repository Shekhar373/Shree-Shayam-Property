import React from 'react'

const HomePropertiesHeader = () => {
  return (
    <div className='flex h-[30vh] w-full p-10'>
        <div className='h-full w-1/2 pr-[15vw] flex flex-col justify-between'>
            <h1 className='text-5xl font-[heading-font]'>Top Offers</h1>
            <h1 className='leading-tight'>We offer professional services in buying and selling residential and commercial real estate.</h1>
        </div>
        <div className='h-full w-1/2 flex justify-end items-end'>
            <button className="w-fit bg-[#000001] text-white px-8 py-3 rounded-4xl">View all properties</button>
        </div>
    </div>
  )
}

export default HomePropertiesHeader