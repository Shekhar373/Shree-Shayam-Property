import React from 'react'

const Navbar = () => {
  return (
    <div className='px-10 py-5 overflow-hidden fixed top-0 w-full z-50'>
      <div className='h-fit w-full p-2 rounded-4xl bg-white flex items-center justify-between font-[heading-font]'>
        {/* Left - Logo and Title */}
        <div className='flex gap-2 items-center'>
          <img
            className='h-10 w-10 object-cover rounded-full'
            src="https://i.pinimg.com/1200x/d5/1c/a8/d51ca8e3f2e37e22ab7d5842e6480720.jpg"
            alt="ShreeShayam Logo"
          />
          <span className='text-md font-bold tracking-wide'>ShreeShayam</span>
        </div>
        {/* Center - Menu */}
        <div className='flex gap-8 items-center'>
          <span className='text-sm font-medium'>Properties</span>
          <span className='text-sm font-medium'>Our Services</span>
          <span className='text-sm font-medium'>About</span>
          <span className='text-sm font-medium'>Houses</span>
        </div>
        {/* Right - Contact Button */}
        <div>
          <span className='px-5 py-3 rounded-full bg-[#000001] text-white text-xs  font-semibold'>
            Contact Us
          </span>
        </div>
      </div>
    </div>
  )
}

export default Navbar