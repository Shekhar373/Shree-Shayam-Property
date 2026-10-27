import React from 'react'

const ServiceHeader = () => {
  return (
    <div className='h-[40vh] w-full flex justify-between p-10'>
      <div className='w-1/3'>
        <h1 className='text-lg '>Our services</h1>
        <h1 className='text-lg traking-tight text-zinc-500'>Ways we help you find, secure and <br /> grow the right space.</h1>
      </div>
      <div className='w-2/3 text-4xl leading-tight'>
        <h1><span className='pl-[10vw]'>Every</span> kind of property, guided by the same careful eye. Buy, sell, rent or invest with a team that puts your future first.</h1>
      
      </div>

    </div>
  )
}

export default ServiceHeader