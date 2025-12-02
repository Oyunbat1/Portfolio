"use client"
import Image from "next/image"
import { useRef, useState, useEffect } from "react"
import { useScroll, useTransform, motion, MotionValue } from "framer-motion"

type Courses = {
    title: string,
    description: string,
    image: string,
    imageDesktop: string,
    color: string,
    i: number,
    progress: MotionValue<number>,
    range: number[]
    targetScale: number
}

export default function Card({ title, description, image, imageDesktop, color, i, range, targetScale, progress }: Courses) {
    const [isDesktop, setIsDesktop] = useState(false);
    const container = useRef(null)
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "start start"]
    })
    useEffect(() => {
        const check = () => setIsDesktop(window.innerWidth >= 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);
    const imageScale = useTransform(scrollYProgress, [0, 1], [4, 1])
    const scale = useTransform(progress, range, [1, targetScale])
    return (
        <div ref={container}
            key={i}
            className="h-[600px] sticky -top-40 mb-[300px] flex items-center justify-center"
        >
            <motion.div
                style={{ backgroundColor: color, scale, top: `calc(20% + ${i * 45}px)` }}
                className="relative w-[360px] h-[360px] sm:w-[500px] sm:h-[500px] md:w-[780px] md:h-[700px] lg:w-[1200px] lg:h-[460px] rounded-md overflow-hidden flex justify-center items-center 
                   group transition-all duration-500 ease-in-out hover:scale-105 "
            >

                <motion.div className="w-[500px] rounded-2xl overflow-hidden" >
                    <Image
                        alt="img"
                        src={isDesktop ? `/${imageDesktop}` : `/${image}`}
                        width={200}
                        height={200}
                        className=" h-full w-full  z-10 rounded-2xl overflow-hidden "
                    />
                </motion.div>

            </motion.div>
        </div>
    )
}
