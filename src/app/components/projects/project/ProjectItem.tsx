'use client';
import React from 'react'
import { Barlow_Condensed } from "next/font/google";
import { useEffect, useState } from 'react';
import Image from 'next/image';
const barlow = Barlow_Condensed({
    subsets: ["latin"],
    weight: "400"
})
type ProjectItemProps = {
    index: number;
    title: string;
    manageModal: (
        open: boolean,
        index: number,
        x: number,
        y: number
    ) => void;
    isMobile: boolean;
    image: string;
    color: string;
    year: string;
    role: string;
    link: string;
    isTablet: boolean
};
export default function ProjectItem({ index, link, title, manageModal, isMobile, image, color, year, role, isTablet }: ProjectItemProps) {

    return (
        <>
            {isMobile ? <div
                onClick={() => { window.open(link, "_blank") }}
                onMouseEnter={(e) => { manageModal(true, index, e.clientX, e.clientY) }} onMouseLeave={(e) => { manageModal(false, index, e.clientX, e.clientY) }}
                className="flex flex-col w-full justify-center items-center  cursor-pointer "
            >
                <div style={{ backgroundColor: color }} className={`p-[20px]`}>
                    <Image src={`/${image}`} alt="project images" width={200} height={200} className='w-[340px] h-[300px] p-[30px]' ></Image>
                </div>
                <h2 className={`text-[36px]   transition-transform duration-500 group-hover:-translate-x-2 w-[360px]   py-2 border-b border-b-gray-400  ${barlow.className}`}>
                    {title}
                </h2>

                <div className='flex justify-between  w-[360px] py-4 mb-10 '>
                    <p className="text-[14px] font-[300] transition-transform duration-300 group-hover:translate-x-2">
                        {role}
                    </p>
                    <p className="text-[14px] font-[300] transition-transform duration-300 group-hover:translate-x-2">
                        {year}
                    </p>
                </div>
            </div> : <div>
                <div
                    onMouseEnter={(e) => { manageModal(true, index, e.clientX, e.clientY) }} onMouseLeave={(e) => { manageModal(false, index, e.clientX, e.clientY) }}
                    className={`${isTablet ? "group flex  items-center justify-around w-[900px] xl:w-[1200px]  px-[10px] py-[50px] border-t border-gray-300 cursor-pointer transition-all duration-200 last:border-b hover:opacity-50 " : "flex flex-col w-full justify-center items-center  cursor-pointer"}`}
                >

                    {isTablet ? "" : <div className={`bg-[${color}] p-[20px]`}>
                        <Image src={`/${image}`} alt="project images" width={200} height={200} className='w-[340px] h-[240px] p-[30px]' ></Image>
                    </div>}
                    <h2 className={`${barlow.className} ${isTablet ? "text-[36px] lg:text-[72px]    transition-transform duration-500 group-hover:-translate-x-2 w-[380px]  py-2   " : "text-[36px]   transition-transform duration-500 group-hover:-translate-x-2 w-[380px]  py-2 border-b border-b-gray-400  ${barlow.className}"}`}>
                        {title}
                    </h2>

                    <div className={`${isTablet ? "flex justify-between  " : "flex justify-between w-[380px] py-4 mb-10"}`}>
                        <p className={` ${isTablet ? "text-[16px] font-[500]" : "text-[14px] font-[300]"}  transition-transform duration-300 group-hover:translate-x-2`}>
                            {role}
                        </p>
                        {isTablet ? "" : <p className="text-[14px] font-[300] transition-transform duration-300 group-hover:translate-x-2">
                            {year}
                        </p>}
                    </div>
                </div>
            </div>}</>


    )
}
