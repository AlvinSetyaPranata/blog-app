import React from "react";

export default function Navbar() {
  return (
    <div className="max-w-[1300px] mx-auto py-6 flex justify-between items-center px-4">
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

      <div className="items-center gap-x-8 text-sm font-normal hidden md:flex">
        <a href="/login" className="border-b-2 border-transparent hover:border-black hover:cursor-pointer">
          Login
        </a>
        <h3 className="border-b-2 border-transparent hover:border-black hover:cursor-pointer">
          Signup
        </h3>
        <button className="py-3 px-5 bg-black text-white font-medium rounded-md">
          Get Started
        </button>
      </div>
    </div>
  );
}
