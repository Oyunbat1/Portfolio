"use client"
import React, { useRef } from "react";
import Image from "next/image";
import { ArrowDownRight } from 'lucide-react';
import ProfileDesktop from "../../../public/profile.png"
import ProfileMobile from "../../../public/mobile/profile.jpg"
import InfiniteText from "./InfiniteText";
import Header from "./Header";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import Globus from "../../../public/globus.gif"
import { Bebas_Neue } from "next/font/google";

const bebas = Bebas_Neue({
    subsets: ["latin"],
    weight: "400"
})
export default function Parallex() {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0vh", "150vh"]);
    return (
        <div>
            <div ref={containerRef} className="h-screen overflow-hidden">
                <motion.div style={{ y }} className="relative h-full">
                    <Image
                        src={isMobile ? ProfileMobile : ProfileDesktop}
                        fill
                        alt="image"
                        style={{ objectFit: "cover" }}
                    />
                    <Header />
                    <div className="absolute top-26 lg:top-46 left-0 w-full h-full flex items-center justify-center">
                        <InfiniteText />
                    </div>
                    {isMobile ? <div className={`absolute  text-white flex justify-between items-end w-full px-10 h-full  ${bebas.className}`}>
                        <div className="flex flex-col gap-1 absolute bottom">
                            <ArrowDownRight />
                            <div className="flex justify-center items-center gap-10">
                                <div className="flex flex-col w-[200px]">
                                    <p className="font-serif">Software engineer</p>
                                    <p className="text-[20px]">Content Creator & Developer</p>
                                </div>
                                <div><Image src={Globus} alt="globus" width={200} className="w-[140px]"></Image></div>
                            </div>
                        </div>

                    </div> : <div className="absolute  top-26 h-[300px] w-full flex justify-between ">
                        <div className="w-[220px] h-[100px] mt-[140px] bg-slate-800 rounded-r-full flex items-center justify-center">
                            <p className={`text-white ${bebas.className} pl-6`}>Located in the Mongolia</p>
                            <Image src={Globus} alt="globus" width={200} className="w-[220px]"></Image>
                        </div>
                        <div className={`mt-[50px] lg:mr-[100px]  ${bebas.className}`}>
                            <div className="flex flex-col gap-18 ">
                                <ArrowDownRight className="text-white" />
                                <div className="flex justify-center items-center gap-10 text-white mr-[40px]">
                                    <div className="flex flex-col gap-3 w-[200px] lg:w-[300px]">
                                        <p className="font-serif">Software engineer</p>
                                        <p className="text-[20px] lg:text-[30px]">Content Creator & Developer</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>}
                </motion.div>
            </div>
        </div>
    )
}