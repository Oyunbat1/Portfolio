"use client";
import { Ubuntu } from "next/font/google";
import { useEffect, useState } from 'react';
import FilterButton from "../common/FilterButtonsOfWork";
import InlineText from "./components/InlineText";
import InlineButton from "../common/ProjectsInlineButton";
import InlineImage from "./components/InlineImage";
const ubuntu = Ubuntu({
    subsets: ["latin"],
    weight: ["300", "400", "500", "700"],
    style: ["normal", "italic"],
});
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
type FilterType = "All" | "Front-End" | "Full-Stack";
type FilterProjectWithImageAndText = "inlineText" | "images"
const WorkPage = () => {
    const [isTablet, setIsTablet] = useState(false)
    const [filter, setFilter] = useState("All")
    const [imageFilter, setImageFilter] = useState("inlineText")
    const filters: FilterType[] = ["All", "Front-End", "Full-Stack"];
    const filterWithImage: FilterProjectWithImageAndText[] = ["inlineText", "images"]
    const counts: Record<FilterType, number> = {
        All: projects.length,
        "Front-End": projects.filter(p => p.role.toLowerCase().includes("front")).length,
        "Full-Stack": projects.filter(p => p.role.toLowerCase().includes("full")).length,
    };
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setIsTablet(width >= 1024);
        };
        handleResize();
        window.addEventListener("resize", handleResize)
        return () => { window.removeEventListener("resize", handleResize) }
    }, [])

    const filteredProject = projects.filter((project) => {
        if (filter === "All") return true
        if (filter === "Front-End")
            return project.role.toLowerCase().includes("front")
        if (filter === "Full-Stack")
            return project.role.toLowerCase().includes("full")
        return true
    })

    const filterWithImageProject = () => {
        if (imageFilter === "inlineText") {
            return <div><InlineText filteredProjects={filteredProject}></InlineText></div>
        }
        if (imageFilter === "images")
            return <div ><InlineImage filteredProjects={filteredProject}></InlineImage></div>
    }


    return (
        <>
            <div className="flex justify-center items-center p-[0px_20px]">
                <div className="mt-[60px] flex flex-col lg:mt-[60px]  ">
                    <div ><h1 className={`text-[36px] ml-[20px] md:text-[46px]  lg:text-[66px] xl:text-[72px] w-[360px] md:ml-[80px] md:w-[420px] lg:w-[720px] xl:w-[820px] lg:ml-[100px] ${ubuntu.className}`}>Creating next level digital products</h1></div>
                    <div className="flex gap-4  md:ml-[80px] lg:ml-[100px]">
                        <div className="flex">      {filters.map((btn, index) => (
                            <div key={index} onClick={() => setFilter(btn)}> <FilterButton count={counts[btn]} filter={filter} btn={btn} >{btn}</FilterButton></div>
                        ))}</div>
                        {isTablet ? <div className="flex gap-3">{filterWithImage.map((btn, index) => (
                            <div key={index} onClick={() => setImageFilter(btn)}><InlineButton imageFilter={imageFilter} btn={btn}>{btn}</InlineButton></div>
                        ))}</div> : ""}
                    </div>
                    {filterWithImageProject()}

                </div >
            </div >
        </>
    );
};

export default WorkPage;
