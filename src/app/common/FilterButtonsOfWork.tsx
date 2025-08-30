import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Magnetic from "../common/Magnetic"

const FilterButton = ({ children, filter, count, btn, backgroundColor = "#455CE9", }: { children: any, filter: any, count: number, btn: any, backgroundColor?: string }) => {
    const circle = useRef<HTMLDivElement | null>(null);
    const timeline = useRef<GSAPTimeline | null>(null);
    let timeoutId: number | null = null;

    useEffect(() => {
        timeline.current = gsap.timeline({ paused: true });
        timeline.current
            .to(circle.current, { top: "-25%", width: "150%", duration: 0.4, ease: "power3.in" }, "enter")
            .to(circle.current, { top: "-150%", width: "125%", duration: 0.25 }, "exit")
    }, []);

    const manageMouseEnter = () => {
        if (timeoutId) clearTimeout(timeoutId);
        timeline.current?.tweenFromTo('enter', 'exit');
    };

    const manageMouseLeave = () => {
        timeoutId = window.setTimeout(() => {
            timeline.current?.play();
        }, 300);
    };

    return (


        <Magnetic>
            <div className={`rounded-l-full rounded-r-full ${filter === btn ? "bg-black" : ""} border border-[#888]  cursor-pointer relative flex items-center justify-center mt-[40px] mb-[40px] w-auto  h-auto  p-[12px_26px] ml-[20px] lg:p-[28px_42px] overflow-hidden group  transition duration-300`} onMouseEnter={manageMouseEnter}
                onMouseLeave={manageMouseLeave}
            >   <span className={`relative z-20 text-[12px] ${filter === btn ? "text-white" : "text-black"} font-[600] transition-colors duration-300 group-hover:text-white`}>
                    <div>{children}</div>
                    {filter && <p className="absolute -top-2 -right-4  text-gray-200 group-hover:text-white font-[300]  text-xs rounded-full px-2 py-0.5">{count}</p>}
                </span>
                <div ref={circle} style={{ backgroundColor }} className='w-full absolute rounded-full h-[150%] top-full'></div>
            </div>
        </Magnetic>


    )
}
export default FilterButton;