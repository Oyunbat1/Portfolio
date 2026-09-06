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
import { Bebas_Neue, Josefin_Sans } from "next/font/google";
import { landingPageSlideUp } from "./../js/anim"
import { useLang } from "@/i18n/LanguageProvider";
const bebas = Bebas_Neue({
    subsets: ["latin"],
    weight: "400"
})
const josefinSans = Josefin_Sans({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700"],
    style: ["normal", "italic"]
});
export default function Parallex() {
    const { t } = useLang();
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

    const y = useTransform(scrollYProgress, [0, 1], ["0svh", "30svh"]);
    return (
        <motion.div variants={landingPageSlideUp} initial="initial" animate="enter" >

            <div ref={containerRef} className="relative h-[100svh] overflow-hidden">

                <motion.div style={{ y }} className="absolute inset-x-0 -top-[15svh] h-[130svh] will-change-transform">
                    <Image
                        src={isMobile ? ProfileMobile : ProfileDesktop}
                        fill
                        priority
                        sizes="100vw"
                        alt="image"
                        style={{ objectFit: "cover" }}
                    />
                </motion.div>
                <div className="relative h-full">
                    <Header />
                    <div className="absolute top-26 lg:top-46 left-0 w-full h-full flex items-center justify-center">
                        <InfiniteText />
                    </div>
                    {isMobile ? <div className={`absolute inset-0 text-white flex items-end px-8 pb-12 ${josefinSans.className}`}>
                        <div className="flex flex-col gap-1 w-full">
                            <ArrowDownRight />
                            <div className="flex items-end justify-between gap-4">
                                <div className="flex flex-col min-w-0">
                                    <p className="font-serif">{t.home.role}</p>
                                    <p className="text-[20px]">{t.home.tagline}</p>
                                </div>
                                <Image src={Globus} alt="globus" width={200} className="w-[100px] shrink-0" />
                            </div>
                        </div>
                    </div> : <div className="absolute  top-26 h-[300px] w-full flex justify-between ">
                        <div className="w-[220px] h-[100px] mt-[140px] bg-slate-800 rounded-r-full flex items-center justify-center">
                            <p className={`text-white ${bebas.className} pl-6`}>{t.home.located}</p>
                            <Image src={Globus} alt="globus" width={200} className="w-[220px]"></Image>
                        </div>
                        <div className={`mt-[50px] lg:mr-[100px]  ${bebas.className}`}>
                            <div className="flex flex-col gap-18 ">
                                <ArrowDownRight className="text-white" />
                                <div className="flex justify-center items-center gap-10 text-white mr-[40px]">
                                    <div className="flex flex-col gap-3 w-[200px] lg:w-[300px]">
                                        <p className="font-serif">{t.home.role}</p>
                                        <p className="text-[20px] lg:text-[30px]">{t.home.tagline}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>}

                </div>
            </div>
        </motion.div>
    )
}