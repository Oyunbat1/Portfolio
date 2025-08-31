"use client"
import React from 'react'

import { useRef } from 'react';
import { useInView, motion } from 'framer-motion';
import { descriptionSlideUp, } from '../js/anim'
import { Josefin_Sans } from "next/font/google";
const josefinSans = Josefin_Sans({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700"],
    style: ["normal", "italic"]
});
export default function Text() {
    const description = useRef(null)
    const isInView = useInView(description)
    const phrase = "Building software that solves real problems with clean, efficient code."
    return (
        <div ref={description} className={`m-0 leading-[1.8] flex gap-2 lg:gap-6  w-[300px] md:w-[500px] lg:w-[800px] xl:w-[800px] flex-wrap  justify-center ${josefinSans.className} my-40 z-10`}>
            {phrase.split(" ").map((word, index) => {
                return <span key={index} className='text-white text-[20px] lg:text-[40px] md:text-[30px]  uppercase text-center max-w-[100vw] leading-none  mask relative inline-flex overflow-hidden'><motion.span variants={descriptionSlideUp} animate={isInView ? "open" : "closed"} custom={index} key={index}>{word}</motion.span></span>
            })}

        </div>
    )
}