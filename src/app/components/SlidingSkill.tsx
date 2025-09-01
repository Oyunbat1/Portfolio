"use client";
import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Bevan, Josefin_Sans, Barlow_Condensed } from "next/font/google";

const josefinSans = Josefin_Sans({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700"],
    style: ["normal", "italic"]
});
const barlow = Barlow_Condensed({
    subsets: ["latin"],
    weight: "400"
})
import Lenis from 'lenis'; const bevan = Bevan({
    subsets: ["latin"],
    weight: "400"
});
const slider1 = ["REACT", "TYPESCRIPT", "NEXT.JS", "JAVASCRIPT", "MONGODB"]
const slider2 = ["HTML5", "CSS3", "TAILWINDCSS", "FRAMER", "FIGMA"]
const slider3 = ["RESTAPI", "POSTMAN", "GIT", "GITHUB", "UNIT_TESTING"]
const slider4 = ["SASS", "NODE.JS", "EXPRESS.JS", "GRAPHQL", "E2E_TESTING"]
const SlidingSkill = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })
    const x1 = useTransform(scrollYProgress, [0, 1], [0, 150])
    const x2 = useTransform(scrollYProgress, [0, 1], [0, -150])
    const x3 = useTransform(scrollYProgress, [0, 1], [0, 150])
    const x4 = useTransform(scrollYProgress, [0, 1], [0, -150])
    const height = useTransform(scrollYProgress, [0, 0.9], [50, 0])
    return (<>
        <div className='mb-6 mx-[40px]'> <p className={`text-gray-400 lg:pb-10 lg:pl-10 border-b  ${barlow.className}`}>Recent skills</p></div>
        <div ref={containerRef} className='w-screen gap-[20px] flex flex-col justify-center overflow-hidden'>
            <motion.div className='flex gap-[40px] ' style={{ x: x1 }}>{slider1.map((skill) => (
                <h3 className={`text-[26px] sm:text-[32px] md:text-[38px] lg:text-[46px] xl:text-[56px]  ${josefinSans.className}`}>{skill}</h3>
            ))}</motion.div>
            <motion.div className='flex gap-[40px] ' style={{ x: x2 }}>{slider2.map((skill) => (
                <h3 className={`text-[26px] sm:text-[32px] md:text-[38px] lg:text-[46px] xl:text-[56px]  ${josefinSans.className}`}>{skill}</h3>
            ))}</motion.div>
            <motion.div className='flex gap-[40px] ' style={{ x: x3 }}>{slider3.map((skill) => (
                <h3 className={`text-[26px] sm:text-[32px] md:text-[38px] lg:text-[46px] xl:text-[56px]  ${josefinSans.className}`}>{skill}</h3>
            ))}</motion.div>
            <motion.div className='flex gap-[40px] ' style={{ x: x4 }}>{slider4.map((skill) => (
                <h3 className={`text-[26px] sm:text-[32px] md:text-[38px] lg:text-[46px] xl:text-[56px]  ${josefinSans.className}`}>{skill}</h3>
            ))}</motion.div>

        </div >
        <motion.div
            style={{ height }}
            className="bg-white relative mt-[100px] "
        >
            <div className="h-[1400%] w-[100%]  rounded-b-[50%] bg-white z-[10] absolute shadow-[0px_60px_50px_rgba(0,0,0,0.748)]"></div>
        </motion.div></>)
}
export default SlidingSkill;