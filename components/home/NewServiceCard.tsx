import React from 'react'
import ServiceCardComponent from './ServiceCardComponent'

const NewServiceCard = () => {
  return (
    <div className='flex h-auto w-full flex-col lg:h-screen lg:flex-row'>
        <div className='h-auto w-full px-5 sm:px-8 lg:h-full lg:w-1/2 lg:px-10'>
           <div className='h-[40vh] w-full sm:h-[50vh] lg:h-[80vh]'>
            <img className='h-full w-full object-cover' src="https://cdn.prod.website-files.com/69e15aa1d45aa73e62a536a8/6a6f7b46f7fdfc3470ed2f3f_project-s-4-p-2000.webp" alt="" />
           </div>
        </div>
        <div className='h-auto w-full min-w-0 px-5 pb-8 sm:px-8 lg:h-full lg:w-1/2 lg:px-0 lg:pb-0 lg:pr-10'>
          <ServiceCardComponent />
          <ServiceCardComponent />
          <ServiceCardComponent />
          <ServiceCardComponent />
          <div className='mt-6 lg:mt-10'>
            <button className="w-full px-5 py-3 bg-black text-white lg:w-fit">See all properties</button>
          </div>
        </div>
    </div>

  )
}

export default NewServiceCard
