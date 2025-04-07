import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootLayout from "../components/layouts/RootLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AccountLayout from "../components/layouts/Account";
import Blogs from "../pages/Accounts/Blogs";
import { useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

export default function Routers() {
  const SUPABASE_URL = "https://xgrqeqosyndnyejqulbg.supabase.co";

  const supabase = createClient(
    SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
  );

  useEffect(() => {
  

    const URL = window.location.pathname

    const checkLoggedIn = async () => {

      const { data } = await supabase.auth.getSession()

      if (!data.session && (URL != "/login")) {
        window.location.href = `${window.location.origin}/login`
        return
      }
    }

    checkLoggedIn()


  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/account" element={<AccountLayout />}>
            <Route path="/account/dashboard" element={<Blogs />} />
            <Route path="/account/settings" element={<Blogs />} />
            <Route path="/account/statistics" element={<Blogs />} />
          </Route>
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}
