import { motion } from "motion/react";
import React, { useRef } from "react";

export default function CardWithOption({
  id,
  imageURL,
  title,
  desc,
  onRemove
}) {
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
    <motion.div layout className="bg-white rounded-md w-full relative">
      <motion.img
        src={imageURL}
        alt="card-image"
        className="w-[400px] rounded-md"
      />
      <motion.div layout className="flex justify-between items-center">
        <motion.div layout className="mt-4">
          <motion.h3 layout className="font-medium">
            {title}
          </motion.h3>
          <motion.p layout className="text-xs font-medium text-gray-400 mt-1">
            {desc}
          </motion.p>
        </motion.div>

        <motion.button layout onClick={handleEnableOption}>
          <motion.svg
            layout
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <motion.path
              layout
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
            />
          </motion.svg>
        </motion.button>

        <motion.div
          ref={popUpRef}
          tabIndex={-1}
          onBlur={handleBlur}
          layout
          className="hidden absolute rounded-md shadow-md -bottom-8 right-0 w-[120px] text-sm z-20 overflow-hidden bg-white"
        >
          <motion.button layout className="w-full py-2 px-4 text-left">
            Edit
          </motion.button>
          <motion.button
            layout
            onClick={() => onRemove(id)}
            className="w-full py-2 px-4 text-left hover:bg-red-500 hover:text-white"
          >
            Delete blog
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
