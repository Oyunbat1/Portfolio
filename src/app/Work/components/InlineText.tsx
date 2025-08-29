"use client"
import { Barlow_Condensed, } from "next/font/google";
import { useEffect, useState } from 'react';
import Image from "next/image";
const barlow = Barlow_Condensed({
    subsets: ["latin"],
    weight: "400"
})


const InlineText = ({ filteredProjects }: any) => {
    console.log(filteredProjects, "FILTEREDPROJECT")
    const [isTablet, setIsTablet] = useState(false)
    //filteredProject 
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
        <div>
            {isTablet && (
                <div className="group flex justify-around items-center  w-[900px] lg:w-[900px] xl:w-[1200px]  px-[10px] py-[20px] pl-[120px] text-gray-400">
                    <h1 className="text-[14px]">PROJECTS</h1>
                    <h1 className="text-[14px] pl-[180px]">SERVICES</h1>
                    <h1 className="text-[14px]">YEAR</h1>
                </div>
            )}
            <div className="md:grid md:grid-cols-2 md:gap-2 lg:flex lg:flex-col">
                {filteredProjects.map((items: any, index: number) => (
                    <div key={index}>

                        <div

                            className={`${isTablet ? "group flex justify-around items-center  w-[900px] xl:w-[1200px]  px-[10px] py-[50px] border-t border-gray-300 cursor-pointer transition-all duration-200  hover:opacity-50 " : "flex flex-col w-full justify-center items-center  cursor-pointer"}`}
                        >

                            {isTablet ? "" : <div style={{ backgroundColor: items.color }} className={`p-[20px]`}>
                                <Image src={`/${items.src}`} alt="project images" width={200} height={200} className='w-[300px] h-[220px] p-[30px]' ></Image>
                            </div>}
                            <h2 className={`${barlow.className} ${isTablet ? "text-[36px] lg:text-[72px]  transition-transform duration-500 group-hover:-translate-x-2 w-[380px]  py-2   " : "text-[36px]    transition-transform duration-500 group-hover:-translate-x-2 w-[320px]  py-2 border-b border-b-gray-400 "}`}>
                                {items.title}
                            </h2>

                            {isTablet ? <div className="flex items-center justify-center gap-[200px]">  <p className={` ${isTablet ? "text-[16px] font-[500]" : "text-[14px] font-[300] gap-[100px]  "}  transition-transform duration-300 group-hover:translate-x-2`}>
                                {items.role}
                            </p>
                                {isTablet ? <p className="text-[14px] font-[500] transition-transform duration-300 group-hover:translate-x-2">{items.year}</p> : <p className="text-[14px] font-[500] transition-transform duration-300 group-hover:translate-x-2">
                                    {items.year}
                                </p>}</div> : <div className="flex w-[320px] justify-between mb-6 mt-2    ">  <p className={` ${isTablet ? "text-[16px] font-[500]" : "text-[14px] font-[300]"}  transition-transform duration-300 group-hover:translate-x-2`}>
                                    {items.role}
                                </p>
                                {isTablet ? <p className="text-[14px] font-[500] transition-transform duration-300 group-hover:translate-x-2">{items.year}</p> : <p className="text-[14px] font-[500] transition-transform duration-300 group-hover:translate-x-2">
                                    {items.year}
                                </p>}</div>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default InlineText