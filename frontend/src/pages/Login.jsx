import React, { useState } from "react";

export default function Login() {
  const [isVisible, setIsVisible] = useState(false);

  const toogleEye = () => {
    if (!isVisible) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
      );
    } else {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
          />
        </svg>
      );
    }
  };

  return (
    <div className="w-full min-h-screen flex">
      <div className="w-full min-h-full flex-1 bg-red-500 relative">
        {/* overlay */}
        <div className="absolute top-0 left-0 w-full h-full z-99 bg-black flex flex-col justify-end text-white bg-opacity-80 pb-12 gap-y-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 absolute top-8 left-8 z-999 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
          <div className="pb-12 pl-6 space-y-3">
            <h1 className="text-3xl md:text-4xl xl:text-5xl font-bold">
              Ready to change the world?
            </h1>
            <p className="text-slate-300">
              With us you can have over +10.000 people arround the world, that
              collaborate each other
            </p>
          </div>

          <div className="flex min-w-full gap-x-4 justify-center">
            <div className="min-w-[25px] bg-white min-h-[4px] rounded-md"></div>
            <div className="min-w-[25px] bg-gray-400 min-h-[4px] rounded-md"></div>
            <div className="min-w-[25px] bg-gray-400 min-h-[4px] rounded-md"></div>
          </div>
        </div>
        <img
          className="w-full h-full aspect-[3/2]"
          src="/image2.jpg"
          alt="backgroud"
        />
      </div>
      <div className="w-full min-h-full flex-1 flex flex-col justify-center items-center">
        <form className="space-y-12">
          <h2 className="font-medium md:text-lg xl:text-3xl text-center">
            Greetings Writer
          </h2>
          <div className="space-y-2">
            <p className="text-sm">Email</p>
            <input
              type="text"
              className="border-2 border-black rounded-md p-2 text-sm outline-none min-w-[300px]"
            />
          </div>
          <div className="space-y-2">
            <p className="text-sm">Password</p>
            <div className="gap-x-4 border-2 border-black rounded-md p-2 text-sm min-w-[300px] flex">
              <input
                type={isVisible ? "text" : "password"}
                className="flex-1 outline-none"
              />
              <button 
              type="button"
              className="hover:cursor-pointer" onClick={() => setIsVisible(state => !state)}>
                {toogleEye()}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="min-w-[300px] text-center bg-black text-white rounded-md py-3 font-medium"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
