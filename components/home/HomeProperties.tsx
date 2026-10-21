import React from 'react'
import HomePropertiesHeader from './HomePropertiesHeader'
import PropertyCard from './PropertyCard'

export const HomeProperties = () => {
  return (
    <div className='h-screen w-full my-[20vh] p-10'>
        <HomePropertiesHeader />
        <div className="flex overflow-x-auto space-x-8 py-8 scrollbar-thin scrollbar-thumb-zinc-300">
          <div className="flex flex-row min-w-max gap-8">
            <PropertyCard />
            <PropertyCard />
            <PropertyCard />
            <PropertyCard />
            <PropertyCard />
            <PropertyCard />
          </div>
        </div>
   

    </div>
  )
}
