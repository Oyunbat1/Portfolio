"use client"
import React, { useRef } from 'react'
import { useInView, motion } from 'framer-motion'
import { descriptionSlideUp, descriptionOpacity } from '../js/anim'
import { Josefin_Sans } from "next/font/google";
import GetInRounded from "../common/RoundedButton";
import { useRouter } from 'next/navigation';

const josefinSans = Josefin_Sans({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700"],
    style: ["normal", "italic"]
});

export default function Description() {
    const phrase = "Би өөрт байгаа ямар нэгэн  шинэ санаагаа сүүлийн үеийн техник технологиудыг ашиглан бодит болгох гэж оролдох сонирхолтой."
    const description = useRef(null)
    const isInView = useInView(description)
    const router = useRouter();
    const handleToAboutMe = () => {
        router.push('/About')
    }
    return (
        <div ref={description} className='flex justify-center mt-[100px] mb-[100px] pl-[100px] pr-[100px] h-auto items-center '>
            <div className='flex flex-col gap-[50px] relative justify-center items-center'>
                <p className={`m-0 leading-[1.3] flex gap-2 lg:gap-6  w-[340px] md:w-[600px] lg:w-[800px] xl:w-[1200px] flex-wrap  justify-center ${josefinSans.className}`}>
                    {phrase.split(" ").map((word, index) => {
                        return <span key={index} className='text-[22px] lg:text-[40px] md:text-[40px]  uppercase text-center max-w-[100vw] leading-none  mask relative inline-flex overflow-hidden'><motion.span variants={descriptionSlideUp} animate={isInView ? "open" : "closed"} custom={index} key={index}>{word}</motion.span></span>
                    })}
                </p>
                <div className='flex gap-[20px] md:gap-[140px] lg:gap-[220px] xl:gap-[360px] justify-center items-center'>

                    <div onClick={handleToAboutMe} data-scroll data-scroll-speed={0.1}>
                        <GetInRounded backgroundColor={"#334BD3"} >
                            <p className=' text-[12px] lg:text-[18px] relative z-1 transition-colors ease-linear duration-400 '>Миний тухай</p>
                        </GetInRounded>
                    </div>
                </div>
            </div>
        </div>
    )
}