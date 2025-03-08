import { useGoogleLogin } from "@react-oauth/google";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { profileAtom } from "../store";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function FloatingLogin() {
  const [isVisible, setIsVisible] = useState(false);
  const [, setCredential] = useAtom(profileAtom);

  const navigate = useNavigate();

  const googleAuth = useGoogleLogin({
    onSuccess: (response) => {
      setCredential(response);
      navigate("/");
    },
  });

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

  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  return (
    <div className="fixed bottom-0 left-0 w-full min-h-screen flex bg-white z-10">
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
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>

          <div className="pb-8 px-6 space-y-3">
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
          <h2 className="font-semibold md:text-lg xl:text-3xl text-center">
            Greetings Writer
          </h2>
          <div className="space-y-2">
            <p className="text-sm font-medium">Email</p>
            <input
              type="email"
              className="border border-black rounded-md px-2 py-2.5 text-sm outline-none min-w-[350px]"
            />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Password</p>
            <div className="gap-x-4 border border-black rounded-md p-2 text-sm min-w-[300px] flex">
              <input
                type={isVisible ? "text" : "password"}
                className="flex-1 outline-none"
              />
              <button
                type="button"
                className="hover:cursor-pointer"
                onClick={() => setIsVisible((state) => !state)}
              >
                {toogleEye()}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="min-w-[350px] text-center bg-black text-white rounded-md py-3 font-medium text-sm"
          >
            Login
          </button>
        </form>
        <div className="border-t-[1.5px] border-gray-400 mt-8 pt-8 flex flex-col gap-y-4">
          <button
            className="min-w-[350px] text-center border-2 border-black rounded-md py-3 font-semibold text-sm flex items-center justify-center gap-x-3"
            onClick={googleAuth}
          >
            Login with Google
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 488 512"
              className="size-5"
            >
              <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
            </svg>
          </button>
          <button className="min-w-[350px] text-center rounded-md py-3 text-sm flex justify-center items-center gap-x-3 font-semibold bg-[#1877F2] text-white">
            Login with Facebook
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="size-5"
            >
              <path
                className="fill-white"
                d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"
              />
            </svg>
          </button>
          <button className="min-w-[350px] text-center border-2 border-black bg-black text-white rounded-md py-3 text-sm font-semibold flex justify-center items-center gap-x-3">
            Login with Apple
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
              className="size-5 fill-white"
            >
              <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
