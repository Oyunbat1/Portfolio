"use client";
import { Easing, motion } from "framer-motion";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import type { Project } from "@/constants/projects";
import ProjectThumb from "./ProjectThumb";

const easing: Easing = [0.76, 0, 0.24, 1];

const scaleAnimation = {
    initial: { scale: 0, x: "-50%", y: "-50%" },
    enter: { scale: 1, x: "-50%", y: "-50%", transition: { duration: 0.4, ease: easing } },
    closed: { scale: 0, x: "-50%", y: "-50%", transition: { duration: 0.4, ease: easing } },
};

/** Project preview that trails the cursor while a row is hovered. */
export default function ProjectModal({
    active,
    index,
    projects,
}: {
    active: boolean;
    index: number;
    projects: Project[];
}) {
    const container = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const xMove = gsap.quickTo(container.current, "left", { duration: 0.8, ease: "power3" });
        const yMove = gsap.quickTo(container.current, "top", { duration: 0.8, ease: "power3" });
        const move = (e: MouseEvent) => {
            xMove(e.clientX);
            yMove(e.clientY);
        };
        window.addEventListener("mousemove", move);
        return () => window.removeEventListener("mousemove", move);
    }, []);

    return (
        <motion.div
            ref={container}
            variants={scaleAnimation}
            initial="initial"
            animate={active ? "enter" : "closed"}
            className="fixed top-0 left-0 h-[350px] w-[400px] overflow-hidden pointer-events-none z-50"
        >
            <div
                style={{ top: `${index * -100}%` }}
                className="absolute h-full w-full transition-[top] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
            >
                {projects.map((project) => (
                    <ProjectThumb
                        key={project.title}
                        src={project.src}
                        color={project.color}
                        title={project.title}
                        className="h-full w-full object-contain"
                        wrapperClassName="h-full w-full flex items-center justify-center p-[20px]"
                    />
                ))}
            </div>
        </motion.div>
    );
}
