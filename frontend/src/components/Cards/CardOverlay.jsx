import React from "react";

export default function CardOverlay({ title, desc, src }) {
  return (
    <div>
      {/* heading */}
      <div className="rounded-md group relative h-[400px] bg-blue-500">
        {/* overlay layer */}
        <div className="absolute left-0 top-0 size-full bg-black opacity-0 group-hover:opacity-75 group-hover:transition-opacity group-hover:ease-in group-hover:duration-200 duration-200 ease-out flex flex-col justify-end p-8 rounded-md z-10">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <h1 className="text-white text-lg font-semibold uppercase">
                {title}
              </h1>
              <h3 className="text-white text-sm">{desc}</h3>
            </div>

            <div className="flex gap-x-8">
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  className="size-6 stroke-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                  />
                </svg>
              </button>
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  className="size-6 stroke-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* overlay layer */}
        <img className="size-full rounded-md flex-1" src={src} alt="image" />
      </div>
      {/* heading */}

      <div className="flex gap-x-4 mt-6 items-center">

        <img src="/woman-eyes.jpg" alt="avatar" className="size-[45px] rounded-full"/>

        <div>
          <h1 className="text-lg font-semibold">Nindia Prameswari Putri cahyono</h1>
          <p>Senior Tech Writer</p>
        </div>
      </div>

    </div>
  );
}
