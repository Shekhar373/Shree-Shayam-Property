import Hero from '@/components/home/Hero'
import Navbar from '@/components/commom/Navbar'
import Services from '@/components/home/Services'
import React from 'react'
import Approach from '@/components/home/Approach'
import AboutUs from '@/components/home/AboutUs'

const page = () => {
  return (
    <div className='bg-[#EEF1EE] text-[#000001]'>
      <Hero />
      <AboutUs />
      <Approach />
      <Services />

    </div>
  )
}

export default page 