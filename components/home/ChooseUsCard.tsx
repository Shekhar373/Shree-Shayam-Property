import React from 'react'

const ChooseUsCard = () => {
  return (
    <div className='h-full w-full border-t border-black/15 flex flex-col justify-between py-10'>
        <img className='h-4 w-4 object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCC-NhhBHuCb9JChTmfuYSetbBd9i59W9E9BtYp7y19g&s" alt="" />
        <div className='flex flex-col gap-5'>
        <h1 className='text-2xl '>Local market insight</h1>
        <h1 className='text-sm leading-tight'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat enim recusandae dicta.</h1>
        </div>
    </div>
  )
}

export default ChooseUsCard