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

  useEffect(() => {
    if (isInView) {
      const unsubcribe = scrollY.on("change", (y) => {
        console.log(y);

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
    <>
      <Wrapper>
        <h1 className="text-4xl md:text-6xl xl:text-8xl font-semibold text-center uppercase">
          publica más, gana más
        </h1>
        <h3 className="text-center text-base md:text-lg xl:text-xl mt-6">
          Publish or Search anything in one place
        </h3>

        <div className="relative min-h-[2000px]">
          {/* start content */}
          <h1 className="font-bold text-4xl rotate-[20deg] absolute top-[15%] right-0">
            Be a hero not zero
          </h1>

          <h1 className="font-bold text-4xl -rotate-[20deg] absolute top-[45%] left-0">
            Be a professional not ego
          </h1>

          {/* end content */}

          <motion.div
            ref={imageRef}
            className="rounded-md mt-32 sticky top-5 left-0 h-[800px]"
          >
            <motion.img
              src={IMAGES[index]}
              alt="hero"
              className="w-full h-full"
              style={{ scale: isInView ? scale : 1 }}
            />
          </motion.div>
        </div>
      </Wrapper>
      <Wrapper>
        <h1 className="text-2xl md:text-4xl xl:text-6xl font-semibold text-center uppercase">
          Best Blog
        </h1>
        <h3 className="text-center text-base md:text-lg xl:text-xl mt-6">
          The most viewed blog nowdays
        </h3>
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
      <Wrapper>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl md:text-4xl xl:text-6xl font-semibold uppercase mt-24">
              Explore More
            </h1>
            <h3 className="text-base md:text-lg xl:text-xl mt-4">
              Explore others beautiful blogs written by people from around the
              world
            </h3>
          </div>
          <p className="uppercase">ACADEMY</p>

        </div>
      </Wrapper>
    </>
  );
}
