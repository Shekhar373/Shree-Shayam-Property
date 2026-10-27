import React from 'react'

type servicetype = {
    id: Number,
    title: String,
    descreption: String,
}
const ServiceCardComponent = () => {

    

  return (
    <div className='h-[20vh] w-full border-t border-black/15 flex items-center'>
       <div className='h-[14vh] flex gap-10 justify-between'>
       <div className='font-medium'>01</div>
        <div className='flex flex-col justify-between'>
            <h1 className='text-3xl '>Buy a home</h1>
            <h1 className='text-sm'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa architecto, consequuntur autem a placeat soluta!</h1>
        </div>
        <div>
            
        </div>
       </div>
    </div>
  )
}

export default ServiceCardComponent