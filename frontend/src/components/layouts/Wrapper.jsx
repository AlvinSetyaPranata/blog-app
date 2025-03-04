import React from 'react'

export default function Wrapper({ children }) {
  return (
    <div className='px-8 w-full min-h-screen'>
        {children}
    </div>
  )
}
