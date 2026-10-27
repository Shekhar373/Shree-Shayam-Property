import React from 'react'
import ServiceCardComponent from './ServiceCardComponent'

const NewServiceCard = () => {
  return (
    <div className='h-screen w-full flex'>
        <div className='w-1/2 h-full px-10'>
           <div className='h-[80vh] w-full'>
            <img className='h-full w-full object-cover' src="https://cdn.prod.website-files.com/69e15aa1d45aa73e62a536a8/6a6f7b46f7fdfc3470ed2f3f_project-s-4-p-2000.webp" alt="" />
           </div>
        </div>
        <div className='w-1/2 h-full pr-10'>
          <ServiceCardComponent />
          <ServiceCardComponent />
          <ServiceCardComponent />
          <ServiceCardComponent />
          <div className='mt-10'>
            <button className="px-7 py-4 bg-black text-white w-fit">See all properties</button>
          </div>
        </div>
    </div>

  )
}

export default NewServiceCard