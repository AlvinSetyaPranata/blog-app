import React, { useRef } from "react";

export default function CardWithOption({ imageURL, title, desc }) {
  const popUpRef = useRef(null);

  const handleEnableOption = () => {
    if (popUpRef.current) {
      popUpRef.current.tabIndex = 0; // Make it focusable
      popUpRef.current.style.display = "block"; // Show popup
      popUpRef.current.focus(); // Focus the popup
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      if (popUpRef.current) {
        popUpRef.current.tabIndex = -1; // Remove focusability
        popUpRef.current.style.display = "none"; // Hide popup
      }
    }, 100); // Delay for click inside
  };

  return (
    <div className="bg-white rounded-md w-full relative">
      <img src={imageURL} alt="card-image" className="w-[400px] rounded-md" />
      <div className="flex justify-between items-center">
        <div className="mt-4">
          <h3 className="font-medium">{title}</h3>
          <p className="text-xs font-medium text-gray-400 mt-1">{desc}</p>
        </div>

        <button onClick={handleEnableOption}>
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
              d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
            />
          </svg>
        </button>

        {/* Pop-up */}
        <div
          ref={popUpRef}
          tabIndex={-1} // Default not focusable
          onBlur={handleBlur} // Hide on losing focus
          className="hidden absolute rounded-md shadow-md -bottom-8 right-0 w-[120px] text-sm z-20 overflow-hidden bg-white"
        >
          <button className="w-full py-2 px-4 text-left">Edit</button>
          <button className="w-full py-2 px-4 text-left hover:bg-red-500 hover:text-white">
            Delete blog
          </button>
        </div>
      </div>
    </div>
  );
}
