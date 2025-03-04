import React from 'react'

export default function Footer() {
  return (
    <div className='w-[1300px] mx-auto'>
        <img src='/logo.svg' alt='logo' className='size-[30px]'/>
        <div className='flex'>
            <div className='grid grid-cols-2 md:grid-cols-4 mt-12 gap-y-8 flex-1 font-medium'>
                <a href="#">Blogs</a>
                <a href="#">Academy</a>
                <a href="#">Donate</a>
                <a href="#">Blogs</a>
                <a href="#">Academy</a>
            </div>
            <div className='w-[300px] rounded-md bg-black text-white flex justify-center items-center gap-x-4  shrink-0'>
                <h1>Happy</h1>
                <img src="ramadhan-icon.svg" alt="ramadhan-icon" />
                <h2 className='font-semibold'>Ramadhan mubarak</h2>
            </div>
        </div>

        <div className='flex justify-between border-black border-t-2 border-dotted mt-12 py-6'>
            <div className='flex gap-x-12'>
                <p>Privacy Policy</p>
                <p>Legal Terms</p>
            </div>

            <div className="flex items-center gap-x-4">
                <p className='font-semibold text-sm'>Sponsored by</p>
                <img src="/pti.svg" alt="pti" />
            </div>
        </div>
    </div>
  )
}
