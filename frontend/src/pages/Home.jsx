import React, { useEffect, useRef, useState } from "react";
import Wrapper from "../components/layouts/Wrapper";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import CardOverlay from "../components/CardOverlay";

const IMAGES = ["/woman-eyes.jpg", "/image2.jpg"];

export default function Home() {
  const { scrollY } = useScroll();
  const imageRef = useRef(null);
  const isInView = useInView(imageRef, {
    margin: "-40% 0px -40% 0px",
    once: true,
  });
  const scale = useTransform(scrollY, [0, 300], [1, 0.5]);

  const [index, setIndex] = useState(0);
  const [botd, setBotd] = useState({});

  useEffect(() => {
    const getData = async () => {
      await fetch(`${import.meta.env.VITE_BASE_API_URL}/blogs?categories=botd`)
        .then((res) => res.json())
        .then((data) => setBotd(data.data));
    };

    getData();
  }, []);

  // useEffect(() => console.log(botd), [botd])

  useEffect(() => {
    if (isInView && window.innerWidth >= 768) {
      const unsubcribe = scrollY.on("change", (y) => {
        if (y <= 571) {
          setIndex(0);
        }
        if (y > 1103) {
          setIndex(1);
        }
      });

      return () => unsubcribe();
    }
  }, [isInView, scrollY]);

  return (
    <div className="space-y-32">
      <Wrapper>
        <h1 className="text-4xl md:text-6xl xl:text-8xl font-semibold text-center uppercas">
          publica más, gana más
        </h1>
        <h3 className="text-center text-base md:text-lg xl:text-xl mt-6">
          Publish or Search anything in one place
        </h3>

        <div className="relative h-[200px] md:h-[2000px] mt-8">
          {/* start content */}
          <h1 className="font-bold text-4xl rotate-[20deg] absolute top-[30%] right-0 hidden md:block">
            Be a hero not zero
          </h1>

          <h1 className="font-bold text-4xl -rotate-[20deg] absolute top-[60%] left-0 hidden md:block">
            Be a professional not ego
          </h1>

          {/* end content */}

          <div
            ref={imageRef}
            className="rounded-md md:mt-32 static md:sticky top-5 left-0 min-h-[800px] overflow-hidden"
          >
            <motion.img
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 100 }}
              transition={{ type: "tween", duration: 0.5, ease: "easeOut" }}
              src={botd ? botd.image : ""}
              alt="hero"
              className="w-max h-max md:w-full md:h-full rounded-md aspect-[4 / 3]"
              style={{ scale: isInView && window.innerWidth > 768 ? scale : 1 }}
            />
          </div>
        </div>
      </Wrapper>

      {/* Best Blog Section */}

      <Wrapper>
        <h1 className="text-2xl md:text-4xl xl:text-6xl font-semibold text-center uppercase">
          Blog Of The Day
        </h1>
        <h3 className="text-center text-base md:text-lg xl:text-xl mt-4">
          The most viewed blog nowdays
        </h3>
        <div className="mt-12">
          <CardOverlay
            src="/woman-eyes.jpg"
            title={botd ? botd.title : ""}
            desc={botd.author ? botd.author.name : ""}
          />
        </div>
      </Wrapper>

      {/* Explore More section */}

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
            title="Tatapan si pekerja keras"
            desc="Nindia Prameswari Putri Cahyono"
          />
          <CardOverlay
            src="/image2.jpg"
            title="Nindia Prameswari Putri Cahyono"
            desc="Journalist Expert"
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
          <CardOverlay
            src="/image2.jpg"
            name="Nindia Prameswari Putri Cahyono"
            role="Journalist Expert"
          />
        </div>
      </Wrapper>
    </div>
  );
}
