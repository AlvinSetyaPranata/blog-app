import React from 'react'

export default function Wrapper({ children }) {
  return (
    <div className='pt-10 px-8 w-full min-h-screen'>
        {children}
    </div>
  )
}
