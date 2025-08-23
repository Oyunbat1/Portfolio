'use client';
import { useState, useEffect, useRef } from 'react';
import Project from './project/ProjectItem';
import Image from 'next/image';
import { Easing, motion } from 'framer-motion';
import gsap from 'gsap';
import { Barlow_Condensed } from "next/font/google";
import RoundedButton from '@/app/common/RoundedButton';
import { style } from 'framer-motion/client';
const barlow = Barlow_Condensed({
    subsets: ["latin"],
    weight: "400"
})
const easing: Easing = [0.76, 0, 0.24, 1]
const projects = [
    {
        title: "Workplace 2.0",
        src: "bg.png",
        color: "#000000",
        year: "2025",
        role: "Full-stack developer"
    },
    {
        title: "Sainkanzlei.com",
        src: "bg.png",
        color: "#000000",
        year: "2025",
        role: "Front-end developer"
    },
    {
        title: "Food delivery",
        src: "bg.png",
        color: "#000000",
        year: "2024",
        role: "Full-stack developer"
    },

]

const scaleAnimation = {
    initial: { scale: 0, x: "-50%", y: "-50%" },
    enter: { scale: 1, x: "-50%", y: "-50%", transition: { duration: 0.4, ease: easing } },
    closed: { scale: 0, x: "-50%", y: "-50%", transition: { duration: 0.4, ease: easing } }
}

export default function Home() {

    const [modal, setModal] = useState({ active: false, index: 0, x: 0, y: 0 })
    const { active, index, x, y } = modal;
    const modalContainer = useRef(null);
    const cursor = useRef(null);
    const cursorLabel = useRef(null);
    const xMoveContainer = useRef<((value: number) => gsap.core.Tween) | null>(null);
    const yMoveContainer = useRef<((value: number) => gsap.core.Tween) | null>(null);
    const xMoveCursor = useRef<((value: number) => gsap.core.Tween) | null>(null);
    const yMoveCursor = useRef<((value: number) => gsap.core.Tween) | null>(null);
    // const xMoveCursorLabel = useRef<((value: number) => gsap.core.Tween) | null>(null);
    // const yMoveCursorLabel = useRef<((value: number) => gsap.core.Tween) | null>(null);
    const [isMobile, setIsMobile] = useState(false)
    const [isTablet, setIsTablet] = useState(false)
    console.log(isTablet, "HEREEE")

    useEffect(() => {
        xMoveContainer.current = gsap.quickTo(modalContainer.current, "left", { duration: 0.8, ease: "power3" })
        yMoveContainer.current = gsap.quickTo(modalContainer.current, "top", { duration: 0.8, ease: "power3" })

        xMoveCursor.current = gsap.quickTo(cursor.current, "left", { duration: 0.5, ease: "power3" })
        yMoveCursor.current = gsap.quickTo(cursor.current, "top", { duration: 0.5, ease: "power3" })

        // xMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "left", { duration: 0.45, ease: "power3" })
        // yMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "top", { duration: 0.45, ease: "power3" })

        const handleResize = () => {
            const width = window.innerWidth;
            setIsMobile(width <= 768);
            setIsTablet(width >= 1024);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => { window.removeEventListener("resize", handleResize) }
    }, [])


    const moveItems = (x: number, y: number) => {
        xMoveContainer.current?.(x);
        yMoveContainer.current?.(y);
        xMoveCursor.current?.(x);
        yMoveCursor.current?.(y);
        // xMoveCursorLabel.current?.(x);
        // yMoveCursorLabel.current?.(y);
    };
    const manageModal = (active: boolean, index: number, x: number, y: number) => {
        setModal((prev) => ({ ...prev, active, index, x, y }));
        if (active) {
            moveItems(x, y)
        }
    };

    return (
        <main onMouseMove={(e) => { moveItems(e.clientX, e.clientY) }} className="flex flex-col  mt-[120px] mb-[120px]  items-center relative ">
            {isTablet ? <p className={`text-gray-400 absolute left-40 ${barlow.className}`}>Recent work</p> : ""}
            <div className=" w-full  flex flex-col md:grid md:grid-cols-2 lg:flex lg:flex-col items-center justify-center mt-[60px] ">
                {
                    isMobile ? projects.slice(0, 2).map((project, index) => {
                        return <Project isTablet={isTablet} role={project.role} index={index} title={project.title} image={project.src} manageModal={manageModal} color={project.color} key={index} isMobile={isMobile} year={project.year} />
                    }) : projects.slice(0, 4).map((project, index) => {
                        return <Project isTablet={isTablet} role={project.role} index={index} title={project.title} image={project.src} manageModal={manageModal} color={project.color} key={index} isMobile={isMobile} year={project.year} />
                    })
                }
            </div>
            <motion.div ref={modalContainer} variants={scaleAnimation} initial="initial" animate={active ? "enter" : "closed"} className='h-[350px] w-[400px]  fixed top-1/2 left-1/2 bg-white  overflow-hidden z-10'>
                <div style={{ top: index * -100 + "%" }} className='h-full w-full relative transition-[top] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]'>
                    {
                        projects.map((project, index) => {
                            const { src, color } = project
                            return <div className='h-full w-full flex items-center justify-center' style={{ backgroundColor: color }} key={`modal_${index}`}>
                                <Image
                                    src={`/${src}`}
                                    width={300}
                                    height={0}
                                    alt="image"
                                    className='h-auto'
                                />
                            </div>
                        })
                    }
                </div>
            </motion.div>

            <motion.div ref={cursor} className="w-[80px] h-[80px] rounded-full bg-[#455CE9] text-white fixed items-center justify-center font-[300] z-20" variants={scaleAnimation} initial="initial" animate={active ? "enter" : "closed"}></motion.div>
        </main >
    )
}
