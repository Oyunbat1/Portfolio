'use client';
import { useState, useEffect, useRef } from 'react';
import Project from './project/page';
import { motion, Easing } from 'framer-motion';
import gsap from 'gsap';
import Image from 'next/image';
import Rounded from '../../common/RoundedButton';
const easing: Easing = [0.76, 0, 0.24, 1]
const projects = [
    {
        title: "C2 Montreal",
        src: "bg.png",
        color: "#000000"
    },
    {
        title: "Office Studio",
        src: "bg.png",
        color: "#8C8C8C"
    },
    {
        title: "Locomotive",
        src: "bg.png",
        color: "#EFE8D3"
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
    const xMoveCursorLabel = useRef<((value: number) => gsap.core.Tween) | null>(null);
    const yMoveCursorLabel = useRef<((value: number) => gsap.core.Tween) | null>(null);

    useEffect(() => {
        //Move Container
        xMoveContainer.current = gsap.quickTo(modalContainer.current, "left", { duration: 0.8, ease: "power3" })
        yMoveContainer.current = gsap.quickTo(modalContainer.current, "top", { duration: 0.8, ease: "power3" })
        //Move cursor
        xMoveCursor.current = gsap.quickTo(cursor.current, "left", { duration: 0.5, ease: "power3" })
        yMoveCursor.current = gsap.quickTo(cursor.current, "top", { duration: 0.5, ease: "power3" })
        //Move cursor label
        xMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "left", { duration: 0.45, ease: "power3" })
        yMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "top", { duration: 0.45, ease: "power3" })
    }, [])

    const moveItems = (x: number, y: number) => {

        xMoveContainer.current?.(x);
        yMoveContainer.current?.(y);
        xMoveCursor.current?.(x);
        yMoveCursor.current?.(y);
        xMoveCursorLabel.current?.(x);
        yMoveCursorLabel.current?.(y);
    };
    const manageModal = (active: boolean, index: number, x: number, y: number) => {
        setModal((prev) => ({ ...prev, active, index, x, y }));
    };

    return (
        <main onMouseMove={(e) => { moveItems(e.clientX, e.clientY) }} className="flex flex-col mt-[300px] mb-[300px]  items-center pl-[200px] pr-[200px] ">
            <div className="max-w-[1400px] w-full flex flex-col items-center justify-center mt-[100px]">
                {
                    projects.map((project, index) => {
                        return <Project index={index} title={project.title} manageModal={manageModal} key={index} />
                    })
                }
            </div>
            <Rounded>
                <p>More work</p>
            </Rounded>
            <>
                <motion.div
                    ref={modalContainer}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                    transition={{ duration: 0.3, ease: easing }}
                    className="h-[350px] w-[400px] fixed bg-white pointer-events-none overflow-hidden z-[3]"
                    style={{
                        left: x - 200,
                        top: y - 175
                    }}
                >
                    <div
                        style={{ top: index * -100 + "%" }}
                        className="h-full w-full relative transition-[top] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
                    >
                        {projects.map((project, idx) => (
                            <div
                                className="h-full w-full flex items-center justify-center"
                                style={{ backgroundColor: project.color }}
                                key={`modal_${idx}`}
                            >
                                <Image
                                    src={`/${project.src}`}
                                    width={300}
                                    height={0}
                                    alt="image"
                                    className="h-auto"
                                />
                            </div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    ref={cursor}
                    className="w-[80px] h-[80px] rounded-full bg-[#455CE9] text-white fixed z-[3] flex items-center justify-center   text-[14px] font-[300] pointer-events-none"

                    variants={scaleAnimation}
                    initial="initial"
                    animate={active ? "enter" : "closed"}
                >
                    <motion.div
                        className=' g-red-200  ml-6.5 mt-[20] '
                        ref={cursorLabel}
                        variants={scaleAnimation}
                        initial="initial"
                        animate={active ? "enter" : "closed"}
                    >
                        View
                    </motion.div>
                </motion.div>

            </>
        </main>
    )
}
