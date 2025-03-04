import React from 'react'

export default function Navbar() {
  return (
    <div className="max-w-[1300px] mx-auto py-6 flex justify-between items-center">
        <img src='/logo.svg' alt='logo' className='size-[30px]' />
        <div className='flex items-center gap-x-8 text-sm font-normal'>
            <h3 className='border-b-2 border-transparent hover:border-black hover:cursor-pointer'>Login</h3>
            <h3 className='border-b-2 border-transparent hover:border-black hover:cursor-pointer'>Signup</h3>
            <button className='py-3 px-5 bg-black text-white font-medium rounded-md'>Get Started</button>
        </div>
    </div>
  )
}
