import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import FloatingLogin from "./FloatingLogin";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/auth";

export default function Navbar() {
  const [showPopup, setShowPopup] = useState(false);
  const [showForm, setShowForm] = useState(false)

  const { user, token } = useAuthStore()

  const navigation = useNavigate()

  const popUpVariants = {
    "initial" : {
      opacity: 0,
      display: "none"
    },

    "animate" : {
      opacity: 100,
      display: "block"
    }
  }

  const tooglePopup = (name) => {
    setFormVisible(name)
    setShowForm(true)
  }

  return (
    <div className="max-w-[1300px] mx-auto py-6 flex justify-between items-center px-4">

      <FloatingLogin defaultVisible={showForm} setter={setShowForm} />

      <div className="flex items-center gap-x-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 block md:hidden"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>

        <img src="/logo.svg" alt="logo" className="size-6 md:size-8" />
      </div>

      {/* hamburger */}
      <button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 block md:hidden"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>
      </button>

      <div className="relative items-center text-sm font-normal hidden md:flex gap-x-4">

          <div  className="flex gap-x-4 mr-4 font-medium">
        {/* popup */}
        <motion.div
        initial="initial"
        animate={showPopup ? "animate" : "initial"}
        variants={popUpVariants}
        onMouseEnter={() => setShowPopup(true)}
        onMouseLeave={() => setShowPopup(false)}
        className="absolute top-[120%] left-0 z-9 bg-black text-white rounded-md flex flex-col">
          <div className="w-full min-w-[250px] border-b-[1px] border-gray-700 flex flex-col gap-y-4 py-6">
            <Link className="px-6 h-max py-1 bg-gray-800 bg-opacity-0 hover:bg-opacity-100 hover:duration-500 hover:ease-out hover:cursor-pointer duration-500 ease-in" to="/account/dashboard">Dashboard</Link>
            <Link className="px-6 h-max py-1 bg-gray-800 bg-opacity-0 hover:bg-opacity-100 hover:duration-500 hover:ease-out hover:cursor-pointer duration-500 ease-in" href="#">Profile</Link>
          </div>
          <div className="w-full min-w-[250px] border-b-[1px] border-gray-700 flex flex-col gap-y-4 py-6">
            <a href="#" className="px-6 h-max py-1 bg-red-800 bg-opacity-0 hover:bg-opacity-100 hover:duration-500 hover:ease-out hover:cursor-pointer duration-500 ease-in">Logout</a>
          </div>
        </motion.div>
          {/* popup */}
        
        {token ? (
          <>
            <a
              onMouseEnter={() => setShowPopup(true)}
              onMouseLeave={() => setShowPopup(false)}
              href="#"
              className={`rounded-full overflow-hidden size-[40px] ${!user ? "bg-gray-600 animate-pulse" : ""} hover:cursor-pointer bg-red-500 relative`}
            >
              <img src={user.avatar} alt="user-avatar" className="size-full aspect-video" />
            </a>

            {/* popup */}
          </>
        ) : (
          <>
            <button
              onClick={() => navigation("/login")}
              className="border-b-2 border-transparent hover:border-black hover:cursor-pointer mr-4"
            >
              Login
            </button>
            <button
            onClick={() => navigation("/register")}
            className="border-b-2 border-transparent hover:border-black hover:cursor-pointer">
              Signup
            </button>
          </>
        )}
        </div>
        <button className="py-3 px-5 bg-black text-white font-medium rounded-md text-sm">
          Be Pro
        </button>
        <button className="py-3 px-5 bg-whtite border border-black font-medium rounded-md text-sm hover:bg-black hover:text-white hover:duration-300 hover:ease-out duration-300 ease-in">
          Submit Blog
        </button>
      </div>
    </div>
  );
}
