import React from 'react'

const PropertyFooter = () => {
  return (
    <div className='h-[50vh] w-full bg-[#E3E8E0] my-[20vh] flex justify-center items-center'>
        <div className='h-fit w-2/3 p-10 pr-25 flex flex-col gap-5'>
        <h1 className='text-xs font-medium'>Looking for something specific?</h1>
        <h1 className='text-4xl'>Tell is what you need and we will find the space that feels like yours.</h1>
         </div>
        <div className='h-fit w-1/3 flex gap-5'>
        <button className="w-full px-5 py-3 bg-black text-xs text-white lg:w-fit cursor-pointer">Share your requirement</button>
        <button className="w-full px-5 py-3 bg-white text-xs text-black lg:w-fit cursor-pointer">Contact us</button>
        </div>
    </div>
  )
}

export default PropertyFooter