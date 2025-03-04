import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RootLayout from '../components/layouts/RootLayout'
import Home from '../pages/Home'

export default function Routers() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<RootLayout />}>
              <Route path='/' element={<Home />} />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}
