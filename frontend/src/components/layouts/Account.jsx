import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import ButtonWithIcon from "../buttons/ButtonWithIcon";

export default function AccountLayout() {
  const location = useLocation();
  const navigate = useNavigate()

  useEffect(() => {
    if (location.pathname.includes("/account")) {
      navigate("/account/dashboard")
    }
  }, [])

  return (
    <div className="flex py-8 px-12 flex-col items-center">
      {/* avatar section */}
      <div className="flex-1 w-full flex justify-between items-center">
        <div className="flex gap-x-4">
          <div className="size-[150px] relative">
            <img
              src="/woman-eyes.jpg"
              className="size-full object-cover rounded-full"
              alt="avatar"
            />
          </div>
          <div className="flex flex-col justify-center gap-y-2 ml-2">
            <h1 className="text-xl font-semibold">
              Nindia Prameswari Putri Cahyono
            </h1>
            <p>Senior Tech Writer</p>
          </div>
        </div>
        <button className="bg-black text-white px-4 py-3 rounded-md w-max mt-12 text-sm font-medium">
          Edit Profile
        </button>
      </div>
      {/* end avatar */}
      <div className="w-full flex-1 flex py-20 px-4">
        {/* sidenav */}
        <div className="flex flex-col gap-y-12">
          <ButtonWithIcon
            title="Blogs"
            to="/account/dashboard"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                className={`size-6 ${location.pathname == "/account/dashboard" ? "stroke-orange-500" : "stroke-black"}`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                />
              </svg>
            }
          />
          <ButtonWithIcon
            title="Stats"
            to="/account/statistics"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`size-6 ${location.pathname == "/account/statistics" ? "stroke-orange-500" : "stroke-black"}`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
                />
              </svg>
            }
          />

          <ButtonWithIcon
            title="Settings"
            to="/account/settings"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                className={`size-6 ${location.pathname == "/account/settings" ? "stroke-orange-500" : "stroke-black"}`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            }
          />
        </div>
        {/* endsidenav */}

        {/* content */}
        <div className="flex-1 w-full px-2">
          <Outlet />
        </div>
        {/* endcontent */}
      </div>
    </div>
  );
}
