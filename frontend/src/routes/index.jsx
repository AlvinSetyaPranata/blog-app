import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RootLayout from '../components/layouts/RootLayout'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import AccountLayout from '../components/layouts/Account'
import Blogs from '../pages/Accounts/Blogs'

export default function Routers() {
  return (
    <BrowserRouter>
        <Routes>
          
            <Route path='/' element={<RootLayout />}>
              <Route path='/' element={<Home />} />
              <Route path='/account' element={<AccountLayout/>}>
                <Route path='/account/dashboard' element={<Blogs />} />
                <Route path='/account/settings' element={<Blogs />} />
                <Route path='/account/statistics' element={<Blogs />} />
              </Route>
            </Route>

            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
        </Routes>
    </BrowserRouter>
  )
}
