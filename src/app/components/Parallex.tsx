"use client"
import React, { useRef } from "react";
import Image from "next/image";
import ProfileDesktop from "../../../public/profile.png"
import ProfileMobile from "../../../public/mobile/profile.jpg"
import InfiniteText from "./InfiniteText";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
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
                    <div className="absolute top-40 left-0 w-full h-full flex items-center justify-center">
                        <InfiniteText />
                    </div>
                </motion.div>
            </div>
        </div>
    )
}