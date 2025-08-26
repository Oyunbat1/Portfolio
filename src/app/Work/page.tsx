"use client";
import { Barlow_Condensed, Ubuntu } from "next/font/google";
import { useEffect, useState } from 'react';
import FilterButton from "../common/FilterButtonsOfWork";
import Image from 'next/image';
const barlow = Barlow_Condensed({
    subsets: ["latin"],
    weight: "400"
})
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

const WorkPage = () => {
    const [isTablet, setIsTablet] = useState(false)
    const [filter, setFilter] = useState("All")
    const filters: FilterType[] = ["All", "Front-End", "Full-Stack"];
    const counts: Record<FilterType, number> = {
        All: projects.length,
        "Front-End": projects.filter(p => p.role.toLowerCase().includes("front")).length,
        "Full-Stack": projects.filter(p => p.role.toLowerCase().includes("full")).length,
    };

    const filteredProject = projects.filter((project) => {
        if (filter === "All") return true
        if (filter === "Front-End")
            return project.role.toLowerCase().includes("front")
        if (filter === "Full-Stack")
            return project.role.toLowerCase().includes("full")
        return true
    })

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setIsTablet(width >= 1024);
        };
        handleResize();
        window.addEventListener("resize", handleResize)
        return () => { window.removeEventListener("resize", handleResize) }
    }, [])
    return (
        <>
            <div className="flex justify-center items-center p-[0px_20px] ">
                <div className="mt-[80px] flex flex-col lg:mt-[80px]  ">
                    <div ><h1 className={`text-[46px] md:text-[60px] lg:text-[66px] xl:text-[72px] w-[300px] md:w-[420px] lg:w-[720px] xl:w-[820px] lg:ml-[100px] ${ubuntu.className}`}>Creating next level digital products</h1></div>
                    <div className="flex gap-4 lg:ml-[100px] ">
                        {filters.map((btn) => (
                            <div onClick={() => setFilter(btn)}> <FilterButton count={counts[btn]} filter={filter} btn={btn} >{btn}</FilterButton></div>
                        ))}

                    </div>
                    {isTablet && (
                        <div className="group flex justify-around items-center  w-[900px] lg:w-[900px] xl:w-[1200px]  px-[10px] py-[20px] pl-[120px] text-gray-400">
                            <h1 className="text-[14px]">PROJECTS</h1>
                            <h1 className="text-[14px] pl-[180px]">SERVICES</h1>
                            <h1 className="text-[14px]">YEAR</h1>
                        </div>
                    )}
                    <div className="md:grid md:grid-cols-2 md:gap-2 lg:flex lg:flex-col">
                        {filteredProject.map((items, index) => (
                            <div>

                                <div

                                    className={`${isTablet ? "group flex justify-around items-center  w-[900px] xl:w-[1200px]  px-[10px] py-[50px] border-t border-gray-300 cursor-pointer transition-all duration-200  hover:opacity-50 " : "flex flex-col w-full justify-center items-center  cursor-pointer"}`}
                                >

                                    {isTablet ? "" : <div style={{ backgroundColor: items.color }} className={`p-[20px]`}>
                                        <Image src={`/${items.src}`} alt="project images" width={200} height={200} className='w-[340px] h-[240px] p-[30px]' ></Image>
                                    </div>}
                                    <h2 className={`${barlow.className} ${isTablet ? "text-[36px] lg:text-[72px]  transition-transform duration-500 group-hover:-translate-x-2 w-[380px]  py-2   " : "text-[36px]   transition-transform duration-500 group-hover:-translate-x-2 w-[380px]  py-2 border-b border-b-gray-400 "}`}>
                                        {items.title}
                                    </h2>

                                    {isTablet ? <div className="flex items-center justify-center gap-[200px]">  <p className={` ${isTablet ? "text-[16px] font-[500]" : "text-[14px] font-[300]"}  transition-transform duration-300 group-hover:translate-x-2`}>
                                        {items.role}
                                    </p>
                                        {isTablet ? <p className="text-[14px] font-[500] transition-transform duration-300 group-hover:translate-x-2">{items.year}</p> : <p className="text-[14px] font-[500] transition-transform duration-300 group-hover:translate-x-2">
                                            {items.year}
                                        </p>}</div> : <div className="flex w-full justify-between mb-6">  <p className={` ${isTablet ? "text-[16px] font-[500]" : "text-[14px] font-[300]"}  transition-transform duration-300 group-hover:translate-x-2`}>
                                            {items.role}
                                        </p>
                                        {isTablet ? <p className="text-[14px] font-[500] transition-transform duration-300 group-hover:translate-x-2">{items.year}</p> : <p className="text-[14px] font-[500] transition-transform duration-300 group-hover:translate-x-2">
                                            {items.year}
                                        </p>}</div>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div >
            </div >
        </>
    );
};

export default WorkPage;
