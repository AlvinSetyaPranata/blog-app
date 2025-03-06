import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RootLayout from '../components/layouts/RootLayout'
import Home from '../pages/Home'
import Login from '../pages/Login'

export default function Routers() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<RootLayout />}>
              <Route path='/' element={<Home />} />
            </Route>
            <Route path='/login' element={<Login />} />
        </Routes>
    </BrowserRouter>
  )
}
