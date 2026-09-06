'use client';
import { useState, useEffect, useRef } from 'react';
import Project from './project/ProjectItem';
import { projectsSlideUp } from '../../js/anim'
import { Easing, motion, useInView } from 'framer-motion';
import { Barlow_Condensed } from "next/font/google";
import MoreButton from "../../common/MoreButton"
import { useRouter } from "next/navigation"
import { projects } from "@/constants/projects"
import ProjectModal from "./ProjectModal"
const barlow = Barlow_Condensed({
    subsets: ["latin"],
    weight: "400"
})
const easing: Easing = [0.76, 0, 0.24, 1]

export default function Home() {
    const router = useRouter();
    const [modal, setModal] = useState({ active: false, index: 0 })
    const { active, index } = modal;
    const modalContainer = useRef(null);
    const [isMobile, setIsMobile] = useState(false)
    const [isTablet, setIsTablet] = useState(false)

    const isInView = useInView(modalContainer)

    useEffect(() => {


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

    const manageModal = (active: boolean, index: number, x: number, y: number) => {

        setModal({ active, index })
    };

    const shownProjects = isMobile ? projects.slice(0, 2) : projects.slice(0, 4);

    return (
        <main className="flex flex-col  mt-[40px] mb-[120px]  items-center relative ">
            {isTablet ? <p className={`text-gray-400 absolute left-40 ${barlow.className}`}>Сүүлд хийсэн төслүүд</p> : <p className={`text-gray-400 absolute  border-b w-[360px]  md:w-[660px]  ${barlow.className}`}>Сүүлд хийсэн төслүүд</p>}
            <motion.div ref={modalContainer} variants={projectsSlideUp} animate={isInView ? "open" : "closed"} transition={{ duration: 1, ease: easing }} className=" w-full  flex flex-col md:grid md:grid-cols-2 lg:flex lg:flex-col items-center justify-center mt-[60px] ">
                {
                    shownProjects.map((project, index) => (
                        <Project isTablet={isTablet} link={project.link} role={project.role} index={index} title={project.title} image={project.src} manageModal={manageModal} color={project.color} key={index} isMobile={isMobile} year={project.year} />
                    ))
                }
            </motion.div>
            {isTablet && <ProjectModal active={active} index={index} projects={shownProjects} />}
            <div onClick={navigationToPage}>
                <MoreButton >
                    <span className="relative flex items-center justify-center group">
                        Бусад төслүүд
                        <span className="absolute -top-2 -right-3  text-gray-600 group-hover:text-white font-[300]  text-xs rounded-full px-2 py-0.5">
                            {projects.length}
                        </span>
                    </span>
                </MoreButton>
            </div>
        </main >
    )
}
