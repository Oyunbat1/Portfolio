'use client';
import { useState, useEffect, useRef } from 'react';
import Project from './project/ProjectItem';
import Image from 'next/image';
import { Easing, motion } from 'framer-motion';
import gsap from 'gsap';
import { Barlow_Condensed } from "next/font/google";
import MoreButton from "../../common/MoreButton"
import { useRouter } from "next/navigation"
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
    {
        title: "Movie app",
        src: "bg.png",
        color: "#000000",
        year: "2024",
        role: "Full-stack developer"
    },
    {
        title: "To Do app",
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
    const router = useRouter();
    const [modal, setModal] = useState({ active: false, index: 0 })
    const { active, index } = modal;
    const modalContainer = useRef(null);
    const cursor = useRef(null);
    const xMoveCursor = useRef<((value: number) => gsap.core.Tween) | null>(null);
    const yMoveCursor = useRef<((value: number) => gsap.core.Tween) | null>(null);
    const [isMobile, setIsMobile] = useState(false)
    const [isTablet, setIsTablet] = useState(false)
    console.log(isTablet, "HEREEE")

    useEffect(() => {

        xMoveCursor.current = gsap.quickTo(cursor.current, "left", { duration: 0.5, ease: "power3" })
        yMoveCursor.current = gsap.quickTo(cursor.current, "top", { duration: 0.5, ease: "power3" })

        const handleResize = () => {
            const width = window.innerWidth;
            setIsMobile(width <= 768);
            setIsTablet(width >= 1024);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => { window.removeEventListener("resize", handleResize) }
    }, [])

    const navigationToPage = () => {
        router.push("/Work")
    }

    const moveItems = (x: number, y: number) => {
        console.log(x, y)
        xMoveCursor.current?.(x);
        yMoveCursor.current?.(y);
    };
    const manageModal = (active: boolean, index: number, x: number, y: number) => {

        setModal({ active, index })
        moveItems(x, y)
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
            <div onClick={navigationToPage}>
                <MoreButton >
                    <span className="relative flex items-center justify-center group">
                        More work
                        <span className="absolute -top-2 -right-3  text-gray-600 group-hover:text-white font-[300]  text-xs rounded-full px-2 py-0.5">
                            {projects.length}
                        </span>
                    </span>
                </MoreButton>
            </div>
        </main >
    )
}
