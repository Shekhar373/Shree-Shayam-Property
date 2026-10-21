import React from 'react'

const ServiceHeader = () => {
  return (
    <div className='h-[40vh] w-full flex px-10'>
        <div className='h-full w-1/2 font-[heading-font] font-medium text-5xl py-5'>
       <h1>Our Services</h1>
        </div>
        <div className='h-full w-1/2 pr-[10vw] flex flex-col justify-between p-5'>
            <h1 className='text-xl leading-tight'>We provide a full range of real estate services to help you find, buy, sell or rent your perfect peroperty.</h1>
            <h1 className='text-xs'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos esse molestias dolor sunt harum beatae ut saepe quam porro eos quas ullam obcaecati, tempore aut explicabo id dolorum aspernatur. Deleniti.</h1>
            <button className="w-fit bg-[#000001] text-sm text-white px-10 py-2  rounded-4xl">View all</button>
        </div>
    </div>
  )
}

export default ServiceHeader