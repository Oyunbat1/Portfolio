"use client"

import BgParallex from "@/app/components/bgParallex/page"
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Preloader from "./components/Preloader";
import Projects from "@/app/components/projects/page"
import SlidingSkill from "./components/SlidingSkill";
export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    (
      async () => {
        const LocomotiveScroll = (await import('locomotive-scroll')).default
        const locomotiveScroll = new LocomotiveScroll();
        setTimeout(() => {
          setIsLoading(false);
          document.body.style.cursor = 'default'
          window.scrollTo(0, 0);
        }, 2000)
      }
    )()
  }, [])
  return (
    <>
      <div>
        {/* <AnimatePresence mode="wait">
          {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
        </AnimatePresence> */}
        <BgParallex />
        <Projects />
        <SlidingSkill />
        <div className="h-screen w-screen bg-red-300"></div>
      </div>
    </>
  );
}
