"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
import Magnetic from "@/app/common/Magnetic"
import Nav from "./Nav";
import gsap from "gsap";



export default function Header() {
    const [isMobile, setIsMobile] = useState(false)
    const [showHeader, setShowHeader] = useState(false);
    const header = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const router = useRouter();
    const button = useRef<HTMLDivElement>(null);
    const [isActive, setIsActive] = useState(false)
    const headerValues = ["About", "Contact", "Work"]
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        const handleScreenY = () => {
            setShowHeader(window.screenY >= 200);
        }
        handleScreenY();
        handleResize();
        window.addEventListener("resize", handleResize);
        window.addEventListener("scroll", handleScreenY)
        return () => { window.removeEventListener("resize", handleResize), window.removeEventListener("scroll", handleScreenY) };
    }, [pathname]);

    const NavigatePages = (page: string) => {
        router.push(`/${page}`);
    };



    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.to(button.current, {
            scrollTrigger: {
                trigger: document.documentElement,
                start: 0,
                end: window.innerHeight,
                onLeave: () => {
                    gsap.to(button.current, {
                        scale: 1,
                        duration: 0.25,
                        ease: "power1.out",
                    });
                },
                onEnterBack: () => {
                    gsap.to(button.current, {
                        scale: 0,
                        duration: 0.25,
                        ease: "power1.out",
                    });
                },
            },
        });
    }, []);

    return (
        <>
            <div
                ref={header}
                className={` top-0 z-10 flex w-full items-center justify-between px-9 py-8 ${pathname === "/" ? "text-white" : "text-black"} font-serif ${showHeader ? "bg-red-200" : ""}`}
            >
                <Magnetic>
                    <div className="flex cursor-pointer items-center group">
                        <p className="transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:rotate-[360deg]">
                            ©
                        </p>
                        <div className="relative ml-1 flex overflow-hidden whitespace-nowrap transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:pr-8">
                            <p className="transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-x-full">
                                Code by
                            </p>
                            <p className="relative pl-[0.5em] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-x-[65px]">
                                Oyunbat
                            </p>
                            <p className="absolute left-[120px] pl-[0.4em] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-x-[65px]">
                                Batnasan
                            </p>
                        </div>
                    </div>
                </Magnetic>

                {isMobile ? <div className="flex items-center space-x-6">
                    {["Menu"].map((item, i) => (
                        <Magnetic>
                            <div
                                key={i}
                                onClick={() => setIsActive(!isActive)}
                                className="relative flex cursor-pointer flex-col items-center px-4 py-2 group z-50"
                            >
                                <AnimatePresence mode="wait">
                                    {isActive ? (
                                        <motion.span
                                            key="close"
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            transition={{ duration: 0.3 }}
                                            className={`cursor-pointer ${pathname === "/" ? "text-white" : "text-black"
                                                }`}
                                        >
                                            X
                                        </motion.span>
                                    ) : (
                                        <motion.span
                                            key="menu"
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            transition={{ duration: 0.3 }}
                                            className={`cursor-pointer ${pathname === "/" ? "text-white" : "text-black"
                                                }`}
                                        >
                                            Menu
                                        </motion.span>
                                    )}
                                </AnimatePresence>


                                <div className={`absolute top-[45px] left-1/2 h-[5px] w-[5px] -translate-x-1/2 scale-0 rounded-full ${pathname === "/" ? "bg-white" : "bg-black"} transition-transform duration-200 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-100`} />
                            </div>
                        </Magnetic>
                    ))}
                </div> : <div className="flex items-center space-x-6">
                    {headerValues.map((item, i) => (
                        <Magnetic key={i}>
                            <div
                                onClick={() => NavigatePages(item)}
                                className="relative flex cursor-pointer flex-col items-center px-4 py-2 group z-30"
                            >
                                <a
                                    className={`cursor-pointer ${pathname === "/" ? "text-white" : "text-black"
                                        }`}
                                >
                                    {item}
                                </a>

                                <div className={`absolute top-[45px] left-1/2 h-[5px] w-[5px] -translate-x-1/2 scale-0 rounded-full ${pathname === "/" ? "bg-white" : "bg-black"} transition-transform duration-200 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-100`} />
                            </div>
                        </Magnetic>
                    ))}

                </div>}
                <AnimatePresence mode="wait">{isActive && <Nav setIsActive={setIsActive} />}</AnimatePresence>
            </div>


        </>
    );
}
