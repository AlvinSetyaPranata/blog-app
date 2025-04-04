import React, { useEffect, useRef, useState } from "react";
import Wrapper from "../components/layouts/Wrapper";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import CardOverlay from "../components/Cards/CardOverlay";
import { GetBotd } from "../services/blog";
import useAuthStore from "../store/auth";

export default function Home() {
  const { scrollYProgress } = useScroll();

  const imageRef = useRef(null);

  const isInView = useInView(imageRef, {
    margin: "-40% 0px -40% 0px",
    once: true,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 0.5, 1]);

  const { token } = useAuthStore();

  return (
    <div className="space-y-3">
      <Wrapper>
        <div className="flex justify-center items-center mt-6 gap-x-4 text-sm">
          <h3 className="">Blog of the Day</h3>
          <div className="px-2 py-1 border border-black">
            <p className="font-medium">24 February</p>
          </div>
          <h3>with rating of 100%</h3>
        </div>
        <h1 className="text-4xl md:text-6xl xl:text-8xl font-semibold text-center uppercase overflow-visible mt-12">
          Tatapan si pekerja keras
        </h1>

        <div className="flex justify-center gap-x-4 items-center mt-14">
          <img src="/woman-eyes.jpg" alt="botd-user-image" className="size-[40px] rounded-full"/>
          <div>
            <h2 className="font-medium">Nindia Prameswari Putri Cahyono</h2>
            <p className="text-sm">Senior Tech Writer</p>
          </div>
        </div>

        <div className="relative h-[200px] md:h-[2500px]">
          {/* start content */}
          <img
            src="image2.jpg"
            className="absolute top-[30%] right-0 hidden md:block w-[25%] origin-center rotate-45"
            alt="nominees"
          />

          <h1 className="font-bold text-4xl rotate-45 absolute top-[45%] right-0 hidden md:block origin-center">
            Don't be bussy be productive
          </h1>

          <img
            src="image2.jpg"
            className="absolute top-[60%] left-0 hidden md:block w-[25%] origin-center -rotate-45"
            alt="nominees"
          />

          <h1 className="font-bold text-4xl -rotate-45 absolute top-[80%] left-0 hidden md:block origin-center">
            Don't be bussy be productive
          </h1>

          {/* end content */}

          <div
            ref={imageRef}
            className="rounded-md md:mt-32 sticky top-5 left-0 min-h-[300px]"
          >
            <motion.img
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 100 }}
              transition={{ type: "tween", duration: 0.5, ease: "easeOut" }}
              src="/woman-eyes.jpg"
              alt="hero"
              className="w-max h-max md:w-full md:h-full rounded-md aspect-[4 / 3]"
              style={{ scale: isInView && window.innerWidth > 768 ? scale : 1 }}
            />
          </div>
        </div>
      </Wrapper>

      <Wrapper>
        <div className="flex justify-between items-center">
          <div className="">
            <h1 className="text-2xl md:text-4xl xl:text-6xl font-semibold uppercase">
              Nominees
            </h1>
            <h3 className="text-base md:text-lg xl:text-xl mt-4">
              Explore others beautiful blogs written by people from around the
              world
            </h3>
          </div>
          <a href="#" className="flex items-center gap-x-2">
            Learn more
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 mt-16">
          <CardOverlay
            src="/woman-eyes.jpg"
            title="blog"
            desc="Tatapan si pekerja keras"
          />
          <CardOverlay
            src="/image2.jpg"
            title="blog"
            desc="Tatapan si pekerja keras"
          />
        </div>
      </Wrapper>

      {/* Academy Section */}

      <Wrapper>
        <div className="flex flex-row-reverse justify-between items-center">
          <div className="">
            <h1 className="text-2xl md:text-4xl xl:text-6xl font-semibold uppercase text-right">
              Need a hand?
            </h1>
            <h3 className="text-base md:text-lg xl:text-xl mt-4 text-right">
              Our team have a professional experiences in writing, coding, and a
              lot of stuff
            </h3>
          </div>
          <a href="#" className="flex items-center gap-x-2">
            Learn more
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 mt-16">
          <CardOverlay
            src="/woman-eyes.jpg"
            name="Nindia Prameswari Putri Cahyono"
            role="Journalist Expert"
          />

        </div>
      </Wrapper>
    </div>
  );
}
