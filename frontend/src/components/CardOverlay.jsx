import React from 'react'

export default function CardOverlay({ title, desc, src }) {
  return (
    <div className='rounded-md group relative'>
        <div className='absolute left-0 top-0 size-full bg-black opacity-0 group-hover:opacity-75 group-hover:transition-opacity group-hover:ease-in group-hover:duration-200 duration-200 ease-out flex flex-col justify-end p-8'>
            <h1 className='text-white text-lg font-semibold'>{title}</h1>
            <h3 className='text-white text-sm'>{desc}</h3>
        </div>
        <button className='absolute hidden group-hover:block top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-9990 border-2 border-white text-white bg-transparent text-sm px-4 py-2 font-medium rounded-md hover:bg-white hover:text-black'>Learn more</button>
        <img className="size-full rounded-md" src={src} alt="image" />
    </div>
  )
}
