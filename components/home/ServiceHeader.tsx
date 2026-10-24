import React from 'react'

const ServiceHeader = () => {
  return (
    <div className='h-[40vh] w-full flex justify-between p-10'>
      <div>
        <h1 className='text-xs text-zinc-500'>OUR SERVICES</h1>
        <h1 className='text-4xl traking-tight'>Comprehensive <br /> Real Estate Solution</h1>
      </div>
      <div className='text-sm leading-tight w-[20vw]'>
        <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores consectetur necessitatibus architecto! Consectetur dicta cum facere quae. Tempore consequatur atque optio  </h1>
      </div>
      <button>Let's Talk</button>

    </div>
  )
}

export default ServiceHeader